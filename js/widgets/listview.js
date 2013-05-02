//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies listview styling of various types (standard, numbered, split button, etc.)
//>>label: Listview
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.listview.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "./page.sections", "./addFirstLastClasses", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

//Keeps track of the number of lists per page UID
//This allows support for multiple nested list in the same page
//https://github.com/jquery/jquery-mobile/issues/1617
var listCountPerPage = {},
	getAttr = $.mobile.getAttribute;

$.widget( "mobile.listview", $.mobile.widget, $.extend( {

	options: {
		theme: null,
		countTheme: "a",
		headerTheme: "a",
		dividerTheme: "a",
		icon: "arrow-r",
		splitIcon: "arrow-r",
		splitTheme: "a",
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

	// This is a generic utility method for finding the first
	// node with a given nodeName. It uses basic DOM traversal
	// to be fast and is meant to be a substitute for simple
	// $.fn.closest() and $.fn.children() calls on a single
	// element. Note that callers must pass both the lowerCase
	// and upperCase version of the nodeName they are looking for.
	// The main reason for this is that this function will be
	// called many times and we want to avoid having to lowercase
	// the nodeName from the element every time to ensure we have
	// a match. Note that this function lives here for now, but may
	// be moved into $.mobile if other components need a similar method.
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

	_addThumbClasses: function( containers ) {
		var i, img, len = containers.length;
		for ( i = 0; i < len; i++ ) {
			img = $( this._findFirstElementByTagName( containers[ i ].firstChild, "nextSibling", "img", "IMG" ) );
			if ( img.length ) {
				img.addClass( "ui-li-thumb" );
				$( this._findFirstElementByTagName( img[ 0 ].parentNode, "parentNode", "li", "LI" ) ).addClass( img.hasClass( "ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
			}
		}
	},

	refresh: function( create ) {
		this.parentPage = this.element.closest( ".ui-page" );
		this._createSubPages();

		var o = this.options,
			$list = this.element,
			li = this._getChildrenByTagName( $list[ 0 ], "li", "LI" ),
			pos, numli,
			ol = !!$.nodeName( $list[ 0 ], "ol" ),
			start = $list.attr( "start" ),
			startCount, newStartCount, value,
			itemClassDict = {},
			item, itemClass, itemTheme, itemIcon, icon,
			a, isDivider;

		// Check if a start attribute has been set while taking a value of 0 into account
		if ( ol && ( start || start === 0 ) ) {
			startCount = parseInt( start, 10 ) - 1;
			$list.css( "counter-reset", "listnumbering " + startCount );
		}

		if ( !o.theme ) {
			o.theme = "a";
		}

		for ( pos = 0, numli = li.length; pos < numli; pos++ ) {
			item = li.eq( pos );
			itemClass = "ui-li";

			// If we're creating the element, we update it regardless
			if ( create || !item.hasClass( "ui-li" ) ) {
				a = this._getChildrenByTagName( item[ 0 ], "a", "A" );
				isDivider = ( getAttr( item[ 0 ], "role", true ) === "list-divider" );
				value = item.attr( "value" );
				itemTheme = getAttr( item[ 0 ], "theme", true ) || o.theme;


				if ( a.length && !isDivider ) {
					itemIcon = getAttr( item[ 0 ], "icon", true );
					icon = itemIcon === false ? false : ( itemIcon || o.icon );

					var buttonClass = "ui-btn ui-btn-" + itemTheme;
					
					if ( icon && ( a.length === 1 ) ) {
						itemClass += " ui-li-has-arrow";
						
						buttonClass += " ui-icon ui-btn-icon-right ui-icon-" + icon;
					}
					
					a.first().addClass( buttonClass );
					
					if ( ol && value ) {
						newStartCount = parseInt( value , 10 ) - 1;
						a.css( "counter-reset", "listnumbering " + newStartCount );
					}

					if ( a.length > 1 ) {
						itemClass += " ui-li-has-alt";
						
						var last = a.last(),
							splittheme = getAttr( last[ 0 ], "theme", true ) || o.splitTheme || getAttr( item[ 0 ], "theme", true ) || o.theme,
							spliticon = getAttr( last[ 0 ], "icon", true ) || o.splitIcon || getAttr( item[ 0 ], "icon", true ) || o.icon,
							splitButtonClass = "ui-btn ui-btn-" + splittheme + " ui-icon ui-icon-" + spliticon + " ui-btn-icon-notext ui-corner-all ui-shadow ui-icon-shadow";
						
						last.appendTo( item )
							.attr( "title", $.trim( last.getEncodedText() ) )
							.addClass( "ui-li-link-alt ui-btn ui-btn-" + itemTheme )
							.empty()
							.append(
								$( document.createElement( "div" ) )
									.addClass( splitButtonClass )
							);
					}
				} else if ( isDivider ) {
					itemClass += " ui-li-divider ui-bar-" + ( getAttr( item[ 0 ], "theme", true ) || o.dividerTheme );
					
					item.attr( "role", "heading" );

					if ( ol && ( start || start === 0 ) ) {
						newStartCount = parseInt( start , 10 ) - 1;
						item.css( "counter-reset", "listnumbering " + newStartCount );
					}
				} else {
					itemClass += " ui-li-static ui-fill-" + itemTheme;
					
					if ( ol && value ) {
						newStartCount = parseInt( value , 10 ) - 1;
						item.css( "counter-reset", "listnumbering " + newStartCount );
					}
				}
			}

			// Instead of setting item class directly on the list item and its
			// btn-inner at this point in time, push the item into a dictionary
			// that tells us what class to set on it so we can do this after this
			// processing loop is finished.

			if ( !itemClassDict[ itemClass ] ) {
				itemClassDict[ itemClass ] = [];
			}

			itemClassDict[ itemClass ].push( item[ 0 ] );
		}

		// Set the appropriate listview item classes on each list item
		// and their btn-inner elements. The main reason we didn't do this
		// in the for-loop above is because we can eliminate per-item function overhead
		// by calling addClass() and children() once or twice afterwards. This
		// can give us a significant boost on platforms like WP7.5.

		for ( itemClass in itemClassDict ) {
			$( itemClassDict[ itemClass ] ).addClass( itemClass );
		}

		$list.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" )
			.end()

			.find( "p, dl" ).addClass( "ui-li-desc" )
			.end()

			.find( ".ui-li-aside" ).each(function() {
					var $this = $( this );
					$this.prependTo( $this.parent() ); //shift aside to front for css float
				})
			.end()

			.find( ".ui-li-count" ).each(function() {
					$( this ).closest( "li" ).addClass( "ui-li-has-count" );
				}).addClass( "ui-fill-" + ( getAttr( $list[ 0 ], "counttheme", true ) || this.options.countTheme) + " ui-corner-all" );

		// The idea here is to look at the first image in the list item
		// itself, and any .ui-link-inherit element it may contain, so we
		// can place the appropriate classes on the image and list item.
		// Note that we used to use something like:
		//
		//    li.find(">img:eq(0), .ui-link-inherit>img:eq(0)").each( ... );
		//
		// But executing a find() like that on Windows Phone 7.5 took a
		// really long time. Walking things manually with the code below
		// allows the 400 listview item page to load in about 3 seconds as
		// opposed to 30 seconds.

		this._addThumbClasses( li );
		this._addThumbClasses( $list.find( ".ui-btn" ) );

		this._addFirstLastClasses( li, this._getVisibles( li, create ), create );
		// autodividers binds to this to redraw dividers after the listview refresh
		this._trigger( "afterrefresh" );
	},

	//create a string for ID/subpage url creation
	_idStringEscape: function( str ) {
		return str.replace(/[^a-zA-Z0-9]/g, "-");
	},

	_createSubPages: function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentUrl = getAttr( parentPage[ 0 ], "url", true ),
			parentId = parentUrl || parentPage[ 0 ][ $.expando ],
			parentListId = parentList.attr( "id" ),
			o = this.options,
			dns = "data-" + $.mobile.ns,
			self = this,
			persistentFooter = parentPage.find( ":jqmData(role='footer')" ),
			persistentFooterID = ( persistentFooter.length > 0 ? getAttr( persistentFooter[ 0 ], "id", true ) : undefined ),
			hasSubPages,
			newRemove = function( e, ui ) {
				var nextPage = ui.nextPage, npURL,
					prEvent = new $.Event( "pageremove" );

				if ( ui.nextPage ) {
					npURL = getAttr( nextPage[ 0 ], "url", true );
					if ( npURL.indexOf( parentUrl + "&" + $.mobile.subPageUrlKey ) !== 0 ) {
						self.childPages().remove();
						parentPage.trigger( prEvent );
						if ( !prEvent.isDefaultPrevented() ) {
							parentPage.removeWithDependents();
						}
					}
				}
			};

		if ( typeof listCountPerPage[ parentId ] === "undefined" ) {
			listCountPerPage[ parentId ] = -1;
		}

		parentListId = parentListId || ++listCountPerPage[ parentId ];

		$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function( i ) {
			var list = $( this ),
				listId = list.attr( "id" ) || parentListId + "-" + i,
				parent = list.parent(),
				nodeElsFull = $( list.prevAll().toArray().reverse() ),
				nodeEls = nodeElsFull.length ? nodeElsFull : $( "<span>" + $.trim(parent.contents()[ 0 ].nodeValue) + "</span>" ),
				title = nodeEls.first().getEncodedText(),//url limits to first 30 chars of text
				id = ( parentUrl || "" ) + "&" + $.mobile.subPageUrlKey + "=" + listId,
				theme = getAttr( list[ 0 ], "theme", true ) || o.theme,
				countTheme = getAttr( list[ 0 ], "counttheme", true ) || getAttr( parentList[ 0 ], "counttheme", true ) || o.countTheme,
				newPage, anchor;

			//define hasSubPages for use in later removal
			hasSubPages = true;

			newPage = list.detach()
						.wrap( "<div " + dns + "role='page' " + dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
						.parent()
							.before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
							.after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='"+ persistentFooterID +"'>" ) : "" )
							.parent()
								.appendTo( $.mobile.pageContainer );

			newPage.page();

			anchor = parent.find( "a:first" );

			if ( !anchor.length ) {
				anchor = $( "<a/>" ).html( nodeEls || title ).prependTo( parent.empty() );
			}

			anchor.attr( "href", "#" + id );

		}).listview();

		// on pagehide, remove any nested pages along with the parent page, as long as they aren't active
		// and aren't embedded
		if ( hasSubPages &&
			parentPage.is( ":jqmData(external-page='true')" ) &&
			parentPage.data( "mobile-page" ).options.domCache === false ) {

			// unbind the original page remove and replace with our specialized version
			parentPage
				.unbind( "pagehide.remove" )
				.bind( "pagehide.remove", newRemove);
		}
	},

	// TODO sort out a better way to track sub pages of the listview this is brittle
	childPages: function() {
		var parentUrl = this.parentPage.jqmData( "url" );

		return $( ":jqmData(url^='"+  parentUrl + "&" + $.mobile.subPageUrlKey + "')" );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

$.mobile.listview.initSelector = ":jqmData(role='listview')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.listview" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
