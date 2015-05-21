var marked = require('marked');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

module.exports = function(grunt) {

  // Configuration
  var src = 'resources';
  var target = 'dist';

  // Markdown Renderer
  var mdRenderer = new marked.Renderer();

  //External links should open in new tab
  mdRenderer.link = function (href, title, text) {
    var out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    if (_(href).startsWith('http')) {
      out += ' target="_blank"';
    }
    out += '>' + text + '</a>';
    return out;
  };


  grunt.registerTask('bowerupdate', 'update the frontend dependencies', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('bower update', {cwd: '.'}, function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });

  grunt.registerTask('npmupdate', 'update the development dependencies', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('npm update', {cwd: '.'}, function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });

  grunt.registerTask('npmstart', 'start node', function() {
    var exec = require('child_process').exec;
    exec('npm start', {cwd: '.'}, function(err, stdout, stderr) {
      console.log(stdout);
    });
  });


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [target],
    stylus: {
      compile: {
        options: {
          paths: [
            src
          ],
          compress: true,
          'include css': true,
          'resolve url': true,
          urlfunc: 'url'
        },
        files: [{
          src: src + '/styles/newgrid/newgrid.styl',
          dest: target + '/styles/newgrid/newgrid.css'
        }]
      }
    },
    copy: {
      bowerslick: {
        files: [
          {
            expand: true,
            cwd: src + '/components/slick-carousel/slick/',
            src: [
              'ajax-loader.gif',
              'fonts/*.*'
            ],
            dest: target + '/styles/newgrid'
          }
        ]
      },
      fontawesome: {
        files: [
          {
            expand: true,
            cwd: src + '/components/font-awesome/',
            src: [
              'fonts/fontawesome-*.*'
            ],
            dest: target + '/styles'
          }
        ]
      },
      timelinejs: {
        files: [
          {
            expand: true,
            cwd: src + '/components/TimelineJS/build/',
            src: [
              '**/*.*'
            ],
            dest: target + '/js/TimelineJS'
          }
        ]
      },
      leaflet: {
        files: [
          {
            expand: true,
            cwd: src + '/components/leaflet/dist/',
            src: ['leaflet.css', 'leaflet.js'],
            dest: target + '/js/leaflet'
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd: src,
            src: [
              'fonts/*.woff'
            ],
            dest: target + '/styles/newgrid'
          }
        ]
      },
      assets: {
        files: [
          {
          expand: true,
          cwd: src + '/assets',
          src: [
            '**/*.*'
          ],
          dest: target + '/assets'
        }
        ]
      },
      javascript: {
        files: [
          {
            expand: true,
            cwd: src,
            src: [
              'js/**/*.js',
              'components/requirejs-domready/domReady.js',
              'components/jquery/dist/jquery.js',
              'components/angular/angular.js',
              'components/angular-route/angular-route.js',
              'components/angular-resource/angular-resource.js',
              'components/angular-sanitize/angular-sanitize.js',
              'components/angular-material/angular-material.js',
              'components/angular-animate/angular-animate.js',
              'components/angular-aria/angular-aria.js',
              'components/marked/lib/marked.js',
              'components/slick-carousel/slick/slick.js',
              'components/viewport-units-buggyfill/viewport-units-buggyfill.js'
            ],
            dest: target
          }
        ]
      },
      robots: {
        files: [
          {
            expand: true,
            cwd: src,
            src: [
              'robots.txt'
            ],
            dest: target
          }
        ]
      },
      favicons: {
        files: [
          {
            expand: true,
            cwd: src + '/favicons',
            src: ['*.*'],
            dest: target
          }
        ]
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: (process.env.DEBUG === 'true'),
            production: (process.env.PRODUCTION === 'true')
          }
        },
        files: [
          {
            src: src + '/index.jade',
            dest: target + '/index.html'
          },
          {
            cwd: src + '/templates',
            src: '*.jade',
            dest: target + '/templates',
            expand: true,
            ext: '.html',
            extDot: 'last'
          }
        ]  
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: src + '/js/',
          mainConfigFile: src + '/js/main.js',
          out: target + '/js/main.min.js',
          name: 'main',
          optimize: 'uglify2',
          uglify2: {
            compress: {
              sequences     : true,  // join consecutive statemets with the “comma operator”
              properties    : true,  // optimize property access: a["foo"] → a.foo
              dead_code     : true,  // discard unreachable code
              drop_debugger : true,  // discard “debugger” statements
              drop_console  : true,  // discard console.* statements
              unsafe        : true, // some unsafe optimizations (see below)
              conditionals  : true,  // optimize if-s and conditional expressions
              comparisons   : true,  // optimize comparisons
              evaluate      : true,  // evaluate constant expressions
              booleans      : true,  // optimize boolean expressions
              loops         : true,  // optimize loops
              unused        : true,  // drop unused variables/functions
              hoist_funs    : true,  // hoist function declarations
              hoist_vars    : true, // hoist variable declarations
              if_return     : true,  // optimize if-s followed by return/continue
              join_vars     : true,  // join var declarations
              cascade       : true,  // try to cascade `right` into `left` in sequences
              side_effects  : false,  // drop side-effect-free statements
              warnings      : true,  // warn about potentially dangerous optimizations/code
              global_defs   : {}     // global definitions 
            },
            options: {
              beautify: false
            }
          },
          generateSourceMaps: true,
          preserveLicenseComments: false,
          done: function(done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (duplicates.length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              grunt.log.warn(duplicates);
              done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }

            done();
          }
        }
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      requirejs: {
        files: [{
          src: src + '/components/requirejs/require.js',
          dest: target + '/js/require.js'
        }]
      }
    },
    metalsmith: {
      content: {
        options: {
          metadata: {},
          clean: false,
          plugins: {
            'metalsmith-markdown': {
              renderer: mdRenderer,
              highlight: function (code, lang) {
                var highlight = require('highlight.js'),
                    languageObject = highlight.getLanguage(lang);
                if(languageObject) {
                  return highlight.highlight(lang, code, true).value;
                } else {
                  return highlight.highlightAuto(code).value;
                }
              },
              langPrefix: 'hljs '
            },
            'metalsmith-drafts': {},
            'metalsmith-path': {},
            'metalsmith-collections': {
              projects: {
                pattern: 'projects/*.html'
              },
              blog: {
                pattern: 'blog/*.html'
              }
            },
            'metalsmith-filemetadata': [
              {pattern: "**/*.html", metadata: {"type": "item"}},
            ],
            'metalsmith-feed': {
              collection: 'blog',
              site_url: 'http://christian.sterzl.info',
              destination: '../feed.xml',
              title: 'Christian Sterzl\'s Blog',
              description: 'A tiny blog of a software developer',
              image_url: 'http://christian.sterzl.info/assets/avatar.png'
            },
            'metalsmith-writemetadata': {
              pattern: ['**/*.html'],
              ignorekeys: ['next', 'previous'],
              collections: {
                projects: {
                  output: {
                    path: 'projects.json',
                    asObject: true,
                    metadata: {
                      "type": "list"
                    }
                  },
                  ignorekeys: ['contents', 'next', 'previous']
                },
                blog: {
                  output: {
                    path: 'blog.json',
                    asObject: true,
                    metadata: {
                      "type": "list"
                    }
                  },
                  ignorekeys: ['contents', 'next', 'previous']
                }
              }
            },
            'metalsmith-ignore': ['**/*.html']
          }
        },
        src: src + '/content',
        dest: target + '/content'
      },
      templates: {
        options: {
          metadata: {},
          clean: false,
          plugins: {
            'metalsmith-path': {},
            'metalsmith-collections': {
              templates: {
                pattern: '*.html'
              }
            },
            'metalsmith-filemetadata': [
              {pattern: "*.html", metadata: {"type": "template"}}
            ],
            'metalsmith-writemetadata': {
              pattern: ['**/*.html'],
              ignorekeys: ['next', 'previous'],
              collections: {
                templates: {
                  output: {
                    path: 'templates.json',
                    asObject: true,
                    metadata: {
                      "type": "templates"
                    }
                  },
                  ignorekeys: ['next', 'previous']
                }
              }
            },
            'metalsmith-ignore': ['*.html', '*.json', '!templates.json']
          }
        },
        src: target + '/templates',
        dest: target + '/templates'
      }
    },
    watch: {
      styles: {
        files: [src + '/styles/**/*.styl', src + '/images/**/*.*'],
        tasks: ['stylus'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      templates: {
        files: [src + '/index.jade', src + '/templates/*.jade'],
        tasks: ['jade', 'metalsmith:templates'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: [src + '/js/**/*.js'],
        tasks: ['requirejs', 'copy:javascript'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      content: {
        files: [src + '/content/**/*.md'],
        tasks: ['metalsmith:content'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      configGrunt: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      },
      configNpm: {
        files: ['package.json'],
        tasks: ['npmupdate'],
        options: {
          reload: true
        }
      },
      configBower: {
        files: ['bower.json'],
        tasks: ['bowerupdate'],
        options: {
          reload: true
        }
      },
      server: {
        files: ['server.js'],
        tasks: ['npmstart'],
        options: {
          reload: true
        }
      },
      assets: {
        files: [src + '/assets/**/*.*', src + '/assets/*.*'],
        tasks: ['copy:assets'],
        options: {
          reload: true
        }
      }
    },
    sitemap: {
      dist: {
        siteRoot: target + '/',
        pattern: [
          target + '/content/**/*.json', 
          target + '/index.html'
        ]
      }
    },
    sed: {
      sitemap: {
        path: target + '/sitemap.xml',
        pattern: 'content(/.*).json',
        replacement: '$1'
      },
      feed: {
        path: target + '/feed.xml',
        pattern: '[.]html(</link>|</guid>)',
        replacement: '$1'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-metalsmith');
  grunt.loadNpmTasks('grunt-sitemap');
  grunt.loadNpmTasks('grunt-sed');

  // Default task(s).
  grunt.registerTask('build', ['clean', 'stylus', 'jade', 'requirejs', 'uglify', 'metalsmith','copy', 'sitemap', 'sed']);
  grunt.registerTask('update', ['bowerupdate', 'npmupdate', 'build']);
  grunt.registerTask('default', ['build', 'npmstart', 'watch']);
};
