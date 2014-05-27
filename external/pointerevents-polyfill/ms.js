/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function(scope) {
  var dispatcher = scope.dispatcher;
  var pointermap = dispatcher.pointermap;
  var HAS_BITMAP_TYPE = window.MSPointerEvent && typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';
  var msEvents = {
    events: [
      'MSPointerDown',
      'MSPointerMove',
      'MSPointerUp',
      'MSPointerOut',
      'MSPointerOver',
      'MSPointerCancel',
      'MSGotPointerCapture',
      'MSLostPointerCapture'
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    POINTER_TYPES: [
      '',
      'unavailable',
      'touch',
      'pen',
      'mouse'
    ],
    prepareEvent: function(inEvent) {
      var e = inEvent;
      if (HAS_BITMAP_TYPE) {
        e = dispatcher.cloneEvent(inEvent);
        e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
      }
      return e;
    },
    cleanup: function(id) {
      pointermap['delete'](id);
    },
    MSPointerDown: function(inEvent) {
      pointermap.set(inEvent.pointerId, inEvent);
      var e = this.prepareEvent(inEvent);
      dispatcher.down(e);
    },
    MSPointerMove: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.move(e);
    },
    MSPointerUp: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.up(e);
      this.cleanup(inEvent.pointerId);
    },
    MSPointerOut: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.leaveOut(e);
    },
    MSPointerOver: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.enterOver(e);
    },
    MSPointerCancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.cleanup(inEvent.pointerId);
    },
    MSLostPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('lostpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    },
    MSGotPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('gotpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    }
  };

  scope.msEvents = msEvents;
})(window.PointerEventsPolyfill);
