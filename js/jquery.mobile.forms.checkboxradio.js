/*
* jQuery Mobile Framework : "customCheckboxRadio" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function(jQuery){

jQuery.fn.customCheckboxRadio = function( options ) {
	return this.each(function() {
		var input = jQuery( this ),
			type = input.attr( "type" );

		if ( type === "checkbox" || type === "radio" ) {
			var o = jQuery.extend({
				theme: input.data( "theme" ),
				icon: input.data( "icon" ) || !input.parents( "[data-type='horizontal']" ).length,
				checkedicon: "ui-icon-" + type + "-on",
				uncheckedicon: "ui-icon-" + type + "-off"
			}, options );
			
			// get the associated label using the input's id
			var label = jQuery("label[for='" + input.attr( "id" ) + "']")
				.buttonMarkup({
					iconpos: o.icon ? "left" : "",
					theme: o.theme,
					icon: o.icon ? o.uncheckedicon : null,
					shadow: false
				});
						
			var icon = label.find( ".ui-icon" );
			
			// wrap the input + label in a div 
			input
				.add( label )
				.wrapAll( "<div class='ui-" + type +"'></div>" );
			
			// necessary for browsers that don't support the :hover pseudo class on labels
			label.bind({
				mousedown: function() {
					label.data( "state", input.attr( "checked" ) );
				},
				click: function() {
					setTimeout(function() {
						if ( input.attr( "checked" ) === label.data( "state" ) ) {
							input.trigger( "click" );
						}
					}, 1);
				}
			});
			
			//bind custom event, trigger it, bind click,focus,blur events					
			input
				.bind({
					updateState: function() {
						if ( this.checked ) {
							label.addClass( "ui-btn-active" );
							icon.addClass( o.checkedicon );
							icon.removeClass( o.uncheckedicon );

						} else {
							label.removeClass( "ui-btn-active" ); 
							icon.removeClass( o.checkedicon );
							icon.addClass( o.uncheckedicon );
						}
					},

					click: function() {
						jQuery( "input[name='" + input.attr( "name" ) + "']" ).trigger( "updateState" );
					},

					focus: function() { 
						label.addClass( "ui-focus" ); 
					},

					blur: function() {
						label.removeClass( "ui-focus" );
					}
				})
				.trigger( "updateState" );
		}
	});
};

})(jQuery);
