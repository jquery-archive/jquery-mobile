( function() {

	var script = ( function() {
		var scripts = document.getElementsByTagName( "script" );
		return scripts[ scripts.length - 1 ];
	} )();

	requirejs.config( {
		"baseUrl": script.getAttribute( "data-base-url" ) || "../../../js",
		"paths": {
			// requireJS plugins
			"text": "../external/requirejs/plugins/text",
			"json": "../external/requirejs/plugins/json",

			"jquery": "../external/jquery/jquery",
			"jquery-ui": "../external/jquery-ui",
			"jquery-plugins": "../external/jquery/plugins",
			"qunit": "../external/qunit/qunit",
			"qunit-assert-classes": "../external/qunit-assert-classes/qunit-assert-classes",

			"tests": "../tests"
		}
	} );

	// Log error in a better way
	requirejs.onError = function (err) {
		console.log(err.requireType);
		console.log('Modules: ' + err.requireModules);
		throw err;
	};


	// Define no backcompat and set ns modules
	define( "jquery-no-backcompat", [ "jquery" ], function( $ ) {
		$.mobileBackcompat = false;
		return $;
	} );

	define( "jquery-set-ns", [ "jquery" ], function( $ ) {
		$( document ).bind( "mobileinit", function() {
			$.mobile.ns = "nstest-";
			$.support.inlineSVG = $.noop;
		});

		return $;
	} );

	define( "jquery-set-push-state", [ "jquery" ], function( $ ) {
		$( document ).bind( 'mobileinit', function() {
			$.testHelper.setPushState();
		} );
	} )

	define( "override-enhancewithin-once", [ "jquery" ], function( $ ) {
		// The next call to $.fn.enhanceWithin() will have no effect
		$( document ).one( "pagebeforecreate", function() {
			var overrideOnce = true;

			$.fn.enhanceWithin = ( function( original ) {
				return function() {
					if ( overrideOnce ) {
						overrideOnce = false;
					} else {
						return original.apply( this, arguments );
					}
				};
			} )( $.fn.enhanceWithin );
		} );
	});

	var widgets = [
		// Main Widgets
		"accordion",
		"addFirstLastClasses",
		"collapsible",
		"collapsibleSet",
		"controlgroup",
		"controlgroup.backcompat",
		"dialog",
		"enhancer",
		"enhancer.backcompat",
		"enhancer.widgetCrawler",
		"filterable",
		"fixedToolbar",
		"fixedToolbar.backcompat",
		"fixedToolbar.workarounds",
		"listview",
		"listview.autodividers",
		"listview.backcompat",
		"listview.hidedividers",
		"loader",
		"navbar",
		"navbar.morebutton",
		"page",
		"page.dialog",
		"page.dialog.backcompat",
		"pagecontainer",
		"panel",
		"popup",
		"popup.arrow",
		"popup.arrow.backcompat",
		"table",
		"tabs.ajax",
		"table.reflow",
		"table.columntoggle",
		"toolbar",
		"widget.backcompat",
		"widget.theme",
		// Form Widgets
		"forms/autogrow",
		"forms/button",
		"forms/button.backcompat",
		"forms/checkboxradio",
		"forms/checkboxradio.backcompat",
		"forms/clearButton",
		"forms/flipswitch",
		"forms/rangeslider",
		"forms/rangeslider.backcompat",
		"forms/reset",
		"forms/select",
		"forms/select.custom",
		"forms/slider",
		"forms/slider.backcompat",
		"forms/slider.tooltip",
		"forms/textinput",
		"forms/textinput.backcompat"
	];

	var events = [
		"navigate",
		"orientationchange",
		"scroll",
		"throttledresize",
		"touch"
	];

	function getPath( dep ) {
		for ( var i = 0; i < widgets.length; i++ ) {
			if ( widgets[i] === dep ) {
				return "widgets/" + dep;
			}
		}

		for ( var i = 0; i < events.length; i++ ) {
			if ( events[i] === dep ) {
				return "events/" + dep;
			}
		}
		return dep;
	}

	function fixPaths( deps ) {
		for ( var i = 0; i < deps.length; i++ ) {
			deps[ i ] = getPath( deps[ i ] );
		}

		return deps;
	}

	function requireModules( dependencies, noAutoStart, modules ) {
		if ( !dependencies.length ) {

			$( document ).ready( function() {
				var $fixture = $( '#qunit-fixture' );
				if ( $fixture.length ) {
					QUnit.config.fixture = $fixture.html();
				}

				if ( !noAutoStart ) {
					QUnit.start();
				}
			} );

		}

		if ( !modules ) {
			modules = [];
		}

		var dependency = dependencies.shift();

		if ( dependency ) {
			require( [ dependency ], function( module ) {
				modules.push( module );
				requireModules( dependencies, noAutoStart, modules );
			} );
		}
	}

	( function() {

		var deps = script.getAttribute( "data-deps" );

		if ( deps ) {
			deps = deps.replace( /^\s+|\s+$/g, "" ).split( /\s+/ );
		} else {
			deps = [];
		}

		deps = fixPaths( deps );

		var full = !!script.getAttribute( "data-full" );
		var init = !!script.getAttribute( "data-init" );
		var noBackCompat = !!script.getAttribute( "data-no-backcompat" );
		var noAutoStart = !!script.getAttribute( "data-no-autostart" );
		var initAfterModules = !!script.getAttribute( "data-init-after-modules" );
		var setPushState = !!script.getAttribute( "data-set-push-state" );
		var setNs = !!script.getAttribute( "data-set-ns" );
		var overrideEnhanceWithin = !!script.getAttribute( "data-override-enhancewithin" );
		var modules = script.getAttribute( "data-modules" );

		if ( setPushState ) {
			deps.concat( [ "jquery-set-push-state" ] );
		}

		if ( full ) {
			deps = deps.concat( "jquery.mobile" );
		}

		// Format modules attribute
		if ( modules ) {
			modules = modules.replace( /^\s+|\s+$/g, "" )
					 .split( /\s+/ )
					 .map( function( module ) {
					 	// Change to make sure it is loaded from the local folder
					  	return "./" + module + ".js";
					  });
		} else {
			modules = [];
		}

		// Load these before backcompat resolution
		deps = [
			"jquery.tag.inserter",
			"tests/jquery.testHelper"
		].concat( deps );

		if ( initAfterModules ) {
			deps = deps.concat(modules);
		}

		if ( setNs ) {
			deps = [ "jquery-set-ns" ].concat( deps );
		}

		if ( overrideEnhanceWithin ) {
			deps = [ "override-enhancewithin-once" ].concat( deps );
		}

		if ( init ) {
			deps = deps.concat( [ "init" ] );

			if ( noBackCompat ) {
				deps = [ "jquery-no-backcompat" ].concat( deps );
			} else {
				deps =  [
					"jquery-set-ns",
					"widgets/widget.backcompat"
				].concat( deps );
			}
		} else {
			deps = [ "jquery" ].concat( deps );
		}

		if ( !initAfterModules ) {
			deps = deps.concat( modules );
		}

		require( [ "qunit" ], function() {

			// Set autostart to false
			QUnit.config.autostart = false;

			requireModules( deps, noAutoStart );
		} );

	} )();
} )();
