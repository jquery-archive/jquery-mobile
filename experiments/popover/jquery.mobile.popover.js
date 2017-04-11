/*
* jQuery Mobile Framework : popover plugin
* Copyright (c) 2010 Adobe Systems Incorporated - Alexandre Capt (acapt@adobe.com)
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
(function($, undefined ) {
    $.widget( "mobile.popover", $.mobile.widget, {
        options: {
            modal: false,
            css: null,
            theme: null,
            maskAppendTo: null
        },

        _create: function(){
            var self = this,
                    element = self.element,
                    o = self.options,
                    theme = o.theme || $(self).data( "theme" );
            element
                    .addClass("ui-popover ui-listbox ui-popover-shadow ui-corner-all")
                    .addClass("ui-body-" + (theme || $(element).parent('[data-role=page]').data( "theme" ) || "a"))
                    .css("display", "none");
            if( o.css ) {
                element.addClass(o.css);
            }

            self.isModal = o.modal === true;
            self.maskAppendTo = o.maskAppendTo || document.body;
        },

        show: function() {
            var self = this,
                    el = self.element;

            self._trigger("beforeshow");
            if( self.isModal ) {
                $("<div id='cq-mask'>")
                        .appendTo(self.maskAppendTo)
                        .addClass("ui-popover-modal-mask")
                .width($(document).width())
                .height($(document).height());
            }
            el.slideDown("fast", function() {
                self._trigger("show");

                var closingTimout = function() {
                    if( ! self.dontClose ) {
                        self.closingTimeout = window.setTimeout(function() {
                            self.close();
                        }, 100);
                    } else {
                        self.dontClose = false;
                    }
                };

                $(document.body).bind($.support.touch ? "touchend" : "mouseup", closingTimout);
                el.bind("popoverclose", function() {
                    $(document.body).unbind($.support.touch ? "touchend" : "mouseup", closingTimout);
                });

                el.bind($.support.touch ? "touchstart" : "mousedown", function() {
                    if( self.closingTimeout ) {
                        window.clearTimeout(self.closingTimeout);
                        self.closingTimeout = null;
                    } else {
                        self.dontClose = true;
                    }
                });
            });
        },

        showBelow: function(belowElement) {
            var self = this,
                    el = self.element;

            var p = $(belowElement).position();
            if( p != null) {
                var w = $(belowElement).outerWidth();
                var h = $(belowElement).outerHeight();
                var sw = el.outerWidth();

                var left = p.left + w - sw;
                var top = p.top + h + 7;
            }

            self.showAt(left, top);
        },

        showAt: function(left, top) {
            var self = this,
                    el = self.element;

            var scrollTop = $(window).scrollTop(),
                    scrollLeft = $(window).scrollLeft();

            el.css("left",left + scrollLeft);
            el.css("top",top + scrollTop);
            self.show();
        },

        showCentered: function() {
            var self = this,
                    el = self.element;

            var bodyw = $(document).width();
            var bodyh = $(document).height();

            var elw = el.width();
            var elh = el.height();

            var left = (bodyw - elw) / 2;
            var top = (bodyh - elh) / 2;

            left = left < 0 ? 0 : left;
            top = top < 0 ? 0 : top;

            self.showAt(left, top);
        },

        close: function(keep) {
            var self = this,
                    el = self.element;

            self._trigger("beforeclose");
            if( self.isModal ) {
                $("#cq-mask").remove();
            }
            el.slideUp("fast", function() {
                self._trigger("close");
                if( !keep ) {
                    el.remove();
                    self.destroy();
                }
            });


        }
});
})( jQuery );