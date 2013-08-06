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
			
			this.element.css( "height", "0px" );

			var paddingTop, paddingBottom, paddingHeight,
				scrollHeight = this.element[ 0 ].scrollHeight,
				clientHeight = this.element[ 0 ].clientHeight,
				borderTop = parseFloat( this.element.css( "border-top-width" ) ),
				borderBottom = parseFloat( this.element.css( "border-bottom-width" ) ),
				borderHeight = borderTop + borderBottom,
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
