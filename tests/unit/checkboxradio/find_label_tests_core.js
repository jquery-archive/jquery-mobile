$.mobile.ns = "nstest-";

var pairs = [
		{
			label: "#separate-label-outside-form-label",
			input: "#separate-label-outside-form",
			isParent: false
		},
		{
			label: "#separate-label-in-form-label",
			input: "#separate-label-in-form",
			isParent: false
		},
		{
			label: "#nested-input-inside-form-label",
			input: "#nested-input-inside-form",
			isParent: true
		},
		{
			label: "#separate-label-input-outside-form-label",
			input: "#separate-label-input-outside-form",
			isParent: false
		},
		{
			label: "#nested-input-outside-form-label",
			input: "#nested-input-outside-form",
			isParent: true
		}
	];

test( "_findLabel() works correctly", function() {
	var index, pair, result,
		findLabel = $.mobile.checkboxradio.prototype._findLabel;

	for ( index in pairs ) {
		pair = $.extend( {}, pairs[ index ] );
		pair.label = $( pair.label );
		pair.input = $( pair.input );

		result = findLabel.call({
			element: pair.input,
			document: $( document )
		});

		deepEqual( result.element.length > 0, true,
			pair.input.attr( "id" ) + ": a label was found" );
		deepEqual( result.element[ 0 ], pair.label[ 0 ],
			pair.input.attr( "id" ) + ": the right label was found" );
		deepEqual( result.isParent, pair.isParent,
			pair.input.attr( "id" ) +
				": the label was correctly identified as (not?) the parent" );
	}
});

test( "label on pre-rendered checkbox is found", function() {
	var actualLabel = $( "#pre-rendered-label-test" )
			.checkboxradio()
			.data( "mobile-checkboxradio" ).label,
		expectedLabel = $( "#pre-rendered-label-test" ).prev();

	deepEqual( actualLabel.length, 1, "One label was found" );
	deepEqual( actualLabel[ 0 ], expectedLabel[ 0 ], "The right label was found" );
});
