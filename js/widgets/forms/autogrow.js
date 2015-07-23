/*!
 * jQuery Mobile Autogrow @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Textarea Autogrow
//>>group: Forms
//>>description: Textarea elements automatically grow/shrink to accommodate their contents.
//>>docs: http://api.jquerymobile.com/textinput/#option-autogrow
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.autogrow.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./textinput" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.textinput", $.mobile.textinput, {
	options: {
		autogrow: true,
		keyupTimeoutBuffer: 100
	},

	_create: function() {
		this._super();

		if ( this.options.autogrow && this.isTextarea ) {
			this._autogrow();
		}
	},

	_autogrow: function() {
		this._addClass( "ui-textinput-autogrow" );

		this._on( {
			"keyup": "_timeout",
			"change": "_timeout",
			"input": "_timeout",
			"paste": "_timeout"
		} );

		// Attach to the various you-have-become-visible notifications that the
		// various framework elements emit.
		// TODO: Remove all but the updatelayout handler once #6426 is fixed.
		this._handleShow( "create" );
		this._on( true, this.document, {
			"popupbeforeposition": "_handleShow",
			"updatelayout": "_handleShow",
			"panelopen": "_handleShow"
		} );
	},

	// Synchronously fix the widget height if this widget's parents are such
	// that they show/hide content at runtime. We still need to check whether
	// the widget is actually visible in case it is contained inside multiple
	// such containers. For example: panel contains collapsible contains
	// autogrow textinput. The panel may emit "panelopen" indicating that its
	// content has become visible, but the collapsible is still collapsed, so
	// the autogrow textarea is still not visible.
	_handleShow: function( event ) {
		if ( event === "create" || ( $.contains( event.target, this.element[ 0 ] ) &&
				this.element.is( ":visible" ) ) ) {

			if ( event !== "create" && event.type !== "popupbeforeposition" ) {
				this._addClass( "ui-textinput-autogrow-resize" );
				this.element
					.animationComplete(
						$.proxy( function() {
							this._removeClass( "ui-textinput-autogrow-resize" );
						}, this ),
						"transition" );
			}
			this._prepareHeightUpdate();
		}
	},

	_unbindAutogrow: function() {
		this._removeClass( "ui-textinput-autogrow" );
		this._off( this.element, "keyup change input paste" );
		this._off( this.document,
			"pageshow popupbeforeposition updatelayout panelopen" );
	},

	keyupTimeout: null,

	_prepareHeightUpdate: function( delay ) {
		if ( this.keyupTimeout ) {
			clearTimeout( this.keyupTimeout );
		}
		if ( delay === undefined ) {
			this._updateHeight();
		} else {
			this.keyupTimeout = this._delay( "_updateHeight", delay );
		}
	},

	_timeout: function() {
		this._prepareHeightUpdate( this.options.keyupTimeoutBuffer );
	},

	_updateHeight: function() {
		var paddingTop, paddingBottom, paddingHeight, scrollHeight, clientHeight,
			borderTop, borderBottom, borderHeight, height,
			scrollTop = this.window.scrollTop();
		this.keyupTimeout = 0;

		// IE8 textareas have the onpage property - others do not
		if ( !( "onpage" in this.element[ 0 ] ) ) {
			this.element.css( {
				"height": 0,
				"min-height": 0,
				"max-height": 0
			} );
		}

		scrollHeight = this.element[ 0 ].scrollHeight;
		clientHeight = this.element[ 0 ].clientHeight;
		borderTop = parseFloat( this.element.css( "border-top-width" ) );
		borderBottom = parseFloat( this.element.css( "border-bottom-width" ) );
		borderHeight = borderTop + borderBottom;
		height = scrollHeight + borderHeight + 15;

		// Issue 6179: Padding is not included in scrollHeight and
		// clientHeight by Firefox if no scrollbar is visible. Because
		// textareas use the border-box box-sizing model, padding should be
		// included in the new (assigned) height. Because the height is set
		// to 0, clientHeight == 0 in Firefox. Therefore, we can use this to
		// check if padding must be added.
		if ( clientHeight === 0 ) {
			paddingTop = parseFloat( this.element.css( "padding-top" ) );
			paddingBottom = parseFloat( this.element.css( "padding-bottom" ) );
			paddingHeight = paddingTop + paddingBottom;

			height += paddingHeight;
		}

		this.element.css( {
			"height": height,
			"min-height": "",
			"max-height": ""
		} );

		this.window.scrollTop( scrollTop );
	},

	refresh: function() {
		if ( this.options.autogrow && this.isTextarea ) {
			this._updateHeight();
		}
	},

	_setOptions: function( options ) {

		this._super( options );

		if ( options.autogrow !== undefined && this.isTextarea ) {
			if ( options.autogrow ) {
				this._autogrow();
			} else {
				this._unbindAutogrow();
			}
		}
	},

	_destroy: function() {
		this._unbindAutogrow();
		this._super();
	}

} );
} );
