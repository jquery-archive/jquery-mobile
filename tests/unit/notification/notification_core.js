(function($){
	module("jquery.mobile.notification.js");

	test( "messageBox appears and removes itself", function() {
		same( $( "div[data-role='message-box']" ).length, 0, "no message box to begin with" );
		$.mobile.messageBox( "Baba yetu" );
		same( $( "div[data-role='message-box']" ).length, 1, "added one message box");
		same( $( "div[data-role='message-box'] h1" ).text(), "Baba yetu", "message is correct" );
		$.mobile.messageBox( "yetu uliye" );
		same( $( "div[data-role='message-box']" ).length, 1, "no duplicate message boxes" );
		same( $( "div[data-role='message-box'] h1" ).text(), "yetu uliye", "message is correct" );
		stop();

		setTimeout( function(){
			same( $( "div[data-role='message-box']" ).css( "display" ), "none", "message box removed after 1.5s" );
			start();
		}, 1500);
	});
})(jQuery);
