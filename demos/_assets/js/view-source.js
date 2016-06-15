// View demo source code

function attachPopupHandler( popup, sources ) {
	popup.one( "popupbeforeposition", function() {
		var
			collapsibleSet = popup.find( "[data-role='collapsibleset']" ),
			collapsible, pre;

		$.each( sources, function( idx, options ) {
			collapsible = $( "<div data-role='collapsible' data-collapsed='true' data-theme='" + options.theme + "' data-iconpos='right' data-collapsed-icon='caret-l' data-expanded-icon='caret-d' data-content-theme='b'>" +
					"<h1>" + options.title + "</h1>" +
					"<pre class='brush: " + options.brush + ";'></pre>" +
				"</div>" );
			pre = collapsible.find( "pre" );
			pre.append( options.data.replace( /</gmi, '&lt;' ) );
			collapsible
				.appendTo( collapsibleSet )
				.on( "collapsiblecollapse", function() {
					popup.popup( "reposition", { positionTo: "window" } );
				})
				.on( "collapsibleexpand", function() {
					var doReposition = true;

					collapsibleSet.find( ":mobile-collapsible" ).not( this ).each( function() {
						if ( $( this ).collapsible( "option", "expanded" ) ) {
							doReposition = false;
						}
					});

					if ( doReposition ) {
						popup.popup( "reposition", { positionTo: "window" } );
					}
				});
			SyntaxHighlighter.highlight( {}, pre[ 0 ] );
		});

		collapsibleSet.find( "[data-role='collapsible']" ).first().attr( "data-collapsed", "false" );
		popup.enhanceWithin();
	});
}

function getSnippet( type, selector, source ) {
	var text = "", el, absUrl, hash;

	if ( selector === "true" ) {
		selector = "";
	}

	// First, try to grab a tag in this document
	if ( !$.mobile.path.isPath( selector ) ) {
		el = source.find( ( "markup" === type ? "" : type ) + selector );
		// If this is not an embedded style, try a stylesheet reference
		if ( el.length === 0 && type === "style" ) {
			el = source.find( "link[rel='stylesheet']" + selector );
		}

		// Stringify each element and cache the string representation on the element. This helps us
		// avoid re-stringifying the element later. This, in turn, prevents us from re-stringifying
		// already enhanced elements, such as shared widgets outside the page, when the View Source
		// button is in the page, and the elements have already been enhanced when the View Source
		// button is created. This assumes, of course, that the first time we stringify an element
		// the element is not yet enhanced.
		el.each( function( index, singleElement ) {
			var whitespace,
				single = $( this ),
				singleText = single.jqmData( "viewSourceCachedData" );

			if ( !singleText ) {
				singleText = $( "<div></div>" )
						.append( ( "markup" === type ? single : single.contents() ).clone() )
						.html();

				// If we're dealing with markup, retrieve the initial indentation of the element so
				// we get proper indentation in the source view
				if ( type === "markup" ) {
					if ( this.previousSibling && this.previousSibling.nodeType === 3 ) {
						whitespace = $( "<div>" )
							.append( $( this.previousSibling ).clone() )
							.html()
							.match( /\n(\s*)$/ );
						if ( whitespace && whitespace.length > 1 ) {
							singleText = whitespace[ 1 ] + singleText;
						}
					}
				}
				single.jqmData( "viewSourceCachedData", singleText );
			}

			text = text +

				// Separate the text for multiple elements with a newline
				( index > 0 ? "\n" : "" ) +
				singleText;
		});
		if ( !text ) {
			text = "";
			selector = el.attr( "href" ) || el.attr( "src" ) || "";
		}
	}

	// If not, try to SJAX in the document referred to by the selector
	if ( !text && selector ) {
		absUrl = $.mobile.path.makeUrlAbsolute( selector );
		hash = $.mobile.path.parseUrl( absUrl ).hash;

		// selector is a path to SJAX in
		$.ajax( absUrl, { async: false, dataType: "text" } )
			.success( function( data, textStatus, jqXHR ) {
				text = data;
				// If there's a hash we assume this is an HTML document that has a tag
				// inside whose ID is the hash
				if ( hash ) {
					text = $( "<div></div>" ).append( $( data ).find( hash ).contents().clone() ).html();
				}
			});
	}

	return text;
}

$( document ).bind( "pagebeforechange", function( e, data ) {
	var popup, sources;
	if ( data.options && data.options.role === "popup" && data.options.link ) {
		sources = data.options.link.jqmData( "sources" );
		if ( sources ) {
			popup = $( "<div id='jqm-view-source' class='jqm-view-source' data-role='popup' data-theme='none' data-position-to='window'>" +
								"<div data-role='collapsibleset' data-inset='true'></div>" +
							"</div>" );

			attachPopupHandler( popup, sources );
			popup
				.appendTo( "body" )
				.popup()
				.bind( "popupafterclose", function() {
					popup.remove();
				})
				.popup( "open" );

			e.preventDefault();
		}
	}
});

