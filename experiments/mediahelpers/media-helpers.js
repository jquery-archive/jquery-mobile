$(document).bind("orientationchange", function(event) {
  use_media_helpers();
});

$(function() {
  use_media_helpers();

  $('#mhtest').click(function(){
     $('#mhresult').text( $.mobile.media( $('#mq').val()) );
	 return false;
  });
});