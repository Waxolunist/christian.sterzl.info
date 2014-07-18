var Metalsmith = require('metalsmith'),
debug = require('debug')('build'),
markdown = require('metalsmith-markdown'),
writemetadata = require('metalsmith-writemetadata'),
stylus = require('metalsmith-stylus'),
jade = require('metalsmith-jade'),
ignore = require('metalsmith-ignore'),
uglify     = require('metalsmith-uglify'),
minimatch = require('minimatch'),
watch = require('metalsmith-watch'),
collections = require('metalsmith-collections'),
filemetadata = require('metalsmith-filemetadata'),
path = require('metalsmith-path');

Metalsmith(__dirname)
.source('./resources')
.destination('./build')
.use(ignore([
  '**/.bower.json',
  '**/*.gzip',
  'components/**',
  '!components/jquery/dist/*.min.*',
  '!components/angular*/*.min.js*',
  '!components/requirejs*/*.js',
  '!components/leaflet/dist/**/*.*',
  '!components/marked/lib/*',
  '!components/TimelineJS/build/**/*.*',
  '!components/slick-carousel/slick/**/*.*',
  '!components/font-awesome/css/**/*.*',
  '!components/font-awesome/fonts/**/*.*',
  '!components/prism/themes/prism.css',
  'styles/**/*.styl',
  '!styles/newgrid/newgrid.styl'
]))
.use(markdown())
.use(jade())
.use(path())
.use(collections({
  projects: {
    pattern: 'content/projects/*.html'
  },
  blog : {
    pattern: 'content/blog/*.html'
  },
  templates: {
    pattern: 'templates/*.html'
  }
}))
.use(filemetadata([
    {pattern: "content/**/*.html", metadata: {"type": "item"}},
    {pattern: "templates/*.html", metadata: {"type": "template"}}
]))
.use(writemetadata({
  pattern: ['content/**/*.html'],
  ignorekeys: ['next', 'previous'],
  collections: {
    projects: {
      output: {
        path: 'content/projects.json',
        asObject: true,
        metadata: {
          "type": "list"
        }
      },
      ignorekeys: ['contents', 'next', 'previous']
    },
    blog: {
      output: {
        path: 'content/blog.json',
        asObject: true,
        metadata: {
          "type": "list"
        }
      },
      ignorekeys: ['contents', 'next', 'previous']
    },
    templates: {
      output: {
        path: 'templates/templates.json',
        asObject: true,
        metadata: {
          "type": "templates"
        }
      },
      ignorekeys: ['next', 'previous']
    }
  }
}))
.use(stylus({
  'include css' : true,
  compress: false,
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
.use(watch({
  pattern: ['**/*.js', '**/*.jade', '**/*.styl']
}))
.build(function(err,files) {
  if (err) { 
    debug(err); 
  } else { 
    debug('done');
  }
});


