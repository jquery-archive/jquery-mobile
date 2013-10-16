$( document ).on( "pagecreate", function() {
	$( ".photopopup" ).on({
		popupbeforeposition: function() {
			var maxHeight = $( window ).height() - 60 + "px";
			$( ".photopopup img" ).css( "max-height", maxHeight );
		}
	});
});
