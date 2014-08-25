var fs = require('fs'),
    path = require('path'),
    statik = require('node-static'),
    _ = require('underscore'),
    hook = require('../../lib/hook');

test('Download ZIP', function (){
  stop();
  expect(7);

  var testExists = function (p) {
    ok(p && fs.existsSync(p), 'Downloaded file exists.');

    //unpack
    hook._util.unpackZip(p, function(d) {
      ok(d, 'Parameter is defined.');
      ok(fs.existsSync(d), 'Destination exists.');
      fs.stat(d, function(err, stats) {
        ok(stats.isDirectory(), 'Destination is a directory.'); 
        
        //verify and get directory
        hook._util.verify(d, 'Waxolunist/christian.sterzl.info', 'master', function(p) {
          console.log('Verify %s', p);
          ok(!_.isUndefined(p), 'Destination verified');
          equal(path.basename(p), 'christian.sterzl.info-master', 'Basename verified');
          
          //call build
          hook._util.build(p, function(err) {
            ok(_.isUndefined(err), 'Grunt task executed successful.');
            start();
          });
        });
      });
    });
  };

  setTimeout(function() {
    try {
     hook._util.downloadZip('http://localhost:3000', 'resources', 'master', testExists);
    } catch (err) {
      console.log(err);
    }
  }, 0);
});
