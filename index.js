var Metalsmith = require('metalsmith'),
debug = require('debug')('build'),
markdown = require('metalsmith-markdown'),
writemetadata = require('metalsmith-writemetadata'),
stylus = require('metalsmith-stylus'),
jade = require('metalsmith-jade'),
ignore = require('metalsmith-ignore'),
uglify     = require('metalsmith-uglify'),
assets = require('metalsmith-assets'),
minimatch = require('minimatch');

Metalsmith(__dirname)
.source('./resources')
.destination('./build')
.use(ignore([
  'styles/**/*.styl',
  'components',
  '!styles/newgrid/newgrid.styl'
]))
.use(markdown())
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
.use(assets({
  source: './resources/components', // relative to the working directory
  destination: './components' // relative to the build directory
}))
.use(writemetadata())
.build(function(err,files) {
  if (err) { 
    debug(err); 
  } else { 
    debug('done');
  }
});


