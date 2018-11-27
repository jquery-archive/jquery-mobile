module.exports = function( grunt ) {
var pkg = grunt.file.readJSON( "package.json" );
var _ = require( "underscore" );
var path = require( "path" );
var cheerio = require( "cheerio" );
var files = require( "../../files" )( grunt );
var name = "jquery.mobile";
var replaceCombinedCssReference = function( href, processedName ) {
	return href
		.replace( /^css/, "demos/css" )
		.replace( /\.\.\/css/, "css" )
		.replace( /jquery\.mobile\.css/, processedName + ".min.css" );
};
var processDemos = function( content, srcPath ) {
	var processedName, $;

	content = content.replace( /^\s*<\?php include\(\s*['"]([^'"]+)['"].*$/gmi,
		function( match, includePath /*, offset, string */ ) {
			var newSrcPath = srcPath;

			// If we've already handled the nested includes use the version
			// that was copied to the dist folder
			// TODO use the config from copy:demos.nested.files
			if ( includePath.match( /jqm\-(contents|navmenu|search)\.php/ ) ) {
				newSrcPath = "dist/" + newSrcPath;
			}

			return grunt.file.read( path.resolve( path.join(
				path.dirname( newSrcPath ), includePath ) ) );
		}
	);
	if ( content.substring( 0, 15 ).toLowerCase() === "<!doctype html>" ||
			srcPath.match( /\.php$/ ) ) {
		processedName = grunt.config.process( name + "<%= versionSuffix %>" );
		$ = cheerio.load( content );
		$( "script" ).each( function() {
			var text,
				element = $( this ),
				src = element.attr( "src" );

			if ( src ) {
				element.attr( "src", src
					.replace( /_assets\/js\/?$/, "_assets/js/index.js" )
					.replace( /\.\.\/external\/jquery\/jquery.js$/,
						"js/jquery.js" )
					.replace( /\.\.\/js\/?$/,
						"js/" + processedName + ".min.js" )
					.replace( /external\/jquery\/jquery.js$/,
						"demos/js/jquery.min.js" )
					.replace( /^js\/?$/, "demos/js/" + processedName + ".min.js" ) );
			} else {
				text = element.text();

				// References to stylesheets via grunticon need to be updated
				text = text.replace( /(grunticon\( \[([^\]]*))/,
					function( match, group ) {
						var index,
							offset = group.indexOf( "[" ),
							prefix = group.substring( 0, offset + 1 );

						group = group.substring( offset + 1 ).split( "," );

						for ( index in group ) {
							group[ index ] = "\"" + group[ index ]
									.trim()
									.replace( /(^['"])|(['"]$)/g, "" )
									.replace( /\.\.\/css\//, "css/" )
									.replace( /\.css$/, ".min.css" ) + "\"";
						}

						return prefix + " " + group.join( "," ) + " ";
					} );

				//Element.html( text );
				element[ 0 ].children[ 0 ].data = text;
			}
		} );
		$( "link[rel='stylesheet'][href]" ).each( function() {
			var element = $( this );

			element.attr( "href",
				replaceCombinedCssReference( element.attr( "href" ),
					processedName )

					// Demos that separately refer to the structure need to be
					// processed here
					.replace( /css\/structure\/jquery\.mobile\.structure\.css/gi,
						path.join( "css", "themes", "default",
							grunt.config.process( name + ".structure" + "<%= versionSuffix %>" ) +
							".min.css" )
					)

					// References to the icons CSS file need to be processed here
					.replace( /css\/themes\/default\/jquery\.mobile\.icons\.css/,
						path.join( "css/themes/default", "jquery.mobile.icons.min.css" )
				) );

		} );

		$( "a[href]" ).each( function() {
			var element = $( this );

			element.attr( "href",
				element.attr( "href" ).replace( /\.php$/, ".html" ) );
		} );

		content = $.html();
	}
	return content;
};

return {
	images: {
		expand: true,
		cwd: "css/themes/default/images",
		src: "**",
		dest: path.join( "<%= dist %>", "images/" )
	},
	"demos.nested-includes": {
		options: {

			// TODO duplicated in demos.firstpass
			processContent: function( content, srcPath ) {
				content = content.replace( /^\s*<\?php include\(\s*['"]([^'"]+)['"].*$/gmi,
					function( match, includePath /*, offset, string */ ) {

						var fileToInclude = path.resolve(
							path.join( path.dirname( srcPath ), includePath )
						);
						return grunt.file.read( fileToInclude );
					}
				);
				return content;
			}
		},
		files: [
			{
				expand: true,
				src: [
					"demos/jqm-contents.php",
					"demos/jqm-navmenu.php",
					"demos/jqm-search.php"
				],
				dest: "<%= dist %>"
			}
		]

	},
	"demos.processed": {
		options: {
			processContent: function( content, srcPath ) {
				return processDemos( content, srcPath );
			}
		},
		files: [
			{
				expand: true,
				src: [
					"index.php",
					"demos/**/*.php",
					"demos/**/*.html",
					"!demos/navigation-php-redirect/**",
					"demos/navigation-php-redirect/index.php"
				],
				dest: "<%= dist %>",
				ext: ".html"
			}
		]
	},
	"demos.php": {
		options: {
			processContent: function( content, srcPath ) {
				return processDemos( content, srcPath );
			}
		},
		files: [
			{
				expand: true,
				src: [
					"demos/navigation-php-redirect/*.php",
					"!demos/navigation-php-redirect/index.php",
					"demos/page-events/*.php",
					"!demos/page-events/index.php"
				],
				dest: "<%= dist %>"
			}
		]
	},
	"demos.backbone": {
		options: {
			processContent: function( content, srcPath ) {
				var processedName = grunt.config.process( name + "<%= versionSuffix %>" );

				if ( /\.html$/.test( srcPath ) ) {

					var $ = cheerio.load( content );

					$( "link[rel='stylesheet'][href]" ).each( function() {
						var element = $( this );

						element.attr( "href",
							replaceCombinedCssReference( element.attr( "href" ),
								processedName ) );
					} );

					$( "script" ).each( function( idx, element ) {
						var script = $( element );
						if ( /requirejs\.config\.js$/.test( script.attr( "src" ) ) ) {

							// Get rid of the requirejs.config.js script tag since we're
							// using the built bundle
							script.remove();
						} else if ( /require.js$/.test( script.attr( "src" ) ) ) {

							// Use the CDN version for requirejs
							script.attr( "src",
								"//cdn.jsdelivr.net/requirejs/" +
								pkg.devDependencies.requirejs +
								"/require.min.js" );
						}
					} );

					// Write out newly created file contents
					content = $.html();
				} else if ( /\.js$/.test( srcPath ) ) {

					// Redifines paths for compiled demos
					content = content.replace( /baseUrl:.*$/m, "baseUrl: \"../js\"," );
					content = content.replace( /\.\.\/external\/jquery\//, "" );
					content = content.replace( /jquery\.mobile/, processedName );
					content = content.replace(
						/"backbone-requirejs-demos".*$/m,
						"\"backbone-requirejs-demos\": \"../backbone-requirejs/js\"" );
				}

				return content;
			}
		},
		files: [
			{
				expand: true,
				src: [
					"demos/backbone-requirejs/**/*",
					"!demos/backbone-requirejs/index.php"
				],
				dest: "<%= dist %>"
			}
		]
	},
	"demos.datepicker": {
		files: [
			{
				expand: true,
				src: [ "external/jquery-mobile-datepicker-wrapper/**/*" ],
				dest: path.join( "<%= dist %>" )
			},
			{
				expand: true,
				src: [ "external/jquery-ui/widgets/datepicker.js" ],
				dest: path.join( "<%= dist %>" )
			}
		]
	},
	"demos.unprocessed": {
		files: [
			{
				expand: true,
				cwd: "external/jquery",
				src: [ "jquery.js", "jquery.min.js", "jquery.min.map.js" ],
				dest: path.join( "<%= dist %>", "demos/js/" )
			},
			{
				expand: true,
				cwd: "<%= dist %>",
				src: [ "*.js", "*.map" ],
				dest: path.join( "<%= dist %>", "demos/js/" )
			},
			{
				expand: true,
				cwd: "<%= dist %>",
				src: [
					"images/**"
				].concat( _.pluck( files.getMinifiedCSSFiles(), "dest" ) ),
				dest: path.join( "<%= dist %>", "demos/css/themes/default/" )
			},
			{
				expand: true,
				src: [
					"demos/**/*",
					"!**/*.php",
					"!**/*.html",
					"!demos/backbone-requirejs/js/*"
				],
				dest: "<%= dist %>"
			}
		]
	},
	sourcemap: {

		// Processes the sourceMap to fix
		// issue: https://github.com/mishoo/UglifyJS2/issues/47
		options: {
			processContent: function( content /*, srcPath*/ ) {
				content = content.replace( /"dist\//g, "\"" );
				return content;
			}
		},
		files: [
			{
				src: "<%= uglify.all.options.sourceMap %>",
				dest: "<%= uglify.all.options.sourceMap %>"
			}
		]
	},
	"jqueryCDN": {
		files: [ {
			expand: true,
			cwd: "<%= dist %>",
			src: files.cdn,
			dest: "<%= dirs.cdn.jquery %>/"
		} ]
	},
	"googleCDN": {
		options: {
			processContent: function( content, srcPath ) {
				if ( /\.min.js$|\.min.map$/.test( srcPath ) ) {

					// We need to rewrite the map info
					var re = new RegExp(
						grunt.template.process( "<%= versionSuffix %>" ),
						"g" );
					content = content.replace( re, "" );
				}
				return content;
			},
			processContentExclude: [ "**/*.+(gif|png)" ]
		},
		files: {

			// WARNING: This will be modified by the config:copy:noversion task
			cwd: "<%= dist %>",
			src: files,
			dest: "<%= dirs.tmp %>"
		}
	},
	git: {
		options: {
			processContent: function( content, srcPath ) {
				if ( /\.min.js$|\.min.map$/.test( srcPath ) ) {

					// We need to rewrite the map info
					var re = new RegExp( name, "g" );
					content = content.replace( re, name + "-git" );
				}
				return content;
			},
			processContentExclude: [ "**/*.zip", "**/*.gif", "**/*.png" ]
		},
		files: {

			// WARNING: This will be modified by the config:copy:git task
			cwd: "<%= dist %>",
			src: files,
			dest: "<%= dirs.cdn.git %>"
		}
	}
};
};
