//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Deprecated popup features
//>>label: Popups
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.popup.css,../css/structure/jquery.mobile.transition.css,../css/structure/jquery.mobile.transition.fade.css

define( [
	"jquery",
	"./popup.backcompat",
	"./popup.arrow" ], function( jQuery ) {

//>>excludeEnd("jqmBuildExclude");

( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	var classSplitterRegex = /\S+/g,
		toggleClass = function( classValue, oneClass, add ) {
			var index;

			classValue = classValue.match( classSplitterRegex ) || [];
			index = $.inArray( oneClass, classValue );

			if ( add && index === -1 ) {
				classValue.push( oneClass );
			} else if ( !add && index >= 0 ) {
				if ( index === 0 ) {
					classValue.shift();
				} else {
					classValue = classValue.splice( index - 1, 1 );
				}
			}

			return classValue.join( " " );
		};

	$.widget( "mobile.popup", $.mobile.popup, {
		_setInitialOptions: function() {
			var classes = this.options.classes;

			this._super();

			// If the value for the ui-popup-arrow class key has not changed we assume we're
			// dealing with legacy code, so we make sure the presence of the ui-overlay-shadow
			// class in the ui-popup-arrow key reflects the value of the "shadow" option.
			if ( classes[ "ui-popup-arrow" ] ===
					$[ this.namespace ][ this.widgetName ].prototype.options
						.classes[ "ui-popup-arrow" ] ) {

				classes[ "ui-popup-arrow" ] = toggleClass( classes[ "ui-popup-arrow" ],
					"ui-overlay-shadow", this.options.shadow );
			}
		},

		_optionsToClasses: function( option, value ) {
			this._super( option, value );

			if ( option === "shadow" ) {
				this.option( "classes.ui-popup-arrow",
					toggleClass( this.options.classes[ "ui-popup-arrow" ], "ui-overlay-shadow",
						value ) );
			}
		}
	} );

}

} )( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

