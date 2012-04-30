var util = require('util'),
	child_process = require('child_process');

/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		concat: {
			dist: {
				src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				// (function(){})() seems acceptable
				immed: false,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true,

				// qunit globals
				// TODO would be nice to confine these to test files
				module: true,
				ok: true,
				test: true,
				asyncTest: true,
				same: true,
				start: true,
				stop: true,
				expect: true,

				// require js global
				define: true
			}
		},
		legacy_tasks: {
			clean: {},
			css: {
				deps: [ 'init' ]
			},
			deploy: {
				deps: [ 'clean', 'init', 'js', 'css', 'docs', 'zip' ],
				env: 'IS_DEPLOY_TARGET=true'
			},
			docs: {
				deps: [ 'init', 'js', 'css' ]
			},
			init: {},
			js: {
				deps: [ 'init' ]
			},
			zip: {
				deps: [ 'init', 'js', 'css' ]
			}
		},
		lint: {
			files: ['grunt.js', 'js/*.js', 'tests/**/*.js']
		},
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint qunit'
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'lint');

	grunt.registerMultiTask('legacy_tasks', 'support for old build targets', function() {
		var done = this.async(), name = this.name, self = this;

		(this.data.deps || [] ).forEach(function( dep) {
			self.requires( 'legacy_tasks:' + dep );
		});

		child_process.exec( (this.data.env || '') + ' bash build/bin/' + this.target + '.sh', function (error, stdout, stderr) {
			if( error !== null ){
				grunt.log.error( stderr );
			} else {
				grunt.log.write(stdout);
			}

			done();
		});
	});

	// register the task alias's to enforce task dependencies for the custom task
	var deps, tasks = grunt.config.get('legacy_tasks');
	for( task in tasks ){
		deps = [];

		(tasks[task].deps || []).forEach(function( dep ) {
			deps.push('legacy_tasks:' + dep);
		});

		deps.push('legacy_tasks:' + task);

		grunt.registerTask( 'legacy:' + task, deps.join(' '));
	}
};
