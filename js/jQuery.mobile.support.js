/*
Possible additions:
	scollTop
	CSS Matrix
*/

$.extend( $.support, {
	orientation: !!window.orientation,
	touch: typeof Touch === "object",
	WebKitAnimationEvent: typeof WebKitTransitionEvent === "object"
});

(function() {
	var fakeBody = $( "<body>" ).prependTo( "html" ),
		displayDiv = $( "<div style='height:5px;position:absolute;display:none;'/>" )
			.prependTo( fakeBody )[ 0 ],
		positionDiv = $( "<div style='position:absolute;left:10px;overflow:hidden;height:0;'>" +
				"<div style='height:10px;'/></div>").prependTo( fakeBody )[ 0 ],
		floatClearHtml = "<div style='width:5px;height:5px;float:left;'/>",
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
		display: displayDiv.offsetHeight === 0,
		position: positionDiv.offsetLeft === 10,
		overflow: positionDiv.offsetHeight === 0,
		floatclear: supportFloatClear
	});
	
	fakeBody.remove();
})();
