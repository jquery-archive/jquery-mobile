/*
* jQuery Mobile Framework : listview plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function( $ ) {

$.widget( "mobile.listview", $.mobile.widget, {
	options: {
		theme: "f",
		countTheme: "f",
		headerTheme: "b",
		groupingTheme: "b",
		splitTheme: "b",
		inset: false
	},
	
	_create: function() {
		var o = this.options;
		
		this._createSubPages();
		
		//create listview markup 
		this.element
			.addClass( "ui-listview" )
			.find( "li" )
				.each(function() {
					var $li = $( this );
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
								icon: "arrow-r",
								theme: o.theme
							})
							.find( "a" ).eq( 0 )
								.addClass( "ui-link-inherit" );
					}
					else{
						$li.addClass( "ui-li-grouping ui-btn ui-body-" + o.groupingTheme );
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
					$( this )
						.attr( "title", $( this ).text() )
						.addClass( "ui-li-link-alt" )
						.empty()
						.buttonMarkup({
							shadow: false,
							corners: false,
							theme: o.theme
						})
						.find( ".ui-btn-inner" )
						.append( $( "<span>" ).buttonMarkup({
							shadow: true,
							corners: true,
							theme: o.splitTheme,
							iconpos: "notext",
							icon: "arrow-r"
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
				.addClass( "ui-btn-up-" + o.countTheme + " ui-btn-corner-all" )
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
			o = this.options;
		$( this.element.find( "ul,ol" ).get().reverse() ).each(function( i ) {
			var list = $( this ),
				id = parentId + "&" + $.mobile.subPageUrlKey + "=listview-" + i,
				parent = list.parent(),
				title = parent.contents()[ 0 ].nodeValue,
				theme = list.data( "theme" ) || o.theme,
				countTheme = list.data( "count-theme" ) || o.countTheme,
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
									
				$.mobilize(newPage);		
			
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
			if( $( this ).is( ".ui-li-grouping" ) ) {
				//reset counter when a grouping heading is encountered
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
