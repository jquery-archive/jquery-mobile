/*!
 * jQuery Mobile Widget @VERSION
 *
 * Copyright (C) TODO
 * License: TODO
 * Authors: Gabriel Schulhof, Elliot Smith
 */

/*
 * Shows other elements inside a popup window.
 *
 * To apply, add the attribute data-role="popupwindow" to a <div>
 * element inside a page. Alternatively, call popupwindow() 
 * on an element, eg :
 *
 *     $("#mypopupwindowContent").popupwindow();
 * where the html might be :
 *     <div id="mypopupwindowContent"></div>
 *
 * To trigger the popupwindow to appear, it is necessary to make a
 * call to it's 'open()' method. This is typically done by binding
 * a function to an event emitted by an input element, such as a the
 * clicked event emitted by a button element.
 * The open() method takes two arguments, specifying the origin of
 * window. For example, this opens the popupwindow with id 
 * 'popupContent' when the button with id 'popupwindowDemoButton'
 * is clicked :
 *
 *     $('#popupwindowDemoButton').bind("vclick", function (e) {
 *         var btn = $('#popupwindowDemoButton');
 *         $('#popupContent').popupwindow("open",
 *         btn.offset().left + btn.outerWidth()  / 2,
 *         btn.offset().top  + btn.outerHeight() / 2);
 *     });
 *
 * The html might be something like :
 *
 *      <a href="#" id="mypopupwindowDemoButton" data-role="button" data-inline="true">Show popup</a>
 *
 *      <div id="mypopupContent" style="display: table;">
 *          <table>
 *              <tr> <td>Eenie</td>   <td>Meenie</td>  <td>Mynie</td>   <td>Mo</td>  </tr>
 *              <tr> <td>Catch-a</td> <td>Tiger</td>   <td>By-the</td>  <td>Toe</td> </tr>
 *              <tr> <td>If-he</td>   <td>Hollers</td> <td>Let-him</td> <td>Go</td>  </tr>
 *              <tr> <td>Eenie</td>   <td>Meenie</td>  <td>Mynie</td>   <td>Mo</td>  </tr>
 *          </table>
 *      </div>
 *
 * The window can be closed with the close() method.
 *
 * Options:
 *
 *     disabled: Boolean; disable the popup
 *               Default: false
 *
 *     overlayTheme: String; the theme for the popupwindow
 *                   Default: "c"
 *
 *     shadow: Boolean; display a shadow around the popupwindow
 *             Default: true
 *
 *     fade: Boolean; fades the opening and closing of the popupwindow
 *
 *     transition: String; the transition to use when opening or closing
 *                 a popupwindow
 *                 Default: $.mobile.defaultDialogTransition
 *
 * Events:
 *     close: Emitted when the popupwindow is closed.
 *
 */
(function( $, undefined ) {

$.widget( "mobile.popupwindow", $.mobile.widget, {
	options: {
		disabled: false,
		initSelector: ":jqmData(role='popupwindow')",
		overlayTheme: "c",
		shadow: true,
		fade: true,
		transition: $.mobile.defaultDialogTransition
	},

	_create: function() {
		var self = this,
		    thisPage = this.element.closest(".ui-page"),
		    ui = {
		    	screen:    "#popupwindow-screen",
		    	container: "#popupwindow-container"
		    };

		if (thisPage[0] === undefined)
			thisPage = $("body");

		ui = $.mobile.loadPrototypeFromString("popupwindow",
"<div>" +
"    <div id='popupwindow-screen' class='ui-selectmenu-screen ui-screen-hidden ui-popupwindow-screen'></div>" +
"    <div id='popupwindow-container' class='ui-popupwindow ui-selectmenu-hidden ui-overlay-shadow ui-corner-all'></div>" +
"</div>", ui);
		thisPage.append(ui.screen);
		ui.container.insertAfter(ui.screen);
		ui.container.append(this.element);

		$.extend( self, {
			_transition: undefined,
			_isOpen: false,
			_ui: ui
		});

		$.mobile.parseOptions(this, true);

		// Events on "screen" overlay
		ui.screen.bind( "vclick", function( event ) {
			self.close();
		});
	},

	_setOverlayTheme: function(newTheme) {
		var classes = this._ui.container.attr("class").split(" "),
		    alreadyAdded = false;

		for (var Nix in classes) {
			if (classes[Nix].substring(0, 8) === "ui-body-") {
				if (classes[Nix] != newTheme)
					this._ui.container.removeClass(classes[Nix]);
				else
					alreadyAdded = true;
			}
		}

		if (!(alreadyAdded || undefined === newTheme))
			this._ui.container.addClass(newTheme);

		this.options.overlayTheme = newTheme;
	},

	_setShadow: function(value) {
		if (value) {
			if (!this._ui.container.hasClass("ui-overlay-shadow"))
				this._ui.container.addClass("ui-overlay-shadow");
		}
		else
		if (this._ui.container.hasClass("ui-overlay-shadow"))
			this._ui.container.removeClass("ui-overlay-shadow");

		this.options.shadow = value;
	},

	_setTransition: function(value) {
		if (this._transition != undefined)
			this._ui.container.removeClass(this._transition);
		this._ui.container.addClass(value);
		this._transition = value;
	},

	_setOption: function(key, value) {
		if (key === "overlayTheme") {
			if (value.match(/[a-z]/))
				this._setOverlayTheme("ui-body-" + value);
			else
			if (value === "")
				this._setOverlayTheme();
		}
		else
		if (key === "shadow")
			this._setShadow(value);
		else
		if (key === "fade")
			this.options.fade = value;
		else
		if (key === "transition")
			this._setTransition(value);
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

		  // 30px tolerance off the edges
		  if ( newleft < 30 ) {
		    newleft = 30;
		  }
		  else
			if ( ( newleft + menuWidth ) > screenWidth ) {
		    newleft = screenWidth - menuWidth - 30;
		  }
		}

		return { x : newleft, y : newtop };
	},

	open: function(x_where, y_where) {
		if ( this.options.disabled || this._isOpen)
			return;

		var self = this,
		    x = (undefined === x_where ? window.innerWidth  / 2 : x_where),
		    y = (undefined === y_where ? window.innerHeight / 2 : y_where),
		    coords = this._placementCoords(x, y);

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

			this._isOpen = true;
	},

	close: function() {
		if (this.options.disabled || !this._isOpen)
			return;

		var self = this,
		    hideScreen = function() {
		    	self._ui.screen.addClass("ui-screen-hidden");
		    	self._isOpen = false;
		    	self.element.trigger("closed");
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
	}
});

$(document).bind("pagecreate create", function(e) {
	$($.mobile.popupwindow.prototype.options.initSelector, e.target)
		.not(":jqmData(role='none'), :jqmData(role='nojs')")
		.popupwindow();

	$("[aria-haspopup='true'][aria-owns]").bind("vclick", function(e) {
		$("#" + $(this).attr("aria-owns")).popupwindow('open',
			$(this).offset().left + $(this).outerWidth()  / 2,
			$(this).offset().top  + $(this).outerHeight() / 2);
	});
});

})(jQuery);
