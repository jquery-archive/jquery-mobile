( function( QUnit ) {
	function inArray( haystack, needle ) {
		for ( var i = 0; i < haystack.length; i++ ) {
			if (
					( needle instanceof RegExp && needle.test( haystack[ i ] ) )||
					( typeof needle === "string" && haystack[ i ] === needle )
			) {
				return true;
			}
		}
		return false;
	}

	function check( element, search ) {
		var i, classAttribute, elementClassArray, classArray,
			missing = [],
			found = [];

		if ( element.jquery && element.length !== 1 ) {
			throw new Error( "Class checks can only be performed on a single element on a collection" );
		}

		element = element.jquery ? element[ 0 ] : element;
		classAttribute = element.getAttribute( "class" );

		if ( classAttribute ) {
			elementClassArray = classAttribute.match( /\S+/g ) || [];
			if ( search instanceof RegExp ) {
				if ( inArray( elementClassArray, search ) ) {
					found.push( search );
				} else {
					missing.push( search );
				}
			} else {
				classArray = search.match( /\S+/g );
				for( i = 0; i < classArray.length; i++ ) {
					if ( !inArray( elementClassArray, classArray[ i ] ) ) {
						missing.push( classArray[ i ] );
					} else {
						found.push( classArray[ i ] );
					}
				}
			}
		} else {
			missing = classArray;
		}

		return {
			missing: missing,
			found: found,
			element: element,
			classAttribute: classAttribute
		};
	}

	QUnit.extend( QUnit.assert, {
		hasClasses: function( element, classes, message ) {
			var results = check( element, classes );

			message = message || "Element must have classes";

			this.push( !results.missing.length, results.found.join( " " ), classes, message );
		},
		lacksClasses: function( element, classes, message ) {
			var results = check( element, classes );

			message = message || "Element must not have classes";

			this.push( !results.found.length, results.found.join( " " ), classes, message );
		},
		hasClassesStrict: function( element, classes, message ) {
			var result, results = check( element, classes );

			message = message || "Element must only have classes";

			result =  !results.missing.length && results.element.getAttribute( "class" ) &&
				( results.element.getAttribute( "class" ).match( /\S+/g ) || [] ).length ===
				results.found.length;

			this.push( result, results.found.join( " " ), classes, message );
		},
		hasClassRegex: function( element, regex, message ) {
			var results = check( element, regex );

			message = message || "Element must have class matching " + regex;

			this.push( !!results.found.length, results.found.join( " " ), regex, message );
		},
		lacksClassRegex: function( element, regex, message ) {
			var results = check( element, regex );

			message = message || "Element must not have class matching " + regex;

			this.push( results.missing.length, results.missing.join( " " ), regex, message );
		},
		hasClassStart: function( element, partialClass, message ) {
			var results = check( element, new RegExp( "^" + partialClass ) );

			message = message || "Element must have class starting with " + partialClass;

			this.push( results.found.length, results.found.join( " " ), partialClass, message );
		},
		lacksClassStart: function( element, partialClass, message ) {
			var results = check( element, new RegExp( "^" + partialClass ) );

			message = message || "Element must not have class starting with " + partialClass;

			this.push( results.missing.length, results.missing.join( " " ), partialClass, message );
		},
		hasClassPartial: function( element, partialClass, message ) {
			var results = check( element, new RegExp( partialClass ) );

			message = message || "Element must have class containing '" + partialClass + "'";

			this.push( results.found.length, results.found.join( " " ), partialClass, message );
		},
		lacksClassPartial: function( element, partialClass, message ) {
			var results = check( element, new RegExp( partialClass ) );

			message = message || "Element must not have class containing '" + partialClass + "'";

			this.push( results.missing.length, results.missing.join( " " ), partialClass, message );
		}
	});
})( QUnit );
