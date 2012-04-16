(function() {
	// Insert a script tag pointing at the desired version of jQuery

	// Get the version from the url
	var jqueryRE = /[\\?&]jquery=([^&#]*)/,
		results = jqueryRE.exec( location.search ),
		version = "",
		jq,
		myScriptTag = document.getElementsByTagName( "script" )[document.getElementsByTagName( "script" ).length - 1],
		baseUrl = myScriptTag.src.replace( /(.*)\/.*$/, "$1/" ),
		url = baseUrl + "jquery-1.7.1.js";

	if( results ) {
		version = decodeURIComponent(results[results.length - 1].replace(/\+/g, " "));
	}

	switch( version ) {
		case "1.6.4":
			url = baseUrl + "jquery-1.6.4.js";
			break;
		case "git":
			url = "http://code.jquery.com/jquery-git.js";
			break;
	}

	document.write( "<script src='" + url + "'></script>" );

	if ( parseInt( version.replace( /\./g, "" ), 10 ) < 170 && window.define && window.define.amd ) {
		document.write( '<script>define( "jquery", [], function () { return jQuery; } );</script>' );
	}
}());