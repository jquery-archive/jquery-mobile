module.exports = function( grunt ) {
	var files = require( "../../files.js" )( grunt );

	return {
		options: {
			map: false,
			processors: [
				require( "autoprefixer" )
			]
		},
		all: {
			src: "<%= dist %>" + files.css.structure.unminified
		}
	};
};
