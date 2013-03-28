//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animated page change core logic and sequence handlers
//>>label: Transition Core
//>>group: Transitions
//>>css.structure: ../css/structure/jquery.mobile.transition.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./jquery.mobile.core" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

	$.mobile.Transition = function() {
		this.init.apply(this, arguments);
	};

	$.extend($.mobile.Transition.prototype, {
		toPreClass: " ui-page-pre-in",

		init: function( name, reverse, $to, $from ) {
			$.extend(this, {
				name: name,
				reverse: reverse,
				$to: $to,
				$from: $from,
				deferred: new $.Deferred(),
				toScroll: $.mobile.urlHistory.getActive().lastScroll || $.mobile.defaultHomeScroll
			});
		},

		cleanFrom: function() {
			this.$from
				.removeClass( $.mobile.activePageClass + " out in reverse " + this.name )
				.height( "" );
		},

		// NOTE overridden by child object prototypes
		beforeDoneIn: function() {},

		beforeDoneOut: function() {
			if ( this.$from && this.sequential ) {
				this.cleanFrom();
			}
		},

		beforeStartOut: function() {},

		doneIn: function() {
			this.beforeDoneIn();

			this.$to.removeClass( "out in reverse " + this.name ).height( "" );

			this.toggleViewportClass();

			// In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
			// This ensures we jump to that spot after the fact, if we aren't there already.
			if ( $.mobile.window.scrollTop() !== this.toScroll ) {
				this.scrollPage();
			}

			this.deferred.resolve( this.name, this.reverse, this.$to, this.$from, true );
		},

		doneOut: function( screenHeight, reverseClass, none ) {
			this.beforeDoneOut();
			this.startIn( screenHeight, reverseClass, none );
		},

		scrollPage: function() {
			// By using scrollTo instead of silentScroll, we can keep things better in order
			// Just to be precautios, disable scrollstart listening like silentScroll would
			$.event.special.scrollstart.enabled = false;

			window.scrollTo( 0, this.toScroll );

			// reenable scrollstart listening like silentScroll would
			setTimeout( function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		startIn: function( screenHeight, reverseClass, none ) {
			// Prevent flickering in phonegap container: see comments at #4024 regarding iOS
			this.$to.css( "z-index", -10 );

			this.$to.addClass( $.mobile.activePageClass + this.toPreClass );

			// Send focus to page as it is now display: block
			$.mobile.focusPage( this.$to );

			// Set to page height
			this.$to.height( screenHeight + this.toScroll );

			this.scrollPage();

			// Restores visibility of the new page: added together with this.$to.css( "z-index", -10 );
			this.$to.css( "z-index", "" );

			if ( !none ) {
				this.$to.animationComplete( $.proxy(function() {
					this.doneIn();
				}, this));
			}

			this.$to
				.removeClass( this.toPreClass )
				.addClass( this.name + " in" + reverseClass );

			if ( none ) {
				this.doneIn();
			}

		},

		startOut: function( screenHeight, reverseClass, none ) {
			this.beforeStartOut( screenHeight, reverseClass, none );

			// Set the from page's height and start it transitioning out
			// Note: setting an explicit height helps eliminate tiling in the transitions
			this.$from
				.height( screenHeight + $.mobile.window.scrollTop() )
				.addClass( this.name + " out" + reverseClass );
		},


		toggleViewportClass: function() {
				$.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + this.name );
		},

		transition: function() {
			var reverseClass = this.reverse ? " reverse" : "",
				screenHeight = $.mobile.getScreenHeight(),
				maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $.mobile.window.width() > $.mobile.maxTransitionWidth,
				none = !$.support.cssTransitions || maxTransitionOverride || !this.name || this.name === "none" || Math.max( $.mobile.window.scrollTop(), this.toScroll ) > $.mobile.getMaxScrollForTransition();

			this.toggleViewportClass();

			if ( this.$from && !none ) {
				this.startOut( screenHeight, reverseClass, none );
			} else {
				this.doneOut( screenHeight, reverseClass, none );
			}

			return this.deferred.promise();
		}
	});


	$.mobile.SerialTransition = function(){
		this.init.apply(this, arguments);
	};

	$.extend($.mobile.SerialTransition.prototype, $.mobile.Transition.prototype, {
		sequential: true,

		beforeStartOut: function( screenHeight, reverseClass, none ) {
			this.$from.animationComplete($.proxy(function() {
				this.doneOut( screenHeight, reverseClass, none );
			}, this));
		}
	});

	$.mobile.ConcurrentTransition = function(){
		this.init.apply(this, arguments);
	};

	$.extend($.mobile.ConcurrentTransition.prototype, $.mobile.Transition.prototype, {
		sequential: false,

		beforeStartOut: function( screenHeight, reverseClass, none ) {
			this.doneOut( screenHeight, reverseClass, none );
		},

		beforeDoneIn: function() {
			if ( this.$from ) {
				this.cleanFrom();
			}
		}
	});



// generate the handlers from the above
var sequentialHandler = $.mobile.SerialTransition,
	simultaneousHandler = $.mobile.ConcurrentTransition,
	defaultGetMaxScrollForTransition = function() {
		return $.mobile.getScreenHeight() * 3;
	};

// Make our transition handler the public default.
$.mobile.defaultTransitionHandler = sequentialHandler;

//transition handler dictionary for 3rd party transitions
$.mobile.transitionHandlers = {
	"default": $.mobile.defaultTransitionHandler,
	"sequential": sequentialHandler,
	"simultaneous": simultaneousHandler
};

$.mobile.transitionFallbacks = {};

// If transition is defined, check if css 3D transforms are supported, and if not, if a fallback is specified
$.mobile._maybeDegradeTransition = function( transition ) {
		if ( transition && !$.support.cssTransform3d && $.mobile.transitionFallbacks[ transition ] ) {
			transition = $.mobile.transitionFallbacks[ transition ];
		}

		return transition;
};

// Set the getMaxScrollForTransition to default if no implementation was set by user
$.mobile.getMaxScrollForTransition = $.mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;
})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
