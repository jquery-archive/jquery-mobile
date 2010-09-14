/*
Possible additions:
	scollTop
	CSS Matrix
*/

$.extend( $.support, {
	orientation: !!window.orientation,
	// to use bbq-style navigation with external pages
	// we will need to first test for ajax support (and fall back to normal urls)
	ajax: !!$.ajaxSettings.xhr(),
	touch: typeof Touch === "object",
	WebKitAnimationEvent: typeof WebKitTransitionEvent === "object"
});

(function() {
	var fakeBody = $( "<body>" ).prependTo( "html" ),
		displayDiv = $( "<div style='height: 5px; position: absolute; display: none;'></div>" )
			.prependTo( fakeBody ),
		positionDiv = $( "<div style='position: absolute; left: 10px;'></div>" )
			.prependTo( fakeBody ),
		overflowDiv = $( "<div style='position: absolute; overflow: hidden; height: 0;'>" +
			"<div style='height: 10px;'></div></div>" ).prependTo( fakeBody ),
		floatClearHtml = "<div style='width:5px;height:5px;float:left;'></div>",
		floatClearWrap = $( "<div>" )
			.append( floatClearHtml + floatClearHtml )
			.prependTo( fakeBody ),
		floatClearDivs = floatClearWrap.children(),
		floatClearDiv1Top = floatClearDivs[ 0 ].offsetTop,
		floatClearDiv2 = floatClearDivs[ 1 ],
		supportFloatClear = false;
	
	if ( floatClearDiv1Top === floatClearDiv2.offsetTop ) {
		floatClearDiv2.style.clear = "left";
		if ( floatClearDiv1Top !== floatClearDiv2.offsetTop ) {
			supportFloatClear = true;
		}
	}
	
	$.extend( $.support, {
		display: displayDiv[ 0 ].offsetHeight === 0,
		position: positionDiv[ 0 ].offsetLeft === 10,
		overflow: overflowDiv[ 0 ].offsetHeight === 0,
		floatclear: supportFloatClear
	});
	
	fakeBody.remove();
})();

// if we're missing support for any of these, then we're a C-grade browser
if ( !$.support.display || !$.support.position || !$.support.overflow || !$.support.floatclear ) {
	return;
}
