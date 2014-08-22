/*
 * mobile select unit tests
 */

(function($){

	module( "Custom select" );

	test( "Custom select is enhanced correctly", function() {
		var popup = $( "#enhance-test-listbox" );

		deepEqual( $( "#enhance-test-listbox a:first" ).attr( "role" ), "button", "The close button for a multiple choice select popup has the " + '"' + "role='button'" + '"' + " set" );
		deepEqual( popup.popup( "option", "overlayTheme" ), "b", "Popup has overlayTheme b" );
		deepEqual( popup.popup( "option", "theme" ), "x", "Popup has theme x" );
	});

  test( "formats displayed control's text with a default formatter", function () {
    deepEqual( $( "#enhance-test-button span:first" ).text(), "The 2nd Option, The 3rd Option"  );
  });

  module( "Custom select has custom selectionFormatter", {
    setup: function () {
      var customFormatter = function ( options ) {
        return options.map(function() {
          return this.value;
        }).get().join( " | " );
      };
      this.initialFormatter = $( "#enhance-test" ).selectmenu( "option", "selectionFormatter" );
      $( "#enhance-test" ).selectmenu( "option", "selectionFormatter",  customFormatter ).selectmenu( "refresh" );
    },

    teardown: function () {
      $( "#enhance-test" ).selectmenu( "option", "selectionFormatter",  this.initialFormatter ).selectmenu( "refresh" );
    }
  });

  test( "formats displayed control's text accordingly", function () {
    deepEqual( $( "#enhance-test-button span:first" ).text(), "2 | 3" );
  });

	module( "Native select" );

	test( "Select menu ID", function() {
		ok( $( ".no-id-test" ).closest( ".ui-btn" ).attr( "id" ) !== "undefined-button", "Select menu without an ID does not result in the button having name 'undefined-button'" );
	});
})(jQuery);
