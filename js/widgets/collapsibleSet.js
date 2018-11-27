/*!
 * jQuery Mobile Collapsible Set @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Collapsible Sets (Accordions)
//>>group: Widgets
//>>description: For creating grouped collapsible content areas.
//>>docs: http://api.jquerymobile.com/collapsibleset/
//>>demos: http://demos.jquerymobile.com/@VERSION/collapsibleset/
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"./collapsible",
			"./addFirstLastClasses" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.collapsibleset", $.extend( {
	version: "@VERSION",

	options: $.extend( {
		enhanced: false
	}, $.mobile.collapsible.defaults ),

	_handleCollapsibleExpand: function( event ) {
		var closestCollapsible = $( event.target ).closest( ".ui-collapsible" );

		if ( closestCollapsible.parent().is( ":mobile-collapsibleset, :jqmData(role='collapsibleset')" ) ) {
			closestCollapsible
				.siblings( ".ui-collapsible:not(.ui-collapsible-collapsed)" )
				.collapsible( "collapse" );
		}
	},

	_create: function() {
		var elem = this.element,
			opts = this.options;

		$.extend( this, {
			_classes: ""
		} );

		this.childCollapsiblesSelector = ":mobile-collapsible, " +
			( "[data-" + $.mobile.ns +  "role='collapsible']" );

		if ( !opts.enhanced ) {
			elem.addClass( "ui-collapsible-set " +
				this._themeClassFromOption( "ui-group-theme-", opts.theme ) + " " +
				( opts.corners && opts.inset ? "ui-corner-all " : "" ) );
			this.element.find( this.childCollapsiblesSelector ).collapsible();
		}

		this._on( elem, { collapsibleexpand: "_handleCollapsibleExpand" } );
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
	},

	_init: function() {
		this._refresh( true );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		this.element
			.children( this.childCollapsiblesSelector )
				.filter( ":jqmData(collapsed='false')" )
					.collapsible( "expand" );
	},

	_setOptions: function( options ) {
		var ret, hasCorners,
			elem = this.element,
			themeClass = this._themeClassFromOption( "ui-group-theme-", options.theme );

		if ( themeClass ) {
			elem
				.removeClass( this._themeClassFromOption( "ui-group-theme-", this.options.theme ) )
				.addClass( themeClass );
		}

		if ( options.inset !== undefined ) {
			hasCorners = !!( options.inset && ( options.corners || this.options.corners ) );
		}

		if ( options.corners !== undefined ) {
			hasCorners = !!( options.corners && ( options.inset || this.options.inset ) );
		}

		if ( hasCorners !== undefined ) {
			elem.toggleClass( "ui-corner-all", hasCorners );
		}

		ret = this._super( options );
		this.element.children( ":mobile-collapsible" ).collapsible( "refresh" );
		return ret;
	},

	_destroy: function() {
		var el = this.element;

		this._removeFirstLastClasses( el.children( this.childCollapsiblesSelector ) );
		el
			.removeClass( "ui-collapsible-set ui-corner-all " +
				this._themeClassFromOption( "ui-group-theme-", this.options.theme ) )
			.children( ":mobile-collapsible" )
				.collapsible( "destroy" );
	},

	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( this.childCollapsiblesSelector );

		this.element.find( this.childCollapsiblesSelector ).not( ".ui-collapsible" ).collapsible();

		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	},

	refresh: function() {
		this._refresh( false );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

} );
