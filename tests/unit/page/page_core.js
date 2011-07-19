/*
 * mobile page unit tests
 */
(function($){
	var libName = 'jquery.mobile.page.sections.js',
		themedefault = $.mobile.page.prototype.options.theme;

	module(libName);
	
	
	var eventStack = [],
		etargets = [],
		cEvents=[],
		cTargets=[];

	
	$( document ).bind( "pagebeforecreate pagecreate", function( e ){
		eventStack.push( e.type );
		etargets.push( e.target );
	});
	
	$("#c").live( "pagebeforecreate", function( e ){
	
		cEvents.push( e.type );
		cTargets.push( e.target );
		return false;
	});

	test( "pagecreate event fires when page is created", function(){
			ok( eventStack[0] === "pagecreate" || eventStack[1] === "pagecreate" );		
	});
	
	test( "pagebeforecreate event fires when page is created", function(){		
			ok( eventStack[0] === "pagebeforecreate" || eventStack[1] === "pagebeforecreate" );
	});
	
	test( "pagebeforecreate fires before pagecreate", function(){
			ok( eventStack[0] === "pagebeforecreate" );		
	});
	
	test( "target of pagebeforecreate event was div #a", function(){
			ok( $( etargets[0] ).is("#a") );	
	});
	
	test( "target of pagecreate event was div #a" , function(){
			ok( $( etargets[0] ).is("#a") );	
	});
	
	test( "page element has ui-page class" , function(){
			ok( $( "#a" ).hasClass( "ui-page" ) );	
	});
	
	test( "page element has default body theme when not overidden" , function(){
			ok( $( "#a" ).hasClass( "ui-body-" + themedefault ) );	
	});
	
	test( "B page has non-default theme matching its data-theme attr" , function(){
		$( "#b" ).page();
		var btheme = $( "#b" ).jqmData( "theme" );
		ok( $( "#b" ).hasClass( "ui-body-" + btheme ) );	
	});


	test( "Binding to pagebeforecreate and returning false prevents pagecreate event from firing" , function(){
		$("#c").page();

		ok( cEvents[0] === "pagebeforecreate" );	
		ok( !cTargets[1] );			
	});
	
	test( "Binding to pagebeforecreate and returning false prevents classes from being applied to page" , function(){
		ok( !$( "#b" ).hasClass( "ui-body-" + themedefault ) );	
		ok( !$( "#b" ).hasClass( "ui-page" ) );			
	});
	
	

})(jQuery);
