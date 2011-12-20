/*
=* jQuery Mobile Framework : "popup" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

(function($, undefined) {

$.widget("mobile.popup", $.mobile.widget, {
	options: {
		theme: null,
		overlayTheme: null,
		shadow: true,
		corners: true,
		fade: true,
		transition: $.mobile.defaultDialogTransition,
		initSelector: ":jqmData(role='popup')"
	},

	_create: function() {
		var ui = {
					screen    : "#ui-popup-screen",
					container : "#ui-popup-container"
				},
				proto = $(
"<div>" +
"    <div id='ui-popup-screen' class='ui-selectmenu-screen ui-screen-hidden ui-popup-screen'></div>" +
"    <div id='ui-popup-container' class='ui-popup-container ui-selectmenu-hidden'></div>" +
"</div>"
),
				thisPage = (this.element.closest(".ui-page") || $("body")),
				self = this;

		// Assign the relevant parts of the proto
		for (var key in ui)
			ui[key] = proto.find(ui[key]).removeAttr("id");

		// Apply the proto
		thisPage.append(ui.screen);
		ui.container.insertAfter(ui.screen);
		ui.container.append(this.element);

		// Define instance variables
		$.extend (this, {
			_ui     : ui,
			_isOpen : false
		});

		$.each (this.options, function(key) {
			self._setOption(key, self.options[key], true);
		});

		ui.screen.bind("vclick", function(e) {
			self.close();
		});
	},

	_setTheme: function(dst, theme, unconditional) {
		var currentTheme = (dst.attr("class") || "")
	    		.split(" ")
	    		.filter(function(el, idx, ar) {
	    			return el.match(/^ui-body-[a-z]$/);
	    		});

		currentTheme = ((currentTheme.length > 0) ? currentTheme[0].match(/^ui-body-([a-z])/)[1] : null);

		if (theme !== currentTheme || unconditional) {
			dst.removeClass("ui-body-" + currentTheme);
			if (theme !== null)
				dst.addClass("ui-body-" + theme);
		}
	},

	_set_theme: function(value, unconditional) {
		if (value === null)
			value = "";

		if (value.match(/^[a-z]$/) || value === "") {
			this._setTheme(this.element, value, unconditional);
		}
	},

	_set_overlayTheme: function(value, unconditional) {
		if (value === null)
			value = "";
		if (value.match(/^[a-z]$/) || value === "") {
			this._setTheme(this._ui.container, value, unconditional);
			// The screen must always have some kind of background for fade to work, so, if the theme is being unset,
			// set the background to "a".
			this._setTheme(this._ui.screen, (value === "" ? "a" : value), unconditional);
		}
		else
			console.log("Warning: " + value + " is not a valid overlay theme! Please specify a single letter a-z or an empty string!");
	},

	_set_shadow: function(value, unconditional) {
		value = this._parseBoolean(value);
		if (this._ui.container.hasClass("ui-overlay-shadow") != value || unconditional)
			this._ui.container[value ? "addClass" : "removeClass"]("ui-overlay-shadow");
	},

	_set_corners: function(value, unconditional) {
		value = this._parseBoolean(value);
		if (this._ui.container.hasClass("ui-corner-all") != value || unconditional)
			this._ui.container[value ? "addClass" : "removeClass"]("ui-corner-all");
	},

	_parseBoolean: function(value) {
		if (typeof value === "boolean")
			return value;
		else {
			value = value.toLowerCase();
			return (value === "true" || value === "yes" || value === "1");
		}
	},

	_set_fade: function(value, unconditional) {
		this.options.fade = this._parseBoolean(value);
	},

	_set_transition: function(value, unconditional) {
		if (this.options.transition != value || unconditional) {
			this._ui.container
				.removeClass(this.options.transition)
				.addClass(value);
			this.options.transition = value;
		}
	},

	_setOption: function(key, value, unconditional) {
		if (unconditional === undefined)
			unconditional = false;
		if (this["_set_" + key] !== undefined)
			this["_set_" + key](value, unconditional);
	},

	_placementCoords: function(x, y) {
		// Try and center the overlay over the given coordinates
		var ret,
		    menuHeight = this._ui.container.outerHeight(true),
		    menuWidth = this._ui.container.outerWidth(true),
		    scrollTop = $( window ).scrollTop(),
		    screenHeight = window.innerHeight,
		    screenWidth = window.innerWidth,
		    halfheight = menuHeight / 2,
		    maxwidth = parseFloat( this._ui.container.css( "max-width" ) ),
		    roomtop = y - scrollTop,
		    roombot = scrollTop + screenHeight - y,
		    newtop, newleft;

		if ( roomtop > menuHeight / 2 && roombot > menuHeight / 2 ) {
		  newtop = y - halfheight;
		}
		else {
		  // 30px tolerance off the edges
		  newtop = roomtop > roombot ? scrollTop + screenHeight - menuHeight - 30 : scrollTop + 30;
		}

		// If the menuwidth is smaller than the screen center is
		if ( menuWidth < maxwidth ) {
		  newleft = ( screenWidth - menuWidth ) / 2;
		}
		else {
		  //otherwise insure a >= 30px offset from the left
		  newleft = x - menuWidth / 2;

		  // 10px tolerance off the edges
		  if ( newleft < 10 ) {
		    newleft = 10;
		  }
		  else
			if ( ( newleft + menuWidth ) > screenWidth ) {
		    newleft = screenWidth - menuWidth - 10;
		  }
		}

		return { x : newleft, y : newtop };
	},
	
	_bindHashChange: function(){
		var self = this;
		$( window ).one( "hashchange.popup", function(){
			self.close( true );
		});
	},
	
	_unbindHashChange: function(){
		$( window ).unbind( "hashchange.popup" );
	},

	open: function(x, y) {
		if (!this._isOpen) {
			var self = this,
			    coords = this._placementCoords(
			    	(undefined === x ? window.innerWidth  / 2 : x),
			    	(undefined === y ? window.innerHeight / 2 : y)),
				zIndexMax = 0;

            $(document)
                .find("*")
                .each(function() {
                    var el = $(this),
                        zIndex = parseInt(el.css("z-index"));

                    if (!(el.is(self._ui.container) || el.is(self._ui.screen) || isNaN(zIndex)))
                        zIndexMax = Math.max(zIndexMax, zIndex);
                });

            this._ui.screen.css("z-index", (zIndexMax + 1));
            this._ui.container.css("z-index", (zIndexMax + 2));

			this._ui.screen
				.height($(document).height())
				.removeClass("ui-screen-hidden");

			if (this.options.fade)
				this._ui.screen.animate({opacity: 0.5}, "fast");

			this._ui.container
				.removeClass("ui-selectmenu-hidden")
				.css({
					left: coords.x,
					 top: coords.y
				})
				.addClass("in")
				.animationComplete(function() {
					self._ui.screen.height($(document).height());
				});
			
			// listen for hashchange that will occur when we set it to null dialog hash
			$( window ).one( "hashchange", function(){
				self._bindHashChange();
			});
			
			// set hash to non-linkable dialog url	
			$.mobile.path.set( "&ui-state=dialog" );

			this._isOpen = true;
		}
	},

	close: function( fromHash ) {
		if (this._isOpen) {
			var self = this,
		    	hideScreen = function() {
		    		self._ui.screen.addClass("ui-screen-hidden");
		    		self._isOpen = false;
		    		self.element.trigger("closed");
		    		self._ui.screen.removeAttr("style");
		    	};

			this._ui.container
				.removeClass("in")
				.addClass("reverse out")
				.animationComplete(function() {
					self._ui.container
						.removeClass("reverse out")
						.addClass("ui-selectmenu-hidden")
						.removeAttr("style");
				});

				if (this.options.fade)
					this._ui.screen.animate({opacity: 0.0}, "fast", hideScreen);
				else
					hideScreen();
			
			// unbind listener that comes with opening popup
			this._unbindHashChange();
			
			// if the close event did not come from an internal hash listener, reset URL back
			if( !fromHash ){	
				window.history.back();	
			}		
		}
	}
});

$(document).bind("pagecreate create", function(e) {
	$($.mobile.popup.prototype.options.initSelector, e.target)
		.not(":jqmData(role='none'), :jqmData(role='nojs')")
		.popup();

	$("a[href^='#']:jqmData(rel='popup')").each(function() {
		var btn = $(this),
				popup = $(btn.attr("href"));

		if (popup[0]) {
			// If the popup has a theme set, prevent it from being clobbered by the associated button
			if ((popup.popup("option", "overlayTheme") || "").match(/[a-z]/))
				popup.jqmData("overlay-theme-set", true);
			btn
				.attr({
					"aria-haspopup": true,
					"aria-owns": btn.attr("href")
				})
				.removeAttr("href")
				.bind("vclick", function() {
					// When /this/ button causes a popup, align the popup's theme with that of the button, unless the popup has a theme pre-set
					if (!popup.jqmData("overlay-theme-set"))
						popup.popup("option", "overlayTheme", btn.jqmData("theme"))
					popup.popup("open",
						btn.offset().left + btn.outerWidth()  / 2,
						btn.offset().top  + btn.outerHeight() / 2);
				});
		}
		else
			console.log("popup menu " + btn.attr("href") + " not found.");
	});
});

})(jQuery);
