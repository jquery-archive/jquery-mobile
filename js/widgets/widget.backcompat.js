/*!
 * jQuery Mobile Widget Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Backcompat option setting code
//>>group: Backcompat
//>>description: Synchronize deprecated style options and the value of the classes option.

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../ns",
			"../widget",
			"jquery-ui/widget" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	var classSplitterRegex = /\S+/g;

	$.mobile.widget = $.extend( {}, { backcompat: {

		_boolOptions: {
			inline:  "ui-button-inline",
			mini: "ui-mini",
			shadow: "ui-shadow",
			corners: "ui-corner-all"
		},

		_create: function() {
			this._setInitialOptions();
			this._super();
			if ( !this.options.enhanced && this.options.wrapperClass ) {
				this._addClass( this.widget(), null, this.options.wrapperClass );
			}
		},

		_classesToOption: function( value ) {
			if ( this.classProp && ( typeof value[ this.classProp ] === "string" ) ) {
				var that = this,
					valueArray = value[ this.classProp ].match( classSplitterRegex ) || [];

				$.each( this._boolOptions, function( option, className ) {
					if ( that.options[ option ] !== undefined ) {
						if ( $.inArray( className, valueArray ) !== -1 ) {
							that.options[ option ] = true;
						} else {
							that.options[ option ] = false;
						}
					}
				} );
			}
		},

		_getClassValue: function( prop, optionClass, value ) {
			var classes = this.options.classes[ prop ] || "",
				classArray = classes.match( classSplitterRegex ) || [];

				if ( value ) {
					if ( $.inArray( optionClass, classArray ) === -1 ) {
						classArray.push( optionClass );
					}
				} else {
					classArray.splice( $.inArray( optionClass, classArray ), 1 );
				}
				return classArray.join( " " );
		},

		_optionsToClasses: function( option, value ) {
			var prop = this.classProp,
				className = this._boolOptions[ option ];

			if ( prop ) {
				this.option(
					"classes." + prop,
					this._getClassValue( prop, className, value )
				);
			}
		},

		_setInitialOptions: function() {
			var currentClasses,
				options = this.options,
				original = $[ this.namespace ][ this.widgetName ].prototype.options,
				prop = this.classProp,
				that = this;

			if ( prop ) {
				currentClasses =
					( options.classes[ prop ] || "" ).match( classSplitterRegex ) || [];

				// If the classes option value has diverged from the default, then its value takes
				// precedence, causing us to update all the style options to reflect the contents
				// of the classes option value
				if ( original.classes[ prop ] !== options.classes[ prop ] ) {
					$.each( this._boolOptions, function( option, className ) {
						if ( options[ option ] !== undefined ) {
							options[ option ] = ( $.inArray( className, currentClasses ) !== -1 );
						}
					} ) ;

				// Otherwise we assume that we're dealing with legacy code and look for style
				// option values which diverge from the defaults. If we find any that diverge, we
				// update the classes option value accordingly.
				} else {
					$.each( this._boolOptions, function( option, className ) {
						if ( options[ option ] !== original[ option ] ) {
							options.classes[ prop ] =
								that._getClassValue( prop, className, options[ option ] );
						}
					} );
				}
			}
		},

		_setOption: function( key, value ) {
			var widgetElement;

			// Update deprecated option based on classes option
			if ( key === "classes" ) {
				this._classesToOption( value );
			}

			// Update classes options based on deprecated option
			if ( this._boolOptions[ key ] ) {
				this._optionsToClasses( key, value );
			}

			// Update wrapperClass
			if ( key === "wrapperClass" ) {
				widgetElement = this.widget();
				this._removeClass( widgetElement, null, this.options.wrapperClass )
					._addClass( widgetElement, null, value );
			}

			this._superApply( arguments );
		}
	} }, $.mobile.widget );
} else {
	$.mobile.widget.backcompat = {};
}

return $.mobile.widget;

} );
