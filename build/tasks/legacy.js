var util = require('util'),
	child_process = require('child_process');

module.exports = function( grunt ) {
	grunt.config.set('legacy_tasks', {
			clean: {},
			css: {
				deps: [ 'init' ]
			},
			deploy: {
				deps: [ 'clean', 'init', 'js', 'css', 'docs', 'zip' ],
				env: 'IS_DEPLOY_TARGET=true'
			},
			docs: {
				deps: [ 'init', 'js', 'css' ]
			},
			init: {},
			js: {
				deps: [ 'init' ]
			},
			zip: {
				deps: [ 'init', 'js', 'css' ]
			}
	});

	grunt.registerMultiTask('legacy_tasks', 'support for old build targets', function() {
		var done = this.async(), name = this.name, self = this;

		child_process.exec( (this.data.env || '') + ' bash build/bin/' + this.target + '.sh', function (error, stdout, stderr) {
			if( error !== null ) {
				grunt.log.error( stderr );
			} else if ( process.env.VERBOSE ) {
				grunt.log.write( stdout );
			}

			done();
		});
	});

	// register the task alias's to enforce task dependencies for the custom task
	// TODO this appears to prevent using args eg `grunt legacy:css:verbose` but
	//      more futzing is required
	var deps, tasks = grunt.config.get( 'legacy_tasks' );
	for( task in tasks ) {
		deps = [];

		( tasks[task].deps || [] ).forEach(function( dep ) {
			deps.push('legacy_tasks:' + dep);
		});

		deps.push( 'legacy_tasks:' + task );

		grunt.registerTask( 'legacy:' + task, deps.join(' ') );
	}
};