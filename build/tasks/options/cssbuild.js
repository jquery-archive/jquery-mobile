module.exports = function( grunt ) {
var files = require( "../../files.js" )( grunt );

return {
	options: {
		banner: "<%= banner %>",

		//Allow CSS optimizations. Allowed values:
		//- "standard": @import inlining, comment removal and line returns.
		//Removing line returns may have problems in IE, depending on the type
		//of CSS.
		//- "standard.keepLines": like "standard" but keeps line returns.
		//- "none": skip CSS optimizations.
		//- "standard.keepComments": keeps the file comments, but removes line
		//returns.  (r.js 1.0.8+)
		//- "standard.keepComments.keepLines": keeps the file comments and line
		//returns. (r.js 1.0.8+)
		optimizeCss: "standard.keepComments.keepLines",

		//If optimizeCss is in use, a list of of files to ignore for the @import
		//inlining. The value of this option should be a string of comma separated
		//CSS file names to ignore (like 'a.css,b.css'. The file names should match
		//whatever strings are used in the @import calls.
		cssImportIgnore: null
	},
	all: {
		files: files.getCSSFiles( "<%= dist %>" )
	}
};
};
