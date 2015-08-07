/*!
 * jQuery Mobile Transition @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Transition Core
//>>group: Transitions
//>>description: Animated page change base constructor and logic
//>>demos: http://demos.jquerymobile.com/@VERSION/transitions/
//>>css.structure: ../css/structure/jquery.mobile.transition.css
//>>css.structure: ../css/structure/jquery.mobile.transition.fade.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../core",

			// TODO event.special.scrollstart
			"../events/scroll",
			"../animationComplete" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

// TODO remove direct references to $.mobile and properties, we should
//      favor injection with params to the constructor
$.mobile.Transition = function() {
	this.init.apply( this, arguments );
};

$.extend( $.mobile.Transition.prototype, {
	toPreClass: " ui-page-pre-in",

	init: function( name, reverse, $to, $from ) {
		$.extend( this, {
			name: name,
			reverse: reverse,
			$to: $to,
			$from: $from,
			deferred: new $.Deferred()
		} );
	},

	cleanFrom: function() {
		this.$from
			.removeClass( "ui-page-active out in reverse " + this.name )
			.height( "" );
	},

	// NOTE overridden by child object prototypes, noop'd here as defaults
	beforeDoneIn: function() {},
	beforeDoneOut: function() {},
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
		if ( !this.sequential ) {
			this.$to.addClass( "ui-page-active" );
		}
		this.deferred.resolve( this.name, this.reverse, this.$to, this.$from, true );
	},

	doneOut: function( screenHeight, reverseClass, none, preventFocus ) {
		this.beforeDoneOut();
		this.startIn( screenHeight, reverseClass, none, preventFocus );
	},

	hideIn: function( callback ) {
		// Prevent flickering in phonegap container: see comments at #4024 regarding iOS
		this.$to.css( "z-index", -10 );
		callback.call( this );
		this.$to.css( "z-index", "" );
	},

	scrollPage: function() {
		// By using scrollTo instead of silentScroll, we can keep things better in order
		// Just to be precautios, disable scrollstart listening like silentScroll would
		$.event.special.scrollstart.enabled = false;
		//if we are hiding the url bar or the page was previously scrolled scroll to hide or return to position
		if ( $.mobile.hideUrlBar || this.toScroll !== $.mobile.defaultHomeScroll ) {
			window.scrollTo( 0, this.toScroll );
		}

		// reenable scrollstart listening like silentScroll would
		setTimeout( function() {
			$.event.special.scrollstart.enabled = true;
		}, 150 );
	},

	startIn: function( screenHeight, reverseClass, none, preventFocus ) {
		this.hideIn( function() {
			this.$to.addClass( "ui-page-active" + this.toPreClass );

			// Send focus to page as it is now display: block
			if ( !preventFocus ) {
				$.mobile.focusPage( this.$to );
			}

			// Set to page height
			this.$to.height( screenHeight + this.toScroll );

			if ( !none ) {
				this.scrollPage();
			}
		} );

		this.$to
			.removeClass( this.toPreClass )
			.addClass( this.name + " in " + reverseClass );

		if ( !none ) {
			this.$to.animationComplete( $.proxy( function() {
				this.doneIn();
			}, this ) );
		} else {
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
		this.$to.closest( ".ui-pagecontainer" ).toggleClass( "ui-mobile-viewport-transitioning viewport-" + this.name );
	},

	transition: function( toScroll ) {
		// NOTE many of these could be calculated/recorded in the constructor, it's my
		//      opinion that binding them as late as possible has value with regards to
		//      better transitions with fewer bugs. Ie, it's not guaranteed that the
		//      object will be created and transition will be run immediately after as
		//      it is today. So we wait until transition is invoked to gather the following
		var none,
			reverseClass = this.reverse ? " reverse" : "",
			screenHeight = $( window ).height(),
			maxTransitionOverride = $.mobile.maxTransitionWidth !== false &&
				$.mobile.window.width() > $.mobile.maxTransitionWidth;

		this.toScroll = ( toScroll ? toScroll : 0 );

		none = !$.support.cssTransitions || !$.support.cssAnimations ||
			maxTransitionOverride || !this.name || this.name === "none" ||
			Math.max( $.mobile.window.scrollTop(), this.toScroll ) >
			$.mobile.getMaxScrollForTransition();

		this.toggleViewportClass();

		if ( this.$from && !none ) {
			this.startOut( screenHeight, reverseClass, none );
		} else {
			this.doneOut( screenHeight, reverseClass, none, true );
		}

		return this.deferred.promise();
	}
} );

return $.mobile.Transition;
} );
