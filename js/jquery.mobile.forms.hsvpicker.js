(function($, undefined) {

$.widget("mobile.hsvpicker", $.mobile.widget, {
	options: {
		color        : "#244224",
		initSelector : ":jqmData(role='hsvpicker')"
	},

	_create: function() {
		var widgetOptionNames = {
		    	"color"    : (this.element.is("input") ? "value" : "data-" + ($.mobile.ns || "") + "color")
		    },
		    ui = {
		    	container: "#hsvpicker",
		    	hue: {
		    		selector:    "#hsvpicker-hue-selector",
		    		hue:         "#hsvpicker-hue-hue",
		    		valMask:     "#hsvpicker-hue-mask-val",
		    		eventSource: "[data-event-source='hue']"
		    	},
		    	sat: {
		    		selector:    "#hsvpicker-sat-selector",
		    		hue:         "#hsvpicker-sat-hue",
		    		valMask:     "#hsvpicker-sat-mask-val",
		    		eventSource: "[data-event-source='sat']"
		    	},
		    	val: {
		    		selector:    "#hsvpicker-val-selector",
		    		hue:         "#hsvpicker-val-hue",
		    		eventSource: "[data-event-source='val']"
		    	}
		    },
		    proto = $(
"<div>" +
"  <div id='hsvpicker' class='ui-hsvpicker'>" +
"    <div class='hsvpicker-clrchannel-container'>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='hue' data-location='left' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-l'></a>" +
"        </div>" +
"        <div class='hsvpicker-clrchannel-masks-container'>" +
"            <div class='hsvpicker-clrchannel-mask hsvpicker-clrchannel-mask-white'></div>" +
"            <div id='hsvpicker-hue-hue' class='hsvpicker-clrchannel-mask hue-gradient'></div>" +
"            <div id='hsvpicker-hue-mask-val' class='hsvpicker-clrchannel-mask hsvpicker-clrchannel-mask-black' data-event-source='hue'></div>" +
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
"            <div id='hsvpicker-sat-mask-val' class='hsvpicker-clrchannel-mask hsvpicker-clrchannel-mask-black' data-event-source='sat'></div>" +
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
"            <div class='hsvpicker-clrchannel-mask hsvpicker-clrchannel-mask-white'></div>" +
"            <div id='hsvpicker-val-hue' class='hsvpicker-clrchannel-mask'></div>" +
"            <div class='hsvpicker-clrchannel-mask val-gradient' data-event-source='val'></div>" +
"            <div id='hsvpicker-val-selector' class='hsvpicker-clrchannel-selector ui-corner-all'></div>" +
"        </div>" +
"        <div class='hsvpicker-arrow-btn-container'>" +
"            <a href='#' class='hsvpicker-arrow-btn' data-target='val' data-location='right' data-role='button' data-inline='true' data-iconpos='notext' data-icon='arrow-r'></a>" +
"        </div>" +
"    </div>" +
"  </div>" +
"</div>"
),
		    self = this;

		// Assign the relevant parts of the proto
		function assignElements(proto, obj) {
			for (var key in obj)
				if (typeof obj[key] === "string")
					obj[key] = proto.find(obj[key]).removeAttr("id");
				else
				if (typeof obj[key] === "object")
					obj[key] = assignElements(proto, obj[key]);
			return obj;
		}
		ui = assignElements(proto, ui);

		// Apply the proto
		if (this.element.is("input"))
			ui.container.insertAfter(this.element);
		else
			this.element.append(ui.container);

		// Define instance variables
		$.extend(this, {
			_ui: ui,
			_dragging_hsv: [0, 0, 0],
			_selectorDraggingOffset: {
				x: -1,
				y: -1
			},
			_dragging: -1
		});

		// Apply options - data-* options, if present, take precedence over this.options.*
		for (var key in this.options)
			this._setOption(key,
				(widgetOptionNames[key] === undefined || this.element.attr(widgetOptionNames[key]) === undefined)
					? this.options[key]
					: this.element.attr(widgetOptionNames[key]), true);

		
		ui.container.find(".hsvpicker-arrow-btn")
			.buttonMarkup()
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

		if (this.element.is("input"))
			this.element.bind("change", function(e) {
				self._setOption("color", self.element.attr("value"));
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

	/**
	 * Get document-relative mouse coordinates from a given event
	 *
	 * From: http://www.quirksmode.org/js/events_properties.html#position
	 */
	_documentRelativeCoordsFromEvent: function(ev) {
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

	_targetRelativeCoordsFromEvent: function(e) {
		var coords = { x: e.offsetX, y: e.offsetY };

		if (coords.x === undefined || isNaN(coords.x) ||
		    coords.y === undefined || isNaN(coords.y)) {
			var offset = $(e.target).offset();

			coords = this._documentRelativeCoordsFromEvent(e);
			coords.x -= offset.left;
			coords.y -= offset.top;
		}

		return coords;
	},

	_handleMouseDown: function(chan, idx, e, isSelector) {
		var coords = this._targetRelativeCoordsFromEvent(e),
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
				var coords = this._targetRelativeCoordsFromEvent(e);
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
    	var  clr = this._RGBToHTML(this._HSVToRGB(hsv)),
			    hclr = this._RGBToHTML(this._HSVToRGB([hsv[0], 1.0, 1.0])),
			    vclr = this._RGBToHTML(this._HSVToRGB([hsv[0], hsv[1], 1.0]));

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

			this._updateAttributes(clr);
	},

	/*
	 * Converts html color string to rgb array.
	 *
	 * Input: string clr_str, where
	 * clr_str is of the form "#aabbcc"
	 *
	 * Returns: [ r, g, b ], where
	 * r is in [0, 1]
	 * g is in [0, 1]
	 * b is in [0, 1]
	 */
	_HTMLToRGB: function(clr_str) {
		clr_str = (('#' == clr_str.charAt(0)) ? clr_str.substring(1) : clr_str);

		return ([clr_str.substring(0, 2),
		         clr_str.substring(2, 4),
		         clr_str.substring(4, 6)].map(function(val) {
   	           return parseInt(val, 16) / 255.0;
		         }));
	},

	/*
	 * Converts rgb array to html color string.
	 *
	 * Input: [ r, g, b ], where
	 * r is in [0, 1]
	 * g is in [0, 1]
	 * b is in [0, 1]
	 *
	 * Returns: string of the form "#aabbcc"
	 */
	_RGBToHTML: function(rgb) {
		return ("#" + 
			rgb.map(function(val) {
			    	var ret = val * 255,
   		    	    theFloor = Math.floor(ret);

			    	ret = ((ret - theFloor > 0.5) ? (theFloor + 1) : theFloor);
			    	ret = (((ret < 16) ? "0" : "") + (ret & 0xff).toString(16));
			    	return ret;
 			    })
			   .join(""));
	},

	/*
	 * Converts hsv to rgb.
	 *
	 * Input: [ h, s, v ], where
	 * h is in [0, 360]
	 * s is in [0,   1]
	 * v is in [0,   1]
	 *
	 * Returns: [ r, g, b ], where
	 * r is in [0, 1]
	 * g is in [0, 1]
	 * b is in [0, 1]
	 */
	_HSVToRGB: function(hsv) {
		return this._HSLToRGB(this._HSVToHSL(hsv));
	},

	/*
	 * Converts rgb to hsv.
	 *
	 * from http://coecsl.ece.illinois.edu/ge423/spring05/group8/FinalProject/HSV_writeup.pdf
	 *
	 * Input: [ r, g, b ], where
	 * r is in [0,   1]
	 * g is in [0,   1]
	 * b is in [0,   1]
	 *
	 * Returns: [ h, s, v ], where
	 * h is in [0, 360]
	 * s is in [0,   1]
	 * v is in [0,   1]
	 */
	_RGBToHSV: function(rgb) {
		var min, max, delta, h, s, v, r = rgb[0], g = rgb[1], b = rgb[2];

		min = Math.min(r, Math.min(g, b));
		max = Math.max(r, Math.max(g, b));
		delta = max - min;

		h = 0;
		s = 0;
		v = max;

		if (delta > 0.00001) {
			s = delta / max;

			if (r === max)
				h = (g - b) / delta ;
			else
			if (g === max)
				h = 2 + (b - r) / delta ;
			else
				h = 4 + (r - g) / delta ;

			h *= 60 ;

			if (h < 0)
				h += 360 ;
		}

		return [h, s, v];
	},

	/*
	 * Converts hsl to rgb.
	 *
	 * From http://130.113.54.154/~monger/hsl-rgb.html
	 *
	 * Input: [ h, s, l ], where
	 * h is in [0, 360]
	 * s is in [0,   1]
	 * l is in [0,   1]
	 *
	 * Returns: [ r, g, b ], where
	 * r is in [0, 1]
	 * g is in [0, 1]
	 * b is in [0, 1]
	 */
	_HSLToRGB: function(hsl) {
   	var h = hsl[0] / 360.0, s = hsl[1], l = hsl[2];

   	if (0 === s)
			return [ l, l, l ];

		var temp2 = ((l < 0.5)
         	? l * (1.0 + s)
         	: l + s - l * s),
		    temp1 = 2.0 * l - temp2,
		    temp3 = {
		    	r: h + 1.0 / 3.0,
		    	g: h,
		    	b: h - 1.0 / 3.0
		    };

		temp3.r = ((temp3.r < 0) ? (temp3.r + 1.0) : ((temp3.r > 1) ? (temp3.r - 1.0) : temp3.r));
		temp3.g = ((temp3.g < 0) ? (temp3.g + 1.0) : ((temp3.g > 1) ? (temp3.g - 1.0) : temp3.g));
		temp3.b = ((temp3.b < 0) ? (temp3.b + 1.0) : ((temp3.b > 1) ? (temp3.b - 1.0) : temp3.b));

		ret = [
			(((6.0 * temp3.r) < 1) ? (temp1 + (temp2 - temp1) * 6.0 * temp3.r) :
			(((2.0 * temp3.r) < 1) ? temp2 :
			(((3.0 * temp3.r) < 2) ? (temp1 + (temp2 - temp1) * ((2.0 / 3.0) - temp3.r) * 6.0) :
			 temp1))),
			(((6.0 * temp3.g) < 1) ? (temp1 + (temp2 - temp1) * 6.0 * temp3.g) :
			(((2.0 * temp3.g) < 1) ? temp2 :
			(((3.0 * temp3.g) < 2) ? (temp1 + (temp2 - temp1) * ((2.0 / 3.0) - temp3.g) * 6.0) :
			 temp1))),
			(((6.0 * temp3.b) < 1) ? (temp1 + (temp2 - temp1) * 6.0 * temp3.b) :
			(((2.0 * temp3.b) < 1) ? temp2 :
			(((3.0 * temp3.b) < 2) ? (temp1 + (temp2 - temp1) * ((2.0 / 3.0) - temp3.b) * 6.0) :
			 temp1)))]; 

		return ret;
	},

	/*
	 * Converts hsv to hsl.
	 *
	 * Input: [ h, s, v ], where
	 * h is in [0, 360]
	 * s is in [0,   1]
	 * v is in [0,   1]
	 *
	 * Returns: [ h, s, l ], where
	 * h is in [0, 360]
	 * s is in [0,   1]
	 * l is in [0,   1]
	 */
	_HSVToHSL: function(hsv) {
		var max = hsv[2],
		    delta = hsv[1] * max,
		    min = max - delta,
		    sum = max + min,
		    half_sum = sum / 2,
		    s_divisor = ((half_sum < 0.5) ? sum : (2 - max - min));

		return [ hsv[0], ((0 == s_divisor) ? 0 : (delta / s_divisor)), half_sum ];
	},

	_updateAttributes: function(clr) {
		this.options.color = clr;
		this.element.attr("data-" + ($.mobile.ns || "") + "color", clr);
		if (this.element.is("input")) {
			this.element.attr("value", clr);
			this.element.triggerHandler("change");
		}
		this.element.triggerHandler("colorchanged");
	},

	_set_color: function(clr, unconditional) {
		if (clr.match(/#[0-9a-fA-F]{6}/) && (clr !== this.options.color || unconditional)) {
			this._dragging_hsv = this._RGBToHSV(this._HTMLToRGB(clr));
			this._updateSelectors(this._dragging_hsv);
			this._updateAttributes(clr);
		}
	},

	_set_disabled: function(value, unconditional) {
		if (this.options.disabled != value || unconditional) {
			this.options.disabled = value;
			this._ui.container[value ? "addClass" : "removeClass"]("ui-disabled");
		}
	},

	_setOption: function(key, value, unconditional) {
		if (unconditional === undefined)
			unconditional = false;
		if (this["_set_" + key] !== undefined)
			this["_set_" + key](value, unconditional);
	},

	enable: function() {
		this._setOption("disabled", false, true);
	},

	disable: function() {
		this._setOption("disabled", true, true);
	},

	refresh: function() {
		this._setOption("color", (this.element.attr("value") || this.element.attr("data-" + ($.mobile.ns || "") + "color")), true);
	}
});

$(document).bind("pagecreate create", function(e) {
	$($.mobile.hsvpicker.prototype.options.initSelector, e.target)
		.not(":jqmData(role='none'), :jqmData(role='nojs')")
		.hsvpicker();
});

})(jQuery);
