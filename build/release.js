module.exports = function( Release ) {
var cheerio = require( "cheerio" ),
	fs = require( "fs" ),
	semver = require( "semver" ),
	shell = require( "shelljs" ),
	clonedRepos = {};

Release.define( {
	issueTracker: "github",
	changelogShell: function() {
		return "# Changelog for jQuery Mobile v" + Release.newVersion + "\n";
	},

	generateArtifacts: function( done ) {
		Release.exec( "grunt build:release" );
		done( [] );
	},

	_cloneDemosRepo: function() {
		var local = Release.dir.base + "/demos.jquerymobile.com",
			remote = "git@github.com:jquery/demos.jquerymobile.com";

		if ( !clonedRepos[ remote ] ) {
			console.log( "Cloning " + remote.cyan + "..." );
			Release.exec( "git clone " + remote + " " + local, "Error cloning Demos repo." );
			console.log();

			clonedRepos[ remote ] = local;
		}

		return clonedRepos[ remote ];
	},

	_publishDemos: function() {
		var index,
			repo = Release._cloneDemosRepo(),
			dest = repo + "/" + Release.newVersion,
			src = Release.dir.repo + "/dist/demos",
			commitMessage = "Added version " + Release.newVersion;

		shell.mkdir( "-p", dest );
		shell.cp( "-r", src + "/*", dest );

		if ( !Release.preRelease ) {
			console.log( "Updating demos index..." );
			fs.writeFileSync( repo + "/index.php",
				"<?php header('Location: " + Release.newVersion + "');" );
		}

		console.log( "Adding files..." );
		process.chdir( repo );
		Release.exec( "git add .", "Error adding files." );
		Release.exec( "git commit -m '" + commitMessage + "'", "Error commiting demos files." );
		Release.exec( "npm version patch" );
		if ( !Release.isTest ) {
			console.log( "Pushing to github..." );
			Release.exec( "git push --tags origin master", "Error pushing demos to github." );
		}
		console.log();
	},

	_cloneWebsiteRepo: function() {
		var local = Release.dir.base + "/jquerymobile.com",
			remote = "git@github.com:jquery/jquerymobile.com";

		if ( !clonedRepos[ remote ] ) {
			console.log( "Cloning " + remote.cyan + "..." );
			Release.exec( "git clone " + remote + " " + local, "Error cloning website repo." );
			console.log();

			clonedRepos[ remote ] = local;
		}

		return clonedRepos[ remote ];
	},

	_updateBuilder: function() {
		var builder, $, option, newOption,
			repo = Release._cloneWebsiteRepo(),
			dest = repo + "/resources/download",
			src = Release.dir.repo + "/dist/jquery.mobile.images-" +
				Release.newVersion + ".zip",
			commitMessage = "Builder: Added version " + Release.newVersion;

		shell.cp( src, dest );

		console.log( "Updating builder page..." );
		$ = cheerio.load( fs.readFileSync( repo + "/pages/download-builder.html", "utf8" ) );

		if ( Release.preRelease ) {

			// If it's a prerelease the option should not be selected
			// and need to be inserted in the unstable optgroup
			newOption = "<option value='" + Release.newVersion + "'>" + Release.newVersion +
				"</option>\n\t\t";
			option = $( "select#branch optgroup[label='Unstable'] option" ).eq( 0 );
		} else {

			// If it's a release the option should be selected and need to be
			// inserted in the stable optgroup
			newOption = "<option value='" + Release.newVersion + "' selected>" +
				Release.newVersion + "</option>\n\t\t";
			option = $( "select#branch optgroup[label='Stable'] option[selected]" );
			if ( semver.gt( Release.newVersion, option.val() ) ) {
				option.removeAttr( "selected" );
			}
		}

		// Figure out where to insert the new option
		while ( option.length && semver.valid( option.val() ) &&
			semver.lt( Release.newVersion, option.val() ) ) {
			option = option.next();
		}

		if ( option.length ) {
			option.before( newOption );
		}

		fs.writeFileSync( repo + "/pages/download-builder.html", $.html() );

		console.log( "Adding files..." );
		process.chdir( repo );
		Release.exec( "git add .", "Error adding files." );
		Release.exec( "git commit -m '" + commitMessage + "'",
			"Error commiting builder files." );
		if ( !Release.isTest ) {
			console.log( "Pushing to github..." );
			Release.exec( "git push", "Error pushing builder update to github." );
		}
		console.log();
	},

	_publishZipsToWebsite: function() {
		var repo = Release._cloneWebsiteRepo(),
			dest = repo + "/resources/download",
			dist = Release.dir.repo + "/dist/jquery.mobile-" + Release.newVersion + ".zip",
			images = Release.dir.repo + "/dist/jquery.mobile.images-" +
				Release.newVersion + ".zip",
			commitMessage = "Release: Added zip for version " + Release.newVersion;

		shell.mkdir( "-p", dest );
		shell.cp( dist, dest );
		shell.cp( images, dest );

		console.log( "Adding files..." );
		process.chdir( repo );
		Release.exec( "git add .", "Error adding zip files." );
		Release.exec( "git commit -m '" + commitMessage + "'", "Error commiting zip files." );
		if ( !Release.isTest ) {
			console.log( "Pushing to github..." );
			Release.exec( "git push", "Error pushing zip files to github." );
		}
		console.log();
	},

	_complete: function( done ) {
		Release.walk( [
			Release._section( "publishing demos" ),
			Release._publishDemos,
			Release._section( "publishing zip files" ),
			Release._publishZipsToWebsite,
			Release._section( "updating builder" ),
			Release._updateBuilder
		], done );
	},

	complete: function() {
		Release._complete( function() {
			console.log( "Release of " + Release.project + " version " +
				Release.newVersion + " complete." );
		} );
	}
} );
};

module.exports.dependencies = [
	"semver@2.2.1",
	"shelljs@0.2.6"
];
