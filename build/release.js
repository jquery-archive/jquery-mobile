var scp = require( "scp" ),
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
		},

		_complete: function( done ) {
			Release._walk([
				Release._uploadZipToWebsite,
				Release._uploadDemosToWebsite
			], done );
		},

		complete: function( done ) {
			Release._complete(function() {
				console.log( "Release of " + Release.project + " version " + Release.newVersion + " complete." );
				done();
			});
		}
	});
};
