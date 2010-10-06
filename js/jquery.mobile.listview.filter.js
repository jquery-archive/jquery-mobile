(function( $ ) {

$.mobile.listview.prototype.options.filter = false;

$( ":mobile-listview" ).live( "listviewcreate", function() {
	var list = $( this );
	if ( !list.data( "listview" ).options.filter ) {
		return;
	}

	var wrapper = $( "<form>", { 'class': "ui-listview-filter ui-bar-c"} ),
		
		search = $( "<input>", { placeholder: "Filter results...", "data-type": "search" })
			.keyup(function() {
				var val = this.value;
				list.children().show();
				if ( val ) {
					list.children().filter(function() {
						return $( this ).text().indexOf( val ) === -1;
					}).hide();
				}
			})
			.appendTo( wrapper )
			.customTextInput();

	
	wrapper.insertBefore( list );
});

})( jQuery );
