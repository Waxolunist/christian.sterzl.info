var grunt = require('grunt'),
    gith = require('gith'),
    Download = require('download'),
    AdmZip = require('adm-zip'),
    os = require('os'),
    path = require('path'),
    fs = require('fs-extra'),
    uuid = require('uuid'),
    packagejson = require('../package.json'),
    _ = require('underscore');

var githuburl = 'https://github.com';

var hook = function () {
  // UTIL
  var util = {};

  util.downloadZip = function (serverurl, repo, branch, dest, callback) {
    if(_.isFunction(serverurl)) {
      callback = serverurl;
      serverurl = githuburl;
      repo = packagejson._hook.repo;
      branch = packagejson._hook.branch;
      dest = util.getTempdir();
    }
    var downloadurl = serverurl + '/' + repo + '/archive/' + branch + '.zip',
        filename = branch + '.zip';
    var download = new Download()
      .get({url: downloadurl, name: filename}, dest, { extract: false });
    fs.mkdirs(dest, function(err) {
      if (err) throw err;
      console.log('File will be downloaded to ' + dest + '/' + filename);
      download.run(function(err) {
        if (err) {
          throw err;
        } else if (callback) {
          console.log('Download of ' + downloadurl + ' complete!');
          callback(path.join(dest, filename));
        }
      });
    });
  };

  util.getTempdir = function() {
    return path.join(os.tmpdir(), packagejson._hook.branch, uuid.v1());
  };

  util.unpackZip = function(file, callback) {
    var zip  = new AdmZip(file),
        dest = path.join(
            path.dirname(file), 
            path.basename(file, path.extname(file))
          ); 
    zip.extractAllTo(dest, true);
    if(callback) {
      console.log('File ' + file + ' extracted to ' + dest + '.');
      callback(dest);
    }
  };

  util.deleteZip = function() {};

  util.build = function() {};

  util.replaceFiles = function() {};

  util.restartService = function() {};

  var ret = {};
  ret.init = function() {
    githserver = gith.create(packagejson._hook.port);
    githserver({
      repo: packagejson._hook.repo
    }).on('all', function(payload) {
      if(payload.branch === packagejson._hook.branch) {
        downloadZip();
        //Download zip
        //Unpack zip
        //Delete zip
        //Go into directory
        //Build with grunt
        //Replace files
        //Restart node
      }
    });
  };

  //For testing
  ret._util = util;

  return ret;
}();

module.exports = exports.hook = hook;
