//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Loading message for page transitions
//>>label: Loading Message
//>>group: Widgets

define( [
	"jquery",
	"../jquery.mobile.helpers",
	"../jquery.mobile.defaults",
	"../jquery.mobile.widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $ ) {
	// TODO move loader class down into the widget settings
	var loaderClass = "ui-loader", $html = $( "html" );

	$.widget( "mobile.loader", {
		// NOTE if the global config settings are defined they will override these
		//      options
		options: {
			// the theme for the loading message
			theme: "a",

			// whether the text in the loading message is shown
			textVisible: false,

			// custom html for the inner content of the loading message
			html: "",

			// the text to be displayed when the popup is shown
			text: "loading"
		},

		defaultHtml: "<div class='" + loaderClass + "'>" +
			"<span class='ui-icon-loading'></span>" +
			"<h1></h1>" +
			"</div>",

		// For non-fixed supportin browsers. Position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
		fakeFixLoader: function() {
			var activeBtn = $( "." + $.mobile.activeBtnClass ).first();

			this.element
				.css({
					top: $.support.scrollTop && this.window.scrollTop() + this.window.height() / 2 ||
						activeBtn.length && activeBtn.offset().top || 100
				});
		},

		// check position of loader to see if it appears to be "fixed" to center
		// if not, use abs positioning
		checkLoaderPosition: function() {
			var offset = this.element.offset(),
				scrollTop = this.window.scrollTop(),
				screenHeight = $.mobile.getScreenHeight();

			if ( offset.top < scrollTop || ( offset.top - scrollTop ) > screenHeight ) {
				this.element.addClass( "ui-loader-fakefix" );
				this.fakeFixLoader();
				this.window
					.unbind( "scroll", this.checkLoaderPosition )
					.bind( "scroll", $.proxy( this.fakeFixLoader, this ) );
			}
		},

		resetHtml: function() {
			this.element.html( $( this.defaultHtml ).html() );
		},

		// Turn on/off page loading message. Theme doubles as an object argument
		// with the following shape: { theme: '', text: '', html: '', textVisible: '' }
		// NOTE that the $.mobile.loading* settings and params past the first are deprecated
		// TODO sweet jesus we need to break some of this out
		show: function( theme, msgText, textonly ) {
			var textVisible, message, loadSettings;

			this.resetHtml();

			// use the prototype options so that people can set them globally at
			// mobile init. Consistency, it's what's for dinner
			if ( $.type( theme ) === "object" ) {
				loadSettings = $.extend( {}, this.options, theme );

				theme = loadSettings.theme;
			} else {
				loadSettings = this.options;

				// here we prefer the theme value passed as a string argument, then
				// we prefer the global option because we can't use undefined default
				// prototype options, then the prototype option
				theme = theme || loadSettings.theme;
			}

			// set the message text, prefer the param, then the settings object
			// then loading message
			message = msgText || ( loadSettings.text === false ? "" : loadSettings.text );

			// prepare the dom
			$html.addClass( "ui-loading" );

			textVisible = loadSettings.textVisible;

			// add the proper css given the options (theme, text, etc)
			// Force text visibility if the second argument was supplied, or
			// if the text was explicitly set in the object args
			this.element.attr("class", loaderClass +
				" ui-corner-all ui-body-" + theme +
				" ui-loader-" + ( textVisible || msgText || theme.text ? "verbose" : "default" ) +
				( loadSettings.textonly || textonly ? " ui-loader-textonly" : "" ) );

			// TODO verify that jquery.fn.html is ok to use in both cases here
			//      this might be overly defensive in preventing unknowing xss
			// if the html attribute is defined on the loading settings, use that
			// otherwise use the fallbacks from above
			if ( loadSettings.html ) {
				this.element.html( loadSettings.html );
			} else {
				this.element.find( "h1" ).text( message );
			}

			// If the pagecontainer widget has been defined we may use the :mobile-pagecontainer
			// and attach to the element on which the pagecontainer widget has been defined. If not,
			// we attach to the body.
			this.element.appendTo( $.mobile.pagecontainer ?
				$( ":mobile-pagecontainer" ) : $( "body" ) );

			// check that the loader is visible
			this.checkLoaderPosition();

			// on scroll check the loader position
			this.window.bind( "scroll", $.proxy( this.checkLoaderPosition, this ) );
		},

		hide: function() {
			$html.removeClass( "ui-loading" );

			if ( this.options.text ) {
				this.element.removeClass( "ui-loader-fakefix" );
			}

			this.window.unbind( "scroll", this.fakeFixLoader );
			this.window.unbind( "scroll", this.checkLoaderPosition );
		}
	});

})(jQuery, this);

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
