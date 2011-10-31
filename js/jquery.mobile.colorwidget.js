/**
 * Base class for widgets dealing with colour
 */

(function($, undefined) {

$.widget("mobile.colorwidget", $.mobile.widget, {
	options: {
		color: "#ff0972"
	},

	_create: function() {
		/* "value", if present, takes precedence over "data-color" */
		if (this.element.is("input"))
			if (this.element.attr("value").match(/#[0-9A-Fa-f]{6}/))
				this.element.attr("data-" + ($.mobile.ns || "") + "color", this.element.attr("value"));

		$.mobile.parseOptions(this, true);
	},

	_setOption: function(key, value, unconditional) {
		if (undefined === unconditional)
			unconditional = false;
		if (key === "color")
			this._setColor(value, unconditional);
	},

	_setColor: function(value, unconditional) {
		if (value.match(/#[0-9A-Fa-f]{6}/) && (value != this.options.color || unconditional)) {
			this.options.color = value;
			this.element.attr("data-" + ($.mobile.ns || "") + "color", value);
			if (this.element.is("input")) {
				this.element.attr("value", value);
				this.element.triggerHandler("change");
			}
			this.element.triggerHandler("colorchanged", value);
			return true;
		}
		return false;
	}
});

})(jQuery);
