//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Orders enhancement hooks by dependency
//>>label: Registry of enhancers
//>>group: Widgets

define( [ "jquery", "./jquery.mobile.ns" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var doc = $( document );

function Enhancer() {
	this._callbacks = [],
	this._dependencies = {},
	this._document = doc;
}

$.extend( Enhancer.prototype, {
	_addWidget: function( fullName ) {
		var idx,
			depinfo = this._dependencies[ fullName ];

		if ( depinfo && !depinfo.added ) {
			for ( idx in depinfo.deps ) {
				this._addWidget( depinfo.deps[ idx ] );
			}
			this._callbacks.push( depinfo.callback );
			depinfo.added = true;
		}
	},

	_defaultCallback: function( widget ) {
		var parts = widget.split( "." ),
			ns = parts[ 0 ],
			name = parts[ 1 ],
			ret = function( targetEl ) {
				// First try to grab the initSelector from the namespace, to avoid
				// triggering the widget class's definition, but, failing that, look
				// for the initSelector also in the prototype's options.
				var targets = $( $[ ns ][ name ].initSelector ||
					$[ ns ][ name ].prototype.options.initSelector, targetEl );

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

		if ( deps.processed ) {
			this._addWidget( widget );
		}

		return this;
	},

	enhance: function( targetEl ) {
		var idx,
			deps = this._dependencies,
			cbs = this._callbacks;

		if ( !deps.processed ) {
			for ( idx in deps ) {
				this._addWidget( idx );
			}
			deps.processed = true;
		}

		for ( idx in cbs ) {
			cbs[ idx ]( targetEl );
		}

		return this;
	}
});

$.mobile._enhancer = new Enhancer();

// Support triggering "create" on an element
doc.bind( "create", function( e ) {
	$.mobile._enhancer.enhance( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
