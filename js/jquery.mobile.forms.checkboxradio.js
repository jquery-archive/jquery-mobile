/*
* jQuery Mobile Framework : "customCheckboxRadio" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function ( $ ) {
$.widget( "mobile.checkboxradio", $.mobile.widget, {
	options: {
		theme: undefined,
		icon: undefined
	},
	_create: function(){
		var input = this.element,
			label = jQuery("label[for='" + input.attr( "id" ) + "']"),
			inputtype = input.attr( "type" ),
			checkedicon = "ui-icon-" + inputtype + "-on",
			uncheckedicon = "ui-icon-" + inputtype + "-off";

		if ( inputtype != "checkbox" && inputtype != "radio" ) { return; }
						
		label
			.buttonMarkup({
				iconpos: this.options.icon,
				theme: this.options.theme,
				icon: this.options.icon ? uncheckedicon : ( this.element.parents( "[data-type='horizontal']" ).length ? undefined : uncheckedicon ),
				shadow: false
			});
		
		// wrap the input + label in a div 
		input
			.add( label )
			.wrapAll( "<div class='ui-" + inputtype +"'></div>" );
		
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

				click: function() {
					jQuery( "input[name='" + input.attr( "name" ) + "']" ).checkboxradio( "refresh" );
				},

				focus: function() { 
					label.addClass( "ui-focus" ); 
				},

				blur: function() {
					label.removeClass( "ui-focus" );
				}
			});
			
		this.refresh();
		
	},
	
	refresh: function( ){
		var input = this.element,
			label = jQuery("label[for='" + input.attr( "id" ) + "']"),
			inputtype = input.attr( "type" ),
			icon = label.find( ".ui-icon" ),
			checkedicon = "ui-icon-" + inputtype + "-on",
			uncheckedicon = "ui-icon-" + inputtype + "-off";
		
		if ( input[0].checked ) {
			label.addClass( "ui-btn-active" );
			icon.addClass( checkedicon );
			icon.removeClass( uncheckedicon );

		} else {
			label.removeClass( "ui-btn-active" ); 
			icon.removeClass( checkedicon );
			icon.addClass( uncheckedicon );
		}
	}
});
})( jQuery );
