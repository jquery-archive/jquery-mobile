/*
* jQuery Mobile Framework : "click" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

// This plugin is an experient for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version simply adds mBind and mUnbind to the $.fn space,
// but we're considering other methods for making this easier. One alternative
// would be to allow users to use virtual mouse event names, such as
// "vmousedown", "vmouseup", etc, to trigger the traditional jQuery special/custom
// event api, which would then trigger this same code.

(function($, window, document, undefined) {

var nextSequencerID = 0;

var eventToSequencerName = {
	touchstart: "mmousedown",
	touchmove:  "mmousemove",
	touchend:   "mmouseup",
	mousedown:  "mmousedown",
	mousemove:  "mmousemove",
	mouseup:    "mmouseup",
	mouseover:  "mmouseover",
	mouseout:   "mmouseout",
	click:      "mclick"
};

var downEvents = "touchstart mousedown";
var upEvents   = "touchend mouseup";
var moveEvents = "touchmove mousemove";

function MouseEventSequencer()
{
	this.seqID = "MSE-" + nextSequencerID++;
	this.handlerDict = {};
	this.mode = null;
	this.downFunc = null;
}

$.extend(MouseEventSequencer.prototype, {
	bind: function(ele, eventType, handler)
	{
		var self = this,
			seqName = eventToSequencerName[eventType],
			$ele = $(ele),
			hArray = handlerDict[seqName];

		if (!hArray) {
			hArray = handlerDict[seqName] = [];
		}
		hArray.push(handler);

		if (!this.downFunc){
			// We always register for touchstart and mousedown because
			// we may need to synthesize some events when dealing with
			// touch devices.

			this.downFunc = function(e,d){ self.handleDown(e, d); }
			$ele.bind("touchstart." + this.seqID + " mousedown." + this.seqID, this.downFunc);
		}
	},

	unbind: function(ele, eventType, handler)
	{
		var $ele = $(ele),
			hArray = handlerDict[eventType];
		if (hArray){
			var i = $.inArray(handler, hArray);
			if (i != -1)
				hArray.splice(i, 1);
		}
			hArray = handlerDict[eventType] = [];
		hArray.push(handler);
	},

	trigger: function(eventType, data)
	{
	},
	
	handleDown: function(event, data)
	{
		this.mode = this.getModeFromType(event.type);
		if (this.mode == "touch") {
			this.trigger("mmouseover");
		}
		this.trigger("mmousedown");
	},

	handleUp: function()
	{
		this.trigger("mmouseup");
		if (this.mode == "touch"){
			this.trigger("mclick");
			this.trigger("mmouseout");
		}
	},

	handleMove: function()
	{
		this.trigger("mmousemove");
	},

	handleOver: function()
	{
		if (this.mode != "touch")
			this.trigger("mmouseover");
	},

	handleOut: function()
	{
		if (this.mode != "touch")
			this.trigger("mmouseout");
	},

	getModeFromType: function (eventType)
	{
		return isTouchEvent(eventType) ? "touch" : "mouse";
	}
});

function isMouseEvent(eventType)
{
	eventType = eventType || "";
	return eventType.search(/^((mouse(down|up|move|over|out))|click)$/) != -1;
}

function isTouchEvent(eventType)
{
	eventType = eventType || "";
	return eventType.search(/^touch(start|end|move|cancel)$/) != -1;
}


$.extend($.fn, {
	mBind: function(eventType, handler)
	{
		if (isMouseEvent(eventType) || isTouchEvent(eventType)){
			this.each(function(){
				var $this = $(this);
				var seq = $this.data("mouseEventSequencer");
				if (!seq){
					seq = new MouseEventSequencer();
					$this.data("mouseEventSequencer", seq);
				}
				seq.bind(this, eventType, handler);
			});
		}
		else {
			this.bind(eventType, handler);
		}
		return this;
	},

	mUnbind: function(eventType, handler)
	{
		if (isMouseEvent(eventType) || isTouchEvent(eventType)){
			this.each(function(){
				var $this = $(this);
				var seq = $this.data("mouseEventSequencer");
				if (seq){
					seq.unbind(this, eventType, handler);
				}
			});
		}
		else {
			this.unbind(eventType, handler);
		}
		return this;
	}
});

})(jQuery, window, document);