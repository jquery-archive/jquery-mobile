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

var rInitialLetter = /([A-Z])/g;

$.widget( "mobile.collapsible", {
	options: {
		enhanced: false,
		expandCueText: null,
		collapseCueText: null,
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		collapsedIcon: null,
		expandedIcon: null,
		iconpos: null,
		theme: null,
		contentTheme: null,
		inset: null,
		corners: null,
		mini: null
	},

	_create: function() {
		var elem = this.element,
			ui = {
				accordion: elem
					.closest( ":jqmData(role='collapsible-set')" +
						( $.mobile.collapsibleset ? ", :mobile-collapsibleset" : "" ) )
					.addClass( "ui-collapsible-set" )
			},
			opts = this.options;

		$.extend( this, {
			_anchorClasses: "",
			_elClasses: "",
			_contentTheme: "",
			_ui: ui
		});

		if ( opts.enhanced ) {
			ui.heading = $( ".ui-collapsible-heading", this.element[ 0 ] );
			ui.content = ui.heading.next();
			ui.anchor = $( "a", ui.heading[ 0 ] ).first();
			this._applyOptions( opts, true );
		} else {
			this._enhance( elem, ui );
			this._setOptions( opts );
		}

		//events
		this._on({
			"expand": "_handleExpandCollapse",
			"collapse": "_handleExpandCollapse"
		});

		this._on( ui.heading, {
			"tap": function() {
				ui.heading.find( "a" ).first().addClass( $.mobile.activeBtnClass );
			},

			"click": function( event ) {
				this._handleExpandCollapse( !ui.heading.hasClass( "ui-collapsible-heading-collapsed" ) );
				event.preventDefault();
				event.stopPropagation();
			}
		});
	},

	_enhance: function( elem, ui ) {
		elem.addClass( "ui-collapsible" );
		ui.originalHeading = elem.children( this.options.heading ).first(),
		ui.content = elem.wrapInner( "<div class='ui-collapsible-content'></div>" ).children( ".ui-collapsible-content" ),
		ui.heading = ui.originalHeading;

		// Replace collapsibleHeading if it's a legend
		if ( ui.heading.is( "legend" ) ) {
			ui.heading = $( "<div role='heading'>"+ ui.heading.html() +"</div>" );
			ui.placeholder = $( "<div><!-- placeholder for legend --></div>" ).insertBefore( ui.originalHeading );
			ui.originalHeading.remove();
		}

		ui.anchor = ui.heading
			.detach()
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( "<span class='ui-collapsible-heading-status'></span>" )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
				.addClass( "ui-btn" );

		//drop heading in before content
		ui.heading.insertBefore( ui.content );

		return ui;
	},

	_handleExpandCollapse: function( isCollapse ) {
		var key,
			opts = $.extend( {}, this.options );

		// Adjust for inherited values.
		for ( key in opts ) {
			opts[ key ] = this._optionValue( opts, key );
		}

		this._ui.heading
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
		this._ui.content
			.toggleClass( "ui-collapsible-content-collapsed", isCollapse )
			.attr( "aria-hidden", isCollapse )
			.trigger( "updatelayout" );
		this.options.collapsed = isCollapse;
		this._trigger( isCollapse ? "collapse" : "expand" );
	},

	// Retrieve the option value first from the options object passed in and, if
	// null, from the parent accordion or, if that's null too, or if there's no
	// parent accordion, then from the defaults.
	_optionValue: function( options, name ) {
		var ret,
			accordion = this._ui.accordion,
			accordionWidget = this._ui.accordionWidget;

		if ( accordion.length && !accordionWidget ) {
			this._ui.accordionWidget = accordionWidget = accordion.data( "mobile-collapsibleset" );
		}

		ret =
			( options[ name ] != null ) ? options[ name ] :
			( accordionWidget ) ? accordionWidget.options[ name ] :
			accordion.length ? $.mobile.getAttribute( accordion[ 0 ], name.replace( rInitialLetter, "-$1" ).toLowerCase(), true ):
			null;

		if ( null == ret ) {
			ret = $.mobile.collapsible.defaults[ name ];
		}

		return ret;
	},

	refresh: function() {
		this._setOptions( {} );
	},

	expand: function() {
		this._handleExpandCollapse( false );
	},

	collapse: function() {
		this._handleExpandCollapse( true );
	},

	_destroy: function() {
		var ui = this._ui;

		if ( this.options.enhanced ) {
			return;
		}

		if ( ui.placeholder ) {
			ui.originalHeading.insertBefore( ui.placeholder );
			ui.placeholder.remove();
			ui.heading.remove();
		} else {
			ui.heading
				.removeClass( "ui-collapsible-heading ui-collapsible-heading-collapsed" )
				.find( ".ui-collapsible-heading-status" )
					.remove()
				.end()
				.children()
					.contents()
						.unwrap();
		}

		ui.anchor.contents().unwrap();
		ui.content.contents().unwrap();
		this.element.removeClass( "ui-collapsible " + this._elClasses + ( this.options.collapsed ? " ui-collapsible-collapsed" : "" ) );
	},

	_applyOptions: function( options, internal ) {
		var key, contentThemeClass,
			opts = $.extend( {}, this.options, options ),
			$el = this.element,
			classes = "",
			anchorClasses = "";

		// Override inheritable options from the accordion or from defaults if
		// unset in this widget
		for ( key in opts ) {
			opts[ key ] = this._optionValue( opts, key );
		}

		// Set corners for individual collapsibles to false when in a collapsible-set
		if ( this._ui.accordion.length > 0 ) {
			opts.corners = false;
		}

		if ( opts.contentTheme === "none" ) {
			opts.contentTheme = "";
		}

		if ( !( options.collapsed === undefined || internal ) ) {
			this._handleExpandCollapse( options.collapsed );
		}

		// Establish classes for outermost element
		if ( !!opts.inset ) {
			classes += " ui-collapsible-inset";
			if ( !!opts.corners ) {
				classes += " ui-corner-all" ;
			}
		}
		if ( opts.contentTheme ) {
			classes += " ui-collapsible-themed-content";
		}

		// Establish classes for anchor
		if ( $el.hasClass( "ui-collapsible-collapsed" ) ) {
			anchorClasses += " ui-icon-" + opts.collapsedIcon;
		} else {
			anchorClasses += " ui-icon-" + opts.expandedIcon;
		}
		anchorClasses += " ui-btn-icon-" + opts.iconpos;
		if ( opts.theme ) {
			anchorClasses += " ui-btn-" + opts.theme;
		}
		if ( opts.mini ) {
			anchorClasses += " ui-mini";
		}

		contentThemeClass = opts.contentTheme ? ( "ui-body-" + opts.contentTheme ) : "";

		if ( internal ) {
			this._contentTheme = contentThemeClass;
			this._elClasses = classes;
			this._anchorClasses = anchorClasses;
		} else {
			this
				._toggleClasses( this._ui.content, "_contentTheme", contentThemeClass )
				._toggleClasses( $el, "_elClasses", classes )
				._toggleClasses( this._ui.anchor, "_anchorClasses", anchorClasses );
		}

		return this;
	},

	_setOptions: function( options ) {
		return this
			._applyOptions( options )
			._super( options );
	}
});

// Defaults to be used by all instances of collapsible if per-instance values
// are unset or if nothing is specified by way of inheritance from an accordion.
// Note that this hash does not contain options "collapsed" or "heading",
// because those are not inheritable.
$.mobile.collapsible.defaults = {
	expandCueText: " click to expand contents",
	collapseCueText: " click to collapse contents",
	collapsedIcon: "plus",
	expandedIcon: "minus",
	iconpos: "left",
	inset: true,
	corners: true,
	mini: false
};

$.mobile.collapsible.initSelector = ":jqmData(role='collapsible')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.collapsible" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
