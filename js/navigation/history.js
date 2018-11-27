/*!
 * jQuery Mobile History Manager @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: History Manager
//>>group: Navigation
//>>description: Manages a stack of history entries. Used exclusively by the Navigation Manager
//>>demos: http://demos.jquerymobile.com/@VERSION/navigation/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./../ns",
			"./path" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.mobile.History = function( stack, index ) {
	this.stack = stack || [];
	this.activeIndex = index || 0;
};

$.extend( $.mobile.History.prototype, {
	getActive: function() {
		return this.stack[ this.activeIndex ];
	},

	getLast: function() {
		return this.stack[ this.previousIndex ];
	},

	getNext: function() {
		return this.stack[ this.activeIndex + 1 ];
	},

	getPrev: function() {
		return this.stack[ this.activeIndex - 1 ];
	},

	// addNew is used whenever a new page is added
	add: function( url, data ) {
		data = data || {};

		//if there's forward history, wipe it
		if ( this.getNext() ) {
			this.clearForward();
		}

		// if the hash is included in the data make sure the shape
		// is consistent for comparison
		if ( data.hash && data.hash.indexOf( "#" ) === -1 ) {
			data.hash = "#" + data.hash;
		}

		data.url = url;
		this.stack.push( data );
		this.activeIndex = this.stack.length - 1;
	},

	//wipe urls ahead of active index
	clearForward: function() {
		this.stack = this.stack.slice( 0, this.activeIndex + 1 );
	},

	find: function( url, stack, earlyReturn ) {
		stack = stack || this.stack;

		var entry, i,
			length = stack.length, index;

		for ( i = 0; i < length; i++ ) {
			entry = stack[ i ];

			if ( decodeURIComponent( url ) === decodeURIComponent( entry.url ) ||
					decodeURIComponent( url ) === decodeURIComponent( entry.hash ) ) {
				index = i;

				if ( earlyReturn ) {
					return index;
				}
			}
		}

		return index;
	},

	_findById: function( id ) {
		var stackIndex,
			stackLength = this.stack.length;

		for ( stackIndex = 0; stackIndex < stackLength; stackIndex++ ) {
			if ( this.stack[ stackIndex ].id === id ) {
				break;
			}
		}

		return ( stackIndex < stackLength ? stackIndex : undefined );
	},

	closest: function( url, id ) {
		var closest = ( id === undefined ? undefined : this._findById( id ) ),
			a = this.activeIndex;

		// First, we check whether we've found an entry by id. If so, we're done.
		if ( closest !== undefined ) {
			return closest;
		}

		// Failing that take the slice of the history stack before the current index and search
		// for a url match. If one is found, we'll avoid avoid looking through forward history
		// NOTE the preference for backward history movement is driven by the fact that
		//      most mobile browsers only have a dedicated back button, and users rarely use
		//      the forward button in desktop browser anyhow
		closest = this.find( url, this.stack.slice( 0, a ) );

		// If nothing was found in backward history check forward. The `true`
		// value passed as the third parameter causes the find method to break
		// on the first match in the forward history slice. The starting index
		// of the slice must then be added to the result to get the element index
		// in the original history stack :( :(
		//
		// TODO this is hyper confusing and should be cleaned up (ugh so bad)
		if ( closest === undefined ) {
			closest = this.find( url, this.stack.slice( a ), true );
			closest = closest === undefined ? closest : closest + a;
		}

		return closest;
	},

	direct: function( opts ) {
		var newActiveIndex = this.closest( opts.url, opts.id ),
			a = this.activeIndex;

		// save new page index, null check to prevent falsey 0 result
		// record the previous index for reference
		if ( newActiveIndex !== undefined ) {
			this.activeIndex = newActiveIndex;
			this.previousIndex = a;
		}

		// invoke callbacks where appropriate
		//
		// TODO this is also convoluted and confusing
		if ( newActiveIndex < a ) {
			( opts.present || opts.back || $.noop )( this.getActive(), "back" );
		} else if ( newActiveIndex > a ) {
			( opts.present || opts.forward || $.noop )( this.getActive(), "forward" );
		} else if ( newActiveIndex === undefined && opts.missing ) {
			opts.missing( this.getActive() );
		}
	}
} );

return $.mobile.History;
} );
