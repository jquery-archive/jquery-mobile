//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animated page change with concurrent transition style application
//>>label: Transition Concurrent
//>>group: Transitions

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./transition" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $ ) {

	$.mobile.ConcurrentTransition = function() {
		this.init.apply(this, arguments);
	};

	$.extend($.mobile.ConcurrentTransition.prototype, $.mobile.Transition.prototype, {
		sequential: false,

		beforeDoneIn: function() {
			if ( this.$from ) {
				this.cleanFrom();
			}
		},

		beforeStartOut: function( screenHeight, reverseClass, none ) {
			this.doneOut( screenHeight, reverseClass, none );
		}
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
