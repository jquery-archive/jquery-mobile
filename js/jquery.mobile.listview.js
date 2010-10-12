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
		splitTheme: "b",
		inset: false
	},
	
	_create: function() {
		var o = this.options
			$list = this.element;
		
		this._createSubPages();
		
		//create listview markup 
		this.element
			.addClass( "ui-listview" )
			.attr( "role", "listbox" )
			.find( "li" )
				.attr("role","option")
				.attr("tabindex","-1")
				.focus(function(){
					$(this).attr("tabindex","0");
				})
				.each(function() {
					var $li = $( this ),
						role = $li.data( "role" ),
						dividertheme = $list.data( "dividertheme" ) || o.dividerTheme;
					if ( $li.is( ":has(img)" ) ) {
						$li.addClass( "ui-li-has-thumb" );
					}
					if ( $li.is( ":has(.ui-li-aside)" ) ) {
						var aside = $li.find('.ui-li-aside');
						aside.prependTo(aside.parent()); //shift aside to front for css float
					}
					$li.addClass( "ui-li" );
					
					if( $li.find('a').length ){	
						$li
							.buttonMarkup({
								wrapperEls: "div",
								shadow: false,
								corners: false,
								iconpos: "right",
								icon: $(this).data("icon") || "arrow-r",
								theme: o.theme
							})
							.find( "a" ).eq( 0 )
								.addClass( "ui-link-inherit" );
					}
					else if( role == "list-divider" ){
						$li.addClass( "ui-li-divider ui-btn ui-body-" + dividertheme ).attr( "role", "heading" );
					}
					else {
						$li.addClass( "ui-li-static ui-btn-up-" + o.theme );
					}	
				})
				.eq(0)
				.attr("tabindex","0");
				
	
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

		if ( o.inset ) {
			this.element
				.addClass( "ui-listview-inset" )
				.controlgroup({ shadow: true });
		}
		
		this.element
			.find( "li" ).each(function() {
				//for split buttons
				$( this ).find( "a" ).eq( 1 ).each(function() {
					var a = $( this );
					a
						.attr( "title", $( this ).text() )
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
						.append( $( "<span>" ).buttonMarkup({
							shadow: true,
							corners: true,
							theme: o.splitTheme,
							iconpos: "notext",
							icon: a.data('icon') || "arrow-r"
						} ) );
					
					//fix corners
					if ( o.inset ) {
						var closestLi = $( this ).closest( "li" );
						if ( closestLi.is( "li:first-child" ) ) {
							$( this ).addClass( "ui-corner-tr" );
						} else if ( closestLi.is( "li:last-child" ) ) {
							$( this ).addClass( "ui-corner-br" );
						}
					}
				});
			})
			.find( "img")
				.addClass( "ui-li-thumb" );
		
		if ( o.inset ) {
			this.element
				.find( "img" )
					.filter( "li:first-child img" )
						.addClass( "ui-corner-tl" )
					.end()
					.filter( "li:last-child img" )
						.addClass( "ui-corner-bl" )
					.end();
		}
		
		this.element
			.find( ".ui-li-count" )
				.addClass( "ui-btn-up-" + ($list.data( "counttheme" ) || o.countTheme) + " ui-btn-corner-all" )
			.end()
			.find( ":header" )
				.addClass( "ui-li-heading" )
			.end()
			.find( "p,ul,dl" )
				.addClass( "ui-li-desc" );
		
		this._numberItems();
				
		//tapping the whole LI triggers ajaxClick on the first link
		this.element.find( "li:has(a)" ).live( "tap", function(event) {
			if( !$(event.target).is('a') ){
				$( this ).find( "a:first" ).ajaxClick();
				return false;
			}
		});
	},
	
	_createSubPages: function() {
		var parentId = this.element.closest( ".ui-page" ).attr( "id" ),
			o = this.options,
			parentList = this.element;
		$( this.element.find( "ul,ol" ).get().reverse() ).each(function( i ) {
			var list = $( this ),
				parent = list.parent(),
				title = parent.contents()[ 0 ].nodeValue.split("\n")[0],
				id = parentId + "&" + $.mobile.subPageUrlKey + "=" + $.mobile.idStringEscape(title + " " + i),
				theme = list.data( "theme" ) || o.theme,
				countTheme = list.data( "counttheme" ) || parentList.data( "counttheme" ) || o.countTheme,
				newPage = list.wrap( "<div data-role='page'><div data-role='content'></div></div>" )
							.parent()
								.before( "<div data-role='header' data-theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
								.parent()
									.attr({
										id: id,
										"data-theme": theme,
										"data-count-theme": countTheme
									})
									.appendTo( "body" );
									
				newPage.page();		
			
			parent.html( "<a href='#" + id + "'>" + title + "</a>" );
		}).listview();
	},
	
	// JS fallback for auto-numbering for OL elements
	_numberItems: function() {
		if ( $.support.cssPseudoElement || !this.element.is( "ol" ) ) {
			return;
		}
		var counter = 1;
		this.element.find( ".ui-li-dec" ).remove();
		this.element.find( "li:visible" ).each(function() {
			if( $( this ).is( ".ui-li-divider" ) ) {
				//reset counter when a divider heading is encountered
				counter = 1;
			} else { 
				$( this )
					.find( ".ui-link-inherit:first" )
					.addClass( "ui-li-jsnumbering" )
					.prepend( "<span class='ui-li-dec'>" + (counter++) + ". </span>" );
			}
		});
	}
});

})( jQuery );
