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
		var $list = this.element,
			o = this.options;

		// create listview markup 
		$list
			.addClass( "ui-listview" )
			.attr( "role", "listbox" )
		
		if ( o.inset ) {
			$list.addClass( "ui-listview-inset ui-corner-all ui-shadow" );
		}	

		$list.delegate( ".ui-li", "focusin", function() {
			$( this ).attr( "tabindex", "0" );
		});

		this._itemApply( $list, $list );
		
		this.refresh( true );
	
		//keyboard events for menu items
		$list.keydown(function( e ) {
			var target = $( e.target ),
				li = target.closest( "li" );

			// switch logic based on which key was pressed
			switch ( e.keyCode ) {
				// up or left arrow keys
				case 38:
					var prev = li.prev();

					// if there's a previous option, focus it
					if ( prev.length ) {
						target
							.blur()
							.attr( "tabindex", "-1" );

						prev.find( "a" ).first().focus();
					}	

					return false;
				break;

				// down or right arrow keys
				case 40:
					var next = li.next();
				
					// if there's a next option, focus it
					if ( next.length ) {
						target
							.blur()
							.attr( "tabindex", "-1" );
						
						next.find( "a" ).first().focus();
					}	

					return false;
				break;

				case 39:
					var a = li.find( "a.ui-li-link-alt" );

					if ( a.length ) {
						target.blur();
						a.first().focus();
					}

					return false;
				break;

				case 37:
					var a = li.find( "a.ui-link-inherit" );

					if ( a.length ) {
						target.blur();
						a.first().focus();
					}

					return false;
				break;

				// if enter or space is pressed, trigger click
				case 13:
				case 32:
					 target.trigger( "click" );

					 return false;
				break;	
			}
		});	

		// tapping the whole LI triggers click on the first link
		$list.delegate( "li", "click", function(event) {
			if ( !$( event.target ).closest( "a" ).length ) {
				$( this ).find( "a" ).first().trigger( "click" );
				return false;
			}
		});
	},

	_itemApply: function( $list, item ) {
		// TODO class has to be defined in markup
		item.find( ".ui-li-count" )
			.addClass( "ui-btn-up-" + ($list.data( "counttheme" ) || this.options.countTheme) + " ui-btn-corner-all" );

		item.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" );

		item.find( "p, dl" ).addClass( "ui-li-desc" );

		$list.find( "li" ).find( "img:eq(0)" ).addClass( "ui-li-thumb" ).each(function() {
			$( this ).closest( "li" )
				.addClass( $(this).is( ".ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
		});

		var aside = item.find( ".ui-li-aside" );

		if ( aside.length ) {
            aside.each(function(i, el) {
			    $(el).prependTo( $(el).parent() ); //shift aside to front for css float
            });
		}

		if ( $.support.cssPseudoElement || !$.nodeName( item[0], "ol" ) ) {
			return;
		}
	},
	
	refresh: function( create ) {
		// Cache some long-term attributes here to make adding items one-by-one fast.
		this._parentPage = this.element.closest( ".ui-page" );
		this._parentId = this._parentPage.data( "url" );
		this._persistentFooterID = this._parentPage.find( "[data-role='footer']" ).data( "id" );
		this._subpageCount = 0;
		this._listItems = [];

		this._createSubPages();
		
		var self = this;
		var li = this.element.children( "li" );
		$( li.toArray() ).each( function( i ) {
			self.insert( $( this ), i, create );
		});
	},

	insert: function( item, index, create )
	{
		var o = this.options,
			$list = this.element,
			self = this,
			dividertheme = $list.data( "dividertheme" ) || o.dividerTheme;

		item.attr({ "role": "option", "tabindex": "-1" });
		if ( index < 1 )
			item.attr( "tabindex", "0" );

		var itemClass = "ui-li";

		// If we're creating the element, we update it regardless
		if ( !create && item.hasClass( "ui-li" ) ) {
			return;
		}

		var itemTheme = item.data("theme") || o.theme;

		var a = item.find( "a" );
			
		if ( a.length ) {	
			var icon = item.data("icon");
			
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
					splittheme = $list.data( "splittheme" ) || last.data( "theme" ) || o.splitTheme;
				
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
						.append( $( "<span>" ).buttonMarkup({
							shadow: true,
							corners: true,
							theme: splittheme,
							iconpos: "notext",
							icon: $list.data( "spliticon" ) || last.data( "icon" ) ||  o.splitIcon
						} ) );
			}

		} else if ( item.data( "role" ) === "list-divider" ) {
			itemClass += " ui-li-divider ui-btn ui-bar-" + dividertheme;
			item.attr( "role", "heading" );

		} else {
			itemClass += " ui-li-static ui-btn-up-" + itemTheme;
		}
		
		if ( index >= this._listItems.length )
			this._listItems.push( item );
		else if ( index < 1 )
			this._listItems.unshift( item );
		else
			this._listItems.splice( index, 0, item );

		if( o.inset ){
			if ( index === 0 ) {
					// Add corner style for the new top list item.
					this._addCorners( item, 0x01 );

					// Remove the corner styles for the previously top list item.
					if( this._listItems.length > 1 ){
						var li = this._listItems[ 1 ];
						this._removeCorners( li, 0x01 );
					}

			}
			if ( index === this._listItems.length - 1 ) {
					// Add corner style for the new bottom list item.
					this._addCorners( item, 0x02 );
					
					// Remove the corner styles for the previously bottom list item.
					if( this._listItems.length > 1 ){
						var li = this._listItems[ this._listItems.length - 2 ];
						this._removeCorners( li, 0x02 );
					}	
			}
		}

		item.addClass( itemClass );

		if ( !create ) {
			self._itemApply( $list, item );
		}
	},

	push: function( item, create )
	{
		this.insert( item, this._listItems.length, create );
	},

	remove : function( item )
	{
		var index = -1;
		for ( var i = 0 ; i < this._listItems.length ; i++ )
		{
			if ( item[0] == this._listItems[i][0] )
			{
				index = i;
				break;
			}
		}

		if ( index >= 0 )
			this.pop( index );
	},

	pop: function( index )
	{
		// If no index is given, remove the last item.
		if ( index === undefined )
			index = this._listItems.length - 1;

		// Remove item from cache.
		var item = null;
		if ( index < 1 )
			item = this._listItems.shift();
		else if ( index >= this._listItems.length - 1 )
			item = this._listItems.pop();
		else
			item = this._listItems.splice( index, 1 )[0];

		// Remove item from DOM.
		item.remove();

		// Fix the top and bottom corner styles.
		if ( this._listItems.length > 0 )
		{
			if ( index < 1 )
				this._addCorners( this._listItems[0], 0x01 );
			if ( index >= this._listItems.length )
				this._addCorners( this._listItems[ this._listItems.length - 1 ], 0x02 );
		}
	},

	_addCorners: function( item, positions )
	{
		// positions is a bitfield, 0x01 means top, 0x02 means bottom.
		var itemClasses = [];
		var leftClasses = [];
		var rightClasses = [];

		if ( positions & 0x01 )
		{
			itemClasses.push( "ui-corner-top" );
			leftClasses.push( "ui-corner-tl" );
			rightClasses.push( "ui-corner-tr" );
		}
		
		if ( positions & 0x02 )
		{
			itemClasses.push( "ui-corner-bottom" );
			leftClasses.push( "ui-corner-bl" );
			rightClasses.push( "ui-corner-br" );
		}

		item.addClass( itemClasses.join( " " ) );
		item
			.add( item.find( ".ui-btn-inner" ) )
			.find( ".ui-li-link-alt" )
				.addClass( rightClasses.join( " " ) )
			.end()
			.find( ".ui-li-thumb" )
				.addClass( leftClasses.join( " " ) );
	},

	_removeCorners: function( item, positions )
	{
		// positions is a bitfield, 0x01 means top, 0x02 means bottom.
		var nodes = item.add( item.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb") );

		if ( positions & 0x01 )
			nodes.removeClass( "ui-corner-top ui-corner-tr ui-corner-tl" );
		if ( positions & 0x02 )
			nodes.removeClass( "ui-corner-bottom ui-corner-br ui-corner-bl" );
	},
	
	//create a string for ID/subpage url creation
	_idStringEscape: function( str ){
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	},

	_createSubPage: function(list) {
		var parentList = this.element,
			parentPage = this._parentPage,
			parentId = this._parentId,
			o = this.options,
			self = this,
			persistentFooterID = this._persistentFooterID;

		var parent = list.parent(),
				title = $.trim(parent.contents()[ 0 ].nodeValue) || parent.find('a:first').text(),
				id = parentId + "&" + $.mobile.subPageUrlKey + "=" + self._idStringEscape(title + " " + ( ++this._subpageCount ) ),
				theme = list.data( "theme" ) || o.theme,
				countTheme = list.data( "counttheme" ) || parentList.data( "counttheme" ) || o.countTheme,
				newPage = list.wrap( "<div data-role='page'><div data-role='content'></div></div>" )
					.parent()
						.before( "<div data-role='header' data-theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
						.after( persistentFooterID ? $( "<div>", { "data-role": "footer", "data-id": persistentFooterID, "class": "ui-footer-duplicate" } ) : "" )
						.parent()
							.attr({
								"data-url": id,
								"data-theme": theme,
								"data-count-theme": countTheme
							})
							.appendTo( $.mobile.pageContainer );
		
			newPage.page();		
			var anchor = parent.find('a:first');
			if (!anchor.length) {
				anchor = $("<a></a>").html(title).prependTo(parent.empty());
			}
			anchor.attr('href','#' + id);
			list.listview();
	},
	
	_createSubPages: function() {
		var self = this;
		$( this.element.find( "ul, ol" ).toArray().reverse() ).each(function( i ) {
			self._createSubPage( $( this ) );
		});
	}
});

})( jQuery );
