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
				immed: false, /* (function(){})() seems acceptable */
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

				/* qunit globals */
				module: true,
				ok: true,
				test: true,
				asyncTest: true,
				same: true,
				start: true,
				stop: true,
				expect: true,

				/* require js global */
				define: true
			}
		},
		legacy: {
			css: true,
			js: true,
			docs: true,
			zip: true
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
	grunt.registerTask('default', 'lint qunit');

	// Legacy multtask
	grunt.registerMultiTask('legacy', 'support for old build targets', function() {
		var util = require('util'),
			exec = require('child_process').exec,
			done = this.async();

		exec("make " + this.target, function (error, stdout, stderr) {
			if( stderr || error ){
				grunt.log.error( stderr || error );
			}

			grunt.log.write(stdout);
			done();
		});
	});
};
