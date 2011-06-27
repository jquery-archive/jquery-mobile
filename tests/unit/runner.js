(function(){
  var test = function(data){
		var $frameElem = $("#testFrame"),
		    template = $frameElem.attr("data-src"),
		    updateFrame = function(dir){
			    return $frameElem.attr("src", template.replace("{{testdir}}", dir));
		    };

		$.each(data.directories, function(i, dir){
			asyncTest( dir, function(){
				var nextCheck = null;

				// establish a timeout for a given suite in case of async tests hanging
				var testTimeout = setTimeout( function(){
					// prevent any schedule checks for completion
					clearTimeout(nextCheck);
					start();
				}, 2 * 60 * 1000 ),

				// setup the next state check and record the timer id for removal
				scheduleCheck = function(){
					nextCheck = setTimeout( check, 2000 );
				},

				// check the iframe for success or failure and respond accordingly
				check = function(){

					// check for the frames jquery object each time
					var framejQuery = window.frames["testFrame"].jQuery;

					// if the iframe hasn't loaded (ie loaded jQuery) check back again shortly
					if( !framejQuery ){
						scheduleCheck();
						return;
					}

					// grab the result of the iframe test suite
					var result = framejQuery("#qunit-banner").attr('class');

					// if we have a result check it, otherwise check back shortly
					if( result ){
						ok( result == "qunit-pass" );
						clearTimeout(testTimeout);
						start();
					} else {
						scheduleCheck();
					}
				};

				expect( 1 );
				updateFrame( dir );
				scheduleCheck();
			});
		});
	};

	// get the test directories
	$.ajax({
		url: "ls.php",
		success: test
	});
})();
