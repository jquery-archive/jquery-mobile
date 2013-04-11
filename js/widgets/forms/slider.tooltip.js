//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Slider tooltip extension
//>>label: Slidertooltip
//>>group: Forms
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.slider.tooltip.css

define( [ "jquery", "./slider" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var popup;

function getPopup() {
	if ( !popup ) {
		popup = $( "<div></div>", {
			"class": "ui-slider-popup ui-shadow ui-corner-all"
		});
	}
	return popup.clone();
}

$.widget( "mobile.slider", $.mobile.slider, {
	options: {
		popupEnabled: false,
		showValue: false
	},

	_create: function() {
		this._super();

		$.extend( this, {
			_currentValue: null,
			_popup: null,
			_popupVisible: false,
			_handleText: this.handle.find( ".ui-btn-text" )
		});

		this._setOption( "popupEnabled", this.options.popupEnabled );

		this._on( this.handle, { "vmousedown" : "_showPopup" } );
		this._on( this.slider.add( $.mobile.document ), { "vmouseup" : "_hidePopup" } );
		this._refresh();
	},

	// position the popup centered 5px above the handle
	_positionPopup: function() {
		var dstOffset = this.handle.offset();

		this._popup.offset( {
			left: dstOffset.left + ( this.handle.width() - this._popup.width() ) / 2,
			top: dstOffset.top - this._popup.outerHeight() - 5
		});
	},

	_setOption: function( key, value ) {
		this._super( key, value );

		if ( key === "showValue" ) {
			if ( value ) {
				this._handleText.html( this._value() ).show();
			} else {
				this._handleText.hide();
			}
		} else if ( key === "popupEnabled" ) {
			if ( value && !this._popup ) {
				this._popup = getPopup()
					.addClass( "ui-body-" + ( this.options.theme || $.mobile.getInheritedTheme( this.element, "c" ) ) )
					.insertBefore( this.element );
			}
		}
	},

	// show value on the handle and in popup
	refresh: function() {
		this._super.apply( this, arguments );
		this._refresh();
	},

	_refresh: function() {
		var o = this.options, newValue;

		if ( o.popupEnabled ) {
			// remove the title attribute from the handle (which is
			// responsible for the annoying tooltip); NB we have
			// to do it here as the jqm slider sets it every time
			// the slider's value changes :(
			this.handle.removeAttr( "title" );
		}

		newValue = this._value();
		if ( newValue === this._currentValue ) {
			return;
		}
		this._currentValue = newValue;

		if ( o.popupEnabled && this._popup ) {
			this._positionPopup();
			this._popup.html( newValue );
		}

		if ( o.showValue && this._handleText ) {
			this._handleText.html( newValue );
		}
	},

	_showPopup: function() {
		if ( this.options.popupEnabled && !this._popupVisible ) {
			this._handleText.hide();
			this._popup.show();
			this._positionPopup();
			this._popupVisible = true;
		}
	},

	_hidePopup: function() {
		if ( this.options.popupEnabled && this._popupVisible ) {
			this._handleText.show();
			this._popup.hide();
			this._popupVisible = false;
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
