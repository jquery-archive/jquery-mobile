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
	"./reset" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.checkboxradio", $.extend( {
	options: {
		theme: "inherit",
		mini: false,
		wrapperClass: null,
		enhanced: false,
		iconpos: "left"

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
			checkedClass = "ui-" + checkedState,
			uncheckedClass = "ui-" + uncheckedState;

		if ( inputtype !== "checkbox" && inputtype !== "radio" ) {
			return;
		}

		if ( this.element[0].disabled ){
			this.options.disabled = true;
		}

		o.iconpos = inheritAttr( input, "iconpos" ) || label.attr( "data-" + $.mobile.ns + "iconpos" ) || o.iconpos,

		// Establish options
		o.mini = inheritAttr( input, "mini" ) || o.mini;

		// Expose for other methods
		$.extend( this, {
			input: input,
			label: label,
			inputtype: inputtype,
			checkedClass: checkedClass,
			uncheckedClass: uncheckedClass,
			checkedicon: checkedState,
			uncheckedicon: uncheckedState
		});

		if ( !this.options.enhanced ) {
			this._enhance();
		}

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
		this.refresh();
	},

	_enhance: function() {

		this.label.addClass( "ui-btn ui-corner-all");
		// Wrap the input + label in a div
		this.input.add( this.label ).wrapAll( this._wrapper() );
		this._setOptions({
			"theme": this.options.theme,
			"iconpos": this.options.iconpos,
			"mini": this.options.mini
		});

	},

	_wrapper: function() {
		return $( "<div class='"  + ( this.options.wrapperClass ? this.options.wrapperClass : "" ) + " ui-" + this.inputtype + ( this.options.disabled ? " ui-disabled" : "" ) + "' >" );
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

	enable: function() {
		this._setOptions({
			"disabled": false
		});
	},

	disable: function() {
		this._setOptions({
			"disabled": true
		});
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
			$( this ).attr("data-" + $.mobile.ns + "cacheVal", this.checked );
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
			.toggleClass( "ui-icon-" + this.checkedicon, input.checked )
			.toggleClass( "ui-icon-" + this.uncheckedicon, !input.checked );
		if ( input.checked ) {
			label.removeClass( this.uncheckedClass + active ).addClass( checkedClass );
		} else {
			label.removeClass( checkedClass ).addClass( this.uncheckedClass );
		}
	},

	widget: function() {
		return this.label.parent();
	},

	_setOptions: function( options ) {
		if ( options.disabled !== undefined ) {
			this.input.prop( "disabled", !!options.disabled );
			this.widget().toggleClass( "ui-disabled", !!options.disabled );
		}
		if ( options.mini !== undefined ) {
			this.label.parent().toggleClass( "ui-mini", !!options.mini );
		}
		if ( options.theme !== undefined ) {
			this.label.removeClass( "ui-btn-" + this.options.theme ).addClass( "ui-btn-" + options.theme );
		}
		if ( options.wrapperClass !== undefined ) {
			this.widget().removeClass( this.options.wrapperClass ).addClass( options.wrapperClass );
		}
		if ( options.iconpos !== undefined && ( this.element.parents( "[data-" + $.mobile.ns + "type='horizontal']" ).length === 0 ) ) {
			this.label.removeClass( "ui-btn-icon-" + this.options.iconpos ).addClass( "ui-btn-icon-" + options.iconpos );
		} else if ( this.element.parents( "[data-" + $.mobile.ns + "type='horizontal']" ).length !== 0 ){
			this.label.removeClass( "ui-btn-icon-" + this.options.iconpos );
		}
		this._super( options );
	}

}, $.mobile.behaviors.formReset ) );

$.mobile.checkboxradio.initSelector = "input:not( :jqmData(role='flipswitch' ) )[type='checkbox'],input[type='radio']:not( :jqmData(role='flipswitch' ))";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.checkboxradio" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
