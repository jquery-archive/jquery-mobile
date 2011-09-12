/*
* jQuery Mobile Framework : "slider" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/

( function( $, undefined ) {

$.widget( "mobile.slider", $.mobile.widget, {
	options: {
		theme: null,
		trackTheme: null,
		disabled: false,
		initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
		handleData: ['handle-min', 'handle-max']
	},

	values: function() {
	    var isInput = ( this.element[ 0 ].nodeName.toLowerCase() === "input" ),
	        e = this.element,
	        val = [];

	    jQuery.each(this.options.handleData, function(i, handle) {
    	    if ( e.data(handle)) {
    	        val.push( parseFloat( e.data(handle) ) );
    	    }
	    });

        return val.length ? val : [isInput ? parseFloat( e.val() ) : e[0].selectedIndex ];
	},

	_create: function() {

		// TODO: Each of these should have comments explain what they're for
		var self = this,

			control = this.element,

			o = this.options,

			parentTheme = control.parents( "[class*='ui-bar-'],[class*='ui-body-']" ).eq( 0 ),

			parentTheme = parentTheme.length ? parentTheme.attr( "class" ).match( /ui-(bar|body)-([a-z])/ )[ 2 ] : "c",

			theme = this.options.theme ? o.theme : parentTheme,

			trackTheme = o.trackTheme ? o.trackTheme : parentTheme,

			cTypeIsSelect = control[ 0 ].nodeName.toLowerCase() === "select",

			selectClass = ( cTypeIsSelect ) ? "ui-slider-switch" : "",

			controlID = control.attr( "id" ),

			labelID = controlID + "-label",

			label = $( "[for='"+ controlID +"']" ).attr( "id", labelID ),

			min =  !cTypeIsSelect ? parseFloat( control.attr( "min" ) ) : 0,

			max =  !cTypeIsSelect ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length-1,

			step = window.parseFloat( control.attr( "step" ) || 1 ),

			slider = $( "<div class='ui-slider " + selectClass + " ui-btn-down-" + trackTheme +
									" ui-btn-corner-all' role='application'></div>" ),
			handles = [],
			values = self.values(),
			options;

		control.addClass(values.length > 1 ? 'ui-slider-range' : 'ui-slider-single');
		jQuery.each(values, function(i) {
		    handles.push($( "<a href='#' class='ui-slider-handle'></a>" )
                .appendTo( slider )
                .buttonMarkup({ corners: true, theme: theme, shadow: true })
                .attr({
                    "role": "slider",
                    "aria-valuemin": min,
                    "aria-valuemax": max,
                    "aria-valuenow": values[i],
                    "aria-valuetext": values[i],
                    "title": values[i],
                    "aria-labelledby": labelID
                })
                .data('handle', values.length > 1 ? o.handleData[i] : 'single')
            );
		});

		$.extend( this, {
			slider: slider,
			handles: handles,
			dragging: false,
			beforeStart: null,
			userModified: false
		});

		if ( cTypeIsSelect ) {

			slider.wrapInner( "<div class='ui-slider-inneroffset'></div>" );

			options = control.find( "option" );

			control.find( "option" ).each(function( i ) {

				var side = !i ? "b":"a",
					corners = !i ? "right" :"left",
					theme = !i ? " ui-btn-down-" + trackTheme :( " " + $.mobile.activeBtnClass );

				$( "<div class='ui-slider-labelbg ui-slider-labelbg-" + side + theme + " ui-btn-corner-" + corners + "'></div>" )
					.prependTo( slider );

				$( "<span class='ui-slider-label ui-slider-label-" + side + theme + " ui-btn-corner-" + corners + "' role='img'>" + $( this ).text() + "</span>" )
					.prependTo( handles[0] );
			});

		}

		label.addClass( "ui-slider" );

		// monitor the input for updated values
		control.addClass( !cTypeIsSelect ? "ui-slider-input" : "ui-slider-switch" )
			.change( function() {
				self.refresh( self.values(), true );
			})
			.keyup( function() { // necessary?
				self.refresh( self.values(), true, true );
			})
			.blur( function() {
				self.refresh( self.values(), true );
			});

		// prevent screen drag when slider activated
		$( document ).bind( "vmousemove", function( event ) {
			if ( self.dragging ) {
				self.refresh( event );
				self.userModified = self.userModified || self.beforeStart !== control[0].selectedIndex;
				return false;
			}
		});

		slider.bind( "vmousedown", function( event ) {
			self.dragging = true;
			self.userModified = false;

			if ( cTypeIsSelect ) {
				self.beforeStart = control[0].selectedIndex;
			}
			self.refresh( event );
			return false;
		});

		slider.add( document )
			.bind( "vmouseup", function() {
				if ( self.dragging ) {

					self.dragging = false;

					if ( cTypeIsSelect ) {

						if ( !self.userModified ) {
							//tap occurred, but value didn't change. flip it!
							handle.addClass( "ui-slider-handle-snapping" );
							self.refresh( !self.beforeStart ? 1 : 0 );
						}
					}
					return false;
				}
			});

		slider.insertAfter( control );

		// NOTE force focus on handle
		jQuery.each(this.handles, function(i, handle) {
		    handle.bind( "vmousedown", function() {
				$( this ).focus();
			    })
    			.bind( "vclick", false )
    			.bind( "keydown", function( event ) {
    				var index = self.values();
    				index = index[i];

    				if ( self.options.disabled ) {
    					return;
    				}

    				// In all cases prevent the default and mark the handle as active
    				switch ( event.keyCode ) {
    				 case $.mobile.keyCode.HOME:
    				 case $.mobile.keyCode.END:
    				 case $.mobile.keyCode.PAGE_UP:
    				 case $.mobile.keyCode.PAGE_DOWN:
    				 case $.mobile.keyCode.UP:
    				 case $.mobile.keyCode.RIGHT:
    				 case $.mobile.keyCode.DOWN:
    				 case $.mobile.keyCode.LEFT:
    					event.preventDefault();

    					if ( !self._keySliding ) {
    						self._keySliding = true;
    						$( this ).addClass( "ui-state-active" );
    					}
    					break;
    				}

    				// move the slider according to the keypress
    				switch ( event.keyCode ) {
    				 case $.mobile.keyCode.HOME:
    					self.refresh( min );
    					break;
    				 case $.mobile.keyCode.END:
    					self.refresh( max );
    					break;
    				 case $.mobile.keyCode.PAGE_UP:
    				 case $.mobile.keyCode.UP:
    				 case $.mobile.keyCode.RIGHT:
    					self.refresh( index + step );
    					break;
    				 case $.mobile.keyCode.PAGE_DOWN:
    				 case $.mobile.keyCode.DOWN:
    				 case $.mobile.keyCode.LEFT:
    					self.refresh( index - step );
    					break;
    				}
    			}) // remove active mark
    			.keyup( function( event ) {
    				if ( self._keySliding ) {
    					self._keySliding = false;
    					$( this ).removeClass( "ui-state-active" );
    				}
    			});
		});

		self.refresh(values, undefined, true);
	},

	refresh: function( val, isfromControl, preventInputUpdate ) {
		if ( this.options.disabled ) { return; }

		var self = this,
		    control = this.element,
		    percent,
			cTypeIsSelect = control[ 0 ].nodeName.toLowerCase() === "select",
			min = !cTypeIsSelect ? parseFloat( control.attr( "min" ) ) : 0,
			max = !cTypeIsSelect ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length - 1;

		if ( val instanceof jQuery.Event ) {
			var data = val,
				// a slight tolerance helped get to the ends of the slider
				tol = 8;
			if ( !this.dragging ||
					data.pageX < this.slider.offset().left - tol ||
					data.pageX > this.slider.offset().left + this.slider.width() + tol ) {
				return;
			}

			percent = Math.round( ( ( data.pageX - this.slider.offset().left ) / this.slider.width() ) * 100 );
		} else if (typeof val === 'object' && val.length) {
		    jQuery.each(val, function(i, value) {
		        self.refresh(value, isfromControl, preventInputUpdate);
		    });
		    return;
		} else if (val !== null) {
			percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
		}

		if ( isNaN( percent ) ) {
			return;
		}

		if ( percent < 0 ) {
			percent = 0;
		}
		else if ( percent > 100 ) {
			percent = 100;
		}

		var newval = Math.round( ( percent / 100 ) * ( max - min ) ) + min;
		if ( newval < min ) {
			newval = min;
		}
		else if( newval > max ) {
			newval = max;
		}

		var actHandle;
		jQuery.each(this.handles, function(i, handle) {
		    if (typeof actHandle !== 'object' || Math.abs(actHandle.attr('title') - newval) > Math.abs(handle.attr('title') - newval)) {
		        actHandle = handle;
		    }
		});

		if (typeof actHandle === 'object') {
		    actHandle.css( "left", percent + "%" ).attr( {
                "aria-valuenow": (cTypeIsSelect) ? control.find( "option" ).eq( newval ).attr( "value" ) : newval,
                "aria-valuetext": (cTypeIsSelect) ? control.find( "option" ).eq( newval ).text() : newval,
                title: newval
            });
		}

		// add/remove classes for flip toggle switch
		if ( cTypeIsSelect ) {
			if ( newval === 0 ) {
				this.slider.addClass( "ui-slider-switch-a" )
					.removeClass( "ui-slider-switch-b" );
			} else {
				this.slider.addClass( "ui-slider-switch-b" )
					.removeClass( "ui-slider-switch-a" );
			}
		}

		if ( !preventInputUpdate ) {
			// update control"s value
			if ( !cTypeIsSelect ) {
			    actHandle.data('handle') === 'single' ? control.val(newval) : control.data(actHandle.data('handle'), newval);
			} else {
				control[ 0 ].selectedIndex = newval;
			}

			if ( !isfromControl ) {
				control.trigger( "change" );
			}
		}
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.slider.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.slider.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	}

});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){

	$( $.mobile.slider.prototype.options.initSelector, e.target )
		.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
		.slider();

});

})( jQuery );
