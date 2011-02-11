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
var touchEventProps = "clientX clientY pageX pageY screenX screenY".split(" ");

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
	this.ignoreMouseEvents = false;
	this.didScroll = false;
	this.resetTimerID = 0;
}

$.extend(MouseEventSequencer.prototype, {
	bind: function(eventType, data, namespace) {
		if (!this.activeHandlers[eventType]){
			this.element.bind(eventType.substr(1), sequencerEventCallback);
			this.activeHandlers[eventType] = 0;
			if (!this.activeHandlers.touchstart){
				this.element.bind("touchstart", sequencerEventCallback);
				this.activeHandlers.touchstart = 1;
			}
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
	},

	getNativeEvent: function(event) {
		while (event && typeof event.originalEvent !== "undefined")
			event = event.originalEvent;
		return event;
	},

	hasBindings: function() {
		var ah = this.activeHandlers;
		for (var e in ah){
			if (ah[e]){
				return true;
			}
		}
		return false;
	},

	handleEvent: function(event, data) {
		var result;
		switch(event.type) {
			case "touchstart":
				result = this.handleTouchStart(event, data);
				break;
			case "touchmove":
				result = this.handleTouchMove(event, data);
				break;
			case "touchend":
				result = this.handleTouchEnd(event, data);
				break;
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

	trigger: function(eventType, event, data){
		var t = event.type;
		event = $.Event(event);
		event.type = eventType;

		var oe = event.originalEvent;
		var props = $.event.props;

		// copy original event properties over to the new event
		// this would happen if we could call $.event.fix instead of $.Event
		// but we don't have a way to force an event to be fixed multiple times
		if (oe) {
			for ( var i = props.length, prop; i; ) {
				prop = props[ --i ];
				event[prop] = oe[prop];
			}
		}

		if (t.search(/^touch/) !== -1){
			var ne = this.getNativeEvent(oe);
			if (typeof ne.touches !== "undefined" && ne.touches[0]){
				var touch = ne.touches[0];
				for (var i = 0; i < touchEventProps.length; i++){
					var prop = touchEventProps[i];
					event[prop] = touch[prop];
				}
			}
		}
		this.element.trigger(event, data);
		return event.isDefaultPrevented();
	},

	startResetTimer: function() {
		var self = this;
		this.clearResetTimer();
		this.resetTimerID = setTimeout(function(){
			self.resetTimerID = 0;
			self.ignoreMouseEvents = false;
		}, 2000);
	},

	clearResetTimer: function() {
		if (this.resetTimerID){
			clearTimeout(this.resetTimerID);
			this.resetTimerID = 0;
		}
	},

	handleTouchStart: function(event, data){
		this.clearResetTimer();

		this.ignoreMouseEvents = true;
		this.didScroll = false;

		this.element.bind("touchmove", sequencerEventCallback);
		this.element.bind("touchend", sequencerEventCallback);

		this.trigger("vmouseover", event, data);
		this.trigger("vmousedown", event, data);
	},

	handleTouchMove: function(event, data){
		this.didScroll = true;
		this.trigger("vmousemove", event, data);
		this.startResetTimer();
	},

	handleTouchEnd: function(event, data){
		this.element.unbind("touchmove", sequencerEventCallback);
		this.element.unbind("touchend", sequencerEventCallback);

		this.trigger("vmouseup", event, data);
		if (!this.didScroll){
			if (this.trigger("vclick", event, data)){
				// prevent the pending click.
			}
		}
		this.trigger("vmouseout", event, data);
		this.didScroll = false;

		this.startResetTimer();
	}
});

function mouseEventCallback(event, data) {
	if (this.ignoreMouseEvents) {
		return;
	}
	this.trigger("v" + event.type, event, data);
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