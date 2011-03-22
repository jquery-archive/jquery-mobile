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
			label = input.closest("form,fieldset,:jqdata(role='page')").find("label").filter("[for=" + input[0].id + "]"),
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
			this.options.theme = this.element.mobileData( "theme" );
		}

		label
			.buttonMarkup({
				theme: this.options.theme,
				icon: this.element.parents( ":jqdata(type='horizontal')" ).length ? undefined : uncheckedicon,
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

			"touchmove": function( event ){
				var oe = event.originalEvent.touches[0];
				if( label.mobileData("movestart") ){
					if( Math.abs( label.mobileData("movestart")[0] - oe.pageX ) > 10 ||
						Math.abs( label.mobileData("movestart")[1] - oe.pageY ) > 10 ){
							label.mobileData("moved", true);
						}
				}
				else{
					label.mobileData("movestart", [ parseFloat( oe.pageX ), parseFloat( oe.pageY ) ]);
				}
			},

			"touchend mouseup": function( event ){
				if ( input.is( ":disabled" ) ){
					event.preventDefault();
					return;
				}

				label.removeData("movestart");
				if( label.mobileData("etype") && label.mobileData("etype") !== event.type || label.mobileData("moved") ){
					label.removeData("etype").removeData("moved");
					if( label.mobileData("moved") ){
						label.removeData("moved");
					}
					return false;
				}
				label.mobileData( "etype", event.type );
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
			$(this).mobileData("cacheVal", $(this).is(":checked") );
		});
	},

	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function(){
		return this.element.closest( "form,fieldset,:jqdata(role='page')" )
				.find( "input[name='"+ this.element.attr( "name" ) +"'][type='"+ this.inputtype +"']" );
	},

	_updateAll: function(){
		this._getInputSet().each(function(){
			var dVal = $(this).mobileData("cacheVal");
			if( dVal && dVal !== $(this).is(":checked") || this.inputtype === "checkbox" ){
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
