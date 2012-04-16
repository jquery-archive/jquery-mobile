/*
 * mobile page unit tests
 */
(function($){
	var libName = 'jquery.mobile.page',
		themedefault = $.mobile.page.prototype.options.theme,
		keepNative = $.mobile.page.prototype.options.keepNative;

	module(libName, {
		setup: function() {
			$.mobile.page.prototype.options.keepNative = keepNative;
		}
	});

	var eventStack = [],
		etargets = [],
		cEvents=[],
		cTargets=[];

	$( document ).bind( "pagebeforecreate pagecreate", function( e ){
		eventStack.push( e.type );
		etargets.push( e.target );
	});

	$( "#c" ).live( "pagebeforecreate", function( e ){
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
		$( "#c" ).page();

		ok( cEvents[0] === "pagebeforecreate" );
		ok( !cTargets[1] );
	});

	test( "Binding to pagebeforecreate and returning false prevents classes from being applied to page" , function(){
		$( "#c" ).page();

		ok( !$( "#c" ).hasClass( "ui-body-" + themedefault ) );
		ok( !$( "#c" ).hasClass( "ui-page" ) );
	});

	test( "keepNativeSelector returns the default where keepNative is not different", function() {
		var pageProto = $.mobile.page.prototype;
		pageProto.options.keepNative = pageProto.options.keepNativeDefault;

		same(pageProto.keepNativeSelector(), pageProto.options.keepNativeDefault);
	});

	test( "keepNativeSelector returns the default where keepNative is empty, undefined, whitespace", function() {
		var pageProto = $.mobile.page.prototype;

		pageProto.options.keepNative = "";
		same(pageProto.keepNativeSelector(), pageProto.options.keepNativeDefault);

		pageProto.options.keepNative = undefined;
		same(pageProto.keepNativeSelector(), pageProto.options.keepNativeDefault);

		pageProto.options.keepNative = "  ";
		same(pageProto.keepNativeSelector(), pageProto.options.keepNativeDefault);
	});

	test( "keepNativeSelector returns a selector joined with the default", function() {
		var pageProto = $.mobile.page.prototype;

		pageProto.options.keepNative = "foo, bar";
		same(pageProto.keepNativeSelector(), "foo, bar, " + pageProto.options.keepNativeDefault);
	});

	test( "links inside an ignored container do not enhance", function() {
		var $ignored = $( "#ignored-link" ), $enhanced = $( "#enhanced-link" );

		$.mobile.ignoreContentEnabled = true;

		$ignored.parent().trigger( "create" );
		same( $ignored.attr( "class" ), undefined, "ignored link doesn't have link class" );

		$enhanced.parent().trigger( "create" );
		same( $enhanced.attr( "class" ).indexOf("ui-link"), 0, "enhanced link has link class" );

		$.mobile.ignoreContentEnabled = false;
	});
	
	
	asyncTest( "page container is updated to page theme at pagebeforeshow", function(){
		
		expect( 1 );
		
		var pageTheme = "ui-overlay-" + $.mobile.activePage.page( "option", "theme" );

		$.mobile.pageContainer.removeClass( pageTheme );
		
		$.mobile.activePage
			.bind( "pagebeforeshow", function(){
				ok( $.mobile.pageContainer.hasClass( pageTheme ), "Page container has the same theme as the page on pagebeforeshow" );
				start();
			})
			.trigger( "pagebeforeshow" );

	} );
	
	asyncTest( "page container is updated to page theme at pagebeforeshow", function(){
		
		expect( 1 );
		
		var pageTheme = "ui-overlay-" + $.mobile.activePage.page( "option", "theme" );

		$.mobile.pageContainer.addClass( pageTheme );
		
		$.mobile.activePage
			.bind( "pagebeforehide", function(){
				ok( !$.mobile.pageContainer.hasClass( pageTheme ), "Page container does not have the same theme as the page on pagebeforeshow" );
				start();
			})
			.trigger( "pagebeforehide" );

	} );
	
	
	
})(jQuery);
