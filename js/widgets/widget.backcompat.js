//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for checkboxes/radio buttons.
//>>label: Backcompat option setting code
//>>group: Backcompat
//>>css.structure: ../css/structure/jquery.mobile.forms.checkboxradio.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../ns",
	"jquery-ui/widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
( function( $, undefined ) {

	if ( $.mobileBackcompat !== false ) {

		var classSplitterRegex = /\S+/g,

			// splice() is incapable of removing the first element, because specifying a negative
			// starting index is interpreted as wanting to count from the end of the array. So, we use
			// shift() to remove the first element
			removeFromArray = function( array, index ) {
				index--;

				if ( index === -1 ) {
					array.shift();
				} else {
					array = array.splice( index, 1 );
				}

				return array;
			};

		$.mobile.widget = $.extend( {}, { backcompat: {

				_boolOptions: {
					inline: "ui-button-inline",
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
								if ( valueArray.indexOf( className ) !== -1 ) {
									that.options[ option ] = true;
								} else {
									that.options[ option ] = false;
								}
							}
						} );
					}
				},

				_optionsToClasses: function( option, value ) {
					var classArray,
						prop = this.classProp,
						classes = this.options.classes,
						className = this._boolOptions[ option ];

					if ( prop ) {
						classArray = classes[ prop ].match( classSplitterRegex ) || [];

						if ( value ) {
							classArray.push( className );
						} else {
							classArray = removeFromArray( classArray,
								classArray.indexOf( this._boolOptions[ option ] ) );
						}
						this.option( "classes." + prop, classArray.join( " " ) );
					}
				},

				_setInitialOptions: function() {
					var currentClasses,
						options = this.options,
						original = $[ this.namespace ][ this.widgetName ].prototype.options,
						prop = this.classProp;

					if ( prop && typeof original.classes[ prop ] === "string" &&
							typeof this.options.classes[ prop ] === "string" ) {
						currentClasses = this.options.classes[ prop ].match( classSplitterRegex ) || [];

						// If the classes option value has diverged from the default, then its value takes
						// precedence, causing us to update all the style options to reflect the contents
						// of the classes option value
						if ( original.classes[ prop ] !== this.options.classes[ prop ] ) {
							$.each( this._boolOptions, function( option, className ) {
								if ( options[ option ] !== undefined ) {
									options[ option ] = ( currentClasses.indexOf( className ) !== -1 );
								}
							} ) ;

						// Otherwise we assume that we're dealing with legacy code and look for style
						// option values which diverge from the defaults. If we find any that diverge, we
						// update the classes option value accordingly.
						} else {
							$.each( this._boolOptions, function( option, className ) {
								if ( options[ option ] !== original[ option ] ) {
									if ( options[ option ] ) {
										currentClasses.push( className );
									} else {
										currentClasses = removeFromArray( currentClasses,
											currentClasses.indexOf( className ) );
									}
								}
							} );

							options.classes[ prop ] = currentClasses.join( " " );
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
	}

} )( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
} );
//>>excludeEnd("jqmBuildExclude");
