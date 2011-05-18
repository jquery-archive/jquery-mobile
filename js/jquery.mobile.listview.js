/*
* jQuery Mobile Framework : "listview" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.widget( "mobile.listview", $.mobile.widget, {
	options: {
		theme: "c",
		countTheme: "c",
		headerTheme: "b",
		dividerTheme: "b",
		splitIcon: "arrow-r",
		splitTheme: "b",
		inset: false
	},
	
	_create: function() {
		var t = this;

		// create listview markup 
		t.element.addClass(function( i, orig ) {
			return orig + " ui-listview " + ( t.options.inset ? " ui-listview-inset ui-corner-all ui-shadow " : "" );
		});

		t.refresh();
	},

	_itemApply: function( $list, item ) {
		// TODO class has to be defined in markup
		item.find( ".ui-li-count" )
			.addClass( "ui-btn-up-" + ($list.jqmData( "counttheme" ) || this.options.countTheme) + " ui-btn-corner-all" ).end()
		.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" ).end()
		.find( "p, dl" ).addClass( "ui-li-desc" ).end()
		.find("img:first-child:eq(0)").addClass( "ui-li-thumb" ).each(function() {
			item.addClass( $(this).is( ".ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
		}).end()
		.find( ".ui-li-aside" ).each(function() {
			var $this = $(this);
			$this.prependTo( $this.parent() ); //shift aside to front for css float
		});
	},
	
	_removeCorners: function( li ) {
		li
			.add( li.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb") )
			.removeClass( "ui-corner-top ui-corner-bottom ui-corner-br ui-corner-bl ui-corner-tr ui-corner-tl" );
	},
	
	refresh: function( create ) {
		this._createSubPages();
		
		var o = this.options,
			$list = this.element,
			self = this,
			dividertheme = $list.jqmData( "dividertheme" ) || o.dividerTheme,
			listsplittheme = $list.jqmData( "splittheme" ),
			listspliticon = $list.jqmData( "spliticon" ),
			li = $list.children( "li" ),
			counter = $.support.cssPseudoElement || !$.nodeName( $list[0], "ol" ) ? 0 : 1;

		if ( counter ) {
			$list.find( ".ui-li-dec" ).remove();
		}

		for (var pos = 0, numli = li.length; pos < numli; pos++) {
			var item = li.eq(pos),
				itemClass = "ui-li";

			// If we're creating the element, we update it regardless
			if ( !create && item.hasClass( "ui-li" ) ) {
				continue;
			}

			var itemTheme = item.jqmData("theme") || o.theme,
				a = item.children( "a" );
				
			if ( a.length ) {	
				var icon = item.jqmData("icon");
				
				item
					.buttonMarkup({
						wrapperEls: "div",
						shadow: false,
						corners: false,
						iconpos: "right",
						icon: a.length > 1 || icon === false ? false : icon || "arrow-r",
						theme: itemTheme
					});

				a.first().addClass( "ui-link-inherit" );

				if ( a.length > 1 ) {
					itemClass += " ui-li-has-alt";

					var last = a.last(),
						splittheme = listsplittheme || last.jqmData( "theme" ) || o.splitTheme;
					
					last
						.appendTo(item)
						.attr( "title", last.text() )
						.addClass( "ui-li-link-alt" )
						.empty()
						.buttonMarkup({
							shadow: false,
							corners: false,
							theme: itemTheme,
							icon: false,
							iconpos: false
						})
						.find( ".ui-btn-inner" )
							.append( $( "<span />" ).buttonMarkup({
								shadow: true,
								corners: true,
								theme: splittheme,
								iconpos: "notext",
								icon: listspliticon || last.jqmData( "icon" ) ||  o.splitIcon
							} ) );
				}

			} else if ( item.jqmData( "role" ) === "list-divider" ) {
				itemClass += " ui-li-divider ui-btn ui-bar-" + dividertheme;
				item.attr( "role", "heading" );

				//reset counter when a divider heading is encountered
				if ( counter ) {
					counter = 1;
				}

			} else {
				itemClass += " ui-li-static ui-body-" + itemTheme;
			}
			
			
			if( o.inset ){	
				if ( pos === 0 ) {
						itemClass += " ui-corner-top";
	
						item
							.add( item.find( ".ui-btn-inner" ) )
							.find( ".ui-li-link-alt" )
								.addClass( "ui-corner-tr" )
							.end()
							.find( ".ui-li-thumb" )
								.addClass( "ui-corner-tl" );
						if(item.next().next().length){
							self._removeCorners( item.next() );		
						}
	
				}
				if ( pos === li.length - 1 ) {
						itemClass += " ui-corner-bottom";
	
						item
							.add( item.find( ".ui-btn-inner" ) )
							.find( ".ui-li-link-alt" )
								.addClass( "ui-corner-br" )
							.end()
							.find( ".ui-li-thumb" )
								.addClass( "ui-corner-bl" );
						
						if(item.prev().prev().length){
							self._removeCorners( item.prev() );		
						}	
				}
			}


			if ( counter && itemClass.indexOf( "ui-li-divider" ) < 0 ) {
			
				var countParent = item.is(".ui-li-static:first") ? item : item.find( ".ui-link-inherit" );
				
				countParent
					.addClass( "ui-li-jsnumbering" )
					.prepend( "<span class='ui-li-dec'>" + (counter++) + ". </span>" );
			}

			item.add( item.find( ".ui-btn-inner" ) ).addClass( itemClass );

			if ( !create ) {
				self._itemApply( $list, item );
			}
		}
	},
	
	//create a string for ID/subpage url creation
	_idStringEscape: function( str ){
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	},
	
	_createSubPages: function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentId = parentPage.jqmData( "url" ),
			o = this.options,
			dns = "data-" + $.mobile.ns,
			self = this,
			persistentFooterID = parentPage.find( ":jqmData(role='footer')" ).jqmData( "id" );

		$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function( i ) {
			var list = $( this ),
				parent = list.parent(),
				nodeEls = $( list.prevAll().toArray().reverse() ),
				nodeEls = nodeEls.length ? nodeEls : $( "<span>" + $.trim(parent.contents()[ 0 ].nodeValue) + "</span>" ),
				title = nodeEls.first().text(),//url limits to first 30 chars of text
				id = parentId + "&" + $.mobile.subPageUrlKey + "=" + self._idStringEscape(title + " " + i),
				theme = list.jqmData( "theme" ) || o.theme,
				countTheme = list.jqmData( "counttheme" ) || parentList.jqmData( "counttheme" ) || o.countTheme,
				newPage = list.detach()
							.wrap( "<div " + dns + "role='page' " +  dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
							.parent()
								.before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
								.after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='"+ persistentFooterID +"'>") : "" )
								.parent()
									.appendTo( $.mobile.pageContainer );

				newPage.page();		
			var anchor = parent.find('a:first');
			if ( !anchor.length ) {
				anchor = $("<a />").html( nodeEls || title ).prependTo( parent.empty() );
			}
			anchor.attr('href','#' + id);
		}).listview();
	}
});

})( jQuery );
