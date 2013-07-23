//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>label: Controlgroups
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.controlgroup.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"./addFirstLastClasses",
	"../jquery.mobile.registry",
	"../jquery.mobile.widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.controlgroup", $.extend( {
	options: {
		enhanced: false,
		theme: null,
		shadow: false,
		corners: true,
		excludeInvisible: true,
		type: "vertical",
		mini: false
	},

	_create: function() {
		var elem = this.element,
			opts = this.options;

		$.extend( this, {
			_ui: null,
			_classes: "",
			_initialRefresh: true
		});

		if ( opts.enhanced ) {
			this._ui = {
				groupLegend: elem.children( ".ui-controlgroup-label" ).children(),
				childWrapper: elem.children( ".ui-controlgroup-controls" )
			};
			this._applyOptions( opts, true );
		} else {
			this._ui = {
				groupLegend: elem.children( "legend" ),
				childWrapper: elem
					.wrapInner( "<div class='ui-controlgroup-controls'></div>" )
					.addClass( "ui-controlgroup" )
					.children()
			};

			if ( this._ui.groupLegend.length > 0 ) {
				$( "<div role='heading' class='ui-controlgroup-label'></div>" )
					.append( this._ui.groupLegend )
					.prependTo( elem );
			}
			this._setOptions( opts );
		}
	},

	_init: function() {
		this.refresh();
	},

	_applyOptions: function( options, internal ) {
		var callRefresh, opts,
			classes = "";

		// Must not be able to unset the type of the controlgroup
		if ( options.type === null ) {
			options.type = undefined;
		}
		opts = $.extend( {}, this.options, options );

		if ( opts.type != null ) {
			classes += " ui-controlgroup-" + opts.type;

			// No need to call refresh if the type hasn't changed
			if ( this.options.type !== options.type ) {
				this.options.type = options.type;
				callRefresh = true;
			}
		}

		if ( opts.theme != null && opts.theme !== "none" ) {
			classes += " ui-group-theme-" + opts.theme;
		}

		if ( opts.corners ) {
			classes += " ui-corner-all";
		}

		if ( opts.mini ) {
			classes += " ui-mini";
		}

		if ( !( opts.shadow === undefined || internal ) ) {
			this._ui.childWrapper.toggleClass( "ui-shadow", opts.shadow );
		}

		if ( options.excludeInvisible !== undefined ) {
			this.options.excludeInvisible = options.excludeInvisible;
			callRefresh = true;
		}

		if ( internal ) {
			this._classes = classes;
		} else {
			this._toggleClasses( this.element, "_classes", classes );
			if ( callRefresh ) {
				this.refresh();
			}
		}

		return this;
	},

	_setOptions: function( options ) {
		return this
			._applyOptions( options )
			._super( options );
	},

	container: function() {
		return this._ui.childWrapper;
	},

	refresh: function() {
		var $el = this.container(),
			els = $el.find( ".ui-btn" ).not( ".ui-slider-handle" ),
			create = this._initialRefresh;
		if ( $.mobile.checkboxradio ) {
			$el.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
		}
		this._addFirstLastClasses( els, this.options.excludeInvisible ? this._getVisibles( els, create ) : els, create );
		this._initialRefresh = false;
	},

	// Caveat: If the legend is not the first child of the controlgroup at enhance
	// time, it will be after _destroy().
	_destroy: function() {
		var ui, buttons;

		if ( this.options.enhanced ) {
			return this;
		}

		ui = this._ui;
		buttons = this.element
			.removeClass( "ui-controlgroup " + this._classes )
			.find( ".ui-btn" )
			.not( ".ui-slider-handle" );

		this._removeFirstLastClasses( buttons );

		ui.groupLegend.unwrap();
		ui.childWrapper.children().unwrap();
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

$.mobile._enhancer.add( "mobile.controlgroup", {
	dependencies: [ "mobile.selectmenu", "mobile.button", "mobile.checkboxradio" ]
});

})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
