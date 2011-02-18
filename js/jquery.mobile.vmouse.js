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
// "vmousedown", "vmouseup", etc, to triggerVirtualEvent the traditional jQuery special/custom
// event api, which would then triggerVirtualEvent this same code.

(function($, window, document, undefined) {

var dataPropertyName = "virtualMouseBindings",
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split(" "),
	activeDocHandlers = {},
	blockMouseEvents = false,
	resetTimerID = 0,
	didScroll = false,
	clickBlockList = [];

function getNativeEvent(event)
{
	while (event && typeof event.originalEvent !== "undefined") {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent(event, eventType)
{
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
		var ne = getNativeEvent(oe);
		if (typeof ne.touches !== "undefined" && ne.touches[0]){
			var touch = ne.touches[0];
			for (var i = 0; i < touchEventProps.length; i++){
				var prop = touchEventProps[i];
				event[prop] = touch[prop];
			}
		}
	}

	return event;
}

function getClosestElementWithVirtualBinding(element, eventType)
{
	var $ele = $(element);
	while ($ele && $ele.length){
		var b = $ele.data(dataPropertyName);
		if (b && (!eventType || b[eventType])) {
			return $ele;
		}
		$ele = $ele.parent();
	}
	return null;
}

function disableMouseBindings()
{
	blockMouseEvents = true;
}

function enableMouseBindings()
{
	blockMouseEvents = false;
	clickBlockList.length = 0;
}

function startResetTimer()
{
	clearResetTimer();
	resetTimerID = setTimeout(function(){
		resetTimerID = 0;
		enableMouseBindings();
	}, 2000);
}

function clearResetTimer()
{
	if (resetTimerID){
		clearTimeout(resetTimerID);
		resetTimerID = 0;
	}
}

function triggerVirtualEvent(eventType, event)
{
	var defaultPrevented = false;

	if (getClosestElementWithVirtualBinding(event.target, eventType)) {
		var ve = createVirtualEvent(event, eventType);
		$(event.target).trigger(ve);
		defaultPrevented = ve.isDefaultPrevented();
	}

	return defaultPrevented;
}

function mouseEventCallback(event)
{
	if (blockMouseEvents){
		return;
	}

	triggerVirtualEvent("v" + event.type, event);
}

function clearResetTimer()
{
	if (resetTimerID){
		clearTimeout(resetTimerID);
		resetTimerID = 0;
	}
}

function handleTouchStart(event)
{
	clearResetTimer();
	
	disableMouseBindings();
	didScroll = false;

	var $document = $(document);
	$document.bind("touchmove", handleTouchMove);
	$document.bind("touchend", handleTouchEnd);
	
	triggerVirtualEvent("vmouseover", event);
	triggerVirtualEvent("vmousedown", event);
}

function handleTouchMove(event)
{
	didScroll = true;
	triggerVirtualEvent("vmousemove", event);
	startResetTimer();
}

function handleTouchEnd(event)
{
	var $document = $(document);
	$document.unbind("touchmove", handleTouchMove);
	$document.unbind("touchend", handleTouchEnd);
	
	triggerVirtualEvent("vmouseup", event);
	if (!didScroll){
		if (triggerVirtualEvent("vclick", event)){
			// Push this element on the block list to prevent any clicks
			// from getting to the bubble phase.
			clickBlockList.push(event.target);
		}
	}
	triggerVirtualEvent("vmouseout", event);
	didScroll = false;
	
	startResetTimer();
}

function hasVirtualBindings($ele)
{
	var bindings = $ele.data(dataPropertyName), k;
	if (bindings){
		for (k in bindings){
			if (bindings[k]){
				return true;
			}
		}
	}
	return false;
}

function getSpecialEventObject(eventType)
{
	return {
		setup: function(data, namespace) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			var $this = $(this);
			if (!hasVirtualBindings($this)){
				$this.data(dataPropertyName, {});
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.

			var bindings = $this.data(dataPropertyName);
			bindings[eventType] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[eventType] = (activeDocHandlers[eventType] || 0) + 1;
			if (activeDocHandlers[eventType] == 1){
				$(document).bind(eventType.substr(1), mouseEventCallback);
			}

			// If this is the first virtual mouse binding for the document,
			// register our touchstart handler on the document.

			activeDocHandlers["touchstart"] = (activeDocHandlers["touchstart"] || 0) + 1;
			if (activeDocHandlers["touchstart"] == 1) {
				$(document).bind("touchstart", handleTouchStart);
			}
		},

		teardown: function(data, namespace) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[eventType];
			if (!activeEventHandlers[eventType]){
				$(document).unbind(eventType.substr(1), mouseEventCallback);
			}

			// If this is the last virtual mouse binding in existence,
			// remove our document touchstart listener.

			--activeDocHandlers["touchstart"];
			if (!activeDocHandlers["touchstart"]) {
				$(document).unbind("touchstart", handleTouchStart);
			}

			var $this = $(this),
				bindings = $this.data(dataPropertyName);
			bindings[eventType] = false;

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			var $this = $(this);
			if (!hasVirtualBindings($this)){
				$this.removeData(dataPropertyName);
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

var vevents = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout".split(" ");
for (var i = 0; i < vevents.length; i++){
	$.event.special[vevents[i]] = getSpecialEventObject(vevents[i]);
}

// Add a capture click handler to block clicks.
document.addEventListener("click", function(e){
	var cnt = clickBlockList.length;
	var target = e.target;
	while (target) {
		for (var i = 0; i < cnt; i++) {
			if (target == clickBlockList[i]){
				e.preventDefault();
				e.stopPropagation();
			}
		}
		target = target.parentNode;
	}
}, true);

})(jQuery, window, document);