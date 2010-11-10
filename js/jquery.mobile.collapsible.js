/*
* jQuery Mobile Framework : "collapsible" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function ( $ ) {
$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: ' click to expand contents',
		collapseCueText: ' click to collapse contents',
		collapsed: false,
		heading: '>:header,>legend',
		theme: undefined,
		iconTheme: 'd'
	},
	_create: function(){

		var $el = this.element,
			o = this.options,
			collapsibleContain = $el.addClass('ui-collapsible-contain'),
			collapsibleHeading = $el.find(o.heading).eq(0),
			collapsibleContent = collapsibleContain.wrapInner('<div class="ui-collapsible-content"></div>').find('.ui-collapsible-content'),
			collapsibleParent = $el.closest('[data-role="collapsible-set"]').addClass('ui-collapsible-set');				
		
		//replace collapsibleHeading if it's a legend	
		if(collapsibleHeading.is('legend')){
			collapsibleHeading = $('<div role="heading">'+ collapsibleHeading.html() +'</div>').insertBefore(collapsibleHeading);
			collapsibleHeading.next().remove();
		}	
		
		//drop heading in before content
		collapsibleHeading.insertBefore(collapsibleContent);
		
		//modify markup & attributes
		collapsibleHeading.addClass('ui-collapsible-heading')
			.append('<span class="ui-collapsible-heading-status"></span>')
			.wrapInner('<a href="#" class="ui-collapsible-heading-toggle"></a>')
			.find('a:eq(0)')
			.buttonMarkup({
				shadow: !!!collapsibleParent.length,
				corners:false,
				iconPos: 'left',
				icon: 'plus',
				theme: o.theme
			})
			.find('.ui-icon')
			.removeAttr('class')
			.buttonMarkup({
				shadow: true,
				corners:true,
				iconPos: 'notext',
				icon: 'plus',
				theme: o.iconTheme
			});
			
			if( !collapsibleParent.length ){
				collapsibleHeading
					.find('a:eq(0)')	
					.addClass('ui-corner-all')
						.find('.ui-btn-inner')
						.addClass('ui-corner-all');
			}
			else {
				if( collapsibleContain.data('collapsible-last') ){
					collapsibleHeading
						.find('a:eq(0), .ui-btn-inner')	
							.addClass('ui-corner-bottom');
				}					
			}
			
		
		//events
		collapsibleContain	
			.bind('collapse', function(event){
				if( !event.isDefaultPrevented() ){
					event.preventDefault();
					collapsibleHeading
						.addClass('ui-collapsible-heading-collapsed')
						.find('.ui-collapsible-heading-status').text(o.expandCueText);
					
					collapsibleHeading.find('.ui-icon').removeClass('ui-icon-minus').addClass('ui-icon-plus');	
					collapsibleContent.addClass('ui-collapsible-content-collapsed').attr('aria-hidden',true);
					
					if( collapsibleContain.data('collapsible-last') ){
						collapsibleHeading
							.find('a:eq(0), .ui-btn-inner')
							.addClass('ui-corner-bottom');
					}
				}						
				
			})
			.bind('expand', function(event){
				if( !event.isDefaultPrevented() ){
					event.preventDefault();
					collapsibleHeading
						.removeClass('ui-collapsible-heading-collapsed')
						.find('.ui-collapsible-heading-status').text(o.collapseCueText);
					
					collapsibleHeading.find('.ui-icon').removeClass('ui-icon-plus').addClass('ui-icon-minus');	
					collapsibleContent.removeClass('ui-collapsible-content-collapsed').attr('aria-hidden',false);
					
					if( collapsibleContain.data('collapsible-last') ){
						collapsibleHeading
							.find('a:eq(0), .ui-btn-inner')
							.removeClass('ui-corner-bottom');
					}
					
				}
			})
			.trigger(o.collapsed ? 'collapse' : 'expand');
			
		
		//close others in a set
		if( collapsibleParent.length && !collapsibleParent.data("collapsiblebound") ){
			collapsibleParent
				.data("collapsiblebound", true)
				.bind("expand", function( event ){
					$(this).find( ".ui-collapsible-contain" )
						.not( $(event.target).closest( ".ui-collapsible-contain" ) )
						.not( "> .ui-collapsible-contain .ui-collapsible-contain" )
						.trigger( "collapse" );
				})
			var set = collapsibleParent.find('[data-role=collapsible]')
					
			set.first()
				.find('a:eq(0)')	
				.addClass('ui-corner-top')
					.find('.ui-btn-inner')
					.addClass('ui-corner-top');
					
			set.last().data('collapsible-last', true)	
		}
					
		collapsibleHeading.click(function(){ 
			if( collapsibleHeading.is('.ui-collapsible-heading-collapsed') ){
				collapsibleContain.trigger('expand'); 
			}	
			else {
				collapsibleContain.trigger('collapse'); 
			}
			return false;
		});
			
	}
});
})( jQuery );