var path = require( 'path' );

module.exports = function( grunt ) {

	// Project configuration.
	grunt.config.init({
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
				"$": true,

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

		lint: {
			files: ['grunt.js', 'js/*.js', 'tests/**/*.js']
		}
	});

	// set the default task.
	grunt.registerTask('default', 'lint');

	// load the project wide config before loading the tasks
	require( path.resolve(path.join('build', 'config')) )( grunt );

	// load the project's default tasks
	grunt.loadTasks( path.join('build', 'tasks') );
};
