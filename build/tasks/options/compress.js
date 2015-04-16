module.exports = function( grunt ) {
var files = require( "../../files.js" )( grunt );

return {
	dist: {
		options: {
			archive: files.distZipOut
		},
		files: [
			{
				expand: true,
				cwd: "<%= dist %>",
				src: files.distZipContent
			}
		]
	},
	images: {
		options: {
			archive: files.imagesZipOut
		},
		files: [
			{
				expand: true,
				cwd: "<%= dist %>",
				src: [ "images/**" ]
			}
		]
	},
	"googleCDN": {
		options: {
			archive: files.googleCDNZipOut
		},
		files: [
			{
				expand: true,
				cwd: "<%= dirs.tmp %>",
				src: [ "**/*" ]
			}
		]
	}
};
};
