var path = require( "path" );

module.exports = {
	all: {
		options: {
			banner: "<%= bannerMin %>",
			sourceMap: path.join( "<%= dist %>", "<%= name %>" ) + "<%= versionSuffix %>.min.map",
			sourceMappingURL: "<%= name %>" + "<%= versionSuffix %>.min.map",
			beautify: {
				"ascii_only": true
			}
		},
		files: {
			"dist/jquery.mobile<%= versionSuffix %>.min.js":
			path.join( "<%= dist %>", "<%= name %>" ) + "<%= versionSuffix %>.js"
		}
	}
};
