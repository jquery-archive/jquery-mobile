/*!
 * jQuery Mobile Slider Tooltip @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Slidertooltip
//>>group: Forms
//>>description: Slider tooltip extension
//>>docs: http://api.jquerymobile.com/slider/
//>>demos: http://demos.jquerymobile.com/@VERSION/slider-tooltip/
//>>css.structure: ../css/structure/jquery.mobile.forms.slider.tooltip.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./slider" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var popup;

function getPopup() {
	if ( !popup ) {
		popup = $( "<div></div>", {
			"class": "ui-slider-popup ui-shadow ui-corner-all"
		} );
	}
	return popup.clone();
}

return $.widget( "mobile.slider", $.mobile.slider, {
	options: {
		popupEnabled: false,
		showValue: false
	},

	_create: function() {
		this._super();

		$.extend( this, {
			_currentValue: null,
			_popup: null,
			_popupVisible: false
		} );

		this._setOption( "popupEnabled", this.options.popupEnabled );

		this._on( this.handle.add( this.slider ), { "vmousedown": "_showPopup" } );
		this._on( this.slider.add( this.document ), { "vmouseup": "_hidePopup" } );
		this._refresh();
	},

	// position the popup centered 5px above the handle
	_positionPopup: function() {
		var dstOffset = this.handle.offset();

		this._popup.offset( {
			left: dstOffset.left + ( this.handle.width() - this._popup.width() ) / 2,
			top: dstOffset.top - this._popup.outerHeight() - 5
		} );
	},

	_setOption: function( key, value ) {
		this._super( key, value );

		if ( key === "showValue" ) {
			this.handle.html( value && !this.options.mini ? this._value() : "" );
		} else if ( key === "popupEnabled" ) {
			if ( value && !this._popup ) {
				this._popup = getPopup()
					.addClass( "ui-body-" + ( this.options.theme || "a" ) )
					.hide()
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

		if ( o.showValue && !this.options.mini ) {
			this.handle.html( newValue );
		}
	},

	_showPopup: function() {
		if ( this.options.popupEnabled && !this._popupVisible ) {
			this._popup.show();
			this._positionPopup();
			this._popupVisible = true;
		}
	},

	_hidePopup: function() {
		var o = this.options;

		if ( o.popupEnabled && this._popupVisible ) {
			if ( o.showValue && !o.mini ) {
				this.handle.html( this._value() );
			}
			this._popup.hide();
			this._popupVisible = false;
		}
	}
} );

} );
