module.exports = function( grunt ) {
var path = require( "path" );
var _ = require( "underscore" );
var files = {
	css: {
		structure: {
			src: "css/structure/jquery.mobile.structure.css",
			unminified: "<%= name %>.structure<%= versionSuffix %>.css"
		},
		theme: {
			src: "css/themes/default/jquery.mobile.theme.css",
			unminified: "<%= name %>.theme<%= versionSuffix %>.css"
		},
		bundle: {
			src: "css/themes/default/jquery.mobile.css",
			unminified: "<%= name %><%= versionSuffix %>.css"
		},
		inlinesvg: {
			src: "css/themes/default/jquery.mobile.inline-svg.css",
			unminified: "<%= name %>.inline-svg<%= versionSuffix %>.css"
		},
		inlinepng: {
			src: "css/themes/default/jquery.mobile.inline-png.css",
			unminified: "<%= name %>.inline-png<%= versionSuffix %>.css"
		},
		externalpng: {
			src: "css/themes/default/jquery.mobile.external-png.css",
			unminified: "<%= name %>.external-png<%= versionSuffix %>.css"
		},
		icons: {
			src: "css/themes/default/jquery.mobile.icons.css",
			unminified: "<%= name %>.icons<%= versionSuffix %>.css"
		}
	},
	getCSSFiles: function( destDir ) {
		destDir = destDir || ".";
		var list = [];
		_.values( files.css ).forEach( function( value ) {
			list.push( {
				src: value.src,
				dest: path.join( destDir, value.unminified )
			} );
		} );
		return list;
	},
	getMinifiedCSSFiles: function( destDir ) {
		destDir = destDir || ".";
		var list = [];
		_.values( files.css ).forEach( function( value ) {
			list.push( {
				src: path.join( destDir, value.unminified ),
				dest: path.join( destDir, value.minified )
			} );
		} );
		return list;
	},
	cdn: [
		"<%= name %><%= versionSuffix %>.js",
		"<%= name %><%= versionSuffix %>.min.js",
		"<%= name %><%= versionSuffix %>.min.map",

		"<%= files.css.structure.unminified %>",
		"<%= files.css.structure.minified %>",
		"<%= files.css.bundle.unminified %>",
		"<%= files.css.bundle.minified %>",
		"<%= files.css.inlinesvg.unminified %>",
		"<%= files.css.inlinesvg.minified %>",
		"<%= files.css.inlinepng.unminified %>",
		"<%= files.css.inlinepng.minified %>",
		"<%= files.css.externalpng.unminified %>",
		"<%= files.css.externalpng.minified %>",
		"<%= files.css.icons.unminified %>",
		"<%= files.css.icons.minified %>",

		"images/*.*",
		"images/icons-png/**"
	],

	zipFileName: "<%= name %><%= versionSuffix %>.zip",

	distZipOut: path.join( "<%= dist %>", "<%= name %><%= versionSuffix %>.zip" ),

	imagesZipOut: path.join( "<%= dist %>", "<%= name %>.images<%= versionSuffix %>.zip" )

};

// Add minified property to files.css.*
_.forEach( files.css, function( o ) {
	o.minified = o.unminified.replace( /\.css$/, ".min.css" );
} );

files.cdn = [
	"<%= name %><%= versionSuffix %>.js",
	"<%= name %><%= versionSuffix %>.min.js",
	"<%= name %><%= versionSuffix %>.min.map",

	files.css.structure.unminified,
	files.css.structure.minified,
	files.css.bundle.unminified,
	files.css.bundle.minified,
	files.css.inlinesvg.unminified,
	files.css.inlinesvg.minified,
	files.css.inlinepng.unminified,
	files.css.inlinepng.minified,
	files.css.externalpng.unminified,
	files.css.externalpng.minified,
	files.css.icons.unminified,
	files.css.icons.minified,

	"images/*.*",
	"images/icons-png/**"
];

files.distZipContent = [
	files.cdn,

	files.css.theme.unminified,
	files.css.theme.minified,

	"images/icons-svg/**",
	"demos/**"
];

files.googleCDNZipOut = path.join( path.join( "<%= dist %>", "cdn-google" ),
	files.zipFileName );

return files;
};
