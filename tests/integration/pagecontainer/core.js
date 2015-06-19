test( "$.mobile.pagecontainers", function( assert ) {
	var zeroth = $.mobile.pagecontainers[ 0 ],
		first = $.mobile.pagecontainer(),
		second = $.mobile.pagecontainer(),
		third = $.mobile.pagecontainer();

	assert.deepEqual( $.mobile.pagecontainers, [ zeroth, first.element, second.element, third.element ],
		"After creating three pagecontainer widgets, $.mobile.pagecontainers is correct" );

	second.destroy();

	assert.deepEqual( $.mobile.pagecontainers, [ zeroth, first.element, third.element ],
		"After destroying the middle widget, $.mobile.pagecontainers remains correct" );

	first.destroy();

	assert.deepEqual( $.mobile.pagecontainers, [ zeroth, third.element ],
		"After destroying the first widget, $.mobile.pagecontainers remains correct" );
} );
