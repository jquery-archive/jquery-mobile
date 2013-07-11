/*
 * mobile dialog unit tests
 */
(function($){
	module('jquery.ui.fieldContain.js');

	test( "Field container will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-field-contain").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-field-contain").length, "enhancements applied" );
	});

	test( "field containers inside ignore container should not be enhanced", function() {
		var $ignored = $( "#ignored-fieldcontain" ), $enhanced = $( "#enhanced-fieldcontain" );

		$.ui.ignoreContentEnabled = true;

		$( "#ignore-container-tests" ).trigger( "create" );

		deepEqual( $ignored.attr( "class" ), undefined, "ignored div does not have field contain class" );
		ok( $enhanced.hasClass( "ui-field-contain" ), "enhanced div has field contain class" );

		$.ui.ignoreContentEnabled = false;

	});
})(jQuery);
