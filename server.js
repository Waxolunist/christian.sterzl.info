//Settings

var port = 3000;
var root = __dirname + '/dist';

var koa = require('koa'),
    compress = require('koa-compress'),
    files = require('koa-file-server'),
    livereload = require('koa-livereload');
var app = koa();

app.use(function *(next){
  this.path = decodeURIComponent(this.path);
  yield next;
});

app.use(compress());
app.use(files({
  root: root,
  index: true
}));
app.use(livereload());

app.listen(port);
