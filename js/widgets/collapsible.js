//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Creates collapsible content blocks.
//>>label: Collapsible
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.buttonMarkup", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var getAttr = $.mobile.getAttribute;

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		collapsedIcon: "plus",
		expandedIcon: "minus",
		iconpos: "left",
		theme: null,
		contentTheme: null,
		inset: true,
		corners: true,
		mini: false
	},

	_create: function() {
		var $el = this.element,
			o = this.options,
			collapsiblesetWidgetSelector = ( $.mobile.collapsibleset ? ", :mobile-collapsibleset" : "" ),
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.children( o.heading ).first(),
			collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).children( ".ui-collapsible-content" ),
			collapsibleSet = $el.closest( ":jqmData(role='collapsible-set')" + collapsiblesetWidgetSelector ).addClass( "ui-collapsible-set" ),
			collapsibleClasses = "";

		// Replace collapsibleHeading if it's a legend
		if ( collapsibleHeading.is( "legend" ) ) {
			collapsibleHeading = $( "<div role='heading'>"+ collapsibleHeading.html() +"</div>" ).insertBefore( collapsibleHeading );
			collapsibleHeading.next().remove();
		}

		// If we are in a collapsible set
		if ( collapsibleSet.length ) {
			// Inherit the theme from collapsible-set
			if ( !o.theme ) {
				o.theme = getAttr( collapsibleSet[ 0 ], "theme", true ) || $.mobile.getInheritedTheme( collapsibleSet, "c" );
			}
			// Inherit the content-theme from collapsible-set
			if ( !o.contentTheme ) {
				o.contentTheme = getAttr( collapsibleSet[ 0 ], "content-theme", true );
			}

			// Get the preference for collapsed icon in the set, but override with data- attribute on the individual collapsible
			o.collapsedIcon = getAttr( $el[ 0 ], "collapsed-icon", true ) || getAttr( collapsibleSet[ 0 ], "collapsed-icon", true ) || o.collapsedIcon;

			// Get the preference for expanded icon in the set, but override with data- attribute on the individual collapsible
			o.expandedIcon = getAttr( $el[ 0 ], "expanded-icon", true ) || getAttr( collapsibleSet[ 0 ], "expanded-icon", true ) || o.expandedIcon;

			// Gets the preference icon position in the set, but override with data- attribute on the individual collapsible
			o.iconpos = getAttr( $el[ 0 ], "iconpos", true ) || getAttr( collapsibleSet[ 0 ], "iconpos", true ) || o.iconpos;

			// Inherit the preference for inset from collapsible-set or set the default value to ensure equalty within a set
			if ( getAttr( collapsibleSet[ 0 ], "inset", true ) !== undefined ) {
				o.inset = getAttr( collapsibleSet[ 0 ], "inset", true );
			} else {
				o.inset = true;
			}
			// Set corners for individual collapsibles to false when in a collapsible-set
			o.corners = false;
			// Gets the preference for mini in the set
			if ( !o.mini ) {
				o.mini = getAttr( collapsibleSet[ 0 ], "mini", true );
			}
		} else {
			// get inherited theme if not a set and no theme has been set
			if ( !o.theme ) {
				o.theme = $.mobile.getInheritedTheme( $el, "c" );
			}
		}

		if ( !!o.inset ) {
			collapsibleClasses += " ui-collapsible-inset";
			if ( !!o.corners ) {
				collapsibleClasses += " ui-corner-all" ;
			}
		}
		if ( o.contentTheme ) {
			collapsibleClasses += " ui-collapsible-themed-content";
			collapsibleContent.addClass( "ui-body-" + o.contentTheme );
		}
		if ( collapsibleClasses !== "" ) {
			collapsible.addClass( collapsibleClasses );
		}

		collapsibleHeading
			//drop heading in before content
			.insertBefore( collapsibleContent )
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
				.buttonMarkup({
					shadow: false,
					corners: false,
					iconpos: o.iconpos,
					icon: o.collapsedIcon,
					mini: o.mini,
					theme: o.theme
				});

		$.extend( this, {
			_collapsibleHeading: collapsibleHeading,
			_collapsibleContent: collapsibleContent
		});

		//events
		this._on({
			"expand": "_handleExpandCollapse",
			"collapse": "_handleExpandCollapse"
		});

		this._on( collapsibleHeading, {
			"tap": function(/* event */) {
				collapsibleHeading.find( "a" ).first().addClass( $.mobile.activeBtnClass );
			},

			"click": function( event ) {

				var type = collapsibleHeading.hasClass( "ui-collapsible-heading-collapsed" ) ? "expand" : "collapse";

				collapsible.trigger( type );

				event.preventDefault();
				event.stopPropagation();
			}
		});

		this._setOptions( this.options );
	},

	_handleExpandCollapse: function( event ) {
		var isCollapse,
			o = this.options;

		if ( !event.isDefaultPrevented() ) {
			isCollapse = ( event.type === "collapse" );

			event.preventDefault();

			this._collapsibleHeading
				.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
				.find( ".ui-collapsible-heading-status" )
				.text( isCollapse ? o.expandCueText : o.collapseCueText )
				.end()
				.find( ".ui-icon" )
				.toggleClass( "ui-icon-" + o.expandedIcon, !isCollapse )
				// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
				.toggleClass( "ui-icon-" + o.collapsedIcon, ( isCollapse || o.expandedIcon === o.collapsedIcon ) )
				.end()
				.find( "a" ).first().removeClass( $.mobile.activeBtnClass );

			this.element.toggleClass( "ui-collapsible-collapsed", isCollapse );
			this._collapsibleContent
				.toggleClass( "ui-collapsible-content-collapsed", isCollapse )
				.attr( "aria-hidden", isCollapse )
				.trigger( "updatelayout" );
		}
	},

	_setOptions: function( o ) {
		var $el = this.element;

		if ( o.collapsed !== undefined ) {
			$el.trigger( o.collapsed ? "collapse" : "expand" );
		}

		return this._super( o );
	}
});

$.mobile.collapsible.initSelector = ":jqmData(role='collapsible')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.collapsible" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
