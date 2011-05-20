/*
* jQuery Mobile Framework : "page" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		backBtnText: "Back",
		addBackBtn: false,
		backBtnTheme: null,
		degradeInputs: {
			color: false,
			date: false,
			datetime: false,
			"datetime-local": false,
			email: false,
			month: false,
			number: false,
			range: "number",
			search: true,
			tel: false,
			time: false,
			url: false,
			week: false
		},
		keepNative: null
	},

	_create: function() {
		var $elem = this.element,
			o = this.options;

		this.keepNative = ":jqmData(role='none'), :jqmData(role='nojs')" + (o.keepNative ? ", " + o.keepNative : "");

		if ( this._trigger( "beforeCreate" ) === false ) {
			return;
		}

		//some of the form elements currently rely on the presence of ui-page and ui-content
		// classes so we'll handle page and content roles outside of the main role processing
		// loop below.
		$elem.find( ":jqmData(role='page'), :jqmData(role='content')" ).andSelf().each(function() {
			$(this).addClass( "ui-" + $(this).jqmData( "role" ) );
		});

		$elem.find( ":jqmData(role='nojs')" ).addClass( "ui-nojs" );

		// pre-find data els
		var $dataEls = $elem.find( ":jqmData(role)" ).andSelf().each(function() {
			var $this = $( this ),
				role = $this.jqmData( "role" ),
				theme = $this.jqmData( "theme" );

			//apply theming and markup modifications to page,header,content,footer
			if ( role === "header" || role === "footer" ) {
				$this.addClass( "ui-bar-" + (theme || $this.parent( ":jqmData(role='page')" ).jqmData( "theme" ) || "a") );

				// add ARIA role
				$this.attr( "role", role === "header" ? "banner" : "contentinfo" );

				//right,left buttons
				var $headeranchors = $this.children( "a" ),
					leftbtn = $headeranchors.hasClass( "ui-btn-left" ),
					rightbtn = $headeranchors.hasClass( "ui-btn-right" );

				if ( !leftbtn ) {
					leftbtn = $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;
				}

				if ( !rightbtn ) {
					rightbtn = $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
				}

				// auto-add back btn on pages beyond first view
				if ( o.addBackBtn && role === "header" &&
						$( ".ui-page" ).length > 1 &&
						$elem.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) &&
						!leftbtn && $this.jqmData( "backbtn" ) !== false ) {

					var backBtn = $( "<a href='#' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" ).prependTo( $this );
					
					//if theme is provided, override default inheritance
					if( o.backBtnTheme ){
						backBtn.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme );
					}
				}

				//page title
				$this.children( "h1, h2, h3, h4, h5, h6" )
					.addClass( "ui-title" )
					//regardless of h element number in src, it becomes h1 for the enhanced page
					.attr({ "tabindex": "0", "role": "heading", "aria-level": "1" });

			} else if ( role === "content" ) {
				if ( theme ) {
					$this.addClass( "ui-body-" + theme );
				}

				// add ARIA role
				$this.attr( "role", "main" );

			} else if ( role === "page" ) {
				$this.addClass( "ui-body-" + (theme || "c") );
			}

			switch(role) {
				case "header":
				case "footer":
				case "page":
				case "content":
					$this.addClass( "ui-" + role );
					break;
				case "collapsible":
				case "fieldcontain":
				case "navbar":
				case "listview":
				case "dialog":
					$this[ role ]();
					break;
			}
		});

		//enhance form controls
  	this._enhanceControls();

		//links in bars, or those with  data-role become buttons
		$elem.find( ":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a" )
			.not( ".ui-btn" )
			.not(this.keepNative)
			.buttonMarkup();

		$elem
			.find(":jqmData(role='controlgroup')")
			.controlgroup();

		//links within content areas
		$elem.find( "a:not(.ui-btn):not(.ui-link-inherit)" )
			.not(this.keepNative)
			.addClass( "ui-link" );

		//fix toolbars
		$elem.fixHeaderFooter();
	},

	_typeAttributeRegex: /\s+type=["']?\w+['"]?/,

	_enhanceControls: function() {
		var o = this.options, self = this;

		// degrade inputs to avoid poorly implemented native functionality
		this.element.find( "input" ).not(this.keepNative).each(function() {
			var type = this.getAttribute( "type" ),
				optType = o.degradeInputs[ type ] || "text";

			if ( o.degradeInputs[ type ] ) {
				$( this ).replaceWith(
					$( "<div>" ).html( $(this).clone() ).html()
						.replace( self._typeAttributeRegex, " type=\""+ optType +"\" data-" + $.mobile.ns + "type=\""+type+"\" " ) );
			}
		});

		// We re-find form elements since the degredation code above
		// may have injected new elements. We cache the non-native control
		// query to reduce the number of times we search through the entire page.

		var allControls = this.element.find("input, textarea, select, button"),
			nonNativeControls = allControls.not(this.keepNative);

		// XXX: Temporary workaround for issue 785. Turn off autocorrect and
		//      autocomplete since the popup they use can't be dismissed by
		//      the user. Note that we test for the presence of the feature
		//      by looking for the autocorrect property on the input element.

		var textInputs = allControls.filter( "input[type=text]" );
		if (textInputs.length && typeof textInputs[0].autocorrect !== "undefined") {
			textInputs.each(function(){
				// Set the attribute instead of the property just in case there
				// is code that attempts to make modifications via HTML.
				this.setAttribute("autocorrect", "off");
				this.setAttribute("autocomplete", "off");
			});
		}

		// enchance form controls
		nonNativeControls
			.filter( "[type='radio'], [type='checkbox']" )
			.checkboxradio();

		nonNativeControls
			.filter( "button, [type='button'], [type='submit'], [type='reset'], [type='image']" )
			.button();

		nonNativeControls
			.filter( "input, textarea" )
			.not( "[type='radio'], [type='checkbox'], [type='button'], [type='submit'], [type='reset'], [type='image'], [type='hidden']" )
			.textinput();

		nonNativeControls
			.filter( "input, select" )
			.filter( ":jqmData(role='slider'), :jqmData(type='range')" )
			.slider();

		nonNativeControls
			.filter( "select:not(:jqmData(role='slider'))" )
			.selectmenu();
	}
});

})( jQuery );
