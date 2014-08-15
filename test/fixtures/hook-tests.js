var fs = require('fs'),
hook = require('../../lib/hook');

test('Download ZIP', function () {
  var testExistsDownloadedFile = function (path) {
    console.log(path);
    start();
    ok(path && fs.existsSync(path), 'Downloaded file exists.');
    unpackDownloadedFile(path);
  };

  var unpackDownloadedFile = function (path) {
  
  };

  stop();
  expect(1);

  setTimeout(function () {
    //start callback chain
    hook._util.downloadZip(testExistsDownloadedFile);
  }, 0);
});
