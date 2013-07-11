//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animated page change with serial transition style application
//>>label: Transition Serial
//>>group: Transitions

define( [ "jquery", "./transition" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $ ) {

	$.ui.SerialTransition = function(){
		this.init.apply(this, arguments);
	};

	$.extend($.ui.SerialTransition.prototype, $.ui.Transition.prototype, {
		sequential: true,

		beforeDoneOut: function() {
			if ( this.$from ) {
				this.cleanFrom();
			}
		},

		beforeStartOut: function( screenHeight, reverseClass, none ) {
			this.$from.animationComplete($.proxy(function() {
				this.doneOut( screenHeight, reverseClass, none );
			}, this));
		}
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
