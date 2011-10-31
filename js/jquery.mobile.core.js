/*
* jQuery Mobile Framework : "core" - The base file for jQm
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/


(function( $, window, undefined ) {

	// jQuery.mobile configurable options
	$.extend( $.mobile, {

		// Namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		// Define the url parameter used for referencing widget-generated sub-pages.
		// Translates to to example.html&ui-page=subpageIdentifier
		// hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		// Class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		// Class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		// Automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		// Automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// disable to prevent jquery from bothering with links
		linkBindingEnabled: true,

		// Set default page transition - 'none' for no transitions
		defaultPageTransition: "slide",

		// Minimum scroll distance that will be remembered when returning to a page
		minScrollBack: 250,

		// Set default dialog transition - 'none' for no transitions
		defaultDialogTransition: "pop",

		// Show loading message during Ajax requests
		// if false, message will not appear, but loading classes will still be toggled on html el
		loadingMessage: "loading",

		// Error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		//automatically initialize the DOM when it's ready
		autoInitializePage: true,

		pushStateEnabled: true,

		// turn of binding to the native orientationchange due to android orientation behavior
		orientationChangeEnabled: true,

		// Support conditions that must be met in order to proceed
		// default enhanced qualifications are media query support OR IE 7+
		gradeA: function(){
			return $.support.mediaquery || $.mobile.browser.ie && $.mobile.browser.ie >= 7;
		},

		// TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			if ( $.type( ypos ) !== "number" ) {
				ypos = $.mobile.defaultHomeScroll;
			}

			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout(function() {
				window.scrollTo( 0, ypos );
				$( document ).trigger( "silentscroll", { x: 0, y: ypos });
			}, 20 );

			setTimeout(function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		// Take a data attribute property, prepend the namespace
		// and then camel case the attribute string
		nsNormalize: function( prop ) {
			if ( !prop ) {
				return;
			}

			return $.camelCase( $.mobile.ns + prop );
		},

		getInheritedTheme: function( el, defaultTheme ) {
			// Find the closest parent with a theme class on it.
			var themedParent = el.closest( "[class*='ui-bar-'],[class*='ui-body-']" ),

				// If there's a themed parent, extract the theme letter
				// from the theme class	.
				ltr = ( themedParent.length && /ui-(bar|body)-([a-z])\b/.exec( themedParent.attr( "class" ) )[ 2 ] || "" ) || "";

			// Return the theme letter we found, if none, return the
			// specified default.

			return ltr || defaultTheme || "a";
		},

		/**
		 * load prototype html from string
		 *
		 * @widget - name of the widget (used to cache loaded prototype)
		 * @html - HTML for widget prototype
		 * @ui - object containing selectors for the parts of the prototype
		 *
		 * Loads a bit of HTML and caches the resulting jQuery object if @widget is
		 * provided. Returns a clone of the initial prototype if called multiple
		 * times with the same @widget parameter.
		 *
		 * If @ui is provided, it is assumed to be an object whose values are either
		 * strings which are jQuery selectors or objects which in turn contain
		 * values that are jQuery selectors. Each selector string will be replaced
		 * by the jQuery object resulting from performing the selection on the
		 * prototype.
		 *
		 * In addition, if the selector is of the form "#something", i.e., if it
		 * selects by id, then the id attribute is removed from the resulting jQuery
		 * object. Presumably, the id is no longer needed since the object is now
		 * stored in a key.
		 *
		 * Returns: If @ui is provided, @ui is returned with the values replaced as
		 * described. Otherwise, the a jQuery object consisting of a <div> which
		 * contains @html is returned.
		 */
		loadPrototypeFromString: function(widget, html, ui) {
			var protos = $(document).data("_widgetPrototypes"),
					ret = undefined;

			if (protos === undefined)
				protos = {};

			if (widget !== undefined && protos[widget] !== undefined)
				ret = protos[widget].clone();

			if (ret === undefined && html !== undefined) {
				ret = $("<div></div>").html(html);
				if (widget !== undefined)
					protos[widget] = ret.clone();
			}

			$(document).data("_widgetPrototypes", protos);

			if (ret !== undefined && ui !== undefined) {
				function fillObj(obj, uiProto) {
					var removeId;

					for (var key in obj) {
						if (typeof obj[key] === "string") {
							removeId = (obj[key].substring(0, 1) === "#");
							obj[key] = uiProto.find(obj[key]);
							if (removeId)
								obj[key].removeAttr("id");
						}
						else
						if (typeof obj[key] === "object")
							obj[key] = fillObj(obj[key], uiProto);
					}
					return obj;
				}

				ret = fillObj(ui, ret);
			}

			return ret;
		},

		/**
		 * Merge data-<option> values from the widget's element with the widget's options and
		 * call _setOption() once for each option. data-<option> takes precedence over
		 * widget.options.<option>.
		 */
		parseOptions: function (widget, userData) {
			for (var opt in widget.options) {
				dataValue = widget.element.attr("data-" + ($.mobile.ns || "") + opt);
				defaultValue = widget.options[opt];

				if (dataValue !== undefined)
					if (dataValue == "true" ||
					    dataValue == "yes"  ||
					    dataValue == "on")
						dataValue = true;
					else
					if (dataValue == "false" ||
					    dataValue == "no"    ||
					    dataValue == "off")
						dataValue = false;
					else
					if (!isNaN(parseInt(dataValue)))
						dataValue = parseInt(dataValue);

				widget._setOption(opt, dataValue === undefined ? defaultValue : dataValue, userData);
			}
		},

		/**
		 * Get document-relative mouse coordinates from a given event
		 *
		 * From: http://www.quirksmode.org/js/events_properties.html#position
		 */
		documentRelativeCoordsFromEvent: function(ev) {
			var e = ev ? ev : window.event,
			    client = { x: e.clientX, y: e.clientY },
			    page   = { x: e.pageX,   y: e.pageY   },
			    posx = 0,
			    posy = 0;

			/* Grab useful coordinates from touch events */
			if (e.type.match(/^touch/)) {
				page = {
					x: e.originalEvent.targetTouches[0].pageX,
					y: e.originalEvent.targetTouches[0].pageY
				};
				client = {
					x: e.originalEvent.targetTouches[0].clientX,
					y: e.originalEvent.targetTouches[0].clientY
				};
			}

			if (page.x || page.y) {
				posx = page.x;
				posy = page.y;
			}
			else
			if (client.x || client.y) {
				posx = client.x + document.body.scrollLeft + document.documentElement.scrollLeft;
				posy = client.y + document.body.scrollTop  + document.documentElement.scrollTop;
			}

			return { x: posx, y: posy };
		},

		targetRelativeCoordsFromEvent: function(e) {
			var coords = { x: e.offsetX, y: e.offsetY };

			if (coords.x === undefined || isNaN(coords.x) ||
			    coords.y === undefined || isNaN(coords.y)) {
				var offset = $(e.target).offset();

				coords = $.mobile.documentRelativeCoordsFromEvent(e);
				coords.x -= offset.left;
				coords.y -= offset.top;
			}

			return coords;
		}
	});

	// Mobile version of data and removeData and hasData methods
	// ensures all data is set and retrieved using jQuery Mobile's data namespace
	$.fn.jqmData = function( prop, value ) {
		var result;
		if ( typeof prop != "undefined" ) {
			result = this.data( prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.jqmData = function( elem, prop, value ) {
		var result;
		if ( typeof prop != "undefined" ) {
			result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.fn.jqmRemoveData = function( prop ) {
		return this.removeData( $.mobile.nsNormalize( prop ) );
	};

	$.jqmRemoveData = function( elem, prop ) {
		return $.removeData( elem, $.mobile.nsNormalize( prop ) );
	};

	$.fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	$.removeWithDependents = function( elem ) {
		var $elem = $( elem );

		( $elem.jqmData('dependents') || $() ).remove();
		$elem.remove();
	};

	$.fn.addDependents = function( newDependents ) {
		$.addDependents( $(this), newDependents );
	};

	$.addDependents = function( elem, newDependents ) {
		var dependents = $(elem).jqmData( 'dependents' ) || $();

		$(elem).jqmData( 'dependents', $.merge(dependents, newDependents) );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html elements text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	$.fn.getEncodedText = function() {
		return $( "<div/>" ).text( $(this).text() ).html();
	};

	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace(/:jqmData\(([^)]*)\)/g, "[data-" + ( $.mobile.ns || "" ) + "$1]");

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [ node ] ).length > 0;
	};
})( jQuery, this );

