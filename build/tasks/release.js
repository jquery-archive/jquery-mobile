module.exports = function( grunt ) {
	"use strict";

	var releaseBranch,
		releaseVersion,
		isDryRun = !!grunt.option( "no-write" ),
		major, minor, patch, xbeta, isBeta,
		version,
		nextVersion;

	grunt.registerTask( "release:init", function() {
		releaseBranch = grunt.option( "releaseBranch" ) || "master";
		releaseVersion = grunt.option( "releaseVersion" ) || grunt.config.get( "version" );

		grunt.log.debug( "dry run: " + isDryRun );
		grunt.log.debug( "releaseBranch: " + releaseBranch );
		grunt.log.debug( "releaseVersion: " + releaseVersion );

		// First arg should be the version number being released
		var _ = grunt.util._,
			newver, oldver,
			options = grunt.config.get( "release.options", {
				versionRegExp: /^(\d)\.(\d+)\.(\d)(-(?:a|b|rc)\.\d|pre)$/
			}),
			rversion = options.versionRegExp,
			version = ( releaseVersion || "" ).toLowerCase().match( rversion ) || {};

		major = version[1],
		minor = version[2],
		patch = version[3],
		xbeta = version[4],
		isBeta = !!xbeta;

		grunt.log.debug( "options: " + JSON.stringify( options ) );

		grunt.log.debug( "major: " + major );
		grunt.log.debug( "minor: " + minor );
		grunt.log.debug( "patch: " + patch );

		if ( !releaseBranch || !major || !minor || !patch ) {
			grunt.fatal( "Usage: --releaseBranch=releaseBranch --releaseVersion=releaseVersion" );
		}

		grunt.config.set( "version", releaseVersion );
		grunt.config.set( "versionSuffix", "-" + releaseVersion );
	});

	grunt.registerTask( "release:fail-if-pre", function() {
		if ( xbeta === "pre" ) {
			grunt.fatal( "Cannot release/deploy a '"+xbeta+"' version!" );
		}
	});

	grunt.registerTask( "release:set-version", function( newVersion ) {
		var done = this.async(),
			pkg = grunt.file.readJSON( "package.json" ),
			newVersion = newVersion || releaseVersion,
			gitArgs = [ "commit", "-m", "'Changed version to: "+ newVersion+"'", "package.json" ],
			child;

		console.log( "Setting version to: " + newVersion );

		pkg.version = newVersion;

		grunt.file.write( "package.json", JSON.stringify( pkg, null, "\t" ) );

		grunt.log.writeln( "`git " + gitArgs.join( " " ) + "`" );

		if ( !isDryRun ) {
			// No point even running git in dry-run because there is nothing to commit
			child = grunt.util.spawn(
				{
					cmd: "git",
					args: gitArgs
				},
				function ( err, result ) {
					if ( err ) {
						grunt.log.error( result.stderr );
						return done( false );
					}

					grunt.log.ok( "Version bumped to " + newVersion );
					done();
				}
			);

			child.stdout.setEncoding( "utf8" );
			child.stdout.on( "data", function( data ) {
				grunt.log.write( data );
			});
		}
	});

	grunt.registerTask( "release:set-next-version", function() {
		var pkg = grunt.config.get( "pkg" );

		console.log( "Current version is " + pkg.version );
		nextVersion = major + "." + minor + "." + ( isBeta ? patch : +patch + 1 ) + "pre";
		console.log( "Next version is " + nextVersion );

		grunt.task.run( "release:set-version:" + nextVersion );
	});

	grunt.registerTask( 'release:check-git-status', 'Retrieve git status and ensures the workspace is clean', function() {
		var done = this.async();

		grunt.util.spawn(
			{
				cmd: "git",
				args: [ "status" ]
			},
			function ( err, result ) {
				if ( err ) {
					grunt.log.error( err );
					return done( false );
				}

				var stdout = result.stdout,
					onBranch = ((stdout || "").match( /On branch (\S+)/ ) || [])[1];

				if ( onBranch !== releaseBranch ) {
					grunt.fatal( "Branches don't match: Wanted " + releaseBranch + ", got " + onBranch );
				}
				if ( /Changes to be committed/i.test( stdout ) ) {
					grunt.warn( "Please commit changed files before attemping to push a release." );
				}
				if ( /Changes not staged for commit/i.test( stdout ) ) {
					grunt.warn( "Please stash files before attempting to push a release." );
				}
				done();
			}
		);
	});

	grunt.registerTask( 'release:tag', 'Tag the repo with the current release', function() {
		var done = this.async(),
			gitArgs = [ "tag", releaseVersion ],
			child;

		grunt.log.writeln( "`git " + gitArgs.join( " " ) + "`" );

		if ( !isDryRun ) {
			child = grunt.util.spawn(
				{
					cmd: "git",
					args: gitArgs
				},
				function ( err, result ) {
					if ( err ) {
						grunt.log.error( result.stderr );
						return done( false );
					}

					grunt.log.ok( "Created tag: " + releaseVersion );
					done();
				}
			);

			child.stdout.setEncoding( "utf8" );
			child.stdout.on( "data", function( data ) {
				grunt.log.write( data );
			});
		}
	})
};