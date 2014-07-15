var Metalsmith = require('metalsmith'),
debug = require('debug')('build'),
markdown = require('metalsmith-markdown'),
writemetadata = require('metalsmith-writemetadata'),
stylus = require('metalsmith-stylus'),
jade = require('metalsmith-jade'),
ignore = require('metalsmith-ignore'),
uglify     = require('metalsmith-uglify'),
minimatch = require('minimatch'),
watch = require('metalsmith-watch');

Metalsmith(__dirname)
.source('./resources')
.destination('./build')
.use(ignore([
  '**/.bower.json',
  '**/*.gzip',
  'components/**',
  '!components/angular*/*.min.js*',
  '!components/requirejs*/*.js',
  'styles/**/*.styl',
  '!styles/newgrid/newgrid.styl'
]))
.use(markdown())
.use(writemetadata({
  pattern: ['**/*.html']
}))
.use(stylus({
  'include css' : true,
  compress: true,
  nib: true
}))
.use(uglify({
  filter: function(filepath) {
    if(minimatch(filepath, '**/require.js')) {
      debug('uglify: ' + filepath);
      return true;
    }
    return false;
  }
}))
.use(jade())
.use(watch({
  pattern: ['**/*.js', '**/*.jade']
}))
.build(function(err,files) {
  if (err) { 
    debug(err); 
  } else { 
    debug('done');
  }
});


