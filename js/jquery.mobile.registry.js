//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Orders enhancement hooks by dependency
//>>label: Registry of enhancers
//>>group: Widgets

define( [ "jquery", "./jquery.mobile.ns" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var cbs = [],
	deps = {},
	doc = $( document ),
	bindOne = function( fullName, cb ) {
//		console.log( "<Binding " + fullName + ">" );
//		doc.bind( "pagecreate create", function() {
		cbs.push( function() {
//			console.log( "<Running " + fullName + ">" );
			cb.apply( this, arguments );
		});
	},
	addWidget = function( fullName ) {
		var idx,
			depinfo = deps[ fullName ];

		if ( depinfo ) {
			for ( idx in depinfo.deps ) {
				addWidget( depinfo.deps[ idx ] );
			}
			if ( depinfo.cb ) {
				bindOne( fullName, depinfo.cb );
				depinfo.cb = undefined;
			}
		}
	}

$.mobile.addEnhancementHook = function( widget, widgetDeps, cb ) {
	var flatDeps = [], ns, idx, prefix;

	for ( ns in widgetDeps ) {
		prefix = ns + "-";
		for ( idx in widgetDeps[ ns ] ) {
			flatDeps.push( prefix + widgetDeps[ ns ][ idx ] );
		}
	}

	deps[ widget ] = { deps: flatDeps, cb: cb };
}

doc.bind( "pagecreate create", function() {
	var idx;
	for ( idx = 0 ; idx < cbs.length ; idx++ ) {
		cbs[ idx ].apply( this, arguments );
	}
});

doc.on( "mobileinit", function() {
	var idx;

//	console.log( "" );
	for ( idx in deps ) {
		addWidget( idx );
	}
});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
