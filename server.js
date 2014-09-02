/* jshint esnext: true */

//Settings
var socket = process.env.LISTEN || 3000;
var root = __dirname + '/dist';

var koa = require('koa'),
    compress = require('koa-compress'),
    files = require('koa-file-server'),
    serve = require('koa-static'),
    rewrite = require('koa-rewrite');

var debug = (process.env.DEBUG === 'true');     
var app = koa();


app.use(function *(next){
  this.path = decodeURIComponent(this.path);
  yield next;
});

app.use(compress());

var regex = /^(?:.+\.(?!(?:jpg|png|gif|pdf|json|js|map|eot|svg|ttf|woff|html|css)$))?(?:[^.]+$)/i;
app.use(rewrite(regex, '/index.html'));

//serve is somewhat slower, files more sophisticated, but does not support livereload because of caching
if(debug) {
  console.log('Running in debug mode!');
  app.use(serve(root));
} else {
  app.use(files({
    root: root,
    index: true
  }));
}

app.listen(socket);
