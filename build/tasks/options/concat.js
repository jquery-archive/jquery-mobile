var path = require( "path" );

module.exports = {
	js: {
		options: {
			banner: "<%= banner %>"
		},

		src: [ path.join( "<%= dist %>", "<%= name %>" ) + "<%= versionSuffix %>.js" ],
		dest: path.join( "<%= dist %>", "<%= name %>" ) + "<%= versionSuffix %>.js"
	},
	demos: {
		src: [ "demos/_assets/js/*.js" ],
		dest: path.join( "<%= dist %>", "demos/_assets/js/index.js" )
	}
};
