(function(){
	var $frameElem = $("#testFrame"),
			template = $frameElem.attr("data-src"),
			updateFrame = function(dir){
				return $frameElem.attr("src", template.replace("{{testdir}}", dir));
			};

	$.each(testDirectories, function(i, dir){
		asyncTest( dir, function(){
			// give each test a maximum of two minutes to finish
			var testTimeout = setTimeout( function(){
				start();
			}, 2 * 60 * 1000 );

			expect( 1 );
			updateFrame( dir );

			function check(){
				// check for the frames jquery object each time
				var framejQuery = window.frames["testFrame"].jQuery;

				// if the iframe hasn't loaded (ie loaded jQuery) check back again shortly
				if( !framejQuery ){
					return;
					setTimeout( arguments.callee, 2000 );
				}

				// grab the result of the iframe test suite
				var result = framejQuery("#qunit-banner").attr('class');

				// if we have a result check it, otherwise check back shortly
				if( result ){
					ok( result == "qunit-pass" );
					clearTimeout(testTimeout);
					start();
				} else {
					setTimeout( arguments.callee, 2000 );
				}
			}

			setTimeout( check, 2000 );
		});
	});
})();
