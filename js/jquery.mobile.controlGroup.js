/*
* jQuery Mobile Framework: "controlgroup" plugin - corner-rounding for groups of buttons, checks, radios, etc
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
    var corners = {
        horizontal: ['ui-corner-left', 'ui-corner-right'],
        vertical: ['ui-corner-top', 'ui-corner-bottom'],
    };
    
    var methods = {
        init: function(options) {
            return this.each(function(){
                var el=$(this),
                    o = $.extend({
                    direction: el.data( "type" ) || "vertical",
                    shadow: false
                },options),
                    flCorners = corners[o.direction],
                    groupheading = el.find('>legend');
                
                //replace legend with more stylable replacement div	
                if( groupheading.length ){
                    // save this off for teardown so we can put back the original legend
                    el.data('groupheading',groupheading.clone())
                      .wrapInner('<div class="ui-controlgroup-controls"></div>');	
                    $('<div role="heading" class="ui-controlgroup-label">'+ groupheading.html() +'</div>').insertBefore(el.children(0));	
                    groupheading.remove();
                }

                el.addClass('ui-corner-all ui-controlgroup ui-controlgroup-'+o.direction);
                
                flipClasses(el.find('.ui-btn'),flCorners);
                flipClasses(el.find('.ui-btn-inner'),flCorners);
                if(o.shadow){
                    el.addClass('ui-shadow');
                }
            });	
        },
        
        refresh: function() {
            methods.teardown.call(this);
            return methods.init.call(this);
        },
        
        teardown: function() {
            return this.each(function(){
                var el=$(this);
                el.removeClass('ui-controlgroup ui-controlgroup-horizontal ui-controlgroup-vertical');
                el.find('.ui-btn,.ui-btn-inner').removeClass('ui-controlgroup-last ui-corner-left ui-corner-right ui-corner-top ui-corner-bottom');
                var groupheading = el.data('groupheading');
                if(groupheading){
                    var currControls = el.children().get(0);
                    groupheading.insertBefore(currControls);
                    $('.ui-controlgroup-label').remove();
                    $('.ui-controlgroup-controls').children().unwrap();
                }
            });
        }
    };

    function flipClasses(els,flCorners){
        els
            .removeClass('ui-btn-corner-all ui-shadow')
            .eq(0).addClass(flCorners[0])
            .end()
            .filter(':last').addClass(flCorners[1]).addClass('ui-controlgroup-last');
    }
    
    $.fn.controlgroup = function(method){
        if ( methods[method] ) {
          return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.controlgroup' );
        }    
    };
})(jQuery);
