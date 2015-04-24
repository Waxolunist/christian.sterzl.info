/* jshint esnext: true */

//Settings
var socket = process.env.LISTEN || 3000;
var root = __dirname + '/dist';

var koa = require('koa'),
    files = require('koa-file-server'),
    serve = require('koa-static'),
    rewrite = require('koa-rewrite');

var debug = (process.env.DEBUG === 'true');     
var app = koa();

app.use(function *(next){
  this.path = decodeURIComponent(this.path);
  yield next;
});

var regex = /^(?:.+\.(?!(?:jpg|xml|png|gif|pdf|json|js|map|eot|svg|ttf|woff|html|css)$))?(?:[^.]+$)/i;
app.use(rewrite(regex, '/index.html'));

//serve is somewhat slower, files more sophisticated, but does not support livereload because of caching
if(debug) {
  console.log('Running in debug mode!');
  app.use(serve(root));
} else {
  console.log('Running in prod mode!');
  app.use(files({
    root: root,
    index: true
  }));
}

console.log("Listening on port " + socket);
app.listen(socket);
