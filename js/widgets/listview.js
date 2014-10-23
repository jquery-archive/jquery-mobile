//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies listview styling of various types (standard, numbered, split button, etc.)
//>>label: Listview
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.listview.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../widget",
	"./optionsToClasses",
	"./addFirstLastClasses" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var getAttr = $.mobile.getAttribute,
	styleOptions = {
		corners: true,
		shadow: true,
		inset: false
	};

$.widget( "mobile.listview", $.extend( {

	options: $.extend({
		classes: {
			"ui-listview": "",
			"ui-listview-item": "",
			"ui-listview-item-static": "",
			"ui-listview-item-has-alt": "",
			"ui-listview-item-divider": ""
		},
		theme: null,
		dividerTheme: null,
		icon: "carat-r",
		splitIcon: "carat-r",
		splitTheme: null
	}, styleOptions ),

	_create: function() {

		// DEPRECATED as of 1.5.0. Will be removed in 1.6.0
		// Update classes option to reflect style option values
		this._updateClassesOption( styleOptions, this.options );

		// create listview markup
		this.element.addClass( this._classes( "ui-listview" ) );

		this.refresh( true );
	},

	// DEPRECATED as of 1.5.0. Will be removed in 1.6.0
	// Update classes option to reflect style option values
	_optionsToClasses: function( oldOptions, newOptions ) {
		var isInset = oldOptions.inset || newOptions.inset,
			newClasses = {},
			oldClasses = {};

		if ( this._booleanOptionToClass( newOptions.corners, "ui-corner-all",
			oldClasses, newClasses, newOptions.corners && isInset ) ||
			this._booleanOptionToClass( newOptions.shadow, "ui-shadow",
				oldClasses, newClasses, newOptions.shadow && isInset ) ||
			this._booleanOptionToClass( newOptions.inset, "ui-listview-inset",
				oldClasses, newClasses ) ) {

			this.options.classes[ "ui-listview" ] =
				this._calculateClassKeyValue( this.options.classes[ "ui-listview" ],
					oldClasses, newClasses );
		}
	},

	_elementsFromClassKey: function( classKey ) {
		switch( classKey ) {
			case "ui-listview":
				return this.element;

			case "ui-listview-item":
				return this.element.children();

			case "ui-listview-item-static":
			case "ui-listview-item-has-alt":
			case "ui-listview-item-divider":
				return this.element.children( "." + classKey );

			default:
				return this._superApply( arguments );
		}
	},

	// Deprecated as of 1.5.0 and will be removed in 1.6.0. Update style option values to reflect
	// the presence/absence of the corresponding class in the classes option
	_setOptions: function( newOptions ) {
		var classHash;

		if ( newOptions.classes !== undefined && newOptions.classes[ "ui-listview" ] ) {
			classHash = this._convertClassesToHash( newOptions.classes[ "ui-listview" ] );

			this.options.corners = !!classHash[ "ui-corner-all" ];
			this.options.inset = !!classHash[ "ui-listview-inset" ];
			this.options.shadow = !!classHash[ "ui-shadow" ];
		}

		return this._superApply( arguments );
	},

	_getChildrenByTagName: function( ele, lcName, ucName ) {
		var results = [],
			dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		ele = ele.firstChild;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				results.push( ele );
			}
			ele = ele.nextSibling;
		}
		return $( results );
	},

	_beforeListviewRefresh: $.noop,
	_afterListviewRefresh: $.noop,

	refresh: function( create ) {
		var buttonClass, pos, numli, item, itemClass, itemTheme, itemIcon, icon, a,
			isDivider, startCount, newStartCount, value, last, splittheme, splitThemeClass, spliticon,
			altButtonClass, dividerTheme, li,
			baseItemClass = this._classes( "ui-listview-item" ),
			hasAltClass = this._classes( "ui-listview-item-has-alt" ),
			staticClass = this._classes( "ui-listview-item-static" ),
			dividerClass = this._classes( "ui-listview-item-divider" ),
			o = this.options,
			$list = this.element,
			ol = !!$.nodeName( $list[ 0 ], "ol" ),
			start = $list.attr( "start" ),
			itemClassDict = {},
			countBubbles = $list.find( ".ui-listview-item-count-bubble" );

		if ( o.theme ) {
			$list.addClass( "ui-group-theme-" + o.theme );
		}

		// Check if a start attribute has been set while taking a value of 0 into account
		if ( ol && ( start || start === 0 ) ) {
			startCount = parseInt( start, 10 ) - 1;
			$list.css( "counter-reset", "listnumbering " + startCount );
		}

		this._beforeListviewRefresh();

		li = this._getChildrenByTagName( $list[ 0 ], "li", "LI" );

		for ( pos = 0, numli = li.length; pos < numli; pos++ ) {
			item = li.eq( pos );
			itemClass = "";

			if ( create || item[ 0 ].className.search( /\bui-listview-item-static\b|\bui-listview-item-divider\b/ ) < 0 ) {
				a = this._getChildrenByTagName( item[ 0 ], "a", "A" );
				isDivider = ( getAttr( item[ 0 ], "role" ) === "list-divider" );
				value = item.attr( "value" );
				itemTheme = getAttr( item[ 0 ], "theme" );

				if ( a.length && a[ 0 ].className.search( /\bui-btn\b/ ) < 0 && !isDivider ) {
					itemIcon = getAttr( item[ 0 ], "icon" );
					icon = ( itemIcon === false ) ? false : ( itemIcon || o.icon );

					buttonClass = "ui-btn";

					if ( itemTheme ) {
						buttonClass += " ui-btn-" + itemTheme;
					}

					if ( a.length > 1 ) {
						itemClass = hasAltClass;

						last = a.last();
						splittheme = getAttr( last[ 0 ], "theme" ) || o.splitTheme || getAttr( item[ 0 ], "theme", true );
						splitThemeClass = splittheme ? " ui-btn-" + splittheme : "";
						spliticon = getAttr( last[ 0 ], "icon" ) || getAttr( item[ 0 ], "icon" ) || o.splitIcon;
						altButtonClass = "ui-btn ui-btn-icon-notext ui-icon-" + spliticon + splitThemeClass;

						last
							.attr( "title", $.trim( last.getEncodedText() ) )
							.addClass( altButtonClass )
							.empty();

						// Reduce to the first anchor, because only the first gets the buttonClass
						a = a.first();
					} else if ( icon ) {
						buttonClass += " ui-btn-icon-right ui-icon-" + icon;
					}

					// Apply buttonClass to the (first) anchor
					a.addClass( buttonClass );
				} else if ( isDivider ) {
					dividerTheme = ( getAttr( item[ 0 ], "theme" ) || o.dividerTheme || o.theme );

					itemClass = dividerClass + " ui-bar-" + ( dividerTheme ? dividerTheme : "inherit" );

					item.attr( "role", "heading" );
				} else if ( a.length <= 0 ) {
					itemClass = staticClass + " ui-body-" + ( itemTheme ? itemTheme : "inherit" );
				}
				if ( ol && value ) {
					newStartCount = parseInt( value , 10 ) - 1;

					item.css( "counter-reset", "listnumbering " + newStartCount );
				}
			}

			// Instead of setting item class directly on the list item
			// at this point in time, push the item into a dictionary
			// that tells us what class to set on it so we can do this after this
			// processing loop is finished.

			if ( !itemClassDict[ itemClass ] ) {
				itemClassDict[ itemClass ] = [];
			}

			itemClassDict[ itemClass ].push( item[ 0 ] );
		}

		// Set the appropriate listview item classes on each list item.
		// The main reason we didn't do this
		// in the for-loop above is because we can eliminate per-item function overhead
		// by calling addClass() and children() once or twice afterwards. This
		// can give us a significant boost on platforms like WP7.5.

		for ( itemClass in itemClassDict ) {
			$( itemClassDict[ itemClass ] ).addClass( itemClass +
				( itemClass ? " " : "" ) +
				baseItemClass );
		}

		countBubbles.each( function() {
			$( this ).closest( "li" ).addClass( "ui-li-has-count" );
		});

		this._afterListviewRefresh();

		this._addFirstLastClasses( li, this._getVisibles( li, create ), create );
	}
}, $.mobile.behaviors.addFirstLastClasses, $.mobile.behaviors._optionsToClasses ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
