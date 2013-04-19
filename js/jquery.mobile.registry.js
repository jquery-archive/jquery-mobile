//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Orders enhancement hooks by dependency
//>>label: Registry of enhancers
//>>group: Widgets

define( [ "jquery", "./jquery.mobile.ns" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var doc = $( document );

$.mobile._Enhancer = function() {
	this._dependencies = {};
};

$.extend( $.mobile._Enhancer.prototype, {

	_defaultCallback: function( widget ) {
		var parts = widget.split( "." ),
			ns = parts[ 0 ],
			name = parts[ 1 ],
			ret = function( targetEl ) {
				// First try to grab the initSelector from the old location in case
				// some legacy code modified it. If not, grab it from the new location.
				var targets = $( $[ ns ][ name ].prototype.options.initSelector ||
					$[ ns ][ name ].initSelector, targetEl );

				if ( targets.length ) {
					$[ ns ][ name ].prototype.enhance( targets, true );
				}
			};

		return ret;
	},

	add: function( widget, widgetDeps, callback ) {
		var deps = this._dependencies;

		if ( !widgetDeps ) {
			widgetDeps = { dependencies: [] };
		}

		if ( !callback ) {
			callback = this._defaultCallback( widget );
		}

		deps[ widget ] = {
			deps: widgetDeps.dependencies,
			callback: callback
		};

		return this;
	},

	_enhance: function( el, idx, visited ) {
		var depIdx,
			dep = this._dependencies[ idx ];

		if ( dep && !visited[ idx ] ) {
			for ( depIdx in dep.deps ) {
				this._enhance( el, dep.deps[ depIdx ], visited );
			}
			dep.callback( el );
			visited[ idx ] = true;
		}
	},

	enhance: function( targetEl ) {
		var idx,
			visited = {},
			deps = this._dependencies;

		for ( idx in deps ) {
			this._enhance( targetEl, idx, visited );
		}

		return this;
	}
});

$.mobile._enhancer = new $.mobile._Enhancer();

// Support triggering "create" on an element
doc.bind( "create", function( e ) {
	$.mobile._enhancer.enhance( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
