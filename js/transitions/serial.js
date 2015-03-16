//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animated page change with serial transition style application
//>>label: Transition Serial
//>>group: Transitions

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../animationComplete",
			"./transition" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $ ) {

	$.mobile.SerialTransition = function() {
		this.init.apply(this, arguments);
	};

	$.extend($.mobile.SerialTransition.prototype, $.mobile.Transition.prototype, {
		sequential: true,

		beforeDoneOut: function() {
			if ( this.$from ) {
				this.cleanFrom();
			}
		},

		beforeStartOut: function( screenHeight, reverseClass, none ) {
			this.$from.animationComplete($.proxy(function() {
				this.doneOut( screenHeight, reverseClass, none );
			}, this ));
		}
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
