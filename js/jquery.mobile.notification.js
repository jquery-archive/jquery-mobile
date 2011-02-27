/*
* jQuery Mobile Framework : Growl-like notification widget
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function( $, undefined ) {

var $messageBox = null;

$.widget( "mobile.notification", $.mobile.widget, {
	options: {
		fadeDelay : 800,
		text : ""
	},

	_create: function() {
		var $el = this.element;

		$el.addClass( "ui-loader ui-overlay-shadow ui-body-e ui-corner-all" );
		$el.attr( "data-role", "message-box" );

		this._text = $( "<h1></h1>" );
		$el.append( this._text );

		this.option( this.options );
	},

	_setOption: function( name, value ) {
		if ( ( name in this.options ) && ( name in this ) )
			this[name]( value );
	},

	fadeDelay: function( delay ) {
		if ( delay === undefined )
			return this.options.fadeDelay;
		this.options.fadeDelay = delay;
	},

	text: function( text ) {
		if ( text === undefined )
			return this.options.text;

		this._text.text( text );
		this.options.text = text;
	},

	show: function() {
		this.element.clearQueue();

		this.element.css( { "display" : "block", "opacity" : 0.96, "top" : $(window).scrollTop() + 100 } )
			.appendTo( $.mobile.pageContainer )
			.delay( this.options.fadeDelay )
			.fadeOut( 400, function(){ $(this).css( "display", "none" ); } );
	}
});

$.mobile.messageBox = function( message, delay ) {
	if ( $messageBox === null)
		$messageBox = $( "<div></div>" );

	// 800ms delay before fade out is default.
	if ( delay === undefined )
		delay = 800;
	
	$messageBox.notification( { "text" : message, "fadeDelay" : delay } );
	$messageBox.notification( "show" );
};

})(jQuery);
