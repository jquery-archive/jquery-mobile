var fs = require( "fs" ),
	scp = require( "scp" ),
	path = require( "path" ),
	shell = require( "shelljs" );

module.exports = function( Release ) {
	Release.define({
		issueTracker: "github",
		changelogShell: function() {
			return "# Changelog for jQuery Mobile v" + Release.newVersion + "\n";
		},

		generateArtifacts: function( done ) {
			Release.exec(
				"grunt dist:release"
			);
			done([]);
		},

		_uploadZipToWebsite: function( done ) {
			var releaseDist = path.join( Release.dir.repo, "dist" ),
				zipFilename = "jquery.mobile-" + Release.newVersion + ".zip";

			console.log( "Uploading " + zipFilename + " to jquerymobile.com..." );
			scp.send({
				user: "jqadmin",
				host: "jquerymobile.com",
				file: path.join( releaseDist, zipFilename),
				path: "/var/www/jquerymobile.com/htdocs/resources/download/"
			}, function( err ) {
				if ( err ) {
					Release.abort( "Error while uploading " + zipFilename + " to the website: " + err );
				}
				done();
			});
		},

		_uploadDemosToWebsite: function( done ) {
			var releaseDist = path.join( Release.dir.repo, "dist" ),
				zipFilename = "jquery.mobile-" + Release.newVersion + ".zip",
				dest = "/var/www/jquerymobile.com/htdocs/demos/" + Release.newVersion;

			console.log( "Uploading demos to jquerymobile.com..." );

			shell.exec( "ssh jqadmin@jquerymobile.com rm -rf '" + dest + "'" );
			shell.exec( "ssh jqadmin@jquerymobile.com mkdir -p  '" + dest + "'" );
			scp.send({
				user: "jqadmin",
				host: "jquerymobile.com",
				file: path.join( releaseDist, "demos" ) + path.sep + "*",
				path: dest
			}, function( err ) {
				if ( err ) {
					Release.abort( "Error while uploading demos to the website: " + err );
				}
				done();
			});
			console.log();
		},

		_cloneDemosRepo: function() {
			var local = Release.dir.base + "/demos.jquerymobile.com",
				remote = "git@github.com:jquery/demos.jquerymobile.com";

			console.log( "Cloning " + remote.cyan + "..." );
			Release.git( "clone " + remote + " " + local, "Error cloning Demos repo." );
			console.log();

			return local;
		},

		_publishDemos: function() {
			var index,
				repo = Release._cloneDemosRepo(),
				dest = repo + "/" + Release.newVersion,
				src = Release.dir.repo + "/dist/demos",
				commitMessage = "Added version " + Release.newVersion;

			shell.mkdir( "-p", dest );
			shell.cp( "-r", src + "/*", dest );

			if (!Release.preRelease) {
				console.log( "Updating demos index..." );
				fs.writeFileSync( repo + "/index.php", "<?php header('Location: " + Release.newVersion + "');" );
			}

			console.log( "Adding files..." );
			process.chdir( repo );
			Release.git( "add ." , "Error adding files." );
			Release.git( "commit -m '" + commitMessage + "'" , "Error commiting files." );
			console.log( "Pushing to github..." );
			Release.git( "push", "Error pushing demos to github." );
			console.log();
		},

		_complete: function( done ) {
			Release._walk([
				Release._section( "publishing zip file" ),
				Release._uploadZipToWebsite,
				Release._section( "publishing demos" ),
				Release._uploadDemosToWebsite,
				Release._publishDemos
			], done );
		},

		complete: function() {
			Release._complete(function() {
				console.log( "Release of " + Release.project + " version " + Release.newVersion + " complete." );
			});
		}
	});
};
