/*
* "checkboxradio" plugin
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for checkboxes/radio buttons.
//>>label: Checkboxes & Radio Buttons
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.checkboxradio.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"../../jquery.mobile.core",
	"../../jquery.mobile.widget",
	"../optionDemultiplexer",
	"./reset" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.checkboxradio", $.extend( {
	options: {
		theme: null,
		mini: false
	},
	_create: function() {
		var input = this.element,
			o = this.options,
			inheritAttr = function( input, dataAttr ) {
				return input.jqmData( dataAttr ) || input.closest( "form, fieldset" ).jqmData( dataAttr );
			},
			// NOTE: Windows Phone could not find the label through a selector
			// filter works though.
			parentLabel = $( input ).closest( "label" ),
			label = parentLabel.length ? parentLabel : $( input ).closest( "form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')" ).find( "label" ).filter( "[for='" + input[0].id + "']" ).first(),
			inputtype = input[0].type,
			checkedState = inputtype + "-on",
			uncheckedState = inputtype + "-off",
			iconpos = inheritAttr( input, "iconpos" ) || label.jqmData( "iconpos" ) || "left",
			checkedClass = "ui-" + checkedState,
			uncheckedClass = "ui-" + uncheckedState,
			wrapper;

		if ( inputtype !== "checkbox" && inputtype !== "radio" ) {
			return;
		}

		// Establish options
		o.mini = inheritAttr( input, "mini" ) || o.mini;

		// Expose for other methods
		$.extend( this, {
			iconpos: iconpos,
			input: input,
			label: label,
			inputtype: inputtype,
			checkedClass: checkedClass,
			uncheckedClass: uncheckedClass,
			checkedicon: checkedState,
			uncheckedicon: uncheckedState
		});

		// Wrap the input + label in a div
		wrapper = document.createElement( "div" );
		wrapper.className = "ui-" + inputtype;
		input.add( label ).wrapAll( wrapper );
		label.addClass( "ui-btn ui-corner-all ui-btn-icon-" + iconpos );

		this._on( label, {
			vmouseover: "_handleLabelVMouseOver",
			vclick: "_handleLabelVClick"
		});

		this._on( input, {
			vmousedown: "_cacheVals",
			vclick: "_handleInputVClick",
			focus: "_handleInputFocus",
			blur: "_handleInputBlur"
		});

		this._handleFormReset();
		this._setOptions( o );
		this.refresh();
	},

	_handleInputFocus: function() {
		this.label.addClass( $.mobile.focusClass );
	},

	_handleInputBlur: function() {
		this.label.removeClass( $.mobile.focusClass );
	},

	_handleInputVClick: function() {
		var $this = this.element;

		// Adds checked attribute to checked input when keyboard is used
		if ( $this.is( ":checked" ) ) {

			$this.prop( "checked", true);
			this._getInputSet().not( $this ).prop( "checked", false );
		} else {
			$this.prop( "checked", false );
		}

		this._updateAll();
	},

	_handleLabelVMouseOver: function( event ) {
		if ( this.label.parent().hasClass( "ui-state-disabled" ) ) {
			event.stopPropagation();
		}
	},

	_handleLabelVClick: function( event ) {
		var input = this.element;

		if ( input.is( ":disabled" ) ) {
			event.preventDefault();
			return;
		}

		this._cacheVals();

		input.prop( "checked", this.inputtype === "radio" && true || !input.prop( "checked" ) );

		// trigger click handler's bound directly to the input as a substitute for
		// how label clicks behave normally in the browsers
		// TODO: it would be nice to let the browser's handle the clicks and pass them
		//       through to the associate input. we can swallow that click at the parent
		//       wrapper element level
		input.triggerHandler( "click" );

		// Input set for common radio buttons will contain all the radio
		// buttons, but will not for checkboxes. clearing the checked status
		// of other radios ensures the active button state is applied properly
		this._getInputSet().not( input ).prop( "checked", false );

		this._updateAll();
		return false;
	},

	_cacheVals: function() {
		this._getInputSet().each( function() {
			$( this ).jqmData( "cacheVal", this.checked );
		});
	},

	//returns either a set of radios with the same name attribute, or a single checkbox
	_getInputSet: function() {
		if ( this.inputtype === "checkbox" ) {
			return this.element;
		}

		return this.element.closest( "form, :jqmData(role='page'), :jqmData(role='dialog')" )
			.find( "input[name='" + this.element[ 0 ].name + "'][type='" + this.inputtype + "']" );
	},

	_updateAll: function() {
		var self = this;

		this._getInputSet().each( function() {
			var $this = $( this );

			if ( this.checked || self.inputtype === "checkbox" ) {
				$this.trigger( "change" );
			}
		})
		.checkboxradio( "refresh" );
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		var input = this.element[ 0 ],
			active = " " + $.mobile.activeBtnClass,
			hasIcon = ( this.element.parents( ".ui-controlgroup-horizontal" ).length === 0 ),
			checkedClass = this.checkedClass + ( hasIcon ? "" : active ),
			label = this.label;

		label
			.toggleClass( "ui-btn-icon-" + this.iconpos, hasIcon )
			.toggleClass( "ui-icon-" + this.checkedicon, input.checked )
			.toggleClass( "ui-icon-" + this.uncheckedicon, !input.checked );
		if ( input.checked ) {
			label.removeClass( this.uncheckedClass + active ).addClass( checkedClass );
		} else {
			label.removeClass( checkedClass ).addClass( this.uncheckedClass );
		}

		if ( input.disabled ) {
			this.disable();
		} else {
			this.enable();
		}
	},

	_setTheme: function( value ) {
		if ( value ) {
			this.label.removeClass( "ui-btn-" + this.options.theme ).addClass( "ui-btn-" + value );
		}
	},

	_setMini: function( value ) {
		/* TODO: expose the wrapper in _create */
		this.label.parent().toggleClass( "ui-mini", !!value );
	},

	widget: function() {
		return this.label.parent();
	},

	disable: function() {
		this._super();
		this.input.prop( "disabled", true );
	},

	enable: function() {
		this._super();
		this.input.prop( "disabled", false );
	}

}, $.mobile.behaviors.formReset, $.mobile.behaviors.optionDemultiplexer ) );

$.mobile.checkboxradio.initSelector = "input[type='checkbox'],input[type='radio']";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.checkboxradio" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
