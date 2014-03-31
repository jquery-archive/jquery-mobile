//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native select menus. Tapping opens a native select menu.
//>>label: Selects
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.select.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../core", "../../widget", "../../zoom", "./reset" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.selectmenu", $.extend( {
	initSelector: "select:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",

	options: {
		theme: null,
		icon: "carat-d",
		iconpos: "right",
		inline: false,
		enhanced: false,
		corners: true,
		shadow: true,
		hidePlaceholderMenuItems: true,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		mini: false
	},

	_button: function() {
		var iconpos = this.options.icon ? this.options.iconpos : false;
		return $( "<div/>" ).attr( "id", this.buttonId )
			.addClass( "ui-btn" +
				( this.options.icon ? ( " ui-icon-" + this.options.icon + " ui-btn-icon-" + iconpos ) :	"" ) + /* TODO: Remove in 1.5. */
				( this.options.theme ? " ui-btn-" + this.options.theme : "" ) +
				( this.options.corners ? " ui-corner-all" : "" ) +
				( this.options.shadow ? " ui-shadow" : "" ) );;
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_selectOptions: function() {
		return this.element.find( "option" );
	},

	// Checks if the device is using a softkeyboard to display multiple selects
	// multiple selects on desktop are at least 4 selections high but on mobile are the same as
	// a dropdown select
	_isSoft: function() {
		var testElement = this.element.clone();

		testElement.css({
			"height": "auto",
			"max-height": "10000px",
			"min-height": "0",
			"position": "absolute",
			"top":"-900000px"
		});
		$( "body" ).append( testElement );
		this.isSoft = ( testElement.height() < 40 );
		testElement.remove();
		return this;
	},

	_makeMultiple: function() {
		if( !this.isSoft ) {
			this.isOpen = false;
			this._on( this.button, {
				"click": "_toggleMultiple"
			});
		}
		this.buttonCount = $( "<span>" )
			.addClass( "ui-li-count ui-body-inherit" )
			.hide()
			.appendTo( this.button.addClass( "ui-li-has-count" ) );
	},
	_toggleMultiple: function( event ) {
		if ( this.options.disabled || this.isOpen ) {
			return;
		}
		if (event.type === "click" ||
			event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER ||
			event.keyCode === $.mobile.keyCode.SPACE)) {
				this.isOpen = true;
				this.element.css({
					"opacity": "1"
				});
				this.element.css({
					"height": "auto",
					"max-height": "10000px",
					"min-height": "0"
				});
				this.button.innerHeight( this.element.height() );
				this.element.focus();
				this._on( this.document, {
					"click": "_closeMultiple",
				});
			}
	},

	_closeMultiple: function() {
		if( event.target.nodeName !== "OPTION" ){
			this.isOpen = false;
			this.element.css({
				"opacity":"0",
				"height":"auto",
				"max-height": "100%"
			});
			this.button.height( "auto" );
			this._off( this.document, "click" );
		}
	},

	// setup items that are generally necessary for select menu extension
	_preExtension: function() {
		this.selectId  = this.element.attr( "id" ) || ( "select-" + this.uuid );
		this.buttonId = this.selectId + "-button";
		this.label = $( "label[for='"+ this.selectId +"']" );
		this.isMultiple = this.element[0].multiple;
	},

	_destroy: function() {
		var wrapper = this.element.parents( ".ui-select" );
		if ( wrapper.length > 0 ) {
			if ( wrapper.is( ".ui-btn-left, .ui-btn-right" ) ) {
				this.element.addClass( wrapper.hasClass( "ui-btn-left" ) ? "ui-btn-left" : "ui-btn-right" );
			}
			this.element.insertAfter( wrapper );
			wrapper.remove();
		}
	},

	_enhance: function(){
		var classes = "";

		if ( this.options.inline ) {
			classes += " ui-btn-inline";
		}
		if ( this.options.mini ) {
			classes += " ui-mini";
		}

		this.element.wrap( "<div class='ui-select" + classes + "'>" );
		this.button = this._button().insertBefore( this.element );

		this.setButtonText();

		// Disable if specified
		if ( this.options.disabled ) {
			this.disable();
		}

	},

	_create: function() {
		this._preExtension();

		if( !this.options.enhanced ) {
			this._enhance();
		}

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( this.options.nativeMenu && window.opera && window.opera.version ) {
			this.button.addClass( "ui-select-nativeonly" );
		}

		this._handleFormReset();

		this.build();
		if( this.element[0].multiple ){
			this._on( this.window, {
				"load": function(){
						this._isSoft();
						this._makeMultiple();
				}
			});
		}
	},

	_handleSelectOut: function() {
		this.button.trigger( "vmouseout" ).removeClass( $.mobile.activeBtnClass );
	},

	_preventFocusZoom: function( event ) {
		if ( this.options.preventFocusZoom ) {
			if( event.type === "mouseup" ){
				setTimeout(function() {
					$.mobile.zoom.enable( true );
				}, 0 );
				return;
			} else if ( event.type === "blur" ) {
				$.mobile.zoom.enable( true );
				return;
			}

			$.mobile.zoom.disable( true );
		}
	},

	build: function() {

		this.element.appendTo( this.button );

		this._on({
			"vmousedown": function(){
				// Add active class to button
				this.button.addClass( $.mobile.activeBtnClass );
			},
			"focus": function( event ) {
				this.button.addClass( $.mobile.focusClass );
				this.button.trigger( "vmouseover" );
				this._preventFocusZoom( event );
			},
			"vmouseover": function(){
				this.button.trigger( "vmouseover" );
			},
			"blur": function( event ) {
				this.button.removeClass( $.mobile.focusClass );
				this._handleSelectOut();
				this._preventFocusZoom( event );
				if( this.isOpen ){
					this._closeMultiple();
				}
			},
			"vmousemove": function() {
				// Remove active class on scroll/touchmove
				this.button.removeClass( $.mobile.activeBtnClass );
			},
			"change": function() {
				this.refresh();
				if ( this.options.nativeMenu && !this.isMultiple ) {
					this.element.blur();
				}
				this._handleSelectOut();
			},
			"vmouseout": "_handleSelectOut"
		});
		// In many situations, iOS will zoom into the select upon tap, this prevents that from happening
		this._on( this.button, {
			"vmousedown": "_preventFocusZoom",
			"vmouseup": "_preventFocusZoom",
			"keydown": "_handleKeydown"
		});
		this._on( this.label, {
			"click": "_preventFocusZoom",
			"focus": "_preventFocusZoom"
		});

	},

	selected: function() {
		return this._selectOptions().filter( ":selected" );
	},

	selectedIndices: function() {
		var self = this;

		return this.selected().map(function() {
			return self._selectOptions().index( this );
		}).get();
	},

	setButtonText: function() {
		var self = this,
			selected = this.selected(),
			text = this.placeholder,
			span = $( "<span/>" );

		this.button.children( "span" ).not( ".ui-li-count" ).remove().end().end().prepend(function() {
			if ( selected.length ) {
				text = selected.map(function() {
					return $( this ).text();
				}).get().join( ", " );
			} else {
				text = self.placeholder;
			}

			if ( text ) {
				span.text( text );
			} else {

				// Set the contents to &nbsp; which we write as &#160; to be XHTML compliant - see gh-6699
				span.html( "&#160;" );
			}

			// TODO possibly aggregate multiple select option classes
			return span;
		});
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	_handleKeydown: function( event ) {
		this._delay( "_refreshButton" );
		if ( this.isMultiple ) {
			this._toggleMultiple( event );
		}
	},

	_reset: function() {
		this.refresh();
	},

	_refreshButton: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	refresh: function() {
		this._refreshButton();
	},

	// open and close preserved in native selects
	// to simplify users code when looping over selects
	open: $.noop,
	close: $.noop,

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-state-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-state-disabled" );
	}
}, $.mobile.behaviors.formReset ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
