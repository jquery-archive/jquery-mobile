module.exports = function( grunt ) {

	// ci is a magic task that changes based on options we do this to optimize travis build
	grunt.registerTask( "ci", [ "ci:" + ( grunt.option( "citype" ) || process.env.CITYPE ) ] );
	grunt.registerTask( "ci:demos", [ "test:demos" ] );
	grunt.registerTask( "ci:test", [ "test", "coveralls" ] );

	grunt.registerTask( "release:init", function() {

		// Set the version suffix for releases
		grunt.config.set( "versionSuffix", "-" + pkg.version );
	});

	//Build Tasks these build the various js, css, and demo files
	grunt.registerTask( "build", [
		"clean",
		"config:fetchHeadHash",
		"build:js",
		"build:css",
		"build:demos",
		"compress:dist",
		"compress:images"
	]);
	grunt.registerTask( "build:js", [
		"requirejs",
		"concat:js",
		"uglify",
		"copy:sourcemap"
	] );
	grunt.registerTask( "build:css", [
		"cssbuild",
		"cssmin"
	] );
	grunt.registerTask( "build:demos", [
		"concat:demos",
		"copy:images",
		"copy:demos.nested-includes",
		"copy:demos.processed",
		"copy:demos.php",
		"copy:demos.unprocessed",
		"copy:demos.backbone"
	]);
	grunt.registerTask( "build:cdn", [
		"copy:jqueryCDN",
		"clean:tmp",
		"config:copy:googleCDN",
		"copy:googleCDN",
		"hash-manifest:googleCDN",
		"compress:googleCDN",
		"clean:tmp"
	]);
	grunt.registerTask( "build:release", [
		"release:init",
		"build",
		"build:cdn"
	] );
	grunt.registerTask( "build:git", [
		"build",
		"config:copy:git:-git",
		"copy:git"
	] );

	grunt.registerTask( "test", [
		"clean:testsOutput",
		"jshint",
		"build:js",
		"connect",
		"qunit:http"
	] );
	grunt.registerTask( "test:demos", [
		"test:demos:src",
		"test:demos:dist"
	] );
	grunt.registerTask( "test:demos:src", [
		"php",
		"spider:src"
	] );
	grunt.registerTask( "test:demos:dist", [
		"build",
		"php",
		"spider:dist"
	] );

	grunt.registerTask( "default", [ "build", "test" ] );
};