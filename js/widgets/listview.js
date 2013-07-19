//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies listview styling of various types (standard, numbered, split button, etc.)
//>>label: Listview
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.listview.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "./addFirstLastClasses", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var getAttr = $.mobile.getAttribute;

$.widget( "mobile.listview", $.extend( {

	options: {
		theme: null,
		countTheme: null,
		dividerTheme: null,
		icon: "carat-r",
		splitIcon: "carat-r",
		splitTheme: null,
		corners: true,
		shadow: true,
		inset: false
	},

	_create: function() {
		var t = this,
			listviewClasses = "";

		listviewClasses += t.options.inset ? " ui-listview-inset" : "";

		if ( !!t.options.inset ) {
			listviewClasses += t.options.corners ? " ui-corner-all" : "";
			listviewClasses += t.options.shadow ? " ui-shadow" : "";
		}

		// create listview markup
		t.element.addClass( " ui-listview" + listviewClasses );

		t.refresh( true );
	},

	// TODO: Remove in 1.5
	_findFirstElementByTagName: function( ele, nextProp, lcName, ucName ) {
		var dict = {};
		dict[ lcName ] = dict[ ucName ] = true;
		while ( ele ) {
			if ( dict[ ele.nodeName ] ) {
				return ele;
			}
			ele = ele[ nextProp ];
		}
		return null;
	},
	// TODO: Remove in 1.5
	_addThumbClasses: function( containers ) {
		var i, img, len = containers.length;
		for ( i = 0; i < len; i++ ) {
			img = $( this._findFirstElementByTagName( containers[ i ].firstChild, "nextSibling", "img", "IMG" ) );
			if ( img.length ) {
				$( this._findFirstElementByTagName( img[ 0 ].parentNode, "parentNode", "li", "LI" ) ).addClass( img.hasClass( "ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
			}
		}
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

	refresh: function( create ) {
		var buttonClass, pos, numli, item, itemClass, itemTheme, itemIcon, icon, a,
			isDivider, startCount, newStartCount, value, last, splittheme, spliticon,
			altButtonClass, dividerTheme,
			o = this.options,
			$list = this.element,
			li = this._getChildrenByTagName( $list[ 0 ], "li", "LI" ),
			ol = !!$.nodeName( $list[ 0 ], "ol" ),
			start = $list.attr( "start" ),
			itemClassDict = {},
			countBubbles = $list.find( ".ui-li-count" ),
			countTheme = getAttr( $list[ 0 ], "counttheme", true ) || this.options.countTheme,
			countThemeClass = countTheme ? "ui-body-" + countTheme : false;

		if ( o.theme ) {
			$list.addClass( "ui-group-theme-" + o.theme );
		}

		// Check if a start attribute has been set while taking a value of 0 into account
		if ( ol && ( start || start === 0 ) ) {
			startCount = parseInt( start, 10 ) - 1;
			$list.css( "counter-reset", "listnumbering " + startCount );
		}

		for ( pos = 0, numli = li.length; pos < numli; pos++ ) {
			item = li.eq( pos );
			itemClass = "";

			if ( create || item[ 0 ].className.search( /\bui-li-static\b|\bui-li-divider\b/ ) < 0 ) {
				a = this._getChildrenByTagName( item[ 0 ], "a", "A" );
				isDivider = ( getAttr( item[ 0 ], "role", true ) === "list-divider" );
				value = item.attr( "value" );
				itemTheme = getAttr( item[ 0 ], "theme", true );

				if ( a.length && a[ 0 ].className.search( /\bui-btn\b/ ) < 0 && !isDivider ) {
					itemIcon = getAttr( item[ 0 ], "icon", true );
					icon = ( itemIcon === false ) ? false : ( itemIcon || o.icon );

					// TODO: Remove in 1.5 together with links.js (links.js / .ui-link deprecated in 1.4)
					a.removeClass( "ui-link" );

					buttonClass = "ui-btn";

					if ( itemTheme ) {
						buttonClass += " ui-btn-" + itemTheme;
					}

					if ( a.length > 1 ) {
						itemClass = "ui-li-has-alt";

						last = a.last();
						splittheme = getAttr( last[ 0 ], "theme", true ) || o.splitTheme || getAttr( item[ 0 ], "theme", true );
						spliticon = getAttr( last[ 0 ], "icon", true ) || getAttr( item[ 0 ], "icon", true ) || o.splitIcon;
						altButtonClass = splittheme ? "ui-btn ui-btn-" + splittheme + " ui-icon-" + spliticon : "ui-btn ui-icon-" + spliticon;

						last
							.attr( "title", $.trim( last.getEncodedText() ) )
							.addClass( altButtonClass )
							.empty();
					} else if ( icon ) {
						buttonClass += " ui-icon-" + icon;
					}

					a.first().addClass( buttonClass );
				} else if ( isDivider ) {
					dividerTheme = ( getAttr( item[ 0 ], "theme", true ) || o.dividerTheme || o.theme );

					itemClass = "ui-li-divider ui-bar-" + ( dividerTheme ? dividerTheme : "inherit" );

					item.attr( "role", "heading" );
				} else if ( a.length <= 0 ) {
					itemClass = "ui-li-static ui-body-" + ( itemTheme ? itemTheme : "inherit" );
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
			$( itemClassDict[ itemClass ] ).addClass( itemClass );
		}

		countBubbles.each( function() {
			$( this ).closest( "li" ).addClass( "ui-li-has-count" );
		});
		if ( countThemeClass ) {
			countBubbles.addClass( countThemeClass );
		}

		// Deprecated in 1.4. From 1.5 you have to add class ui-li-has-thumb or ui-li-has-icon to the LI.
		this._addThumbClasses( li );
		this._addThumbClasses( li.find( ".ui-btn" ) );

		this._addFirstLastClasses( li, this._getVisibles( li, create ), create );
		// autodividers binds to this to redraw dividers after the listview refresh
		this._trigger( "afterrefresh" );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

$.mobile.listview.initSelector = ":jqmData(role='listview')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.listview" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
