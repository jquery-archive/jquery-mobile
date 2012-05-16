(function() {
	// Insert a script tag pointing at the desired version of jQuery

	// Get the version from the url
	var jqueryRE = /[\\?&]jquery=([^&#]*)/,
		results = jqueryRE.exec( location.search ),
		version = "",
		myScriptTag = document.getElementsByTagName( "script" )[document.getElementsByTagName( "script" ).length - 1],
		baseUrl = myScriptTag.src.replace( /(.*)\/.*$/, "$1/" ),
		url = baseUrl + "jquery.js";

	if( results ) {
		version = decodeURIComponent(results[results.length - 1].replace(/\+/g, " "));

		switch( version ) {
			// Local versions
			case "1.6.4":
			case "1.7.1":
			case "1.7.2":
				url = baseUrl + "jquery-" + version + ".js";
				break;
			// CDN versions
			default:
				url = "http://code.jquery.com/jquery-"+version+".js";
				break;
		}
	} 

	document.write( "<script src='" + url + "'></script>" );

	document.write( 
		'<script>' +
			'console.warn( "jQuery version: " + jQuery.fn.jquery );' +
			'if ( parseInt( jQuery.fn.jquery.replace( /\\./g, "" ), 10 ) < 170 && window.define && window.define.amd ) {' +
			    'console.warn( "Exporting \'jquery\' AMD module" );' +
			    'define( "jquery", [], function () { return jQuery; } );'+
			'}'+
		'</script>' 
	);

}());