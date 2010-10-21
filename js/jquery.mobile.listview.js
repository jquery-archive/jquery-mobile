/*
* jQuery Mobile Framework : listview plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function( $ ) {

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
		// create listview markup 
		this.element
			.addClass( "ui-listview" )
			.attr( "role", "listbox" )
		
		if ( this.options.inset ) {
			this.element.addClass( "ui-listview-inset ui-corner-all ui-shadow" );
		}	

		this.element.delegate("ui-li", "focusin", function() {
			jQuery(this).attr( "tabindex", "0" );
		});

		this._itemApply( this.element, this.element );
		
		this.refresh( true );
	
		//keyboard events for menu items
		this.element.keydown(function(event){
			//switch logic based on which key was pressed
			switch(event.keyCode){
				//up or left arrow keys
				case 38:
					//if there's a previous option, focus it
					if( $(event.target).closest('li').prev().length  ){
						$(event.target).blur().attr("tabindex","-1").closest('li').prev().find('a').eq(0).focus();
					}	
					//prevent native scroll
					return false;
				break;
				//down or right arrow keys
				case 40:
				
					//if there's a next option, focus it
					if( $(event.target).closest('li').next().length ){
						$(event.target).blur().attr("tabindex","-1").closest('li').next().find('a').eq(0).focus();
					}	
					//prevent native scroll
					return false;
				break;
				case 39:
					if( $(event.target).closest('li').find('a.ui-li-link-alt').length ){
						$(event.target).blur().closest('li').find('a.ui-li-link-alt').eq(0).focus();
					}
					return false;
				break;
				case 37:
					if( $(event.target).closest('li').find('a.ui-link-inherit').length ){
						$(event.target).blur().closest('li').find('a.ui-link-inherit').eq(0).focus();
					}
					return false;
				break;
				//if enter or space is pressed, trigger click
				case 13:
				case 32:
					 $(event.target).trigger('click'); //should trigger select
					 return false;
				break;	
			}
		});	

		//tapping the whole LI triggers ajaxClick on the first link
		this.element.delegate( "li:has(a)", "tap", function(event) {
			if( !$(event.target).closest('a').length ){
				$( this ).find( "a:first" ).trigger('click');
				return false;
			}
		});
	},

	_itemApply: function( $list, item ) {
		// TODO class has to be defined in markup
		item.find( ".ui-li-count" )
			.addClass( "ui-btn-up-" + ($list.data( "counttheme" ) || this.options.countTheme) + " ui-btn-corner-all" );

		item.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" );

		item.find( "p, ul, dl" ).addClass( "ui-li-desc" );

		item.find( "img" ).addClass( "ui-li-thumb" ).each(function() {
			jQuery( this ).closest( "li" )
				.addClass( jQuery(this).is( "ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
		});

		var aside = item.find( ".ui-li-aside" );

		if ( aside.length ) {
			aside.prependTo( aside.parent() ); //shift aside to front for css float
		}

		if ( jQuery.support.cssPseudoElement || !jQuery.nodeName( item[0], "ol" ) ) {
			return;
		}
	},
	
	refresh: function( create ) {
		this._createSubPages();
		
		var o = this.options,
			$list = this.element,
			dividertheme = $list.data( "dividertheme" ) || o.dividerTheme,
			li = $list.children( "li" ),
			counter = jQuery.support.cssPseudoElement || !jQuery.nodeName( $list[0], "ol" ) ? 0 : 1;

		if ( counter ) {
			$list.find( ".ui-li-dec" ).remove();
		}

		li
			.addClass( "ui-li" )
			.attr( "role", "option" )
			.attr( "tabindex", "-1" )

		li.first().attr( "tabindex", "0" );

		li.each(function( pos ) {
			var item = jQuery( this );

			// If we're creating the element, we update it regardless
			if ( !create && item.hasClass( "ui-li" ) ) {
				return;
			}

			var a = item.find( "a" );
				
			if ( a.length ) {	
				item
					.buttonMarkup({
						wrapperEls: "div",
						shadow: false,
						corners: false,
						iconpos: "right",
						icon: item.data("icon") || "arrow-r",
						theme: o.theme
					});

				a.first().addClass( "ui-link-inherit" );

				if ( a.length > 1 ) {
					item.addClass( "ui-li-has-alt" );

					var last = a.last();
					
					last
						.attr( "title", last.text() )
						.addClass( "ui-li-link-alt" )
						.empty()
						.buttonMarkup({
							shadow: false,
							corners: false,
							theme: o.theme,
							icon: false,
							iconpos: false
						})
						.find( ".ui-btn-inner" )
							.append( jQuery( "<span>" ).buttonMarkup({
								shadow: true,
								corners: true,
								theme: $list.data( "splittheme" ) || last.data( "theme" ) || o.splitTheme,
								iconpos: "notext",
								icon: $list.data( "spliticon" ) || last.data( "icon" ) ||  o.splitIcon
							} ) );
				}

			} else if ( item.data( "role" ) === "list-divider" ) {
				item.addClass( "ui-li-divider ui-btn ui-bar-" + dividertheme ).attr( "role", "heading" );

			} else {
				item.addClass( "ui-li-static ui-btn-up-" + o.theme );
			}
				
			if ( pos === 0 ) {
				item.find( "img" ).addClass( "ui-corner-tl" );

				if ( o.inset ) {
					item
						.add( item.find( ".ui-btn-inner" ) )
						.addClass( "ui-corner-top" )
						.find( ".ui-li-link-alt" )
							.addClass( "ui-corner-tr" )
						.end()
						.find( ".ui-li-thumb" )
							.addClass( "ui-corner-tl" );
				}

			} else if ( pos === li.length - 1 ) {
				item.find( "img" ).addClass( "ui-corner-bl" );

				if ( o.inset ) {
					item
						.add( item.find( ".ui-btn-inner" ) )
						.addClass( "ui-corner-bottom" )
						.find( ".ui-li-link-alt" )
							.addClass( "ui-corner-br" )
						.end()
						.find( ".ui-li-thumb" )
							.addClass( "ui-corner-bl" );
				}
			}

			if ( counter ) {
				if ( item.hasClass( "ui-li-divider" ) ) {
					//reset counter when a divider heading is encountered
					counter = 1;

				} else { 
					item
						.find( ".ui-link-inherit" ).first()
						.addClass( "ui-li-jsnumbering" )
						.prepend( "<span class='ui-li-dec'>" + (counter++) + ". </span>" );
				}
			}

			if ( !create ) {
				this._itemApply( $list, item );
			}
		});
	},
	
	_createSubPages: function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentId = parentPage.attr( "id" ),
			o = this.options,
			persistentFooterID = parentPage.find( "[data-role='footer']" ).data( "id" );

		jQuery( parentList.find( "ul, ol" ).toArray().reverse() ).each(function( i ) {
			var list = jQuery( this ),
				parent = list.parent(),
				title = parent.contents()[ 0 ].nodeValue.split("\n")[0],
				id = parentId + "&" + $.mobile.subPageUrlKey + "=" + $.mobile.idStringEscape(title + " " + i),
				theme = list.data( "theme" ) || o.theme,
				countTheme = list.data( "counttheme" ) || parentList.data( "counttheme" ) || o.countTheme,
				newPage = list.wrap( "<div data-role='page'><div data-role='content'></div></div>" )
							.parent()
								.before( "<div data-role='header' data-theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
								.after( persistentFooterID ? $( "<div>", { "data-role": "footer", "data-id": persistentFooterID, "class": "ui-footer-duplicate" } ) : "" )
								.parent()
									.attr({
										id: id,
										"data-theme": theme,
										"data-count-theme": countTheme
									})
									.appendTo( jQuery.pageContainer );
				
				
				
				newPage.page();		
			
			parent.html( "<a href='#" + id + "'>" + title + "</a>" );
		}).listview();
	}
});

})( jQuery );
