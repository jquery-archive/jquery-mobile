/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function(scope) {
  var dispatcher = scope.dispatcher;
  var captureInfo = dispatcher.captureInfo;
  var findTarget = scope.findTarget;
  var allShadows = scope.targetFinding.allShadows.bind(scope.targetFinding);
  var pointermap = dispatcher.pointermap;
  var touchMap = Array.prototype.map.call.bind(Array.prototype.map);
  // This should be long enough to ignore compat mouse events made by touch
  var DEDUP_TIMEOUT = 2500;
  var CLICK_COUNT_TIMEOUT = 200;
  var ATTRIB = 'touch-action';
  var INSTALLER;
  // The presence of touch event handlers blocks scrolling, and so we must be careful to
  // avoid adding handlers unnecessarily.  Chrome plans to add a touch-action-delay property
  // (crbug.com/329559) to address this, and once we have that we can opt-in to a simpler
  // handler registration mechanism.  Rather than try to predict how exactly to opt-in to
  // that we'll just leave this disabled until there is a build of Chrome to test.
  var HAS_TOUCH_ACTION_DELAY = false;
  
  // handler block for native touch events
  var touchEvents = {
    events: [
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel'
    ],
    register: function(target) {
      if (HAS_TOUCH_ACTION_DELAY) {
        dispatcher.listen(target, this.events);
      } else {
        INSTALLER.enableOnSubtree(target);
      }
    },
    unregister: function(target) {
      if (HAS_TOUCH_ACTION_DELAY) {
        dispatcher.unlisten(target, this.events);
      } else {
        // TODO(dfreedman): is it worth it to disconnect the MO?
      }
    },
    elementAdded: function(el) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      if (st) {
        el._scrollType = st;
        dispatcher.listen(el, this.events);
        // set touch-action on shadows as well
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
          dispatcher.listen(s, this.events);
        }, this);
      }
    },
    elementRemoved: function(el) {
      el._scrollType = undefined;
      dispatcher.unlisten(el, this.events);
      // remove touch-action from shadow
      allShadows(el).forEach(function(s) {
        s._scrollType = undefined;
        dispatcher.unlisten(s, this.events);
      }, this);
    },
    elementChanged: function(el, oldValue) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      var oldSt = this.touchActionToScrollType(oldValue);
      // simply update scrollType if listeners are already established
      if (st && oldSt) {
        el._scrollType = st;
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
        }, this);
      } else if (oldSt) {
        this.elementRemoved(el);
      } else if (st) {
        this.elementAdded(el);
      }
    },
    scrollTypes: {
      EMITTER: 'none',
      XSCROLLER: 'pan-x',
      YSCROLLER: 'pan-y',
      SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
    },
    touchActionToScrollType: function(touchAction) {
      var t = touchAction;
      var st = this.scrollTypes;
      if (t === 'none') {
        return 'none';
      } else if (t === st.XSCROLLER) {
        return 'X';
      } else if (t === st.YSCROLLER) {
        return 'Y';
      } else if (st.SCROLLER.exec(t)) {
        return 'XY';
      }
    },
    POINTER_TYPE: 'touch',
    firstTouch: null,
    isPrimaryTouch: function(inTouch) {
      return this.firstTouch === inTouch.identifier;
    },
    setPrimaryTouch: function(inTouch) {
      // set primary touch if there no pointers, or the only pointer is the mouse
      if (pointermap.pointers() === 0 || (pointermap.pointers() === 1 && pointermap.has(1))) {
        this.firstTouch = inTouch.identifier;
        this.firstXY = {X: inTouch.clientX, Y: inTouch.clientY};
        this.scrolling = false;
        this.cancelResetClickCount();
      }
    },
    removePrimaryPointer: function(inPointer) {
      if (inPointer.isPrimary) {
        this.firstTouch = null;
        this.firstXY = null;
        this.resetClickCount();
      }
    },
    clickCount: 0,
    resetId: null,
    resetClickCount: function() {
      var fn = function() {
        this.clickCount = 0;
        this.resetId = null;
      }.bind(this);
      this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);
    },
    cancelResetClickCount: function() {
      if (this.resetId) {
        clearTimeout(this.resetId);
      }
    },
    typeToButtons: function(type) {
      var ret = 0;
      if (type === 'touchstart' || type === 'touchmove') {
        ret = 1;
      }
      return ret;
    },
    touchToPointer: function(inTouch) {
      var cte = this.currentTouchEvent;
      var e = dispatcher.cloneEvent(inTouch);
      // Spec specifies that pointerId 1 is reserved for Mouse.
      // Touch identifiers can start at 0.
      // Add 2 to the touch identifier for compatibility.
      var id = e.pointerId = inTouch.identifier + 2;
      e.target = captureInfo[id] || findTarget(e);
      e.bubbles = true;
      e.cancelable = true;
      e.detail = this.clickCount;
      e.button = 0;
      e.buttons = this.typeToButtons(cte.type);
      e.width = inTouch.webkitRadiusX || inTouch.radiusX || 0;
      e.height = inTouch.webkitRadiusY || inTouch.radiusY || 0;
      e.pressure = inTouch.webkitForce || inTouch.force || 0.5;
      e.isPrimary = this.isPrimaryTouch(inTouch);
      e.pointerType = this.POINTER_TYPE;
      // forward touch preventDefaults
      var self = this;
      e.preventDefault = function() {
        self.scrolling = false;
        self.firstXY = null;
        cte.preventDefault();
      };
      return e;
    },
    processTouches: function(inEvent, inFunction) {
      var tl = inEvent.changedTouches;
      this.currentTouchEvent = inEvent;
      for (var i = 0, t; i < tl.length; i++) {
        t = tl[i];
        inFunction.call(this, this.touchToPointer(t));
      }
    },
    // For single axis scrollers, determines whether the element should emit
    // pointer events or behave as a scroller
    shouldScroll: function(inEvent) {
      if (this.firstXY) {
        var ret;
        var scrollAxis = inEvent.currentTarget._scrollType;
        if (scrollAxis === 'none') {
          // this element is a touch-action: none, should never scroll
          ret = false;
        } else if (scrollAxis === 'XY') {
          // this element should always scroll
          ret = true;
        } else {
          var t = inEvent.changedTouches[0];
          // check the intended scroll axis, and other axis
          var a = scrollAxis;
          var oa = scrollAxis === 'Y' ? 'X' : 'Y';
          var da = Math.abs(t['client' + a] - this.firstXY[a]);
          var doa = Math.abs(t['client' + oa] - this.firstXY[oa]);
          // if delta in the scroll axis > delta other axis, scroll instead of
          // making events
          ret = da >= doa;
        }
        this.firstXY = null;
        return ret;
      }
    },
    findTouch: function(inTL, inId) {
      for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
        if (t.identifier === inId) {
          return true;
        }
      }
    },
    // In some instances, a touchstart can happen without a touchend. This
    // leaves the pointermap in a broken state.
    // Therefore, on every touchstart, we remove the touches that did not fire a
    // touchend event.
    // To keep state globally consistent, we fire a
    // pointercancel for this "abandoned" touch
    vacuumTouches: function(inEvent) {
      var tl = inEvent.touches;
      // pointermap.pointers() should be < tl.length here, as the touchstart has not
      // been processed yet.
      if (pointermap.pointers() >= tl.length) {
        var d = [];
        pointermap.forEach(function(value, key) {
          // Never remove pointerId == 1, which is mouse.
          // Touch identifiers are 2 smaller than their pointerId, which is the
          // index in pointermap.
          if (key !== 1 && !this.findTouch(tl, key - 2)) {
            var p = value.out;
            d.push(p);
          }
        }, this);
        d.forEach(this.cancelOut, this);
      }
    },
    touchstart: function(inEvent) {
      this.vacuumTouches(inEvent);
      this.setPrimaryTouch(inEvent.changedTouches[0]);
      this.dedupSynthMouse(inEvent);
      if (!this.scrolling) {
        this.clickCount++;
        this.processTouches(inEvent, this.overDown);
      }
    },
    overDown: function(inPointer) {
      var p = pointermap.set(inPointer.pointerId, {
        target: inPointer.target,
        out: inPointer,
        outTarget: inPointer.target
      });
      dispatcher.over(inPointer);
      dispatcher.enter(inPointer);
      dispatcher.down(inPointer);
    },
    touchmove: function(inEvent) {
      if (!this.scrolling) {
        if (this.shouldScroll(inEvent)) {
          this.scrolling = true;
          this.touchcancel(inEvent);
        } else {
          inEvent.preventDefault();
          this.processTouches(inEvent, this.moveOverOut);
        }
      }
    },
    moveOverOut: function(inPointer) {
      var event = inPointer;
      var pointer = pointermap.get(event.pointerId);
      // a finger drifted off the screen, ignore it
      if (!pointer) {
        return;
      }
      var outEvent = pointer.out;
      var outTarget = pointer.outTarget;
      dispatcher.move(event);
      if (outEvent && outTarget !== event.target) {
        outEvent.relatedTarget = event.target;
        event.relatedTarget = outTarget;
        // recover from retargeting by shadow
        outEvent.target = outTarget;
        if (event.target) {
          dispatcher.leaveOut(outEvent);
          dispatcher.enterOver(event);
        } else {
          // clean up case when finger leaves the screen
          event.target = outTarget;
          event.relatedTarget = null;
          this.cancelOut(event);
        }
      }
      pointer.out = event;
      pointer.outTarget = event.target;
    },
    touchend: function(inEvent) {
      this.dedupSynthMouse(inEvent);
      this.processTouches(inEvent, this.upOut);
    },
    upOut: function(inPointer) {
      if (!this.scrolling) {
        dispatcher.up(inPointer);
        dispatcher.out(inPointer);
        dispatcher.leave(inPointer);
      }
      this.cleanUpPointer(inPointer);
    },
    touchcancel: function(inEvent) {
      this.processTouches(inEvent, this.cancelOut);
    },
    cancelOut: function(inPointer) {
      dispatcher.cancel(inPointer);
      dispatcher.out(inPointer);
      dispatcher.leave(inPointer);
      this.cleanUpPointer(inPointer);
    },
    cleanUpPointer: function(inPointer) {
      pointermap['delete'](inPointer.pointerId);
      this.removePrimaryPointer(inPointer);
    },
    // prevent synth mouse events from creating pointer events
    dedupSynthMouse: function(inEvent) {
      var lts = scope.mouseEvents.lastTouches;
      var t = inEvent.changedTouches[0];
      // only the primary finger will synth mouse events
      if (this.isPrimaryTouch(t)) {
        // remember x/y of last touch
        var lt = {x: t.clientX, y: t.clientY};
        lts.push(lt);
        var fn = (function(lts, lt){
          var i = lts.indexOf(lt);
          if (i > -1) {
            lts.splice(i, 1);
          }
        }).bind(null, lts, lt);
        setTimeout(fn, DEDUP_TIMEOUT);
      }
    }
  };

  if (!HAS_TOUCH_ACTION_DELAY) {
    INSTALLER = new scope.Installer(touchEvents.elementAdded, touchEvents.elementRemoved, touchEvents.elementChanged, touchEvents);
  }

  scope.touchEvents = touchEvents;
})(window.PointerEventsPolyfill);
