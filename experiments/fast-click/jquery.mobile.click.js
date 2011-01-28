/*
* jQuery Mobile Framework : "click" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, window, document, undefined) {

var nextSequencerID = 0;

function MouseEventSequencer()
{
	this.seqID = "MSE-" + nextSequencerID++;
	this.handlerDict = {};
	this.mode = null;
}

$.extend(MouseEventSequencer.prototype, {
	bind: function(ele, eventType, handler)
	{
		var $ele = $(ele),
			hArray = handlerDict[eventType];
		if (!hArray)
			hArray = handlerDict[eventType] = [];
		hArray.push(handler);

		// We always register for touchstart and mousedown because
		// we may need to synthesize some events when dealing with
		// touch devices.

		$ele.bind("touchstart." + this.seqID + " mousedown." + this.seqID, function(e,d){ self.handleDown(e, d); });
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
		this.mode = isTouchEvent(event.type) ? "touch" : "mouse";
		this.trigger("mmouseover");
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