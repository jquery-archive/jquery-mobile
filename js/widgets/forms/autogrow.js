//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Enhances and consistently styles text inputs.
//>>label: Textarea Autosize
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "../../jquery.mobile.degradeInputs", "../../jquery.mobile.zoom", "./textinput" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.textinput", $.mobile.textinput, {
		options: {
			autogrow:true,
			keyupTimeoutBuffer: 100
		},

		_create: function() {
			this._super();

			if ( this.options.autogrow && this.isTextarea ) {
				this._autogrow();
			}
		},

		_autogrow: function() {
			this._on({
				"keyup": "_timeout",
				"change": "_timeout",
				"input": "_timeout",
				"paste": "_timeout",
			});

			// Issue 509: the browser is not providing scrollHeight properly until the styles load
			if ( $.trim( this.element.val() ) ) {
				// bind to the window load to make sure the height is calculated based on BOTH
				// the DOM and CSS
				// binding to pagechange here ensures that for pages loaded via
				// ajax the height is recalculated without user input
				this._on( true, $.mobile.window, {
					"load": "_timeout",
					"pagechange": "_timeout"
				});
			}
		},

		_unbindAutogrow: function() {
			this._off( this.element, "keyup change input paste" );
			this._off( $.mobile.window, "load pagechange" );
		},

		keyupTimeout:null,

		_timeout: function() {
			clearTimeout( this.keyupTimeout );
			this.keyupTimeout = this._delay( "_updateHeight", this.options.keyupTimeoutBuffer );
		},

		_updateHeight:function() {
			
			this.element.css( "height", "auto" );

			var scrollHeight = this.element[0].scrollHeight,
				borderTop = parseFloat( this.element.css( "border-top-width" ) ),
				borderBottom = parseFloat( this.element.css( "border-bottom-width" ) ),
				borderHeight = borderTop + borderBottom,
				extraLineHeight = ( this.options.disabled ) ? 0 : 15,
				height = scrollHeight + borderHeight + extraLineHeight;

			this.element.css( "height", height + "px" );
		},

		_setOptions: function( options ){

			this._super( options );
			
			if ( options.autogrow !== undefined && this.isTextarea ){
				if ( options.autogrow ){
					this._autogrow();
				} else {
					this._unbindAutogrow();
				}
			}
		}

	});
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
