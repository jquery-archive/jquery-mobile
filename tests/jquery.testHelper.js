/*
 * Mobile support unit tests
 */

( function( QUnit, $ ) {

$.testHelper = {

	// This function takes sets of files to load asynchronously. Each set will be loaded after
	// the previous set has completed loading. That is, each require and it's dependencies in a
	// set will be loaded asynchronously, but each set will be run in serial.
	asyncLoad: function( seq, baseUrl ) {
		require( {
			baseUrl: baseUrl || "../../../js"
		} );

		function loadSeq( seq, i ) {
			if ( !seq[ i ] ) {
				$( document ).ready( function() {
					var $fixture = $( "#qunit-fixture" );
					if ( $fixture.length ) {
						QUnit.config.fixture = $fixture.html();
					}
					QUnit.start();
				} );
				return;
			}

			require( seq[ i ], function() {
				loadSeq( seq, i + 1 );
			} );
		}

		// Stop qunit from running the tests until everything is in the page
		QUnit.config.autostart = false;

		loadSeq( seq, 0 );
	},

	classStringToHash: function( classString ) {
		var returnValue = {};

		$.each( classString.match( /\S+/g ) || [], function( index, value ) {
			returnValue[ value ] = true;
		} );

		return returnValue;
	},

	mockOriginalEvent: function( options ) {
		$.Event.prototype.originalEvent = $.extend( {}, { preventDefault: $.noop }, options );
	},

	excludeFileProtocol: function( callback ) {
		var message = "Tests require script reload and cannot be run via file: protocol";

		if ( location.protocol === "file:" ) {
			QUnit.test( message, function( assert ) {
				assert.ok( false, message );
			} );
		} else {
			callback();
		}
	},

	// TODO prevent test suite loads when the browser doesn't support push state
	// and push-state false is defined.
	setPushState: function() {
		if ( $.support.pushState && location.search.indexOf( "push-state" ) >= 0 ) {
			$.support.pushState = false;
			$.mobile.window.unbind( "popstate.navigate" );
			$.mobile.window.unbind( "popstate.hashchange" );
			$.event.special.navigate.bound = false;
			$.event.special.navigate.setup();
		}
	},

	setPageTransition: function() {
		if ( location.search.indexOf( "transition=none" ) >= 0 ) {
			$( document ).bind( "mobileinit", function() {
				$.mobile.defaultPageTransition = "none";
			} );
		}
	},

	redirect: function( filename, paramPairs ) {
		var search,
			pairs = [];

		search = location.search.replace( "?", "" );

		if ( search ) {
			pairs = search.split( "&" );
		}

		pairs = pairs.concat( paramPairs ? paramPairs : [] );

		location.href = location.href.toString()
				.replace( /\/[^\/]*\?|\/[^\/]*$/, "/" + filename )
				.replace( search, "" ) + ( pairs.length ? "?" + pairs.join( "&" ) : "" );
	},

	pushStateRedirect: function( filename ) {
		this.redirect( filename, [ "push-state=false" ] );
	},

	reloads: {},

	reloadModule: function( libName ) {
		var deferred = $.Deferred();

		// Where a module loader isn't defined use the old way
		if ( !window.require ) {
			this.reloadLib( libName );
			deferred.resolve();
			return deferred;
		}

		if ( this.reloads[ libName ] === undefined ) {
			this.reloads[ libName ] = {
				count: 0
			};
		}

		//Clear internal cache of module inside of require
		requirejs.undef( libName );

		require(
			{
				baseUrl: "../../../js"
			}, [ libName ],
			function() {
				deferred.resolve();
			}
		);

		return deferred;
	},

	reloadLib: function( libName ) {
		var reload;

		if ( libName.indexOf( "../" ) === -1 ) {
			libName = "../../../js/" + libName;
		}

		if ( this.reloads[ libName ] === undefined ) {
			this.reloads[ libName ] = {
				lib: libName,
				count: 0
			};
		}

		reload = this.reloads[ libName ];

		var src = reload.lib + "?" + this.reloads[ libName ].count++;
		$.ajax( { url: src, dataType: "script", async: false } );
	},

	rerunQunit: function() {
		var self = this;
		QUnit.init();
		$( "script:not([src*='.\/'])" ).each( function( i, elem ) {
			var src = elem.src.split( "/" );
			self.reloadLib( src[ src.length - 1 ] );
		} );
		QUnit.start();
	},

	alterExtend: function( extraExtension ) {
		var extendFn = $.extend;

		$.extend = function() {

			// NOTE extend the object as normal
			var result = extendFn.apply( this, arguments );

			// NOTE add custom extensions
			result = extendFn( result, extraExtension );
			return result;
		};
	},

	hideActivePageWhenComplete: function() {
		if ( $( "#qunit-testresult" ).length > 0 ) {
			$( ".ui-page-active" ).css( "display", "none" );
		} else {
			setTimeout( $.testHelper.hideActivePageWhenComplete, 500 );
		}
	},

	openPage: function( hash ) {
		location.hash = hash;
	},

	sequence: function( fns, interval ) {
		$.each( fns, function( i, fn ) {
			setTimeout( fn, i * interval );
		} );
	},

	pageSequence: function( fns ) {
		this.eventSequence( "pagechange", fns );
	},

	eventSequence: function( event, fns ) {
		var seq = [];
		$.each( fns, function( i, fn ) {
			seq.push( fn );
			if ( i !== fns.length - 1 ) {
				seq.push( event );
			}

		} );

		this.eventCascade( seq );
	},

	eventTarget: undefined,

	eventCascade: function( sequence, timedOut, data ) {
		var fn = sequence.shift(),
			event = sequence.shift(),
			self = this;

		if ( fn === undefined ) {
			self.eventCascadeTarget = undefined;
			return;
		}

		if ( event ) {

			// If a pagechange or defined event is never triggered
			// continue in the sequence to alert possible failures
			var warnTimer = setTimeout( function() {
				self.eventCascade( sequence, true );
			}, 10000 );

			// bind the recursive call to the event
			// Bind the recursive call to the event
			( self.eventTarget || $( ".ui-pagecontainer" ) ).one( event, function( event, data ) {
				clearTimeout( warnTimer );

				// Let the current stack unwind before we fire off the next item in the sequence.
				// TODO setTimeout(self.pageSequence, 0, sequence);
				setTimeout( function() {
					self.eventCascade( sequence, false, data );
				}, 0 );
			} );
		}

		// Invoke the function which should, in some fashion,
		// trigger the next event
		fn( timedOut, data );
	},

	// DetailedEventCascade: call a function and expect a series of events to be triggered (or not to be triggered), and guard
	// with a timeout against getting stood up. Record the result (timed out / was triggered) for each event, and the order
	// in which the event arrived wrt. any other events expected.
	//		seq : [
	//			fn(result),
	//			{ key: {
	//					src: event source (is jQuery object or function returning jQuery object),
	//					     (NB: You should use a function returning a jQuery object as the value for this parameter
	//					      if there is a chance that at the time of construction of the jQuery object (that is, when
	//					      the call to detailedEventCascade is made) the elements selected by the jQuery object are
	//					      not yet present in the DOM - such as, for instance, when the elements are part of a page
	//					      that gets AJAXed in subsequently, such as during a function that's part of the sequence of
	//					      functions passed to detailedEventCascade.)
	//					length: the number of milliseconds for the timeout - only used if src is not set,
	//					event: event name (is string), only used if src is set,
	//					       (NB: It's a good idea to namespace your events, because the handler will be removed
	//					        based on the name you give here if a timeout occurs before the event fires.)
	//
	//					userData1: value,
	//					...
	//					userDatan: value
	//			  },
	//				...
	//			]
	//			...
	//		]
	//		result: {
	//			key: {
	//				idx: order in which the event fired
	//				src: event source (is jQuery object),
	//				event: event name (is string)
	//				timedOut: timed out (is boolean)
	//				userData1: value,
	//				...
	//				userDatan: value
	//			}
	//			...
	//		}
	detailedEventCascade: function( seq, result ) {

		// Grab one step from the sequence
		var fn = seq.shift(),
			events = seq.shift(),
			self = this,
			derefSrc = function( src ) {
				return ( $.isFunction( src ) ? src() : src );
			};

		// We're done
		if ( fn === undefined ) {
			return;
		}

		// Attach handlers to the various objects which are to be checked for correct event generation
		if ( events ) {
			var newResult = {},
				nEventsDone = 0,
				nEvents = 0,
				warnTimer,
				recordResult = function( key, event, result ) {

					// Record the result
					newResult[ key ] = $.extend( {}, event, result );

					// Increment the number of received responses
					nEventsDone++;
					if ( nEventsDone === nEvents ) {

						// Clear the timeout and move on to the next step when all events have been received
						if ( warnTimer ) {
							clearTimeout( warnTimer );
						}
						setTimeout( function() {
							self.detailedEventCascade( seq, newResult );
						}, 0 );
					}
				};

				// Set a failsafe timer in case one of the events never happens
			warnTimer = setTimeout( function() {
				warnTimer = 0;
				$.each( events, function( key, event ) {

					// Timeouts are left out of this, because they will complete for
					// sure, calling recordResult when they do
					if ( newResult[ key ] === undefined && event.src ) {

						// Clean up the unused handler
						derefSrc( event.src ).unbind( event.event );
						recordResult( key, event, { timedOut: true } );
					}
				} );
			}, 5000 );

			$.each( events, function( key, event ) {

				// Count the events so that we may know how many responses to expect
				nEvents++;

				// If it's an event
				if ( event.src ) {

					// Hook up to the event
					derefSrc( event.src ).one( event.event, function() {
						recordResult( key, event, { timedOut: false, idx: nEventsDone } );
					} );
				}

				// If it's a timeout
				else {
					setTimeout( function() {
						recordResult( key, event, { timedOut: true, idx: -1 } );
					}, event.length );
				}
			} );
		}

		// Call the function with the result of the events
		fn( result );
	},

	deferredSequence: function( fns ) {
		var fn = fns.shift(),
			deferred = $.Deferred(),
			self = this, res;

		if ( fn ) {
			res = fn();
			if ( res && $.type( res.done ) === "function" ) {
				res.done( function() {
					self.deferredSequence( fns ).done( function() {
						deferred.resolve();
					} );
				} );
			} else {
				self.deferredSequence( fns ).done( function() {
					deferred.resolve();
				} );
			}
		} else {
			deferred.resolve();
		}
		return deferred;
	},

	decorate: function( opts ) {
		var thisVal = opts.self || window;

		window.console.log( "decorate called" );

		return function() {
			window.console.log( "decorated function called" );
			var returnVal;
			opts.before && opts.before.apply( thisVal, arguments );
			returnVal = opts.fn.apply( thisVal, arguments );
			opts.after && opts.after.apply( thisVal, arguments );

			return returnVal;
		};
	},

	assertUrlLocation: function( assert, args ) {
		var parts = $.mobile.path.parseUrl( location.href ),
			pathnameOnward = location.href.replace( parts.domain, "" );

		if ( $.support.pushState ) {
			assert.deepEqual( pathnameOnward, args.hashOrPush || args.push, args.report );
		} else {
			assert.deepEqual( parts.hash, "#" + ( args.hashOrPush || args.hash ), args.report );
		}
	},

	// Convert a pair of version strings into a pair of integers and pass the
	// resulting integers to a comparison function
	versionTest: function( l, t, r ) {
		var lAr = l.split( "." ),
			lLength = lAr.length,
			rAr = r.split( "." ),
			rLength = rAr.length,
			lVal, rVal,
			lRes = "",
			rRes = "", min, max, str, idx, idx1, diff;
		for ( idx = 0; idx < lLength || idx < rLength; idx++ ) {
			str = {};
			lVal = ( idx < lLength ? parseInt( lAr[ idx ], 10 ) : 0 );
			rVal = ( idx < rLength ? parseInt( rAr[ idx ], 10 ) : 0 );

			// This ignores things like 10a vs. 10b for now
			str.l = String( lVal );
			str.r = String( rVal );
			min = ( str.l.length < str.r.length ) ? "l" : "r";
			max = ( str.l.length < str.r.length ) ? "r" : "l";
			diff = str[ max ].length - str[ min ].length;

			// Make sure orders of magnitude align
			for ( idx1 = 0; idx1 < diff; idx1++ ) {
				str[ min ] = "0" + str[ min ];
			}
			lRes = lRes + str.l;
			rRes = rRes + str.r;
		}

		// Trim initial 0s and return the result of the comparison
		return t( parseInt( lRes.replace( /^0*/, "" ), 10 ), parseInt( rRes.replace( /^0*/, "" ), 10 ) );
	},

	navReset: function( hash ) {
		var timeout;

		QUnit.stop();

		timeout = setTimeout( function() {
			QUnit.start();
			throw "navigation reset timed out";
		}, 5000 );

		$( document ).one( "pagechange", function() {
			clearTimeout( timeout );
			QUnit.start();
		} );

		location.hash = location.hash.replace( "#", "" ) === hash ? "" : "#" + hash;
	},

	// Check if two chunks of DOM are identical
	domEqual: function( l, r ) {
		var idx, idxAttr, lattr, rattr,

			// Decide whether an attribute should be added to those that will be compared
			addAttr = function( el, idx ) {

				// Special case for empty class attribute
				if ( el.attributes[ idx ].name === "class" && !el.attributes[ idx ].value ) {
					return false;
				}
				return true;
			},
			attrsHash = function( el ) {
				var idx,
					attrs = { length: 0, attrs: {} };

				for ( idx = 0; idx < el.attributes.length; idx++ ) {
					if ( addAttr( el, idx ) ) {
						attrs.length++;
						attrs.attrs[ el.attributes[ idx ].name ] = el.attributes[ idx ].value;
					}
				}

				return attrs;
			};

		// If the lengths of the two jQuery objects are different, the DOM
		// must be different so don't bother checking
		if ( l.length === r.length ) {

			// Otherwise, examine each element
			for ( idx = 0; idx < l.length; idx++ ) {
				l = l.eq( idx );
				r = r.eq( idx );

				// If the tagName is different the DOM must be different
				if ( l[ 0 ].tagName !== r[ 0 ].tagName ) {
					return false;
				}

				// Otherwise, check the attributes, but first convert the attributes
				// array to a dictionary, because the order of the attributes may be
				// different between l and r
				lattr = attrsHash( l[ 0 ] );
				rattr = attrsHash( r[ 0 ] );

				// If l and r have a different number of attributes, don't continue
				if ( lattr.length !== rattr.length ) {
					return false;
				}

				// Check if each attribute in lattr has the same value in rattr
				for ( idxAttr in lattr.attrs ) {
					if ( rattr.attrs[ idxAttr ] !== lattr.attrs[ idxAttr ] ) {
						return false;
					}
				}

				// If so, compare the children of l and r recursively
				if ( !this.domEqual( $( l[ 0 ] ).children(), $( r[ 0 ] ).children() ) ) {
					return false;
				}
				l = l.end();
				r = r.end();
			}
			if ( idx === l.length ) {
				return true;
			}
		}

		return false;
	},

	delayStart: function( milliseconds ) {

		// Stop qunit from running the tests until everything is in the page
		QUnit.config.autostart = false;

		setTimeout( function() {
			QUnit.start();
		}, milliseconds || 2000 );
	}
};

} )( window.QUnit, window.$ );
