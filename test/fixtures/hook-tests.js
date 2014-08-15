var fs = require('fs'),
hook = require('../../lib/hook');

test('Download ZIP', function (){
  stop();

  expect(1);

  setTimeout(function() {
   var testExists = function (path) {
     console.log(path);
     start();
     return path && fs.existsSync(path);
   };

   try {
     ok(hook._util.downloadZip(testExists), 'Downloaded file does not exist.');
   } catch (err) {
     console.log(err);
   }

  }, 0);

});
