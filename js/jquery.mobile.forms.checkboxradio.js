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
			//NOTE: Windows Phone could not find the label through a selector
			//filter works though.
			label = input.closest("form,fieldset,:jqmData(role='page')").find("label").filter("[for=" + input[0].id + "]"),
			inputtype = input.attr( "type" ),
			checkedicon = "ui-icon-" + inputtype + "-on",
			uncheckedicon = "ui-icon-" + inputtype + "-off";

		if ( inputtype != "checkbox" && inputtype != "radio" ) { return; }

		//expose for other methods
		$.extend( this,{
			label			: label,
			inputtype		: inputtype,
			checkedicon		: checkedicon,
			uncheckedicon	: uncheckedicon
		});

		// If there's no selected theme...
		if( !this.options.theme ) {
			this.options.theme = this.element.jqmData( "theme" );
		}

		label
			.buttonMarkup({
				theme: this.options.theme,
				icon: this.element.parents( ":jqmData(type='horizontal')" ).length ? undefined : uncheckedicon,
				shadow: false
			});

		// wrap the input + label in a div
		input
			.add( label )
			.wrapAll( "<div class='ui-" + inputtype +"'></div>" );

		label.bind({
			vmouseover: function() {
				if( $(this).parent().is('.ui-disabled') ){ return false; }
			},

			vclick: function( event ){
				if ( input.is( ":disabled" ) ){
					event.preventDefault();
					return;
				}

				self._cacheVals();
				input.attr( "checked", inputtype === "radio" && true || !input.is( ":checked" ) );
				self._updateAll();
				return false;
			}

		});

		input
			.bind({
				vmousedown: function(){
					this._cacheVals();
				},

				vclick: function(){
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
			$(this).jqmData("cacheVal", $(this).is(":checked") );
		});
	},

	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function(){
		return this.element.closest( "form,fieldset,:jqmData(role='page')" )
				.find( "input[name='"+ this.element.attr( "name" ) +"'][type='"+ this.inputtype +"']" );
	},

	_updateAll: function(){
		var self = this;

		this._getInputSet().each(function(){
			if( $(this).is(":checked") || self.inputtype === "checkbox" ){
				$(this).trigger("change");
			}
		})
		.checkboxradio( "refresh" );
	},

	refresh: function( ){
		var input = this.element,
			label = this.label,
			icon = label.find( ".ui-icon" );

		if ( input[0].checked ) {
			label.addClass( $.mobile.activeBtnClass );
			icon.addClass( this.checkedicon ).removeClass( this.uncheckedicon );

		} else {
			label.removeClass( $.mobile.activeBtnClass );
			icon.removeClass( this.checkedicon ).addClass( this.uncheckedicon );
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
