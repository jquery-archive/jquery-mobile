//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: packaged loading message functionality
//>>label: loading message
//>>group: Navigation

define( [
	"jquery",
	"./jquery.mobile.core",
	"./jquery.mobile.init" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, window ) {
	// loading div which appears during Ajax requests
	// will not appear if $.mobile.loadingMessage is false
	var loaderClass = "ui-loader", $html = $( "html" ), $window = $( window ),
		$loader;

	// For non-fixed supportin browsers. Position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
	function fakeFixLoader(){
		var activeBtn = $( "." + $.mobile.activeBtnClass ).first();

		$loader
			.css({
				top: $.support.scrollTop && $window.scrollTop() + $window.height() / 2 ||
				activeBtn.length && activeBtn.offset().top || 100
			});
	}

	// check position of loader to see if it appears to be "fixed" to center
	// if not, use abs positioning
	function checkLoaderPosition(){
		var offset = $loader.offset(),
			scrollTop = $window.scrollTop(),
			screenHeight = $.mobile.getScreenHeight();

		if( offset.top < scrollTop || (offset.top - scrollTop) > screenHeight ) {
			$loader.addClass( "ui-loader-fakefix" );
			fakeFixLoader();
			$window
				.unbind( "scroll", checkLoaderPosition )
				.bind( "scroll", fakeFixLoader );
		}
	}

	$.extend($.mobile.loading, {
		defaultHtml: "<div class='" + loaderClass + "'>" +
								 "<span class='ui-icon ui-icon-loading'></span>" +
								 "<h1></h1>" +
								 "</div>",

		// Show loading message during Ajax requests
		// if false, message will not appear, but loading classes will still be toggled on html el
		config: {
			// When the text is visible, what theme does the loading box use?
			theme: undefined,

			// Should the text be visble in the loading message?
			textVisible: undefined,

			// by default the loading message is just text and an optional spinner
			// here we provide for the replacement of the popup with markup
			html: undefined,

			// users updating this setting to custom values will override
			// $.mobile.loadingMessage value otherwise it will default to it
			text: undefined
		},

		resetHtml: function() {
			$loader.remove();
			$loader= $( this.defaultHtml );
		},

		// Turn on/off page loading message. Theme doubles as an object argument
		// with the following shape: { theme: '', text: '', html: '', textVisible: '' }
		// NOTE that the $.mobile.loading* settings and params past the first are deprecated
		show: function( theme, msgText, textonly ) {
			this.resetHtml();

			var loadSettings = $.mobile.loading.config;

			// support for object literal params
			if( $.type(theme) == "object" ){
				loadSettings = theme;

				// prefer object property from the param or the $.mobile.loading object
				// then the old theme setting
				theme = loadSettings.theme || $.mobile.loadingMessageTheme;
			} else {
				theme = theme || loadSettings.theme || $.mobile.loadingMessageTheme;
			}

			$html.addClass( "ui-loading" );

			// if any of these things are provided make the necessary alterations
			if ( $.mobile.loadingMessage || msgText || loadSettings.text || loadSettings.html ) {
				// text visibility from argument takes priority
				var textVisible = textonly, message, $header;

				// boolean values require a bit more work :P
				// support object properties and old settings
				if( loadSettings.textVisible != undefined ) {
					textVisible = loadSettings.textVisible;
				} else {
					textVisible = $.mobile.loadingMessageTextVisible;
				}

				$loader.attr( "class", loaderClass + " ui-corner-all ui-body-" + theme + " ui-loader-" + ( textVisible ? "verbose" : "default" ) + ( textonly ? " ui-loader-textonly" : "" ) );

				// TODO verify that jquery.fn.html is ok to use in both cases here
				//      this might be overly defensive in preventing unknowing xss
				// if the html attribute is defined on the loading settings, use that
				// otherwise use the fallbacks from above
				if( loadSettings.html ) {
					$loader.html( loadSettings.html );
				} else {
					// prefer the param, then the settings object then loading message
					message = msgText || loadSettings.text || $.mobile.loadingMessage;
					$loader.find( "h1" )
						.text( message );
				}

				$loader.appendTo( $.mobile.pageContainer );

				checkLoaderPosition();
				$window.bind( "scroll", checkLoaderPosition );
			}
		},

		hide: function() {
			$html.removeClass( "ui-loading" );

			if( $.mobile.loadingMessage ){
				$loader.removeClass( "ui-loader-fakefix" );
			}

			$( window ).unbind( "scroll", fakeFixLoader );
			$( window ).unbind( "scroll", checkLoaderPosition );
		}
	});

	$loader = $( $.mobile.loading.defaultHtml );
})(jQuery, this);

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
