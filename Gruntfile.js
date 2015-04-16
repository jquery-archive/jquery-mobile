module.exports = function( grunt ) {
"use strict";

var path = require( "path" );
var dist = "dist" + path.sep;
var today = grunt.template.today( "UTC:yyyy" );

require( "load-grunt-config" )( grunt, {
	configPath: [
		path.join( process.cwd(), "build/tasks/options" ),
		path.join( process.cwd(), "build/tasks" )
	],
	init: true,
	data: {
		pkg: grunt.file.readJSON( "package.json" ),
		dist: dist,
		name: "jquery.mobile",
		phpPort: Math.floor( 8000 + Math.random() * 1000 ),
		versionSuffix: "",
		headHash: "",
		headShortHash: "",
		version: "<%= version %>",
		dirs: {
			dist: dist,
			cdn: {
				google: path.join( dist, "cdn-google" ),
				jquery: path.join( dist, "cdn" ),
				git: path.join( dist, "git" )
			},
			tmp: path.join( dist, "tmp" )
		},
		banner: [
			"/*!",
			"* jQuery Mobile <%= version %>",
			"* <%if ( headHash ) {%>Git HEAD hash: <%= headHash %> <> <% } %>Date: " +
			grunt.template.today( "UTC:ddd mmm d yyyy HH:MM:ss Z" ),
			"* http://jquerymobile.com",
			"*",
			"* Copyright 2010, " + today + " jQuery Foundation, Inc. and other" +
			" contributors",
			"* Released under the MIT license.",
			"* http://jquery.org/license",
			"*",
			"*/",
			"",
			"",
			""
		].join( grunt.util.linefeed ),

		bannerMin: "/*! jQuery Mobile <%= version %> | <%if ( headShortHash ) {%>Git HEAD" +
			"hash: <%= headShortHash %> <> <% } %>" + grunt.template.today( "UTC:yyyy-mm-dd" ) +
			"T" + grunt.template.today( "UTC:HH:MM:ss" ) + "Z | (c) 2010, " +
			today + " jQuery Foundation, Inc. | jquery.org/license */\n"
	}
} );
};
