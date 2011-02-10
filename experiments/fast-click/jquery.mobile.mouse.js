/*
* jQuery Mobile Framework : "mouse" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

// This plugin is an experiment for abstracting away the touch and mouse
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

var dataSequencerName = "mouseEventSequencer";

function sequencerEventCallback(event, data)
{
	var seq = $(this).data(dataSequencerName);
	if (seq){
		seq.handleEvent(event, data);
	}
}

function MouseEventSequencer(element)
{
	this.element = element;
	this.activeHandlers = {};
}

$.extend(MouseEventSequencer.prototype, {
	bind: function(eventType, data, namespace) {
		if (!this.activeHandlers[eventType]){
			this.element.bind(eventType.substr(1), sequencerEventCallback);
			this.activeHandlers[eventType] = 0;
		}
		this.activeHandlers[eventType] = 1;
	},

	unbind: function(eventType, data, namespace) {
		if (this.activeHandlers[eventType]){
			--this.activeHandlers[eventType];
			if (!this.activeHandlers[eventType]){
				this.element.unbind(eventType.substr(1), sequencerEventCallback);
			}
		}
		this.activeHandlers[eventType] = 1;
	},

	handleEvent: function(event, data) {
		var result;
		switch(event.type) {
			case "mouseover":
				result = this.handleOver(event, data);
				break;
			case "mousedown":
				result = this.handleDown(event, data);
				break;
			case "mousemove":
				result = this.handleMove(event, data);
				break;
			case "mouseup":
				result = this.handleUp(event, data);
				break;
			case "click":
				result = this.handleClick(event, data);
				break;
			case "mouseout":
				result = this.handleOut(event, data);
				break;
		}
		return result;
	},

	handleTouchStart: function(event, data){
	}
});

function mouseEventCallback(event, data) {
	if (this.ignoreMouseEvents) {
		return;
	}
	event = $.Event(event);
	event.type = "v" + event.type;
	this.element.trigger(event, data);
}

var handleFuncNames = "handleOver handleDown handleMove handleUp handleClick handleOut".split(" ");
for (var i = 0; i < handleFuncNames.length; i++) {
	MouseEventSequencer.prototype[handleFuncNames[i]] = mouseEventCallback;
}

function getSpecialEventObject(eventType)
{
	return {
		setup: function(data, namespace) {
			var $this = $(this);
			var seq = $this.data(dataSequencerName);
			if (!seq){
				$this.data(dataSequencerName, seq = new MouseEventSequencer($this));
			}
			seq.bind(eventType, data, namespace);
		},

		teardown: function(data, namespace) {
			var $this = $(this);
			var seq = $this.data(dataSequencerName);
			if (seq){
				seq.unbind(eventType, data, namespace);
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

var vevents = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout".split(" ");
for (var i = 0; i < vevents.length; i++){
	$.event.special[vevents[i]] = getSpecialEventObject(vevents[i]);
}

})(jQuery, window, document);