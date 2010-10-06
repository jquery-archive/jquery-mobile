(function( $ ) {

$.mobile.listview.prototype.options.filter = false;

$( ":mobile-listview" ).live( "listviewcreate", function() {
	var list = $( this );
	if ( !list.data( "listview" ).options.filter ) {
		return;
	}

	var wrapper = $( "<form>", { class: "ui-bar-c"} ),
		
		search = $( "<input>", { placeholder: "Filter results...", "data-type": "search" })
			.keyup(function() {
				var val = this.value,
					visible = list.children().show().length;
				if ( val ) {
					visible -= list.children().filter(function() {
						return $( this ).text().indexOf( val ) === -1;
					}).hide().length;
				}
				count.text( visible );
				multiple.toggle( visible !== 1 );
			})
			.appendTo( wrapper )
			.customTextInput(),
		
		results = $( "<p>", { class: "ui-body"} )
			.html( "Displaying <span class='count'></span> Result<span class='multiple'>s</span>" )
			.appendTo( wrapper ),
		
		count = results.children( ".count" )
			.text( list.children().length ),
		
		multiple = results.children( ".multiple" );
	
	wrapper.insertBefore( list );
});

})( jQuery );
