/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2011, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

// This is code that can be used as a simple bookmarklet for debugging
// page loading and navigation in pages that use the jQuery Mobile framework.
// All messages are sent to the browser's console.log so to see the messages,
// you need to make sure you enable the console/log in your browser.

(function($, window, document) {
	if ( typeof $ === "undefined" ) {
		alert( "log-page-events.js requires jQuery core!" );
		return;
	}

	var pageEvents = "mobileinit pagebeforechange pagechange pagechangefailed pagebeforeload pageload pageloadfailed pagebeforecreate pagecreate pageinit pagebeforeshow pageshow pagebeforehide pagehide pageremove";

	function getElementDesc( ele )
	{
		var result = [];
		if ( ele ) {
			result.push( ele.nodeName.toLowerCase() );
			var c = ele.className;
			if ( c ) {
				c = c.replace( /^\s+|\s+$/, "" ).replace( /\s+/, " " );
				if (c) {
					result.push( "." + c.split( " " ).join( "." ) );
				}
			}
			if ( ele.id ){
				result.push( "#" + ele.id )
			}
		}
		return result.join( "" );
	}

	function debugLog( msg )
	{
		console.log( msg );
	}

	function getNativeEvent( event ) {
	
		while ( event && typeof event.originalEvent !== "undefined" ) {
			event = event.originalEvent;
		}
		return event;
	}

	function logEvent( event, data )
	{
		var result = event.type + " (" + (new Date).getTime() + ")\n";

		switch( event.type )
		{
			case "pagebeforechange":
			case "pagechange":
			case "pagechangefailed":
				result += "\tpage: ";
				if ( typeof data.toPage === "string" ) {
					result += data.toPage;
				} else {
					result += getElementDesc( data.toPage[ 0 ] ) + "\n\tdata-url: " + data.toPage.jqmData( "url" );
				}
				result += "\n\n"
				break;
			case "pagebeforeload":
			case "pageloadfailed":
				result += "\turl: " + data.url + "\n\tabsUrl: " + data.absUrl + "\n\n";
				break;
			case "pageload":
				result += "\turl: " + data.url + "\n\tabsUrl: " + data.absUrl + "\n\tpage: " + getElementDesc( data.page[ 0 ] ) + "\n\n";
				break;
			case "pagebeforeshow":
			case "pageshow":
			case "pagebeforehide":
			case "pagehide":
				result += "\tpage: " + getElementDesc( event.target ) + "\n";
				result += "\tdata-url: " + $( event.target ).jqmData( "url" ) + "\n\n";
				break;
			case "pagebeforecreate":
			case "pagecreate":
			case "pageinit":
				result += "\telement: " + getElementDesc( event.target ) + "\n\n";
				break;
			case "hashchange":
				result += "\tlocation: " + location.href + "\n\n";
				break;
			case "popstate":
				var e = getNativeEvent( event );
				result += "\tlocation: " + location.href + "\n";
				result += "\tstate.hash: " + ( e.state && e.state.hash ? e.state.hash + "\n\n" : "" );
				break;
		}

		debugLog( result );
	}

	// Now add our logger.
	$( document ).bind( pageEvents, logEvent );
	$( window ).bind( "hashchange popstate", logEvent );

})( jQuery, window, document );