define( [ "jquery" ], function( $ ) {

return {
	setup: function() {
		var that = this;

		this.template = $( "#sparing-check" ).clone();
		this.listview = $( "#sparing-check" ).listview().listview( "instance" );
		this.newItem = $( "<li>Something</li>" ).insertAfter( "#sparing-check-first-item" );
		this.calls = [];
		this._addClass = $.mobile.listview.prototype._addClass;

		$.mobile.listview.prototype._addClass = function() {
			that.calls.push( arguments );
			return that._addClass.apply( this, arguments );
		};
	},
	teardown: function() {
		$( "#sparing-check" ).before( this.template ).remove();
		$.mobile.listview.prototype._addClass = this._addClass;
	}
};

} );
