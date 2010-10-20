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
		var o = this.options,
			$list = this.element;
		
		this._createSubPages();
		
		//create listview markup 
		this.element
			.addClass( "ui-listview" )
			.attr( "role", "listbox" )
		
		if ( o.inset ) {
			this.element
				.addClass( "ui-listview-inset" )
				.controlgroup({ shadow: true });
		}	
						
		this.refresh();
	
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

		// TODO class has to be defined in markup
		this.element.find( ".ui-li-count" )
			.addClass( "ui-btn-up-" + ($list.data( "counttheme" ) || o.countTheme) + " ui-btn-corner-all" );

		// TODO what is :header matching? does that need to be moved to refresh?
		this.element.find( ":header" )
			.addClass( "ui-li-heading" );
		
		// TODO move to refresh()
		this._numberItems();
				
		//tapping the whole LI triggers ajaxClick on the first link
		this.element.find( "li:has(a)" ).live( "tap", function(event) {
			if( !$(event.target).closest('a').length ){
				$( this ).find( "a:first" ).trigger('click');
				return false;
			}
		});
	},
	
	refresh: function() {
		var o = this.options,
			dividertheme = this.element.data( "dividertheme" ) || o.dividerTheme,
			$list = this.element;
		this.element.find( "li")
			.eq(0)
			.attr("tabindex","0")
			.end()
			.filter(":not(.ui-li)" )
			.attr("role","option")
			.attr("tabindex","-1")
			.focus(function(){
				$(this).attr("tabindex","0");
			})
			.each(function() {
				var $li = $( this ).addClass( "ui-li" ),
					role = $li.data( "role" );

				if ( $li.is( ":has(img)" ) ) {
					if ($li.is( ":has(img.ui-li-icon)" )) {
						$li.addClass( "ui-li-has-icon" );
					} else {
						$li.addClass( "ui-li-has-thumb" );
					}
				}

				if ( $li.is( ":has(.ui-li-aside)" ) ) {
					var aside = $li.find('.ui-li-aside');
					aside.prependTo(aside.parent()); //shift aside to front for css float
				}
				
				if ( $li.find('a').length ) {	
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
					$li.addClass( "ui-li-divider ui-btn ui-bar-" + dividertheme ).attr( "role", "heading" );
				}
				else {
					$li.addClass( "ui-li-static ui-btn-up-" + o.theme );
				}
				
				//for split buttons
				var $splitBtn = $li.find( "a" ).eq( 1 );
				if ( $splitBtn.length ) {
					$(this).addClass('ui-li-has-alt');
				}
				$splitBtn.each(function() {
					console.log(this);
					var a = $( this )
						.attr( "title", $( this ).text() )
						.addClass( "ui-li-link-alt" )
						.empty()
						.buttonMarkup({
							shadow: false,
							corners: false,
							theme: o.theme,
							icon: false,
							iconpos: false
						});
					a.find( ".ui-btn-inner" )
						.append( $( "<span>" ).buttonMarkup({
							shadow: true,
							corners: true,
							theme: $list.data('splittheme') || a.data('theme') || o.splitTheme,
							iconpos: "notext",
							icon: $list.data('spliticon') || a.data('icon') ||  o.splitIcon
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
				
				//remove corners before or after dividers
				var sides = ['top','bottom'];
				$.each( sides, function( i ){
					var side = sides[ i ];
					$li.filter( ".ui-corner-" + side ).each(function() {
						if ( $li[ i == 0 ? 'prev' : 'next' ]( ".ui-li-divider" ).length ) {
							$( this ).removeClass( "ui-corner-" + side );
						}
					});
				});
			})
			.find( "img")
				.addClass( "ui-li-thumb" )
			.end()
			.find( "p, ul, dl" )
				.addClass( "ui-li-desc" );
		
		// TODO remove these classes from any elements that may have gotten them in a previous call
		this.element
			.find( "img" )
				.filter( "li:first-child img" )
					.addClass( "ui-corner-tl" )
				.end()
				.filter( "li:last-child img" )
					.addClass( "ui-corner-bl" )
				.end();
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
