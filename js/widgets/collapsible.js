/*!
 * jQuery Mobile Collapsible @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Collapsible
//>>group: Widgets
//>>description: Creates collapsible content blocks.
//>>docs: http://api.jquerymobile.com/collapsible/
//>>demos: http://demos.jquerymobile.com/@VERSION/collapsible/
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../core",
			"../widget" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var rInitialLetter = /([A-Z])/g;

$.widget( "mobile.collapsible", {
	version: "@VERSION",

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
					.closest( ":jqmData(role='collapsible-set')," +
						":jqmData(role='collapsibleset')" +
						( $.mobile.collapsibleset ? ", :mobile-collapsibleset" :
							"" ) )
						.addClass( "ui-collapsible-set" )
			};

		this._ui = ui;
		this._renderedOptions = this._getOptions( this.options );

		if ( this.options.enhanced ) {
			ui.heading = this.element.children( ".ui-collapsible-heading" );
			ui.content = ui.heading.next();
			ui.anchor = ui.heading.children();
			ui.status = ui.anchor.children( ".ui-collapsible-heading-status" );
			ui.icon = ui.anchor.children( ".ui-icon" );
		} else {
			this._enhance( elem, ui );
		}

		this._on( ui.heading, {
			"tap": function() {
				ui.heading.find( "a" ).first().addClass( "ui-button-active" );
			},

			"click": function( event ) {
				this._handleExpandCollapse( !ui.heading.hasClass( "ui-collapsible-heading-collapsed" ) );
				event.preventDefault();
				event.stopPropagation();
			}
		} );
	},

	// Adjust the keys inside options for inherited values
	_getOptions: function( options ) {
		var key,
			accordion = this._ui.accordion,
			accordionWidget = this._ui.accordionWidget;

		// Copy options
		options = $.extend( {}, options );

		if ( accordion.length && !accordionWidget ) {
			this._ui.accordionWidget =
				accordionWidget = accordion.data( "mobile-collapsibleset" );
		}

		for ( key in options ) {

			// Retrieve the option value first from the options object passed in and, if
			// null, from the parent accordion or, if that's null too, or if there's no
			// parent accordion, then from the defaults.
			options[ key ] =
				( options[ key ] != null ) ? options[ key ] :
					( accordionWidget ) ? accordionWidget.options[ key ] :
						accordion.length ? $.mobile.getAttribute( accordion[ 0 ],
							key.replace( rInitialLetter, "-$1" ).toLowerCase() ) :
							null;

			if ( null == options[ key ] ) {
				options[ key ] = $.mobile.collapsible.defaults[ key ];
			}
		}

		return options;
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
	},

	_enhance: function( elem, ui ) {
		var opts = this._renderedOptions,
			contentThemeClass = this._themeClassFromOption( "ui-body-", opts.contentTheme );

		elem.addClass( "ui-collapsible " +
			( opts.inset ? "ui-collapsible-inset " : "" ) +
			( opts.inset && opts.corners ? "ui-corner-all " : "" ) +
			( contentThemeClass ? "ui-collapsible-themed-content " : "" ) );
		ui.originalHeading = elem.children( this.options.heading ).first(),
		ui.content = elem
			.wrapInner( "<div " +
				"class='ui-collapsible-content " +
				contentThemeClass + "'></div>" )
			.children( ".ui-collapsible-content" ),
		ui.heading = ui.originalHeading;

		// Replace collapsibleHeading if it's a legend
		if ( ui.heading.is( "legend" ) ) {
			ui.heading = $( "<div role='heading'>" + ui.heading.html() + "</div>" );
			ui.placeholder = $( "<div><!-- placeholder for legend --></div>" ).insertBefore( ui.originalHeading );
			ui.originalHeading.remove();
		}

		ui.status = $( "<span class='ui-collapsible-heading-status'></span>" );
		ui.anchor = ui.heading
			.detach()
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( ui.status )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
					.addClass( "ui-button " +
						this._themeClassFromOption( "ui-button-", opts.theme ) + " " +
						( opts.mini ? "ui-mini " : "" ) );

		this._updateIcon();

		//drop heading in before content
		ui.heading.insertBefore( ui.content );

		this._handleExpandCollapse( this.options.collapsed );

		return ui;
	},

	_updateIcon: function() {
		var ui = this._ui,
			opts = this._getOptions( this.options ),
			iconclass =
				opts.collapsed ?
				( opts.collapsedIcon ? " ui-icon-" + opts.collapsedIcon : "" ) :
				( opts.expandedIcon ? " ui-icon-" + opts.expandedIcon : "" ),
			method = opts.iconpos === ( "bottom" || "right" ) ? "append" : "prepend";

		if ( ui.icon ) {
			ui.icon.remove();
		}
		if ( ui.space ) {
			ui.space.remove();
		}

		ui.icon = $( "<span class='ui-icon" + ( iconclass ? iconclass + " " : "" ) + "'></span>" );

		if ( opts.iconpos === "left" || opts.iconpos === "right" ||
				opts.iconpos === null ) {
			ui.space = $( "<span class='ui-icon-space'> </span>" );

			ui.anchor[ method ]( ui.space );
		} else {
			ui.icon.addClass( "ui-widget-icon-block" );
		}

		ui.anchor[ method ]( ui.icon );

		if ( opts.iconpos === "right" ) {
			ui.icon.addClass( "ui-collapsible-icon-right" );
		}
	},

	refresh: function() {
		this._applyOptions( this.options );
		this._renderedOptions = this._getOptions( this.options );
		this._updateIcon();
	},

	_applyOptions: function( options ) {
		var isCollapsed, newTheme, oldTheme, hasCorners,
			elem = this.element,
			currentOpts = this._renderedOptions,
			ui = this._ui,
			anchor = ui.anchor,
			status = ui.status,
			opts = this._getOptions( options );

		// First and foremost we need to make sure the collapsible is in the proper
		// state, in case somebody decided to change the collapsed option at the
		// same time as another option
		if ( options.collapsed !== undefined ) {
			this._handleExpandCollapse( options.collapsed );
		}

		isCollapsed = elem.hasClass( "ui-collapsible-collapsed" );

		// We only need to apply the cue text for the current state right away.
		// The cue text for the alternate state will be stored in the options
		// and applied the next time the collapsible's state is toggled
		if ( isCollapsed ) {
			if ( opts.expandCueText !== undefined ) {
				status.text( opts.expandCueText );
			}
		} else {
			if ( opts.collapseCueText !== undefined ) {
				status.text( opts.collapseCueText );
			}
		}

		if ( opts.theme !== undefined ) {
			oldTheme = this._themeClassFromOption( "ui-button-", currentOpts.theme );
			newTheme = this._themeClassFromOption( "ui-button-", opts.theme );
			anchor.removeClass( oldTheme ).addClass( newTheme );
		}

		if ( opts.contentTheme !== undefined ) {
			oldTheme = this._themeClassFromOption( "ui-body-",
				currentOpts.contentTheme );
			newTheme = this._themeClassFromOption( "ui-body-",
				opts.contentTheme );
			ui.content.removeClass( oldTheme ).addClass( newTheme );
		}

		if ( opts.inset !== undefined ) {
			elem.toggleClass( "ui-collapsible-inset", opts.inset );
			hasCorners = !!( opts.inset && ( opts.corners || currentOpts.corners ) );
		}

		if ( opts.corners !== undefined ) {
			hasCorners = !!( opts.corners && ( opts.inset || currentOpts.inset ) );
		}

		if ( hasCorners !== undefined ) {
			elem.toggleClass( "ui-corner-all", hasCorners );
		}

		if ( opts.mini !== undefined ) {
			anchor.toggleClass( "ui-mini", opts.mini );
		}
	},

	_setOptions: function( options ) {
		this._applyOptions( options );
		this._super( options );
		this._renderedOptions = this._getOptions( this.options );

		// If any icon-related options have changed, make sure the new icon
		// state is reflected by first removing all icon-related classes
		// reflecting the current state and then adding all icon-related
		// classes for the new state
		if ( !( options.iconpos === undefined &&
				options.collapsedIcon === undefined &&
				options.expandedIcon === undefined ) ) {

			this._updateIcon();
		}
	},

	_handleExpandCollapse: function( isCollapse ) {
		var opts = this._renderedOptions,
			ui = this._ui;

		ui.status.text( isCollapse ? opts.expandCueText : opts.collapseCueText );
		ui.heading
			.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
			.find( "a" ).first()
				.removeClass( "ui-button-active" );
		ui.heading
			.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
			.find( "a" ).first().removeClass( "ui-button-active" );

		if ( ui.icon ) {
			ui.icon.toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapse )

			// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
			.toggleClass( "ui-icon-" + opts.collapsedIcon, ( isCollapse || opts.expandedIcon === opts.collapsedIcon ) );
		}
		this.element.toggleClass( "ui-collapsible-collapsed", isCollapse );
		ui.content
			.toggleClass( "ui-collapsible-content-collapsed", isCollapse )
			.attr( "aria-hidden", isCollapse )
			.trigger( "updatelayout" );
		this.options.collapsed = isCollapse;
		this._trigger( isCollapse ? "collapse" : "expand" );
	},

	expand: function() {
		this._handleExpandCollapse( false );
	},

	collapse: function() {
		this._handleExpandCollapse( true );
	},

	_destroy: function() {
		var ui = this._ui,
			opts = this.options;

		if ( opts.enhanced ) {
			return;
		}

		if ( ui.placeholder ) {
			ui.originalHeading.insertBefore( ui.placeholder );
			ui.placeholder.remove();
			ui.heading.remove();
		} else {
			ui.status.remove();
			ui.heading
				.removeClass( "ui-collapsible-heading ui-collapsible-heading-collapsed" )
				.children()
					.contents()
					.unwrap();
		}

		if ( ui.icon ) {
			ui.icon.remove();
		}
		if( ui.space ) {
			ui.space.remove();
		}

		ui.anchor.contents().unwrap();
		ui.content.contents().unwrap();
		this.element
			.removeClass( "ui-collapsible ui-collapsible-collapsed " +
				"ui-collapsible-themed-content ui-collapsible-inset ui-corner-all" );
	}
} );

// Defaults to be used by all instances of collapsible if per-instance values
// are unset or if nothing is specified by way of inheritance from an accordion.
// Note that this hash does not contain options "collapsed" or "heading",
// because those are not inheritable.
$.mobile.collapsible.defaults = {
	expandCueText: " click to expand contents",
	collapseCueText: " click to collapse contents",
	collapsedIcon: "plus",
	contentTheme: "inherit",
	expandedIcon: "minus",
	iconpos: "left",
	inset: true,
	corners: true,
	theme: "inherit",
	mini: false
};

return $.mobile.collapsible;

} );
