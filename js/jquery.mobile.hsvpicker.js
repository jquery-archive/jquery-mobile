/*!
 * jQuery Mobile Widget @VERSION
 *
 * Copyright (C) TODO
 * License: TODO
 * Authors: Gabriel Schulhof
 */

/*
 * Displays three sliders that allow the user to select the
 * hue, saturation, and value for a color.
 *
 * To apply, add the attribute data-role="hsvpicker" to a <div>
 * element inside a page. Alternatively, call hsvpicker() 
 * on an element (see below).
 *
 * Options:
 *
 *     color: String; the initial color can be specified in html using the
 *            data-color="#ff00ff" attribute or when constructed
 *            in javascript, eg
 *                $("#myhsvpicker").hsvpicker({ color: "#ff00ff" });
 *            where the html might be :
 *                <div id="myhsvpicker"></div>
 *            The color can be changed post-construction like this :
 *                $("#myhsvpicker").hsvpicker("option", "color", "#ABCDEF");
 *            Default: "#1a8039"
 *
 * Events:
 *
 *     colorchanged: Fired when the color is changed.
 */
(function( $, undefined ) {

$.widget( "mobile.hsvpicker", $.mobile.colorwidget, {
	options: {
		initSelector: ":jqmData(role='hsvpicker')"
	},

	_create: function() {
		var self = this,
		    ui = {
		    	container: "#hsvpicker",
		    	hue: {
		    		eventSource: "[data-event-source='hue']",
		    		selector:    "#hsvpicker-hue-selector",
		    		hue:         "#hsvpicker-hue-hue",
		    		valMask:     "#hsvpicker-hue-mask-val"
		    	},
		    	sat: {
		    		eventSource: "[data-event-source='sat']",
		    		selector:    "#hsvpicker-sat-selector",
		    		hue:         "#hsvpicker-sat-hue",
		    		valMask:     "#hsvpicker-sat-mask-val"
		    	},
		    	val: {
		    		eventSource: "[data-event-source='val']",
		    		selector:    "#hsvpicker-val-selector",
		    		hue:         "#hsvpicker-val-hue"
		    	}
		    };

		$.mobile.loadPrototypeFromString("hsvpicker",
"<div id='hsvpicker' class='ui-hsvpicker'>" +
"    <div class='hsvpicker-clrchannel-container'>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='hue' data-location='left' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-l'></a>" +
"        </div>" +
"        <div class='hsvpicker-clrchannel-masks-container'>" +
"            <div class='hsvpicker-clrchannel-mask' style='background: #ffffff;'></div>" +
"            <div id='hsvpicker-hue-hue' class='hsvpicker-clrchannel-mask hue-gradient'></div>" +
"            <div id='hsvpicker-hue-mask-val' class='hsvpicker-clrchannel-mask' style='background: #000000;' data-event-source='hue'></div>" +
"            <div id='hsvpicker-hue-selector' class='hsvpicker-clrchannel-selector ui-corner-all'></div>" +
"        </div>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='hue' data-location='right' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-r'></a>" +
"        </div>" +
"    </div>" +
"    <div class='hsvpicker-clrchannel-container'>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='sat' data-location='left' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-l'></a>" +
"        </div>" +
"        <div class='hsvpicker-clrchannel-masks-container'>" +
"            <div id='hsvpicker-sat-hue' class='hsvpicker-clrchannel-mask'></div>" +
"            <div class='hsvpicker-clrchannel-mask  sat-gradient'></div>" +
"            <div id='hsvpicker-sat-mask-val' class='hsvpicker-clrchannel-mask' style='background: #000000;' data-event-source='sat'></div>" +
"            <div id='hsvpicker-sat-selector' class='hsvpicker-clrchannel-selector ui-corner-all'></div>" +
"        </div>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='sat' data-location='right' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-r'></a>" +
"        </div>" +
"    </div>" +
"    <div class='hsvpicker-clrchannel-container'>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='val' data-location='left' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-l'></a>" +
"        </div>" +
"        <div class='hsvpicker-clrchannel-masks-container'>" +
"            <div class='hsvpicker-clrchannel-mask' style='background: #ffffff;'></div>" +
"            <div id='hsvpicker-val-hue' class='hsvpicker-clrchannel-mask'></div>" +
"            <div class='hsvpicker-clrchannel-mask val-gradient' data-event-source='val'></div>" +
"            <div id='hsvpicker-val-selector' class='hsvpicker-clrchannel-selector ui-corner-all'></div>" +
"        </div>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='val' data-location='right' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-r'></a>" +
"        </div>" +
"    </div>" +
"</div>", ui);
		this.element.append(ui.container);

		$.extend(self, {
			_ui: ui,
			_dragging_hsv: [ 0, 0, 0],
			_selectorDraggingOffset: {
				x : -1,
				y : -1
			},
			_dragging: -1
		});

		$.mobile.colorwidget.prototype._create.call(this);

		ui.container.find(".hsvpicker-arrow-btn")
			.bind("vclick", function(e) {
				var chan = $(this).attr("data-target"),
				    hsvIdx = ("hue" === chan) ? 0 :
                     ("sat" === chan) ? 1 : 2,
				    max = (0 == hsvIdx ? 360 : 1),
				    step = 0.05 * max;

				self._dragging_hsv[hsvIdx] = self._dragging_hsv[hsvIdx] + step * ("left" === $(this).attr("data-location") ? -1 : 1);
				self._dragging_hsv[hsvIdx] = Math.min(max, Math.max(0.0, self._dragging_hsv[hsvIdx]));
				self._updateSelectors(self._dragging_hsv);
			});

		$( document )
			.bind( "vmousemove", function( event ) {
				if ( self._dragging != -1 ) {
					event.stopPropagation();
					event.preventDefault();
				}
			})
			.bind( "vmouseup", function( event ) {
				self._dragging = -1;
			});

		this._bindElements("hue", 0);
		this._bindElements("sat", 1);
		this._bindElements("val", 2);
	},

	_bindElements: function(chan, idx) {
		var self = this;
		this._ui[chan].selector
			.bind("mousedown vmousedown", function(e) { self._handleMouseDown(chan,  idx, e, true); })
			.bind("vmousemove touchmove", function(e) { self._handleMouseMove(chan,  idx, e, true); })
			.bind("vmouseup",             function(e) { self._dragging = -1; });
		this._ui[chan].eventSource
			.bind("mousedown vmousedown", function(e) { self._handleMouseDown(chan, idx, e, false); })
			.bind("vmousemove touchmove", function(e) { self._handleMouseMove(chan, idx, e, false); })
			.bind("vmouseup",             function(e) { self._dragging = -1; });
	},

	_handleMouseDown: function(chan, idx, e, isSelector) {
		var coords = $.mobile.targetRelativeCoordsFromEvent(e),
		    widgetStr = (isSelector ? "selector" : "eventSource");

		if (coords.x >= 0 && coords.x <= this._ui[chan][widgetStr].outerWidth() &&
		    coords.y >= 0 && coords.y <= this._ui[chan][widgetStr].outerHeight()) {

			this._dragging = idx;

			if (isSelector) {
				this._selectorDraggingOffset.x = coords.x;
				this._selectorDraggingOffset.y = coords.y;
			}

			this._handleMouseMove(chan, idx, e, isSelector, coords);
		}
	},

	_handleMouseMove: function(chan, idx, e, isSelector, coords) {
		if (this._dragging === idx) {
			if (coords === undefined)
				var coords = $.mobile.targetRelativeCoordsFromEvent(e);
			var factor = ((0 === idx) ? 360 : 1),
			    potential = (isSelector
			    	? ((this._dragging_hsv[idx] / factor) +
	  	    		 ((coords.x - this._selectorDraggingOffset.x) / this._ui[chan].eventSource.width()))
			    	: (coords.x / this._ui[chan].eventSource.width()));

			this._dragging_hsv[idx] = Math.min(1.0, Math.max(0.0, potential)) * factor;

			if (!isSelector) {
				this._selectorDraggingOffset.x = Math.ceil(this._ui[chan].selector.outerWidth()  / 2.0);
				this._selectorDraggingOffset.y = Math.ceil(this._ui[chan].selector.outerHeight() / 2.0);
			}

			this._updateSelectors(this._dragging_hsv);
			e.stopPropagation();
			e.preventDefault();
		}
	},

	_updateSelectors: function(hsv) {
    	var  clr = $.mobile.clrlib.RGBToHTML($.mobile.clrlib.HSVToRGB(hsv)),
			    hclr = $.mobile.clrlib.RGBToHTML($.mobile.clrlib.HSVToRGB([hsv[0], 1.0, 1.0])),
			    vclr = $.mobile.clrlib.RGBToHTML($.mobile.clrlib.HSVToRGB([hsv[0], hsv[1], 1.0]));

    	this._ui.hue.selector.css("left", this._ui.hue.eventSource.width() * hsv[0] / 360);
    	this._ui.hue.selector.css("background", clr);
    	this._ui.hue.hue.css("opacity", hsv[1]);
    	this._ui.hue.valMask.css("opacity", 1.0 - hsv[2]);

    	this._ui.sat.selector.css("left", this._ui.sat.eventSource.width() * hsv[1]);
    	this._ui.sat.selector.css("background", clr);
    	this._ui.sat.hue.css("background", hclr);
    	this._ui.sat.valMask.css("opacity", 1.0 - hsv[2]);

    	this._ui.val.selector.css("left", this._ui.val.eventSource.width() * hsv[2]);
    	this._ui.val.selector.css("background", clr);
    	this._ui.val.hue.css("background", vclr);

    	$.mobile.colorwidget.prototype._setColor.call(this, clr);
	},

	_setColor: function(clr, unconditional) {
		if ($.mobile.colorwidget.prototype._setColor.call(this, clr, unconditional)) {
			this._dragging_hsv = $.mobile.clrlib.RGBToHSV($.mobile.clrlib.HTMLToRGB(clr));
			this._updateSelectors(this._dragging_hsv);
		}
	}
});

$(document).bind("pagecreate create", function(e) {
	$($.mobile.hsvpicker.prototype.options.initSelector, e.target)
		.not(":jqmData(role='none'), :jqmData(role='nojs')")
		.hsvpicker();
});

})(jQuery);
