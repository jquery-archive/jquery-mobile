/*
* jQuery Mobile Framework : "checkboxradio" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/  
(function($, undefined ) {
$.widget( "mobile.checkboxradio", $.mobile.widget, {
	options: {
		theme: null
	},
	_create: function(){
		var self = this,
			input = this.element,
			label = input.closest("form,fieldset,[data-role='page']").find("label[for='" + input.attr( "id" ) + "']"),
			inputtype = input.attr( "type" ),
			checkedicon = "ui-icon-" + inputtype + "-on",
			uncheckedicon = "ui-icon-" + inputtype + "-off";

		if ( inputtype != "checkbox" && inputtype != "radio" ) { return; }

		// If there's no selected theme...
		if( !this.options.theme ) {
			this.options.theme = this.element.data( "theme" );
		}

		label
			.buttonMarkup({
				theme: this.options.theme,
				icon: this.element.parents( "[data-type='horizontal']" ).length ? undefined : uncheckedicon,
				shadow: false
			});
		
		// wrap the input + label in a div 
		input
			.add( label )
			.wrapAll( "<div class='ui-" + inputtype +"'></div>" );
		
		label.bind({
			mouseover: function() {
				if( $(this).parent().is('.ui-disabled') ){ return false; }
			},
			
			"touchend mouseup": function( event ){
				//prevent both events from firing, keep the first
				if( $(this).parent().is('.ui-disabled') || $(this).data("prevEvent") && $(this).data("prevEvent") !== event.type ){ 
					return false;
				}
				$(this).data("prevEvent", event.type);
				setTimeout(function(){
					label.removeData("prevEvent");
				}, 1000);
				
				self._cacheVals();
				
				input.attr( "checked", inputtype === "radio" && true || !input.is( ":checked" ) );
				self._updateAll();
				event.preventDefault();
			},
			
			click: false
			
		});
		
		input
			.bind({
				mousedown: function(){
					this._cacheVals();
				},
				
				click: function(){
					self._updateAll();
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
	
	_cacheVals: function(){
		this._getInputSet().each(function(){
			$(this).data("cacheVal", $(this).is(":checked") );
		});	
	},
		
	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function(){
		return this.element.closest( "form,fieldset,[data-role='page']" )
				.find( "input[name='"+ this.element.attr( "name" ) +"'][type='"+ this.element.attr( "type" ) +"']" );
	},
	
	_updateAll: function(){
		this._getInputSet().each(function(){
			var dVal = $(this).data("cacheVal");
			if( dVal && dVal !== $(this).is(":checked") || $(this).is( "[type='checkbox']" ) ){
				$(this).trigger("change");
			}
		})
		.checkboxradio( "refresh" );
	},
	
	refresh: function( ){
		var input = this.element,
			label = input.closest("form,fieldset,[data-role='page']").find("label[for='" + input.attr( "id" ) + "']"),
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
		
		if( input.is( ":disabled" ) ){
			this.disable();
		}
		else {
			this.enable();
		}
	},
	
	disable: function(){
		this.element.attr("disabled",true).parent().addClass("ui-disabled");
	},
	
	enable: function(){
		this.element.attr("disabled",false).parent().removeClass("ui-disabled");
	}
});
})( jQuery );
