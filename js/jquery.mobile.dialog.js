/*
* jQuery Mobile Framework : "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
(function($, undefined ) {
$.widget( "mobile.dialog", $.mobile.widget, {
	options: {},
	_create: function(){
		var self = this,
			$el = self.element,
			$closeBtn = $('<a href="#" data-icon="delete" data-iconpos="notext">Close</a>'),

			dialogClickHandler = function(e){
				var $target = $(e.target),
					href = $.mobile.path.stripHash( $target.closest("a").attr("href") ),
					isRelative = $.mobile.path.isRelative( href ),
					absUrl = isRelative ? $.mobile.path.makeAbsolute( href ) : href;

				// fixes issues with target links in dialogs breaking
				// page transitions by reseting the active page below
				if( $.mobile.path.isExternal( href ) ||
						$target.closest("a[target]").length || 
						$target.is( "[rel='external']" ) ) {
					return;
				}
				
				
				//if it's a close button click
				//or the href is the same as the page we're on, close the dialog
				if( e.type == "click" &&
					( this==$closeBtn[0] || absUrl == $.mobile.path.stripHash( location.hash ) ) ){
					self.close();
					return false;
				}

				//otherwise, assume we're headed somewhere new. set activepage to dialog so the transition will work
				$.mobile.activePage = self.element;
			};

		// NOTE avoid click handler in the case of an external resource
		// TODO add function in navigation to handle external check
		$el.delegate("a", "click", dialogClickHandler);
		$el.delegate("form", "submit", dialogClickHandler);

		this.element
			.bind("pageshow",function(){
				self.thisPage = $.mobile.urlHistory.getActive();
				self.prevPage = $.mobile.urlHistory.getPrev();
				return false;
			})
			.bind("pagehide", function(){
				$.mobile.urlHistory.stack = $.mobile.urlHistory.stack.slice(0,$.mobile.urlHistory.stack.length-2);
				$.mobile.urlHistory.activeIndex = $.mobile.urlHistory.stack.length -1;
			})
			
			//add ARIA role
			.attr("role","dialog")
			.addClass('ui-page ui-dialog ui-body-a')
			.find('[data-role=header]')
			.addClass('ui-corner-top ui-overlay-shadow')
				.prepend( $closeBtn )
			.end()
			.find('.ui-content:not([class*="ui-body-"])')
				.addClass('ui-body-c')
			.end()
			.find('.ui-content,[data-role=footer]')
				.last()
				.addClass('ui-corner-bottom ui-overlay-shadow');


		
		$(window).bind('hashchange',function(){
			$.mobile.urlHistory.listeningEnabled = true;
			if( $el.is('.ui-page-active') ){
				self.close();
				$el.bind('pagehide',function(){
					$.mobile.urlHistory.listeningEnabled = false;
					$.mobile.updateHash( self.prevPage.url );
				});
			}
		});

	},

	close: function(){
		$.mobile.changePage([this.element, $.mobile.activePage], this.thisPage.transition, true, true, true );
	}
});
})( jQuery );