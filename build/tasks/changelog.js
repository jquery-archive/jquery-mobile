#!/usr/bin/env node
module.exports = function( grunt ) {
	"use strict";

	var prevVersion, major, minor, patch, baseVersion, parts, repo, baseDir, repoDir, linkNextPage, changelog, changelogPath, done,
		issues = [],
		firstRun = true,
		pkg = { version: "1.4.0pre" },
		rnewline = /\r?\n/,
		fs = require( "fs" ),
		$ = require( "jquery" );

	grunt.registerTask( "changelog:create", function() {
		done = this.async();
		walk([
			bootstrap,
			getVersions,
			generateChangelog
		]);

	});

	function setup( fn ){
		console.log( "Determining directories..." );
		baseDir = process.cwd() + "/";
		repoDir = baseDir + "/repo";
		console.log( "Installing dependencies..." );
		require( "child_process" ).exec( "npm install shelljs colors", function( error ) {
			if ( error ) {
				return process.exit( 1 );
			}

			require( "shelljs/global" );
			require( "colors" );
			fn();
		});
	}

	function parseHttpHeaders(jqXHR) {

	    // Parse the HTTP headers
	    // -------------------------------------------

	    var linksArray, linksJSON,
				// Split headers at newline into array
			headersArray = jqXHR.getAllResponseHeaders().split("\r\n"),

			// Crate JSON object to populate
			headersJSON = {};

	    // Iterate over HTTP headers
	    $.each( headersArray, function(index, value){

	        // Extract key and value for JSON object
	        var delIdx = value.indexOf(":"),
			key    = value.substr(0, delIdx);
			value  = value.substr(delIdx+1, value.length);

	        // Update JSON object
	        headersJSON[key.trim()] = value.trim();
	    } );


	    // Parse the HTTP Link header
	    linksArray = headersJSON.link != null ? headersJSON.link.split( "," ) : [];

		// Create JSON object
		linksJSON = {};
	    $.each( linksArray, function(index, value){
	        var keyValue = value.split( ";" );
	        linksJSON[keyValue[1].trim()] = keyValue[0].trim().substr(1, keyValue[0].trim().length-2 );
	    });

	    linkNextPage = linksJSON[ "rel='next'" ];
		console.log( "parseHttpHeaders: metadata of response: " + linksJSON[ "rel='next'" ] );
	 }


	function getIssues(repo_url) {

	    console.log( "listRepoIssues: Starting getting issues for jquery-mobile ..." );

	    var request = $.ajax({

	        url: repo_url,
	        type: "GET",

	        success: function(data, textStatus, jqXHR){
	            console.log( "listRepoIssues: Yeah, it worked..." + textStatus + " - " );

	            $.each( data, function(index, value) {
					issues.push( "* " + ( ( value.labels[0] !== undefined && /:/.test( value.title ) ) ? value.labels[0].name + ": " : "" ) + value.title + " [# " + value.number + "](" + value.html_url + ")" );
	            });

	            parseHttpHeaders(jqXHR);

	        },

	        error: function(data){
	            abort('listRepoIssues: Shit hit the fan...' + JSON.stringify(data));
	        }

	    });

	    return request;
	}

	function recurse() {
	    if(linkNextPage != null) {
	        $.when( getIssues(linkNextPage) )
	            .then( function() { recurse(); } )
	            .fail( function() { abort('Failed getting next page...'); } )
	    } else {
	    	issuesComplete();
	    }
	}

	function generateChangelog() {

		var commits,
			fullFormat = "* %s (TICKETREF, [%h](http://github.com/jquery/jquery-mobile/commit/%H))";

		changelogPath = baseDir + "dist/changelog.md"
		changelog = cat( "build/tasks/changelog-shell" ) + "\n",
		changelog = changelog.replace( "{title}", "jQuery Mobile " + baseVersion + " Changelog" );

		echo ( "Adding commits..." );
		commits = gitLog( fullFormat );

		echo( "Adding links to tickets..." );
		changelog += commits
		// Add ticket references
		.map(function( commit ) {
			var tickets = [];
			commit.replace( /Fixe[sd] #(\d+)/g, function( match, ticket ) {
				tickets.push( ticket );
			});

			return tickets.length ?
				commit.replace( "TICKETREF", tickets.map(function( ticket ) {
					return "[#" + ticket + "](http://github.com/jquery/jquery-mobile/issues/" + ticket + ")";
				}).join( ", " ) ) :
				// Leave TICKETREF token in place so it's easy to find commits without tickets
				commit;
		}).sort()
		.join( "\n" ) + "\n";
		// Sort commits so that they're grouped by component

		linkNextPage = "https://api.github.com/repos/jquery/jquery-mobile/issues?state=closed&per_page=100&milestone=" + 20;
		changelog += "\n###Closed Issues\n";
		//recurse();
		linkNextPage = "https://api.github.com/repos/jquery/jquery-mobile/issues?state=closed&per_page=100&since=2013-02-20T00:00:01Z&milestone=none";
		//recurse();

	}

	function issuesComplete(){
		if( !firstRun ){
			changelog += issues.sort().join( "\n" ) + "\n";
			fs.writeFileSync( changelogPath, changelog );
			echo( "Stored changelog in " + changelogPath.cyan + "." );
			done();
		}

		firstRun = false;
	}

	function getVersions(){

		baseVersion = pkg.version.replace( "pre", "" );
		parts = baseVersion.split( "." );
		major = parseInt( parts[ 0 ], 10 );
		minor = parseInt( parts[ 1 ], 10 );
		patch = parseInt( parts[ 2 ], 10 );
		baseVersion = baseVersion + "-alpha.2";

		if ( minor === 0 && patch === 0 ) {
			abort( "This script is not smart enough to handle major release (eg. 2.0.0)." );
		} else if( parts[ 2 ] === "0" ){
			prevVersion = git( "for-each-ref --count=1 --sort=-authordate --format='%(refname:short)' refs/tags/" + [ major, minor - 1 ].join( "." ) + "*" ).trim();
		} else {
			prevVersion = [ major, minor, patch - 1 ].join( "." );
		}
	}

	function git( command, errorMessage ) {
		var result = exec( "git " + command );
		if ( result.code !== 0 ) {
			abort( errorMessage );
		}

		return result.output;
	}

	function gitLog( format ) {
		var result = exec( "git log " + prevVersion + ".." + baseVersion + " " +
			"--format='" + format + "'",
			{ silent: true });
		console.log("git log " + prevVersion + ".." + baseVersion + " " +
			"--format='" + format + "'");
		if ( result.code !== 0 ) {
			abort( "Error getting git log." );
		}

		result = result.output.split( rnewline );
		if ( result[ result.length - 1 ] === "" ) {
			result.pop();
		}

		return result;
	}

	function abort( msg ) {
		echo( msg.red );
		echo( "Aborting.".red );
		exit( 1 );
	}

	function walk( methods ) {
		var method = methods.shift();

		function next() {
			if ( methods.length ) {
				walk( methods );
			}
		}

		if ( !method.length ) {
			method();
			next();
		} else {
			method( next );
		}
	}

	function bootstrap( fn ) {
		getRemote(function( remote ) {
			if ( (/:/).test( remote ) || fs.existsSync( remote ) ) {
				repo = remote;
			} else {
				repo = "git@github.com:" + remote + ".git";
			}
			setup( fn );
		});
	}

	function prompt( fn ) {
		process.stdin.once( "data", function( chunk ) {
			process.stdin.pause();
			fn( chunk.toString().trim() );
		});
		process.stdin.resume();
	}

	function getRemote( fn ) {
		var matches, remote;

		console.log( "Determining remote repo..." );
		process.argv.forEach(function( arg ) {
			matches = /--remote=(.+)/.exec( arg );
			if ( matches ) {
				remote = matches[ 1 ];
			}
		});

		if ( remote ) {
			fn( remote );
			return;
		}

		console.log();
		console.log( "     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
		console.log( "     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
		console.log( "     !!                            !!" );
		console.log( "     !! Using jquery/jquery-mobile !!" );
		console.log( "     !!                            !!" );
		console.log( "     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
		console.log( "     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
		console.log();
		console.log( "Press enter to continue, or ctrl+c to cancel." );
		prompt(function() {
			fn( "jquery/jquery-ui" );
		});
	}
};
