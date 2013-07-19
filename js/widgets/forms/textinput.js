//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Enhances and consistently styles text inputs.
//>>label: Text Inputs & Textareas
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "../../jquery.mobile.degradeInputs", "../../jquery.mobile.zoom", "../../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.textinput", {
	options: {
		theme: null,
		corners: true,
		mini: false,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		wrapperClass: "",
		enhanced: false,
		maxlength: null
	},

	_create: function() {

		var o = this.options,
			themeclass  = " ui-body-" + ( o.theme ?  o.theme : "inherit" ),
			cornerclass = o.corners ? " ui-corner-all" : "",
			miniclass = o.mini ? " ui-mini" : "",
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			isTextarea = this.element[ 0 ].tagName === "TEXTAREA",
			inputNeedsWrap = ((this.element.is( "input" ) ||  this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='search']" ) )&& !this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='range']" )),
			wkmatch = navigator.userAgent.match( /AppleWebKit\/([0-9\.]+)/ ),
			wkversion = !!wkmatch && wkmatch[ 1 ],
			requiresMaxLengthWorkaround = navigator.userAgent.indexOf( "Android" ) > -1 && wkversion && wkversion >= 534.30; //Android 4.1+
			
		$.extend( this, {
			themeclass: themeclass,
			cornerclass: cornerclass,
			miniclass: miniclass,
			isSearch: isSearch,
			isTextarea: isTextarea,
			inputNeedsWrap: inputNeedsWrap,
			requiresMaxLengthWorkaround: requiresMaxLengthWorkaround
		});

		this._autoCorrect();
		this._maxLengthWorkaround();

		if( this.element[0].disabled ){
			this.options.disabled = true;
		}

		if( !o.enhanced ) {
			this._enhance();
		}

		this._on( {
			"focus": "_handleFocus",
			"blur": "_handleBlur"
		});

	},

	refresh: function(){
		this.setOptions({
			"disabled" : this.element.is(":disabled")
		});
	},

	_enhance: function(){

		if( this.isTextarea ) {
			this.element.addClass( "ui-input-text" );
		}

		if( this.element.is( "textarea, [data-" + ( $.mobile.ns || "" ) + "type='range']" ) ){
			this.element.addClass( "ui-shadow-inset" );
			this._setOptions( this.options );
		}

		//"search" and "text" input widgets
		if ( this.inputNeedsWrap ) {
			this.element.wrap( this._wrap() );
		}

	},

	widget: function(){
		return ( this.inputNeedsWrap ) ? this.element.parent(): this.element;
	},

	_wrap: function(){
		return $( "<div class='" + ( this.isSearch ? "ui-input-search" : "ui-input-text" ) + " ui-body-" + (( this.options.theme === null ) ? "inherit": this.options.theme ) + ( this.options.corners ? " ui-corner-all": "" ) + ( this.options.mini ? " ui-mini": "" ) + ( this.options.disabled ? " ui-disabled ": "" ) + " ui-shadow-inset'></div>" );
	},

	_autoCorrect: function(){
		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof this.element[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			this.element[0].setAttribute( "autocorrect", "off" );
			this.element[0].setAttribute( "autocomplete", "off" );
		}
	},

	_handleBlur: function() {
		this.element.removeClass( $.mobile.focusClass );
		if ( this.options.preventFocusZoom ) {
			$.mobile.zoom.enable( true );
		}
	},

	_handleFocus: function() {
		// In many situations, iOS will zoom into the input upon tap, this prevents that from happening
		if ( this.options.preventFocusZoom ) {
			$.mobile.zoom.disable( true );
		}
		this.element.addClass( $.mobile.focusClass );
	},

	_maxLengthWorkaround: function() {
		// This is a workaround for android issue 35264, that causes the input field to freeze sometimes when it has a max length field
		if ( this.requiresMaxLengthWorkaround ) {
			if ( typeof this.element.attr( "maxLength" ) !== "undefined" ) {
				this.options.maxlength = this.element.attr( "maxLength" );
				this.element.removeAttr( "maxLength" );
				this._on( { "keyup": "_handleMaxLength", "change": "_handleMaxLength" } );
			}
		}
	},

	_handleMaxLength: function() {
		if ( this.element.val().length > this.options.maxlength ) {
			this.element.val( this.element.val().slice(0, this.options.maxlength) );
		}
	},

	_setOptions: function ( options ) {
		var themeclass;

		this._super( options );

		if( options.theme !== undefined ) {
			themeclass = "ui-body-" + (( options.theme === null ) ? "inherit": options.theme );
			this.widget().removeClass( this.themeclass ).addClass( themeclass );
			this.themeclass = themeclass;
		}

		if( options.corners !== undefined ) {
			this.widget().removeClass( "ui-corner-all" ).addClass( options.corners ? "ui-corner-all": "" );
		}

		if( options.mini !== undefined ) {
			this.widget().removeClass( "ui-mini" ).addClass( options.mini ? "ui-mini": "" );
		}

		if( options.disabled !== undefined ) {
			this.element.prop( "disabled", !!options.disabled );
			this.widget().toggleClass( "ui-disabled", !!options.disabled );
		}

	},

	_destroy: function() {
		if( this.options.enhanced ){
			return;
		}
		if( this.inputNeedsWrap ){
			this.element.unwrap();
		}
		this.element.removeClass( "ui-input-text " + this.themeclass + " ui-corner-all ui-mini ui-disabled" );
	}
});

$.mobile.textinput.initSelector = "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.textinput" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
