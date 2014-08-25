var grunt = require('grunt'),
    npm = require('npm'),
    gith = require('gith'),
    Download = require('download'),
    AdmZip = require('adm-zip'),
    os = require('os'),
    path = require('path'),
    fs = require('fs-extra'),
    uuid = require('uuid'),
    packagejson = require('../package.json'),
    _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var hook = function () {
  // UTIL
  var util = {};

  util.downloadZip = function (serverurl, repo, branch, callback) {
    if(_.isFunction(serverurl)) {
      callback = serverurl;
      serverurl = packagejson._hook.server;
      repo = packagejson._hook.repo;
      branch = packagejson._hook.branch;
    }
    var downloadurl = serverurl + '/' + repo + '/archive/' + branch + '.zip',
        filename = branch + '.zip',
        dest = util.getTempdir(branch);
    console.log('Accessing %s', downloadurl);
    var download = new Download()
      .get({url: downloadurl, name: filename}, dest, { extract: false });
    fs.mkdirs(dest, function(err) {
      if (err) throw err;
      console.log('File will be downloaded to %s/%s', dest, filename);
      download.run(function(err) {
        if (err) {
          throw err;
        } else if (callback) {
          console.log('Download of %s complete!', downloadurl);
          callback(path.join(dest, filename));
        }
      });
    });
  };

  util.getTempdir = function(branch) {
    return path.join(os.tmpdir(), branch, uuid.v1());
  };

  util.unpackZip = function(file, callback) {
    var zip = new AdmZip(file),
        dest = path.join(path.dirname(file), path.basename(file, path.extname(file)));
    zip.extractAllTo(dest, true);
    if(callback) {
      console.log('File %s extracted to %s.', file, dest);
      callback(dest);   
    }
  };

  util.verify = function(dir, repo, branch, callback) {
    //Check if path contains a directory named <repo>-<branch>
    //repo is repo minus owner
    if(!_.isUndefined(repo)) {
      repo = _(packagejson._hook.repo).strRight('/');
      branch = packagejson._hook.branch;
    } else {
      repo = _(repo).strRight('/');
    }
    var sourcedir = path.join(dir, repo + '-' + branch);
    fs.exists(sourcedir, function(exists) {
      if(callback && exists) {
        callback(sourcedir);
      }
    });
  };

  util.build = function(p, callback) {
    //Change into directory and execute grunt
    var cwd = process.cwd();
    process.chdir(p);

    npm.load(require(path.join(p, 'package.json')), function (er) {
      console.log('npm loaded: %s', er);
      if (er) {
        return callback(er);
      }
      npm.commands.update([], function (er, data) {
        console.log('Update succeeded');
        if (er) {
          if(callback) {
            callback(er);
          }
        }
        grunt.cli.tasks = ['update']; 
        grunt.cli(null, function() {
          process.chdir(cwd);
          callback();
        });
      });
      npm.on('log', function (message) {
        console.log(message);
      });
    });   
  };

  util.replaceFiles = function(p, target) {
    //Copy files from build dist to actual service
  };

  util.stopService = function() {
  
  };

  util.restartService = function(source) {
    //Restart service
  };

  var ret = {};
  ret.init = function() {
    githserver = gith.create(packagejson._hook.port);
    githserver({
      repo: packagejson._hook.repo
    }).on('all', function(payload) {
      if(payload.branch === packagejson._hook.branch) {
        util.downloadZip(
          util.unpackZip
        );
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
