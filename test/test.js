var a = require('assert'),
chainer = require('chainer'),
_ = require('underscore'),
statik = require('node-static');

var tr = require('qunit'),
log = tr.log;


var fixtures = __dirname + '/fixtures',
chain = chainer();

tr.options.log = {
  // log assertions overview
  assertions: true,
  // log expected and actual values for failed tests
  errors: true,
  // log tests overview
  tests: true,
  // log summary
  summary: true,
  // log global summary (all files)
  globalSummary: true,
  // log coverage
  coverage: true,
  // log global coverage (all files)
  globalCoverage: true,
  // log currently testing code file
  testing: true
};
tr.options.coverage = true;

// reset log stats every time .next is called
chain.next = function() {
  log.reset();
  return chainer.prototype.next.apply(this, arguments);
};

chain.add('base testrunner', function() {
  tr.run({
    code: './lib/hook.js',
    tests: fixtures + '/hook-tests.js',
  }, function(err, res) {
    if(err) console.log(err);
    chain.next();
  });
});

chain.add(function() {
  console.log('\nAll tests ok.');
  server.close(function() {
    console.log('Server closed.');
  });
});
//
// Start test server    statik = require('node-static'),
var file = new(statik.Server)('test');
var server = require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response, function(e, rsp) {
      if (e && e.status === 404) {
        response.writeHead(e.status, e.headers);
        response.end("Not Found");
      }
    });
  }).resume();
});
server.listen(3000, function() {
  chain.start();
});

