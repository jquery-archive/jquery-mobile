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
		corners: true,
		shadow: true,
		iconshadow: false, /* TODO: Deprecated in 1.4, remove in 1.5. */
		overlayTheme: null,
		dividerTheme: null,
		hidePlaceholderMenuItems: true,
		closeText: "Close",
		nativeMenu: true,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		mini: false,
		enhanced: false
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton : function() {
		var self = this;

		setTimeout( function() {
			self.button.focus();
		}, 40);
	},

	_selectOptions: function() {
		return this.select.find( "option" );
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

	_button: function () {
		return $( "<div/>" );
	},

	_enhance: function () {
		// setup items that are generally necessary for select menu extension
		var classes,
			o = this.options,
			el = this.element[0],
			iconpos = o.icon ? ( o.iconpos || el.getAttribute( "data-iconpos" ) ) : false;

		// TODO: move all(?) classes on wrapper or only ui-btn-left/right?
		classes = el.className +
			(o.mini || el.getAttribute( "data-mini" )) ? " ui-mini" : "" +
			(o.inline || el.getAttribute( "data-inline" )) ? " ui-btn-inline" : "";

		this.select = this.element.removeClass( "ui-btn-left ui-btn-right" ).wrap( "<div class='ui-select" + classes + "'>" );
		this.selectId  = this.select.attr( "id" ) || ( "select-" + this.uuid );
		this.buttonId = this.selectId + "-button";
		this.label = $( "label[for='"+ this.selectId +"']" );

		this.button = this._button()
			.insertBefore( this.select )
			.attr( "id", this.buttonId )
			.addClass( "ui-btn" +
				( o.icon ? ( " ui-icon-" + o.icon + " ui-btn-icon-" + iconpos +
				( o.iconshadow ? " ui-shadow-icon" : "" ) ) : "" ) + /* TODO: Remove in 1.5. */
				( o.theme ? " ui-btn-" + o.theme : "" ) +
				( o.corners ? " ui-corner-all" : "" ) +
				( o.shadow ? " ui-shadow" : "" ) );

		// Add button text placeholder
		this.buttonText = $ ( "<span>" )
			.appendTo( this.button );

		this._setMultiple();

		// Add counter for multi selects
		if ( this.isMultiple ) {
			this.buttonCount = $( "<span>" )
				.addClass( "ui-li-count ui-body-inherit" )
				.hide()
				.appendTo( this.button.addClass( "ui-li-has-count" ) );
		}
	},

	_setMultiple: function () {
		// TODO: are multiples supported in regular select?
		this.isMultiple = this.select[ 0 ].multiple;
	},

	_create: function() {
		var self = this,
			o = this.options;

		if (o.enhanced) {
			this.button = this.element.parent();
			this.select = this.element;
			this.selectId = this.select[0].id;
			this.buttonId = this.button[0].id;
			this.label = this.element.prev("label");
			this.buttonText = this.button.find("span").first();

			this._setMultiple();

			if (this.isMultiple) {
				this.buttonCount = this.button.find("span").last();
			}
		} else {
			this._enhance();
		}

		this.setButtonText();

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( o.nativeMenu && window.opera && window.opera.version ) {
			this.button.addClass( "ui-select-nativeonly" );
		}

		// Disable if specified
		if ( o.disabled || this.element.attr( "disabled" )) {
			this.disable();
		}

		// Events on native select
		this.select.change(function() {
			self.refresh();

			if ( !!o.nativeMenu ) {
				this.blur();
			}
		});

		this._handleFormReset();

		this._on( this.button, {
			keydown: "_handleKeydown"
		});

		this.build();
	},

	build: function() {
		var self = this;

		this.select
			.appendTo( self.button )
			.bind( "vmousedown", function() {
				// Add active class to button
				self.button.addClass( $.mobile.activeBtnClass );
			})
			.bind( "focus", function() {
				self.button.addClass( $.mobile.focusClass );
			})
			.bind( "blur", function() {
				self.button.removeClass( $.mobile.focusClass );
			})
			.bind( "focus vmouseover", function() {
				self.button.trigger( "vmouseover" );
			})
			.bind( "vmousemove", function() {
				// Remove active class on scroll/touchmove
				self.button.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur vmouseout", function() {
				self.button.trigger( "vmouseout" )
					.removeClass( $.mobile.activeBtnClass );
			});

		// In many situations, iOS will zoom into the select upon tap, this prevents that from happening
		self.button.bind( "vmousedown", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.label.bind( "click focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.select.bind( "focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.button.bind( "mouseup", function() {
			if ( self.options.preventFocusZoom ) {
				setTimeout(function() {
					$.mobile.zoom.enable( true );
				}, 0 );
			}
		});
		self.select.bind( "blur", function() {
			if ( self.options.preventFocusZoom ) {
				$.mobile.zoom.enable( true );
			}
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
			span = this.buttonText;

		this.button.children( "span" ).not( ".ui-li-count" ).remove().end().end().prepend( (function() {
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
			return this.buttonText = span
				.addClass( self.select.attr( "class" ) )
				.addClass( selected.attr( "class" ) )
				.removeClass( "ui-screen-hidden" );
		})());
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	_handleKeydown: function( /* event */ ) {
		this._delay( "_refreshButton" );
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
