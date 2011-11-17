/*
* "textinput" plugin for text inputs, textareas
*/

(function( $, undefined ) {

$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null,
		initSelector: "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type])"
	},

	_create: function() {

		var input = this.element,
			o = this.options,
			theme = o.theme || $.mobile.getInheritedTheme( this.element, "c" ),
			themeclass  = " ui-body-" + theme,
			focusedEl, clearbtn;

		$( "label[for='" + input.attr( "id" ) + "']" ).addClass( "ui-input-text" );

		focusedEl = input.addClass("ui-input-text ui-body-"+ theme );

		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof input[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}


		//"search" input widget
		if ( input.is( "[type='search'],:jqmData(type='search')" ) ) {

			focusedEl = input.wrap( "<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + themeclass + "'></div>" ).parent();
			clearbtn = $( "<a href='#' class='ui-input-clear' title='clear text'>clear text</a>" )
				.tap(function( event ) {
					input.val( "" ).focus();
					input.trigger( "change" );
					clearbtn.addClass( "ui-input-clear-hidden" );
					event.preventDefault();
				})
				.appendTo( focusedEl )
				.buttonMarkup({
					icon: "delete",
					iconpos: "notext",
					corners: true,
					shadow: true
				});

			function toggleClear() {
				setTimeout(function() {
					clearbtn.toggleClass( "ui-input-clear-hidden", !input.val() );
				}, 0);
			}

			toggleClear();

			input.bind('paste cut keyup focus change blur', toggleClear);

		} else {
			input.addClass( "ui-corner-all ui-shadow-inset" + themeclass );
		}

		input.focus(function() {
				focusedEl.addClass( "ui-focus" );
			})
			.blur(function(){
				focusedEl.removeClass( "ui-focus" );
			});

		// autogrow and autoshrink - "elastic" plugin
		
		/**
		*	@name							Elastic
		*	@descripton						Elastic is jQuery plugin that grow and shrink your textareas automatically
		*	@version						1.6.11
		*	@requires						jQuery 1.2.6+
		*
		*	@author							Jan Jarfalk
		*	@author-email					jan.jarfalk@unwrongest.com
		*	@author-website					http://www.unwrongest.com
		*
		*	@licence						MIT License - http://www.opensource.org/licenses/mit-license.php
		*/
		
		(function($){ 
			jQuery.fn.extend({  
				elastic: function() {
				
					//	We will create a div clone of the textarea
					//	by copying these attributes from the textarea to the div.
					var mimics = [
						'paddingTop',
						'paddingRight',
						'paddingBottom',
						'paddingLeft',
						'fontSize',
						'lineHeight',
						'fontFamily',
						'width',
						'fontWeight',
						'border-top-width',
						'border-right-width',
						'border-bottom-width',
						'border-left-width',
						'borderTopStyle',
						'borderTopColor',
						'borderRightStyle',
						'borderRightColor',
						'borderBottomStyle',
						'borderBottomColor',
						'borderLeftStyle',
						'borderLeftColor'
						];
					
					return this.each( function() {
		
						// Elastic only works on textareas
						if ( this.type !== 'textarea' ) {
							return false;
						}
							
					var $textarea	= jQuery(this),
						$twin		= jQuery('<div />').css({
							'position'		: 'absolute',
							'display'		: 'none',
							'word-wrap'		: 'break-word',
							'white-space'	:'pre-wrap'
						}),
						
						lineHeight	= parseInt($textarea.css('line-height'),10) || parseInt($textarea.css('font-size'),'10'),
						minheight	= parseInt($textarea.css('height'),10) || lineHeight*3,
						maxheight	= parseInt($textarea.css('max-height'),10) || Number.MAX_VALUE,
						goalheight	= 0;
						
						// Opera returns max-height of -1 if not set
						if (maxheight < 0) { maxheight = Number.MAX_VALUE; }
							
						// Append the twin to the DOM
						// We are going to meassure the height of this, not the textarea.
						$twin.appendTo($textarea.parent());
						
						// Copy the essential styles (mimics) from the textarea to the twin
						var i = mimics.length;
						while(i--){
							$twin.css(mimics[i].toString(),$textarea.css(mimics[i].toString()));
						}
						
						// Updates the width of the twin. (solution for textareas with widths in percent)
						function setTwinWidth(){
							var curatedWidth = Math.floor(parseInt($textarea.width(),10));
							if($twin.width() !== curatedWidth){
								$twin.css({'width': curatedWidth + 'px'});
								
								// Update height of textarea
								update(true);
							}
						}
						
						// Sets a given height and overflow state on the textarea
						function setHeightAndOverflow(height, overflow){
						
							var curratedHeight = Math.floor(parseInt(height,10));
							if($textarea.height() !== curratedHeight){
								$textarea.css({'height': curratedHeight + 'px','overflow':overflow});
							}
						}
						
						// This function will update the height of the textarea if necessary 
						function update(forced) {
							
							// Get curated content from the textarea.
							var textareaContent = $textarea.val().replace(/&/g,'&amp;').replace(/ {2}/g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');
							
							// Compare curated content with curated twin.
							var twinContent = $twin.html().replace(/<br>/ig,'<br />');
							
							if(forced || textareaContent+'&nbsp;' !== twinContent){
							
								// Add an extra white space so new rows are added when you are at the end of a row.
								$twin.html(textareaContent+'&nbsp;');
								
								// Change textarea height if twin plus the height of one line differs more than 3 pixel from textarea height
								if(Math.abs($twin.height() + lineHeight - $textarea.height()) > 3){
									
									var goalheight = $twin.height()+lineHeight;
									if(goalheight >= maxheight) {
										setHeightAndOverflow(maxheight,'auto');
									} else if(goalheight <= minheight) {
										setHeightAndOverflow(minheight,'hidden');
									} else {
										setHeightAndOverflow(goalheight,'hidden');
									}
									
								}
								
							}
							
						}
						
						// Hide scrollbars
						$textarea.css({'overflow':'hidden'});
						
						// Update textarea size on keyup, change, cut and paste
						$textarea.bind('keyup change cut paste', function(){
							update(); 
						});
						
						// Update width of twin if browser or textarea is resized (solution for textareas with widths in percent)
						$(window).bind('resize', setTwinWidth);
						$textarea.bind('resize', setTwinWidth);
						$textarea.bind('update', update);
						
						// Compact textarea on blur
						$textarea.bind('blur',function(){
							if($twin.height() < maxheight){
								if($twin.height() > minheight) {
									$textarea.height($twin.height()+lineHeight);
								} else {
									$textarea.height(minheight);
								}
							}
						});
						
						// And this line is to catch the browser paste event
						$textarea.bind('input paste',function(e){ setTimeout( update, 250); });				
						
						// Run update once when elastic is initialized
						update();
						
					});
					
		        } 
		    }); 
		})(jQuery);
		
		// add elasticity to all textareas
		$(document).ready(function() {
		  $('textarea').elastic();
		});

	},

	disable: function(){
		( this.element.attr( "disabled", true ).is( "[type='search'],:jqmData(type='search')" ) ?
			this.element.parent() : this.element ).addClass( "ui-disabled" );
	},

	enable: function(){
		( this.element.attr( "disabled", false).is( "[type='search'],:jqmData(type='search')" ) ?
			this.element.parent() : this.element ).removeClass( "ui-disabled" );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.textinput.prototype.enhanceWithin( e.target );
});

})( jQuery );
