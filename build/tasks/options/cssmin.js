module.exports = function( grunt ) {
var files = require( "../../files.js" )( grunt );

return {
	options: {
		banner: "<%= bannerMin =>",
		keepSpecialComments: 0
	},
	minify: {
		files: files.getMinifiedCSSFiles( "<%= dist %>" )
	}
};
};
