(function(){
	var test = function(data){
		var $frameElem = $("#testFrame"),
				template = $frameElem.attr("data-src"),
				updateFrame = function(dir){
					return $frameElem.attr("src", template.replace("{{testdir}}", dir));
				};

		$.each(data.directories, function(i, dir){
			asyncTest( dir, function(){
				var testTimeout = 3 * 60 * 1000, checkInterval = 2000;

				// establish a timeout for a given suite in case of async tests hanging
				var testTimer = setTimeout( function(){
					// prevent any schedule checks for completion
					clearTimeouts();
					start();
				}, testTimeout ),

				checkTimer = setInterval( check, checkInterval ),

				clearTimeouts = function(){
					// prevent the next interval of the check function and the test timeout
					clearTimeout( checkTimer );
					clearTimeout( testTimer );
				};

				// check the iframe for success or failure and respond accordingly
				function check(){
					// check for the frames jquery object each time
					var framejQuery = window.frames["testFrame"].jQuery;

					// if the iframe hasn't loaded (ie loaded jQuery) check back again shortly
					if( !framejQuery ) return;

					// grab the result of the iframe test suite
					// TODO strip extra white space
					var result = framejQuery( "#qunit-banner" ).attr( "class" );

					// if we have a result check it, otherwise check back shortly
					if( result ){
						ok( result === "qunit-pass" );
						clearTimeouts();
						start();
					}
				};

				expect( 1 );

				// set the test suite page on the iframe
				updateFrame( dir );
			});
		});
	};

	// get the test directories
	$.get("ls.php", test);
})();
