//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Behavior mixin to mark first and last visible item with special classes.
//>>label: First & Last Classes
//>>group: Widgets

define( [ "jquery", "../helpers" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
$.mobile.behaviors._optionsToClasses = {

	// BEGIN DEPRECATED CODE - TO BE REMOVED IN 1.6.0

	// During _create(), the initial value of the classes option reflects the initial values of the
	// various style options. However, if the user modifies the style options via data-* attributes
	// or by instantiating the widget with options, then, before using the classes option to add
	// classes to the various widget elements, we must update the contents of the classes option to
	// reflect the non-default style options values the user has chosen for this widget.
	//
	// Thus, for your widget implementation, you should maintain a hash with the default values of
	// the various style options, and you should pass that hash as the first parameter to this
	// function. The second parameter is this.options, because that hash contains the user's
	// potentially non-default style option values. Call this function as early as possible in your
	// widget's _create(), before ever using this._classes() to add classes to an element.
	_updateClassesOption: function( defaultStyleOptions, currentOptions ) {
		var optionName,
			modifiedOptions = {};

		// Check against the default style option values to see if any of them have changed for
		// this instance of the widget
		for ( optionName in defaultStyleOptions ) {
			if ( defaultStyleOptions[ optionName ] !== currentOptions[ optionName ] ) {
				modifiedOptions[ optionName ] = currentOptions[ optionName ];
			}
		}

		// Update classes option to reflect the non-default style option values to be used for
		// this instance of the widget
		this._optionsToClasses( defaultStyleOptions, modifiedOptions );
	},

	// This function simply converts a space-separated list of classes to a hash where the key is
	// the class name and the value is true. This allows constant-time lookup. It is used for
	// updating the value of one of the classes option keys in response to changes of the
	// wrapperClass option.
	_convertClassesToHash: function( classValue ) {
		var index,
			returnValue = {};

		classValue = classValue ? classValue.split( " " ) : [];
		for ( index in classValue ) {
			returnValue[ classValue[ index ] ] = true;
		}

		return returnValue;
	},

	// This code is used very often in the _optionsToClasses() extension point which contains
	// the widget-specific portions of the code. Basically, based on the value of option, you
	// decide whether the corresponding class (like ui-corner-all or ui-shadow ui-listview-inset)
	// is to be added to the hash of classes that need to be removed from the class string
	// (oldClasses) or whether it is to be added to the hash of classes that need to be added to
	// the class string (newClasses). These hashes are then used in the function
	// _calculateClassKeyValue() below to update the value of a single key under the classes
	// option.
	//
	// The return value of the function serves to indicate whether the option is present at all.
	// Giving this information in the return value allows you to place a call for each option in
	// and if-statement, and if any option has changed, you can then, in the body of the
	// if-statement, update the corresponding classes key.
	_booleanOptionToClass: function( option, className, oldClasses, newClasses, condition ) {

		// If the option is not defined, the corresponding classes option key does not need to be
		// updated, so we forget the whole thing and return false.
		if ( option !== undefined ) {

			// If we have been passed the boolean result of a custom condition, we decide based on
			// that whether the className is to be added to the hash of oldClasses vs. the hash of
			// newClasses. Otherwise, we assume that the option is boolean and decide on the right
			// hash based on its value.
			( ( condition === undefined ? option : condition ) ?
				newClasses : oldClasses )[ className ] = true;
			return true;
		}

		return false;
	},

	// This is the function that saves you from having to do regex replacement on the value of one
	// of the classes keys. Instead of regex, it splits the value of the classes key into an array,
	// and prunes it of the entries corresponding to keys in the hash classesToRemove, and adds
	// those keys of the hash classesToAdd which are not already in the array.
	_calculateClassKeyValue: function( currentValue, classesToRemove, classesToAdd ) {
		var currentValueIndex, oneClass,
			newValue = [];

		// Convert the space-separated class list to an array
		currentValue = currentValue ? currentValue.split( " " ) : [];

		// Copy the classes from the current value to the new value, while examining each as to
		// whether it should be present in the new value
		for ( currentValueIndex in currentValue ) {
			oneClass = currentValue[ currentValueIndex ];

			// If this class was supposed to be added but is already present in the array, well,
			// then it's already added, so no need to add it again. Therefore remove it from the
			// hash of classes to add.
			if ( oneClass in classesToAdd ) {
				delete classesToAdd[ currentValue[ currentValueIndex ] ];
			}

			// If we're supposed to remove this class, don't add it to the result
			if ( oneClass in classesToRemove ) {
				continue;
			}

			// Finally, add the class to the list of classes that will be space-joined to become
			// the new value of the classes option key
			newValue.push( oneClass );
		}

		// Add the classes which needed to be added and which were not already present in the
		// current value
		for ( oneClass in classesToAdd ) {
			newValue.push( oneClass );
		}

		// Construct the new value of the classes option key by space-joining the array we've
		// constructed.
		return newValue.join( " " );
	}
};

	// END DEPRECATED CODE
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
