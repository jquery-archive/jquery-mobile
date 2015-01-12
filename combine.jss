<?
// Get the filetype and array of files
if ( !type || !files ) {
	write( "type and files vars must be defined!" );
	return;
}

var contents = '',
	fs = require( "fs" );
// Loop through the files adding them to a string
if ( process.comment ) {
	contents = contents + process.comment;
}
files.forEach(function( value ){
	contents = contents +  fs.readFileSync( mapPath( value ) ) + "\n\n";
});

// Set the content type, filesize and an expiration so its not cached
response.headers[ "Content-Type" ] = type;
response.headers[ "Content-Length" ] = contents.length;
response.headers[ "Expires" ] = "Fri, 01 Jan 2010 05:00:00 GMT";

// Deliver the file
write( contents );
?>