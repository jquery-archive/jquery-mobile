//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Creates collapsible content blocks.
//>>label: Collapsible
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../jquery.mobile.core",
	"../jquery.mobile.widget",
	"../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var getAttr = $.mobile.getAttribute;

$.widget( "mobile.collapsible", {
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
		var $el = this.element.addClass( "ui-collapsible" ),
			opts = this.options,
			heading = $el.children( opts.heading ).first(),
			content = $el.wrapInner( "<div class='ui-collapsible-content'></div>" ).children( ".ui-collapsible-content" ),
			set = $el.closest( ":jqmData(role='collapsible-set')" + ( $.mobile.collapsibleset ? ", :mobile-collapsibleset" : "" ) ).addClass( "ui-collapsible-set" ),
			classes = "";

		// Replace collapsibleHeading if it's a legend
		if ( heading.is( "legend" ) ) {
			heading = $( "<div role='heading'>"+ heading.html() +"</div>" ).insertBefore( heading );
			heading.next().remove();
		}

		// If we are in a collapsible set
		if ( set.length ) {

			// Inherit the content-theme from collapsible-set
			if ( !opts.contentTheme ) {
				opts.contentTheme = getAttr( set[ 0 ], "content-theme", true );
			}

			// Get the preference for collapsed icon in the set, but override with data- attribute on the individual collapsible
			opts.collapsedIcon = getAttr( $el[ 0 ], "collapsed-icon", true ) || getAttr( set[ 0 ], "collapsed-icon", true ) || opts.collapsedIcon;

			// Get the preference for expanded icon in the set, but override with data- attribute on the individual collapsible
			opts.expandedIcon = getAttr( $el[ 0 ], "expanded-icon", true ) || getAttr( set[ 0 ], "expanded-icon", true ) || opts.expandedIcon;

			// Gets the preference icon position in the set, but override with data- attribute on the individual collapsible
			opts.iconpos = getAttr( $el[ 0 ], "iconpos", true ) || getAttr( set[ 0 ], "iconpos", true ) || opts.iconpos;

			// Inherit the preference for inset from collapsible-set or set the default value to ensure equalty within a set
			if ( getAttr( set[ 0 ], "inset", true ) !== undefined ) {
				opts.inset = getAttr( set[ 0 ], "inset", true );
			} else {
				opts.inset = true;
			}
			// Set corners for individual collapsibles to false when in a collapsible-set
			opts.corners = false;
			// Gets the preference for mini in the set
			if ( !opts.mini ) {
				opts.mini = getAttr( set[ 0 ], "mini", true );
			}
		}

		if ( !!opts.inset ) {
			classes += " ui-collapsible-inset";
			if ( !!opts.corners ) {
				classes += " ui-corner-all" ;
			}
		}
		if ( opts.contentTheme ) {
			classes += " ui-collapsible-themed-content";
			content.addClass( "ui-body-" + opts.contentTheme );
		}
		if ( classes !== "" ) {
			$el.addClass( classes );
		}

		heading
			//drop heading in before content
			.insertBefore( content )
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
				.addClass( "ui-btn ui-icon-" + opts.collapsedIcon + " ui-btn-icon-" + opts.iconpos +
					( opts.theme ? " ui-btn-" + opts.theme : "" ) +
					( opts.mini ? " ui-mini" : "" ) );

		$.extend( this, {
			_collapsibleHeading: heading,
			_collapsibleContent: content
		});

		//events
		this._on({
			"expand": "_handleExpandCollapse",
			"collapse": "_handleExpandCollapse"
		});

		this._on( heading, {
			"tap": function(/* event */) {
				heading.find( "a" ).first().addClass( $.mobile.activeBtnClass );
			},

			"click": function( event ) {

				var type = heading.hasClass( "ui-collapsible-heading-collapsed" ) ? "expand" : "collapse";

				$el.trigger( type );

				event.preventDefault();
				event.stopPropagation();
			}
		});

		this._setOptions( opts );
	},

	_handleExpandCollapse: function( event ) {
		var isCollapse,
			opts = this.options;

		if ( !event.isDefaultPrevented() ) {
			isCollapse = ( event.type === "collapse" );

			event.preventDefault();

			this._collapsibleHeading
				.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
				.find( ".ui-collapsible-heading-status" )
				.text( isCollapse ? opts.expandCueText : opts.collapseCueText )
				.end()
				.find( "a" ).first()
				.toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapse )
				// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
				.toggleClass( "ui-icon-" + opts.collapsedIcon, ( isCollapse || opts.expandedIcon === opts.collapsedIcon ) )
				.removeClass( $.mobile.activeBtnClass );

			this.element.toggleClass( "ui-collapsible-collapsed", isCollapse );
			this._collapsibleContent
				.toggleClass( "ui-collapsible-content-collapsed", isCollapse )
				.attr( "aria-hidden", isCollapse )
				.trigger( "updatelayout" );
		}
	},

	_setOptions: function( opts ) {
		var $el = this.element;

		if ( opts.collapsed !== undefined ) {
			$el.trigger( opts.collapsed ? "collapse" : "expand" );
		}

		return this._super( opts );
	}
});

$.mobile.collapsible.initSelector = ":jqmData(role='collapsible')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.collapsible", { dependencies: [ "mobile.page","mobile.toolbar" ] });

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