function makeButton() {
	var d = document.createElement( "div" )
		a = document.createElement( "a" ),
		txt = document.createTextNode( " View Source" ),
		icon = document.createElement( "span" );

	d.className = "jqm-view-source-link-container";
	a.className = "jqm-view-source-link ui-button ui-corner-all ui-button-inline ui-mini ui-alt-icon ui-nodisc-icon";
	icon.className = "ui-icon ui-icon-eye";

	a.setAttribute( "href", "#popupDemo" );
	a.setAttribute( "data-rel", "popup" );
	a.appendChild( icon );
	a.appendChild( txt );

	d.appendChild( a );

	return $( d );
}

$.fn.viewSourceCode = function() {
	return $( this ).each( function() {
		var button = makeButton(),
			self = $( this ),
			snippetSource = self.parents( ".ui-page,:jqmData(role='page')" ).add( $( "head" ) ),
			fixData = function( data ) {
				return data.replace( /\s+$/gm, "" );
			},
			data,
			sources = [];

		// Collect source code before it becomes enhanced

		if ( self.is( "[data-demo-html]" ) ) {
			if ( self.attr( "data-demo-html" ) === "true" ) {
				data = self.html();
			} else {
				data = getSnippet( "markup", self.attr( "data-demo-html" ), $( document ) );
			}
			sources.push( { title: "HTML", theme: "c", brush: "xml", data: fixData( data ) } );
		}

		if ( self.is( "[data-demo-php]" ) ) {
			$.ajax( self.attr( "data-demo-php" ), { async: false } )
				.success( function( incoming ) {
					data = incoming;
				})
				.error( function() {
					data = "// Failed to retrieve PHP source code";
				});

			sources.push( { title: "PHP", theme: "d", brush: "php", data: fixData( data ) } );
		}

		if ( self.is( "[data-demo-js]" ) ) {
			data = getSnippet( "script", self.attr( "data-demo-js" ), snippetSource );
			sources.push( { title: "JS", theme: "e", brush: "js", data: fixData( data ) } );
		}

		if ( self.is( "[data-demo-css]" ) ) {
			data = getSnippet( "style", self.attr( "data-demo-css" ), snippetSource );
			sources.push( { title: "CSS", theme: "f", brush: "css", data: fixData( data ) } );
		}

		button.insertAfter( this );
		button.children().jqmData( "sources", sources );
	});
};

$( document ).on( "pagebeforecreate", "[data-role='page']", function() {
	$( this ).find( "[data-demo-html], [data-demo-js], [data-demo-css], [data-demo-php]" ).viewSourceCode();
});

$( document )
	// reposition when switching between html / js / css
	.on( "collapsibleexpand", ".jqm-view-source .ui-collapsible", function() {
		$( this ).parents( ":mobile-popup" ).popup( "reposition", { positionTo: "window" } );
	})
	.on( "popupbeforeposition", ".jqm-view-source", function() {
		// max height: screen height - tolerance (2*30px) - 42px for each collapsible heading
		var x = $( this ).find( ".ui-collapsible" ).length,
			maxHeight = $( window ).height() - 60 - ( x * 42 );

		$( this ).find( ".ui-collapsible-content" ).css( "max-height", maxHeight + "px" );

		// keep line numbers and code lines in sync
		$(".ui-collapsible:not(.ui-collapsible-collapsed) .gutter", this ).find( ".line" ).css( "height", "");

		$(".ui-collapsible:not(.ui-collapsible-collapsed) .code", this ).find( ".line" ).each( function() {
			if ( $( this ).height() !== 16 ) {
				var height = $( this ).height(),
					linenumber = ".number" + /number(\w+)/.exec( this.className )[1],
					gutter = $( this ).parents( "tr" ).find( "td.gutter" ).first(),
					line = $( gutter ).find( linenumber );

				$( line ).height( height );
			}
		});
	})
	.on( "pagecreate", function( e ) {
		// prevent page scroll while scrolling source code
		$( document ).on( "mousewheel", ".jqm-view-source .ui-collapsible-content", function( event, delta ) {
			if ( delta > 0 && $( this ).scrollTop() === 0 ) {
				event.preventDefault();
			} else if ( delta < 0 &&  $( this ).scrollTop() === $( this ).get( 0 ).scrollHeight - $( this ).innerHeight() ) {
				event.preventDefault();
			}
		});
	});

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {
	var types = ['DOMMouseScroll', 'mousewheel'];

	if ($.event.fixHooks) {
		for ( var i=types.length; i; ) {
			$.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
		}
	}
	$.event.special.mousewheel = {
		setup: function() {
			if ( this.addEventListener ) {
				for ( var i=types.length; i; ) {
					this.addEventListener( types[--i], handler, false );
				}
			} else {
				this.onmousewheel = handler;
			}
		},
		teardown: function() {
			if ( this.removeEventListener ) {
				for ( var i=types.length; i; ) {
					this.removeEventListener( types[--i], handler, false );
				}
			} else {
				this.onmousewheel = null;
			}
		}
	};
	$.fn.extend({
		mousewheel: function(fn) {
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
		},

		unmousewheel: function(fn) {
			return this.unbind("mousewheel", fn);
		}
	});
	function handler(event) {
		var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
		event = $.event.fix(orgEvent);
		event.type = "mousewheel";

		// Old school scrollwheel delta
		if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
		if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
		// New school multidimensional scroll (touchpads) deltas
		deltaY = delta;
		// Gecko
		if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
			deltaY = 0;
			deltaX = -1*delta;
		}
		// Webkit
		if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
		if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}
})(jQuery);
