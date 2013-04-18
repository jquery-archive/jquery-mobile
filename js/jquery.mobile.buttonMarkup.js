//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies button styling to links
//>>label: Buttons: Link-based
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.button.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./jquery.mobile.core", "./jquery.mobile.vmouse" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// This function calls getAttribute, which should be safe for data-* attributes
var getAttrFixed = function( e, key ) {
	var value = e.getAttribute( key );

	return value === "true" ? true :
		value === "false" ? false :
		value === null ? undefined : value;
};

$.fn.buttonMarkup = function( options ) {
	var $workingSet = this,
		nsKey = "data-" + $.mobile.ns,
		key;

	// Enforce options to be of type string
	options = ( options && ( $.type( options ) === "object" ) )? options : {};
	for ( var i = 0; i < $workingSet.length; i++ ) {
		var el = $workingSet.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : getAttrFixed( e, nsKey + "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : getAttrFixed( e, nsKey + "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : getAttrFixed( e, nsKey + "theme" ) || $.mobile.getInheritedTheme( el, "c" ),
				inline:     options.inline     !== undefined ? options.inline     : getAttrFixed( e, nsKey + "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : getAttrFixed( e, nsKey + "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : getAttrFixed( e, nsKey + "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : getAttrFixed( e, nsKey + "iconshadow" ),
				mini:       options.mini       !== undefined ? options.mini       : getAttrFixed( e, nsKey + "mini" )
			}, options ),

			// Classes Defined
			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,
			hover = false,
			state = "up",
			// Button inner markup
			buttonInner,
			buttonText,
			buttonIcon,
			buttonElements;

		for ( key in o ) {
			if ( o[ key ] === undefined || o[ key ] === null ) {
				el.removeAttr( nsKey + key );
			} else {
				e.setAttribute( nsKey + key, o[ key ] );
			}
		}

		// Check if this element is already enhanced
		buttonElements = $.data( ( ( e.tagName === "INPUT" || e.tagName === "BUTTON" ) ? e.parentNode : e ), "buttonElements" );

		if ( buttonElements ) {
			e = buttonElements.outer;
			el = $( e );
			buttonInner = buttonElements.inner;
			buttonText = buttonElements.text;
			// We will recreate this icon below
			$( buttonElements.icon ).remove();
			buttonElements.icon = null;
			hover = buttonElements.hover;
			state = buttonElements.state;
		}
		else {
			buttonInner = document.createElement( o.wrapperEls );
			buttonText = document.createElement( o.wrapperEls );
		}
		buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents && !buttonElements ) {
			attachEvents();
		}

		// if not, try to find closest theme container
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );
		}

		buttonClass = "ui-btn ";
		buttonClass += ( hover ? "ui-btn-hover-" + o.theme : "" );
		buttonClass += ( state ? " ui-btn-" + state + "-" + o.theme : "" );
		buttonClass += o.shadow ? " ui-shadow" : "";
		buttonClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.mini !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.mini === true ? " ui-mini" : " ui-fullsize";
		}

		if ( o.inline !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `inline` style.
			buttonClass += o.inline === true ? " ui-btn-inline" : " ui-btn-block";
		}

		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos === "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}

		if ( buttonElements ) {
			el.removeClass( buttonElements.bcls || "" );
		}
		el.removeClass( "ui-link" ).addClass( buttonClass );

		buttonInner.className = innerClass;
		buttonText.className = textClass;
		if ( !buttonElements ) {
			buttonInner.appendChild( buttonText );
		}
		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			if ( !( buttonElements && buttonElements.icon ) ) {
				buttonIcon.innerHTML = "&#160;";
				buttonInner.appendChild( buttonIcon );
			}
		}

		while ( e.firstChild && !buttonElements ) {
			buttonText.appendChild( e.firstChild );
		}

		if ( !buttonElements ) {
			e.appendChild( buttonInner );
		}

		// Assign a structure containing the elements of this button to the elements of this button. This
		// will allow us to recognize this as an already-enhanced button in future calls to buttonMarkup().
		buttonElements = {
			hover : hover,
			state : state,
			bcls  : buttonClass,
			outer : e,
			inner : buttonInner,
			text  : buttonText,
			icon  : buttonIcon
		};

		$.data( e,           'buttonElements', buttonElements );
		$.data( buttonInner, 'buttonElements', buttonElements );
		$.data( buttonText,  'buttonElements', buttonElements );
		if ( buttonIcon ) {
			$.data( buttonIcon, 'buttonElements', buttonElements );
		}
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
		// Note that we check for typeof className below because the element we
		// handed could be in an SVG DOM where className on SVG elements is defined to
		// be of a different type (SVGAnimatedString). We only operate on HTML DOM
		// elements, so we look for plain "string".
        cname = ( typeof element.className === 'string' ) && ( element.className + ' ' );
        if ( cname && cname.indexOf( "ui-btn " ) > -1 && cname.indexOf( "ui-disabled " ) < 0 ) {
            break;
        }

        element = element.parentNode;
    }

    return element;
}

function updateButtonClass( $btn, classToRemove, classToAdd, hover, state ) {
	var buttonElements = $.data( $btn[ 0 ], "buttonElements" );
	$btn.removeClass( classToRemove ).addClass( classToAdd );
	if ( buttonElements ) {
		buttonElements.bcls = $( document.createElement( "div" ) )
			.addClass( buttonElements.bcls + " " + classToAdd )
			.removeClass( classToRemove )
			.attr( "class" );
		if ( hover !== undefined ) {
			buttonElements.hover = hover;
		}
		buttonElements.state = state;
	}
}

var attachEvents = function() {
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

	$.mobile.document.bind( {
		"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function( event ) {
			var theme,
				$btn = $( closestEnabledButton( event.target ) ),
				isTouchEvent = event.originalEvent && /^touch/.test( event.originalEvent.type ),
				evt = event.type;

			if ( $btn.length ) {
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );

				if ( evt === "vmousedown" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						hov = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
					}
				} else if ( evt === "vmousecancel" || evt === "vmouseup" ) {
					updateButtonClass( $btn, "ui-btn-down-" + theme, "ui-btn-up-" + theme, undefined, "up" );
				} else if ( evt === "vmouseover" || evt === "focus" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						foc = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
					}
				} else if ( evt === "vmouseout" || evt === "blur" || evt === "scrollstart" ) {
					updateButtonClass( $btn, "ui-btn-hover-" + theme  + " ui-btn-down-" + theme, "ui-btn-up-" + theme, false, "up" );
					if ( hov ) {
						clearTimeout( hov );
					}
					if ( foc ) {
						clearTimeout( foc );
					}
				}
			}
		},
		"focusin focus": function( event ) {
			$( closestEnabledButton( event.target ) ).addClass( $.mobile.focusClass );
		},
		"focusout blur": function( event ) {
			$( closestEnabledButton( event.target ) ).removeClass( $.mobile.focusClass );
		}
	});

	attachEvents = null;
};

//links in bars, or those with  data-role become buttons
//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {

	$( ":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", e.target )
		.jqmEnhanceable()
		.not( "button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')" )
		.buttonMarkup();
});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
