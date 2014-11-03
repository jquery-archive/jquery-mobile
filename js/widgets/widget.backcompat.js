//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for checkboxes/radio buttons.
//>>label: Backcompat option setting code
//>>group: Backcompat
//>>css.structure: ../css/structure/jquery.mobile.forms.checkboxradio.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery-ui/widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

if ( $.mobileBackcompat !== false ) {
	$.mobile.widget.backcompat = {

		_boolOptions: {
			inline:  "ui-button-inline",
			mini: "ui-mini",
			shadow: "ui-shadow",
			corners: "ui-corner-all"
		},

		_create: function() {
			this._setInitalOptions();
			this._super();
		},

		_enhance: function() {
			if ( !this.options.enhanced && this.options.wrapperClass ) {
				this.widget().addClass( this.options.wrapperClass );
			}

			this._super();
		},

		_classesToOption: function( value ) {
			if ( value[ this.classProp ] ) {
				var that = this,
					valueArray = value[ this.classProp ].split( " " );
				$.each( this._boolOptions, function( option, className ){
					if ( that.options[ option ] !== undefined ) {
						if ( valueArray.indexOf( className ) !== -1 ) {
							that.options[ option ] = true;
						} else {
							that.options[ option ] = false;
						}
					}
				});
			}
		},

		_optionsToClasses: function( option ) {
			var newValue = "",
				prop = this.classProp,
				classes = this.options.classes,
				classArray = classes[ prop ].split ( " " ),
				className = this._boolOptions[ option ];

			if ( this.options[ option ] ) {
				newValue = classes[ prop ] + " " + className;
			} else {
				newValue = classArray.splice( classArray.indexOf( prop ), 1 ).join( " " );
			}
			this.option( "classes." + prop, newValue );

		},

		_setInitalOptions: function() {
			var that = this,
				options = this.options,
				original = $[ this.namespace ][ this.widgetName ].prototype.options,
				originalClasses = original.classes[ this.classProp ].split( " " ),
				currentClasses = this.options.classes[ that.classProp ].split( " " );

			$.each( this._boolOptions, function( option, className ) {
				if( that.options[ option ] !== undefined ) {
					var initial = ( originalClasses.indexOf( className ) !== -1 ),
						current = ( currentClasses.indexOf( className ) !== -1 );

					if ( initial !== current ) {
						options[ option ] = current;
					} else if ( options[ option ] !== original[ option ] ) {
						that._optionsToClasses( option, options[ option ] );
					}
				}
			});
		},

		_setOption: function( key, value ) {

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
				this.widget().removeClass( this.options.wrapperClass ).addClass( value );
			}

			this._superApply( arguments );
		}
	};
}

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
