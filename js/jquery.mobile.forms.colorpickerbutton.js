/*!
 * jQuery Mobile Widget @VERSION
 *
 * Copyright (C) TODO
 * License: TODO
 * Authors: Gabriel Schulhof
 */

/*
 * Displays a button which, when pressed, opens a popupwindow
 * containing hsvpicker.
 *
 * To apply, add the attribute data-role="colorpickerbutton" to a <div>
 * element inside a page. Alternatively, call colorpickerbutton() on an
 * element.
 *
 * Options:
 *
 *     color: String; color displayed on the button and the base color
 *            of the hsvpicker (see hsvpicker).
 *            initial color can be specified in html using the
 *            data-color="#ff00ff" attribute or when constructed in
 *            javascript, eg :
 *                $("#mycolorpickerbutton").colorpickerbutton({ color: "#ff00ff" });
 *            where the html might be :
 *                <div id="colorpickerbutton"></div>
 *            The color can be changed post-construction like this :
 *                $("#mycolorpickerbutton").colorpickerbutton("option", "color", "#ABCDEF");
 *            Default: "#1a8039"
 *
 *     closeText: String; the text to display on the close button on the popupwindow.
 *
 * Events:
 *
 *     colorchanged: emitted when the color has been changed and the popupwindow is closed.
 */
(function($, undefined) {

$.widget("mobile.colorpickerbutton", $.mobile.colorwidget, {
	options: {
		closeText: "Close",
		initSelector: "input[type='color'], :jqmData(type='color'), :jqmData(role='colorpickerbutton')"
	},

	_create: function() {
		var self = this,
		    ui = {
		    	button:          "#colorpickerbutton-button",
		    	buttonContents:  "#colorpickerbutton-button-contents",
		    	popup:           "#colorpickerbutton-popup-container",
		    	hsvpicker:       "#colorpickerbutton-popup-hsvpicker",
		    	closeButton:     "#colorpickerbutton-popup-close-button",
		    	closeButtonText: "#colorpickerbutton-popup-close-button-text"
		    },
				popupId = "colorpickerbutton-popup-" + Math.floor(Math.random() * 1073741824);

		ui = $.mobile.loadPrototypeFromString("colorpickerbutton",
"    <a id='colorpickerbutton-button' href='#' data-inline='true' data-role='button' aria-haspopup='true'>" +
"        <span id='colorpickerbutton-button-contents'>&#x2587;&#x2587;&#x2587;</span>" +
"    </a>" +
"    <div id='colorpickerbutton-popup-container' data-role='popupwindow' class='ui-colorpickerbutton-popup-container'>" +
"        <div id='colorpickerbutton-popup-hsvpicker' data-role='hsvpicker'></div>" +
"        <a id='colorpickerbutton-popup-close-button' href='#' data-role='button'>" +
"            <span id='colorpickerbutton-popup-close-button-text'></span>" +
"        </a>" +
"    </div>", ui);
		ui.button
			.attr("aria-owns", popupId)
			.insertBefore(this.element);
		this.element.css("display", "none");

		// Tear apart the proto
		ui.popup
			.attr("id", popupId)
			.insertBefore(this.element)
			.popupwindow();
		ui.hsvpicker.hsvpicker();

		// Expose to other methods
		$.extend( self, {
			_ui: ui
		});

		// Find the button's theme and apply it to the popupwindow
		this.element.parents("[class]").each(function() {
			var ar = $(this).attr("class").split(" "),
					matchAr = [];

			for (var idx in ar) {
				matchAr = /ui-body-([a-z])/.exec(ar[idx]) || [];
				if (matchAr.length > 1) {
					self._ui.popup.popupwindow("option", "overlayTheme", matchAr[1]);
					return false;
				}
			}
			return true;
		});

		$.mobile.colorwidget.prototype._create.call(this);

		// Button events
		ui.button.bind("vclick keydown", function(event) {
			if (event.type == "vclick" ||
    	    event.keyCode &&
			    	(event.keyCode === $.mobile.keyCode.ENTER ||
			    	 event.keyCode === $.mobile.keyCode.SPACE)) {
				self.open();
				event.preventDefault();
			}
		});

		ui.closeButton.bind("vclick", function(event) {
			self._setColor(self._ui.hsvpicker.hsvpicker("option", "color"));
			self.close();
		});
  },

	_setDisabled: function(value, unconditional) {
		if (this.options.disabled != value || unconditional) {
			this._ui.button[(((true === value) ? "addClass" : "removeClass"))]("ui-disabled");
			this.options.disabled = value;
		}
	},

	_setOption: function(key, value, unconditional) {
		if (undefined === unconditional)
			unconditional = false;
		if (key === "color")
			this._setColor(value, unconditional);
		else
		if (key === "closeText")
			this._ui.closeButtonText.text(value);
		else
		if (key === "disabled")
			this._setDisabled(value, unconditional);
	},

	_setColor: function(clr, unconditional) {
		if ($.mobile.colorwidget.prototype._setColor.call(this, clr, unconditional)) {
			this._ui.hsvpicker.hsvpicker("option", "color", clr);
			this._ui.buttonContents.css("color", clr);
		}
	},

	open: function() {
		if ( this.options.disabled )
			return;

		this._ui.popup.popupwindow("open",
			this._ui.button.offset().left + this._ui.button.outerWidth()  / 2,
			this._ui.button.offset().top  + this._ui.button.outerHeight() / 2);
	},

	_focusButton : function(){
		var self = this;
		setTimeout(function() {
    		self._ui.button.focus();
		}, 40);
	},

	close: function() {
		if ( this.options.disabled )
    		return;

		var self = this;

		self._focusButton();
		self._ui.popup.popupwindow("close");
	},

	refresh: function() {
		this._setColor((this.element.attr("value") || this.element.attr("data-" + ($.mobile.ns || "") + "color")), true);
	},

	enable: function() {
		this._setOption("disabled", false);
	},

	disable: function() {
		this._setOption("disabled", true);
	}
});

//auto self-init widgets
$(document).bind("pagecreate create", function(e) {
	$($.mobile.colorpickerbutton.prototype.options.initSelector, e.target)
		.not(":jqmData(role='none'), :jqmData(role='nojs')")
		.colorpickerbutton();
});

})(jQuery);
