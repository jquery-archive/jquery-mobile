// option list widget
//
// Given a widget created using the widget factory, this widget will display a list of form elements that can be used to
// set the widget's options at runtime
//
// options:
//
// widget: a widget instance

( function( $, undefined ) {
	$.widget( "todons.optionlist", $.mobile.widget, {
		options: {
			widget: null
		},

		_setOption: function( key, value ) {
			switch ( key ) {
				case "widget":
					return this._setWidget( value );
				default:
					return $.Widget.prototype._setOption.call( this, key, value );
			}
		},

		_setWidget: function( value ) {
			if ( value !== null ) {
				var self = this;

				this.options.widget = value;
				this.element.append( $( "<h2>" + value.namespace + "." + value.widgetName + "</h2>" ) );
				$.each ( $[ value.namespace ][ value.widgetName ].prototype.options, function( key ) {
					self._createOption( value.namespace, value.widgetName, value.element, key );
				});
				this.element.trigger( "create" );
			}
		},

		destroy: function() {
			this.element.empty();
			$.Widget.prototype.destroy.call( this );
		},

		_createOption: function( ns, widgetType, theWidget, key ) {
			var optionsList = this.element, entry,
				self = this,
				id = "todons-optionlist-option-" + ( $.todons.optionlist.optionId++ ) + "-" + key;

			function makeSetter() {
				switch( typeof $[ ns ][ widgetType ].prototype.options[ key ] ) {
					case "boolean":
						return {
							html: $( "<input/>", {
								type: "checkbox",
								checked: theWidget[ widgetType ]( "option", key ),
								id: id
							}),
							getValue: function( elem ) { return elem.is( ":checked" ); }
						};

					case "integer":
						return {
							html: $( "<input/>", {
								type: "number", 
								value: theWidget[ widgetType ]( "option", key ),
								id: id
							}),
							getValue: function( elem ) { return elem.val(); }
						};

					default:
						return {
							html: $( "<input/>", {
								type: "text", 
								value: theWidget[ widgetType ]( "option", key ),
								id: id
							}),
							getValue: function( elem ) { return elem.val(); }
						};
				}
			}

			entry = makeSetter();
			$( "<div/>" )
				.append( $( "<label/>", { "for": id } ).text( key ) )
				.append( entry.html )
				.appendTo( optionsList )
				.fieldcontain();

			entry.html.bind( "change", function( e ) {
				theWidget[ widgetType ]( "option", key, entry.getValue( entry.html ) );
				self.element.triggerHandler( "optionChanged" );
			});
		}

	});

	// "duck typing" a widget - thanks, gnarf! :)
	// Basically, check if an element has any object data-items which contain a function under the key "widget"
	// and a string under the key "widgetName"
	//
	// Returns either false or the list of widgets associated with the element
	$.todons.optionlist.widgetsFromElement = function( elem ) {
		var ret = [];

		// for each data item ... 
		$.each( $.data( elem ), function( key, value ) {
			// ... if it's an object
			if ( value && typeof value === "object" ) {
				var hasWidgetFunction = false, hasWidgetName = false, candidate = null;

				// Check all its properties for the magic ones
				$.each( value, function( innerKey, innerValue ) {
					if ( innerKey === "widgetName" ) {
						hasWidgetName = true;
					}
					else
					if ( innerKey === "widget" && typeof innerValue === "function" ) {
						hasWidgetFunction = true;
					}

					if ( hasWidgetFunction && hasWidgetName ) {
						candidate = value;
						return false;
					}
				});

				// If this data item is a widget ...
				if ( candidate ) {
					// ... check if we've already collected a widget by the same name and namespace
					$.each( ret, function( idx, value ) {
						if ( value.widgetName === candidate.widgetName && value.namespace === candidate.namespace ) {
							candidate = null;
							return false;
						}
					});
				}

				// If we haven't seen this widget yet, add it to the array
				if ( candidate ) {
					ret.push( candidate );
				}
			}
		});

		return (ret.length === 0 ? false : ret);
	};

	// monotonically increasing counter for option labels
	$.todons.optionlist.optionId = 0;

})( jQuery );
