var path = require( 'path' );

module.exports = function( grunt ) {
	// load the project wide config before loading the tasks
	require( path.resolve('build/config') )( grunt );

	// set the default task.
	grunt.registerTask('default', 'lint');

	// csslint and cssmin tasks
	grunt.loadNpmTasks( "grunt-css" );

	// A convenient task alias.
	grunt.registerTask('test', 'config:test qunit');

	// load the project's default tasks
	grunt.loadTasks( path.join('build', 'tasks') );
};
