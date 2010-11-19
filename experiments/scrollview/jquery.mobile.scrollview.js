/*
* jQuery Mobile Framework : scrollview plugin
* Copyright (c) 2010 Adobe Systems Incorporated - Kin Blas (jblas@adobe.com)
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($,window,document,undefined){

jQuery.widget( "mobile.scrollview", jQuery.mobile.widget, {
	options: {
		fps:               60,    // Frames per second in msecs.
		direction:         null,  // "vertical", "horizontal", or null for both.
	
		scrollDuration:    2000,  // Duration of the scrolling animation in msecs.
		overshootDuration: 250,   // Duration of the overshoot animation in msecs.
		snapbackDuration:  500,   // Duration of the snapback animation in msecs.
	
		moveThreshold:     100,   // Time between mousemoves must not exceed this threshold.
	
		useCSSTransform:   true,  // Use CSS "transform" property instead of "top" and "left" for positioning.
	
		startEventName:    "scrollstart.scrollview",
		updateEventName:   "scrollupdate.scrollview",
		stopEventName:     "scrollstop.scrollview",
	
		eventType:         $.support.touch ? "touch" : "mouse",
	
		showScrollBars:    true
	},

	_create: function()
	{ 
		this._$clip = $(this.element).addClass("ui-scrollview-clip");
		var $child = this._$clip.children();
		if ($child.length > 1) {
			$child = this._$clip.wrapInner("<div></div>").children();
		}
		this._$view = $child.addClass("ui-scrollview-view");
	
		this._sx = 0;
		this._sy = 0;
	
		var direction = this.options.direction;
		this._hTracker = (direction != "vertical")   ? new MomentumTracker(this.options) : null;
		this._vTracker = (direction != "horizontal") ? new MomentumTracker(this.options) : null;
	
		this._timerInterval = 1000/this.options.fps;
		this._timerID = 0;
	
		var self = this;
		this._timerCB = function(){ self._handleMomentumScroll(); };
	
		this._addBehaviors();
	},

	_startMScroll: function(speedX, speedY)
	{
		this._stopMScroll();
		this._showScrollBars();

		var keepGoing = false;
		var duration = this.options.scrollDuration;

		this._$clip.trigger(this.options.startEventName);

		var ht = this._hTracker;
		if (ht)
		{
			var c = this._$clip.width();
			var v = this._$view.width();
			ht.start(this._sx, speedX, duration, (v > c) ? -(v - c) : 0, 0);
			keepGoing = !ht.done();
		}

		var vt = this._vTracker;
		if (vt)
		{
			var c = this._$clip.height();
			var v = this._$view.height();
			vt.start(this._sy, speedY, duration, (v > c) ? -(v - c) : 0, 0);
			keepGoing = keepGoing || !vt.done();
		}

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);
		else
			this._stopMScroll();
	},

	_stopMScroll: function()
	{
		if (this._timerID)
		{
			this._$clip.trigger(this.options.stopEventName);
			clearTimeout(this._timerID);
		}
		this._timerID = 0;

		if (this._vTracker)
			this._vTracker.reset();

		if (this._hTracker)
			this._hTracker.reset();

		this._hideScrollBars();
	},

	_handleMomentumScroll: function()
	{
		var keepGoing = false;
		var v = this._$view;

		var x = 0, y = 0;

		var vt = this._vTracker;
		if (vt)
		{
			vt.update();
			y = vt.getPosition();
			keepGoing = !vt.done();
		}

		var ht = this._hTracker;
		if (ht)
		{
			ht.update();
			x = ht.getPosition();
			keepGoing = keepGoing || !ht.done();
		}

		this._setScrollPosition(x, y);
		this._$clip.trigger(this.options.updateEventName, { x: x, y: y });

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);	
		else
			this._stopMScroll();
	},

	_setElementTransform: function($ele, x, y)
	{
		var v = "translate3d(" + x + "," + y + ", 0px)";
		$ele.css({
			"-moz-transform": v,
			"-webkit-transform": v,
			"transform": v
		});
	},

	_setScrollPosition: function(x, y)
	{
		this._sx = x;
		this._sy = y;

		var $v = this._$view;

		var uct = this.options.useCSSTransform;

		if (uct)
			this._setElementTransform($v, x + "px", y + "px");
		else
			$v.css({left: x + "px", top: y + "px"});

		var $vsb = this._$vScrollBar;
		var $hsb = this._$hScrollBar;

		if ($vsb || $hsb)
		{
			if ($vsb)
			{
				var $sbt = $vsb.find(".ui-scrollbar-thumb");
				if (uct)
					this._setElementTransform($sbt, "0px", -y/$v.height() * $sbt.parent().height() + "px");
				else
					$sbt.css("top", -y/$v.height()*100 + "%");
			}
	
			if ($hsb)
			{
				var $sbt = $hsb.find(".ui-scrollbar-thumb");
				if (uct)
					this._setElementTransform($sbt,  -x/$v.width() * $sbt.parent().width() + "px", "0px");
				else
					$sbt.css("left", -x/$v.width()*100 + "%");
			}
		}
	},

	_getScrollPosition: function(x, y)
	{
		return { x: this._sx, y: this._sy };
	},

	_handleMouseDown: function(e, ex, ey)
	{
		this._stopMScroll();

		var c = this._$clip;
		var v = this._$view;

		this._doSnapBackX = false;
		this._doSnapBackY = false;
		this._speedX = 0;
		this._speedY = 0;

		if (this._hTracker)
		{
			var cw = parseInt(c.css("width"), 10);
			var vw = parseInt(v.css("width"), 10);
			this._maxX = cw - vw;
			if (this._maxX > 0) this._maxX = 0;
			this._lastX = ex;
			if (this._$hScrollBar)
				this._$hScrollBar.find(".ui-scrollbar-thumb").css("width", (cw >= vw ? "100%" : Math.floor(cw/vw*100)+ "%"));
		}

		if (this._vTracker)
		{
			var ch = parseInt(c.css("height"), 10);
			var vh = parseInt(v.css("height"), 10);
			this._maxY = ch - vh;
			if (this._maxY > 0) this._maxY = 0;
			this._lastY = ey;
			if (this._$vScrollBar)
				this._$vScrollBar.find(".ui-scrollbar-thumb").css("height", (ch >= vh ? "100%" : Math.floor(ch/vh*100)+ "%"));
		}

		this._lastMove = 0;
		this._enableTracking();

		// If we're using mouse events, we need to prevent the default
		// behavior to suppress accidental selection of text, etc. We
		// can't do this on touch devices because it will disable the
		// generation of "click" events.
		//
		// XXX: We should test if this has an effect on links! - kin

		if (this.options.eventType == "mouse")
			e.preventDefault();
	},

	_handleMouseMove: function(e, ex, ey)
	{
		this._lastMove = getCurrentTime();

		var v = this._$view;

		var newX = 0;
		var newY = 0;

		if (this._hTracker)
		{
			var dx = ex - this._lastX;		
			var x = this._sx;
			this._speedX = dx;
			newX = x + dx;

			// Simulate resistance.

			this._doSnapBackX = false;
			if (newX > 0 || newX < this._maxX)
			{
				newX = x + (dx/2);
				this._doSnapBackX = true;
			}

			this._lastX = ex;
		}

		if (this._vTracker)
		{
			var dy = ey - this._lastY;		
			var y = this._sy;
			this._speedY = dy;
			newY = y + dy;

			// Simulate resistance.

			this._doSnapBackY = false;
			if (newY > 0 || newY < this._maxY)
			{
				newY = y + (dy/2);
				this._doSnapBackY = true;
			}

			this._lastY = ey;
		}

		this._setScrollPosition(newX, newY);

		this._showScrollBars();

		// Call preventDefault() to prevent touch devices from
		// scrolling the main window.

		e.preventDefault();
	},

	_handleMouseUp: function(e)
	{
		var l = this._lastMove;
		var t = getCurrentTime();
		var doScroll = l && (t - l) <= this.options.moveThreshold;

		var sx = (this._hTracker && this._speedX && doScroll) ? this._speedX : (this._doSnapBackX ? 1 : 0);
		var sy = (this._vTracker && this._speedY && doScroll) ? this._speedY : (this._doSnapBackY ? 1 : 0);
	
		if (sx || sy)
		{
			this._startMScroll(sx, sy);
			e.preventDefault();
		}
		else
			this._hideScrollBars();

		this._disableTracking();
	},

	_enableTracking: function()
	{
		$(document).bind(this._mousemoveType, this._mousemoveCB);
		$(document).bind(this._mouseupType, this._mouseupCB);
	},

	_disableTracking: function()
	{
		$(document).unbind(this._mousemoveType, this._mousemoveCB);
		$(document).unbind(this._mouseupType, this._mouseupCB);
	},

	_showScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.addClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.addClass(vclass);
	},

	_hideScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.removeClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.removeClass(vclass);
	},

	_addBehaviors: function()
	{
		var self = this;
		if (this.options.eventType == "mouse")
		{
			this._mousedownType = "mousedown";
			this._mousedownCB = function(e){ return self._handleMouseDown(e, e.clientX, e.clientY); };

			this._mousemoveType = "mousemove";
			this._mousemoveCB = function(e){ return self._handleMouseMove(e, e.clientX, e.clientY); };

			this._mouseupType = "mouseup";
			this._mouseupCB = function(e){ return self._handleMouseUp(e); };
		}
		else // "touch"
		{
			this._mousedownType = "touchstart";
			this._mousedownCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleMouseDown(e, t.pageX, t.pageY);
			};

			this._mousemoveType = "touchmove";
			this._mousemoveCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleMouseMove(e, t.pageX, t.pageY);
			};

			this._mouseupType = "touchend";
			this._mouseupCB = function(e){ return self._handleMouseUp(e); };
		}

		this._$view.bind(this._mousedownType, this._mousedownCB);

		if (this.options.showScrollBars)
		{
			var $c = this._$clip;
			var prefix = "<div class=\"ui-scrollbar ui-scrollbar-";
			var suffix = "\"><div class=\"ui-scrollbar-track\"><div class=\"ui-scrollbar-thumb\"></div></div></div>";
			if (this._vTracker)
			{
				$c.append(prefix + "vertical" + suffix);
				this._$vScrollBar = $c.children(".ui-scrollbar-vertical");
			}
			if (this._hTracker)
			{
				$c.append(prefix + "horizontal" + suffix);
				this._$hScrollBar = $c.children(".ui-scrollbar-horizontal");
			}
		}
	}
});

function MomentumTracker(options)
{
	this.options = $.extend({}, options);
	this.easing = "easeOutQuad";
	this.reset();
}

var tstates = {
	scrolling: 0,
	overshot:  1,
	snapback:  2,
	done:      3
};

function getCurrentTime() { return (new Date()).getTime(); }

$.extend(MomentumTracker.prototype, {
	start: function(pos, speed, duration, minPos, maxPos)
	{
		this.state = (speed != 0) ? ((pos < minPos || pos > maxPos) ? tstates.snapback : tstates.scrolling) : tstates.done;
		this.pos = pos;
		this.speed = speed;
		this.duration = (this.state == tstates.snapback) ? this.options.snapbackDuration : duration;
		this.minPos = minPos;
		this.maxPos = maxPos;

		this.fromPos = (this.state == tstates.snapback) ? this.pos : 0;
		this.toPos = (this.state == tstates.snapback) ? ((this.pos < this.minPos) ? this.minPos : this.maxPos) : 0;

		this.startTime = getCurrentTime();
	},

	reset: function()
	{
		this.state = tstates.done;
		this.pos = 0;
		this.speed = 0;
		this.minPos = 0;
		this.maxPos = 0;
		this.duration = 0;
	},

	update: function()
	{
		var state = this.state;
		if (state == tstates.done)
			return this.pos;

		var duration = this.duration;
		var elapsed = getCurrentTime() - this.startTime;
		elapsed = elapsed > duration ? duration : elapsed;

		if (state == tstates.scrolling || state == tstates.overshot)
		{
			var dx = this.speed * (1 - $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
	
			var x = this.pos + dx;
	
			var didOverShoot = (state == tstates.scrolling) && (x < this.minPos || x > this.maxPos);
			if (didOverShoot)
				x = (x < this.minPos) ? this.minPos : this.maxPos;
		
			this.pos = x;
	
			if (state == tstates.overshot)
			{
				if (elapsed >= duration)
				{
					this.state = tstates.snapback;
					this.fromPos = this.pos;
					this.toPos = (x < this.minPos) ? this.minPos : this.maxPos;
					this.duration = this.options.snapbackDuration;
					this.startTime = getCurrentTime();
					elapsed = 0;
				}
			}
			else if (state == tstates.scrolling)
			{
				if (didOverShoot)
				{
					this.state = tstates.overshot;
					this.speed = dx / 2;
					this.duration = this.options.overshootDuration;
					this.startTime = getCurrentTime();
				}
				else if (elapsed >= duration)
					this.state = tstates.done;
			}
		}
		else if (state == tstates.snapback)
		{
			if (elapsed >= duration)
			{
				this.pos = this.toPos;
				this.state = tstates.done;		
			}
			else
				this.pos = this.fromPos + ((this.toPos - this.fromPos) * $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
		}

		return this.pos;
	},

	done: function() { return this.state == tstates.done; },
	getPosition: function(){ return this.pos; }
});

jQuery.widget( "mobile.scrolllistview", jQuery.mobile.scrollview, {
	options: {
		direction: "vertical"
	},

	_create: function() {
		$.mobile.scrollview.prototype._create.call(this);
	
		// Cache the dividers so we don't have to search for them everytime the
		// view is scrolled.
		//
		// XXX: Note that we need to update this cache if we ever support lists
		//      that can dynamically update their content.
	
		this._$dividers = this._$view.find("[data-role=list-divider]");
		this._lastDivider = null;
	},

	_setScrollPosition: function(x, y)
	{
		// Let the view scroll like it normally does.
	
		$.mobile.scrollview.prototype._setScrollPosition.call(this, x, y);

		y = -y;

		// Find the dividers for the list.

		var $divs = this._$dividers;
		var cnt = $divs.length;
		var d = null;
		var dy = 0;
		var nd = null;

		for (var i = 0; i < cnt; i++)
		{
			nd = $divs.get(i);
			var t = nd.offsetTop;
			if (y >= t)
			{
				d = nd;
				dy = t;
			}
			else if (d)
				break;
		}

		// If we found a divider to move position it at the top of the
		// clip view.

		if (d)
		{
			var h = d.offsetHeight;
			var mxy = (d != nd) ? nd.offsetTop : (this._$view.get(0).offsetHeight);
			if (y + h >= mxy)
				y = (mxy - h) - dy;
			else
				y = y - dy;

			// XXX: Need to convert this over to using $().css() and supporting the non-transform case.

			var ld = this._lastDivider;
			if (ld && d != ld)
			{
				var zt = "translate3d(0px,0px,0px)";				
				// $(ld).css("-webkit-transform", zt).css("-moz-transform", zt).css("transform", zt);
				ld.style.webkitTransform = zt; ld.style.MozTransform = zt; ld.style.transform = zt;
			}
			var str = "translate3d(0px," + y + "px,0px)";
			// $(d).css("-webkit-transform", str).css("-moz-transform", str).css("transform", str);
			d.style.webkitTransform = str; d.style.MozTransform = str; d.style.transform = str;
			this._lastDivider = d;

		}
	}
});

})(jQuery,window,document); // End Component
