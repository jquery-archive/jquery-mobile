// Turn off Ajax for local file browsing
if ( location.protocol.substr(0,4)  === "file" ||
     location.protocol.substr(0,11) === "*-extension" ||
     location.protocol.substr(0,6)  === "widget" ) {

	// Start with links with only the trailing slash and that aren't external links
	var fixLinks = function() {
		$( "a[href$='/'], a[href='.'], a[href='..']" ).not( "[rel='external']" ).each( function() {
			if( !$( this ).attr( "href" ).match("http") ){
				this.href = $( this ).attr( "href" ).replace( /\/$/, "" ) + "/index.html";
			}
		});
	};

	// Fix the links for the initial page
	$( fixLinks );

	// Fix the links for subsequent ajax page loads
	$( document ).on( "pagecreate", fixLinks );

	// Check to see if ajax can be used. This does a quick ajax request and blocks the page until its done
	$.ajax({
		url: ".",
		async: false,
		isLocal: true
	}).error(function() {
		// Ajax doesn't work so turn it off
		$( document ).on( "mobileinit", function() {
			$.mobile.ajaxEnabled = false;

			var message = $( "<div>" , {
				"class": "jqm-content",
				style: "border:none; padding: 10px 15px; overflow: auto;",
				"data-ajax-warning": true
			});

			message
			.append( "<h3>Note: Navigation may not work if viewed locally</h3>" )
			.append( "<p>The Ajax-based navigation used throughout the jQuery Mobile docs may need to be viewed on a web server to work in certain browsers. If you see an error message when you click a link, please try a different browser.</p>" );

			$( document ).on( "pagecreate", function( event ) {
				$( event.target ).append( message );
			});
		});
	});
}

$( document ).on( "pagecreate", ".jqm-demos", function( event ) {
	var search,
		page = $( this ),
		searchUrl = ( $( this ).hasClass( "jqm-home" ) ) ? "_search/" : "../_search/",
		searchContents = $( ".jqm-search-panel ul.jqm-search-list" ).find( "li[data-filtertext]" ),
		version = $.mobile.version || "Dev",
		words = version.split( "-" ),
		ver = words[0],
		str = words[1] || "",
		text = ver,
		versionNumbers = ver.split( "." ),
		apiVersion = versionNumbers[ 0 ] + "." + versionNumbers[ 1 ],
		href;

	// Insert jqm version in header
	if ( str.indexOf( "rc" ) === -1 ) {
		str = str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	} else {
		str = str.toUpperCase().replace( ".", "" );
	}

	if ( $.mobile.version && str ) {
		text += " " + str;
	}

	if ( "@VERSION" === $.mobile.version ) {
		text = version = "Dev";
	}

	$( ".jqm-version" ).html( text );

	// Insert version in API documentation links
	if ( version !== "Dev" ) {
		$( ".jqm-api-docs-link" ).each(function() {
			href = $( this ).attr( "href" ).replace( "api.jquerymobile.com/", "api.jquerymobile.com/" + apiVersion + "/" );

			$( this ).attr( "href", href );
		});
	}

	// Global navmenu panel
	$( ".jqm-navmenu-panel ul" ).listview();

	$( ".jqm-navmenu-panel ul" ).accordion({
		"header": "> li > h3",
		"collapsible": true,
		"active": false,
		"heightStyle": "content",
		"icons": {
			"header": "ui-icon-plus",
			"activeHeader": "ui-icon-minus"
		}
	});

	// Collapse nested accordions when their parent is being collapsed.
	$( ".jqm-navmenu-panel > .ui-panel-inner > .ui-accordion" )
	.on( "accordionbeforeactivate", function( event ) {
		var target = $( event.target );

		if ( target.is( ".jqm-navmenu-panel > .ui-panel-inner > .ui-accordion" ) ) {
			target.find( ".ui-accordion" ).accordion( "option", "active", false );
		}
	});

	// Keyboard accessibility of the navmenu.
	$( ".jqm-navmenu-panel .ui-accordion-header, .jqm-navmenu-panel .ui-listview-item-button" ).on( "keydown", function( event ) {
	    if ( event.which === 9 ) {
	        var target = $( event.target ),
				parent = target.parent( "li" );

			parent.next( "li" )
				.add( parent.prev( "li" ) )
				.children( "h3" )
				.attr( "tabIndex", 0 );
	    }
	});

	// On panel demo pages copy the navmenu into the wrapper
	if ( $( this ).is( ".jqm-panel-page" ) ) {
		var wrapper = $( this ).children( ".ui-panel-wrapper" );

		if ( wrapper ) {
			$( ".jqm-navmenu-panel" ).clone( true, true ).appendTo( wrapper );
		}
	}

	$( ".jqm-navmenu-link" ).on( "click", function() {
		page.find( ".jqm-navmenu-panel" ).panel( "open" );
	});

	// Turn off autocomplete / correct for demos search
	$( this ).find( ".jqm-search input" ).attr( "autocomplete", "off" ).attr( "autocorrect", "off" );

	// Global search

	// Initalize search panel
	$( ".jqm-search-panel" ).panel({
		position: "right",
		display: "overlay",
		theme: "a"
	});

	$( ".jqm-search-link" ).on( "click", function() {
		$( "body" ).find( ".jqm-search-panel" ).panel( "open" );
		$( ".ui-page-active" ).addClass( "jqm-demos-search-panel-open" );
	});

	$( document ).on( "panelopen", ".jqm-search-panel", function() {
		$( this ).find( ".jqm-search-input" ).focus();
	});

	// Initalize search panel list and filter
	$( ".jqm-search-panel ul.jqm-search-list" ).html( searchContents ).listview({
		inset: false,
		theme: null,
		dividerTheme: null,
		icon: false,
		autodividers: true,
		autodividersSelector: function () {
			return "";
		},
		arrowKeyNav: true,
		enterToNav: true,
		highlight: true,
		submitTo: searchUrl
	}).filterable();

	// Initalize search page list
	$( this ).find( ".jqm-search-results-wrap ul.jqm-search-list" ).html( searchContents ).listview({
		inset: false,
		theme: null,
		dividerTheme: null,
		icon: false,
		arrowKeyNav: true,
		enterToNav: true,
		highlight: true
	}).filterable();

	// Search results page get search query string and enter it into filter then trigger keyup to filter
	if ( $( event.target ).hasClass( "jqm-demos-search-results" ) ) {
		search = $.mobile.path.parseUrl( window.location.href ).search.split( "=" )[ 1 ];
		setTimeout(function() {
			var e = $.Event( "keyup" );
			e.which = 65;
			$( this ).find( "#jqm-search-results-input" ).val( search ).trigger(e).trigger( "change" );
		}, 0 );
	}

	// Fix links on homepage to point to sub directories
	if ( $( event.target ).hasClass( "jqm-home") ) {
		$( "body" ).find( "a" ).each( function() {
			$( this ).attr( "href", $( this ).attr( "href" ).replace( "../", "" ) );
		});
	}
});

// Append keywords list to each list item
$( document ).one( "pagecreate", ".jqm-demos", function() {
	$( ".jqm-search-results-list li, .jqm-search li" ).each(function() {
		var text = $( this ).attr( "data-filtertext" );

		$( this )
			.find( "a" )
			.append( "<span class='jqm-search-results-keywords ui-listview-item-description'>" +
				text + "</span>" );
	});
});

// Functions for highlighting text used for keywords highlight in search
jQuery.fn.highlight = function( pat ) {
	function innerHighlight( node, pat ) {
		var skip = 0;
		if ( node.nodeType === 3 ) {
			var pos = node.data.toUpperCase().indexOf( pat );
			if ( pos >= 0 ) {
				var spannode = document.createElement( "span" );
				spannode.className = "jqm-search-results-highlight";
				var middlebit = node.splitText( pos );
				var middleclone = middlebit.cloneNode( true );
				spannode.appendChild( middleclone );
				middlebit.parentNode.replaceChild( spannode, middlebit );
				skip = 1;
			}
		} else if ( node.nodeType === 1 && node.childNodes && !/(script|style)/i.test( node.tagName ) ) {
			for ( var i = 0; i < node.childNodes.length; ++i ) {
				i += innerHighlight( node.childNodes[i], pat );
			}
		}
		return skip;
	}
	return this.length && pat && pat.length ? this.each(function() {
		innerHighlight( this, pat.toUpperCase() );
	}) : this;
};

// Function to remove highlights in text
jQuery.fn.removeHighlight = function() {
	return this.find( "span.jqm-search-results-highlight" ).each(function() {
		this.parentNode.firstChild.nodeName;
		this.parentNode.replaceChild( this.firstChild, this );
		this.parentNode.normalize();
	}).end();
};

// Extension to listview to add keyboard navigation
$( document ).on( "mobileinit", function() {
	(function( $, undefined ) {

	$.widget( "mobile.listview", $.mobile.listview, {
		options: {
			arrowKeyNav: false,
			enterToNav: false,
			highlight: false,
			submitTo: false
		},
		_create: function() {
			this._super();

			if ( this.options.arrowKeyNav ) {
				this._on( document, { "pageshow": "arrowKeyNav" });
			}

			if ( this.options.enterToNav ) {
				this._on( document, { "pageshow": "enterToNav" });
			}

		},
		submitTo: function() {
			var url,
				form = this.element.parent().find( "form" );

			form.attr( "method", "get" )
				.attr( "action", this.options.submitTo );

			url = this.options.submitTo + "?search=" + this.element.parent().find( "input" ).val();

			window.location =  url;
		},
		enterToNav: function() {
			var form = this.element.parent().find( "form" );

			form.append( "<button type='submit' data-icon='caret-r' data-inline='true' class='ui-hidden-accessible' data-iconpos='notext'>Submit</button>" )
				.parent()
				.enhanceWithin();

			this.element.parent().find( "form" ).children( ".ui-button" ).addClass( "ui-hidden-accessible" );

			this._on( form, {
				"submit": "submitHandler"
			});
		},
		enhanced: false,
		arrowKeyNav: function() {
			var input = this.element.prev("form").find( "input" );

			if ( !this.enhanced ) {
				this._on( input, {
					"keyup": "handleKeyUp"
				});

				this.enhanced = true;
			}
		},
		handleKeyUp: function( e ) {
			var search,
				toBeHighlightled,
				input = this.element.prev("form").find( "input" ),
				isDownKeyUp = e.which === $.ui.keyCode.DOWN,
				isUpKeyUp = e.which === $.ui.keyCode.UP;

			if ( isDownKeyUp || isUpKeyUp ) {
				if ( this.element.find( "li.ui-listview-item-active" ).length === 0 ) {
					toBeHighlightled = this.element.find( "li" )
					.not( ".ui-screen-hidden" )
					[ isDownKeyUp ? "first" : "last" ]();
				} else {
					this.element.find( "li.ui-listview-item-active a" )
					.toggleClass( "ui-button-active");

					toBeHighlightled = this.element.find( "li.ui-listview-item-active" )
					.toggleClass( "ui-listview-item-active" )
					[ isDownKeyUp ? "nextAll" : "prevAll" ]( "li" )
					.not( ".ui-screen-hidden" )
					.first();
				}

				// Highlight the selected list item
				toBeHighlightled
				.toggleClass( "ui-listview-item-active" )
				.find( "a" )
				.toggleClass( "ui-button-active" );
			} else if ( e.which === $.ui.keyCode.ENTER ) {
				this.submitHandler();
			} else if ( typeof e.which !== "undefined" ) {
				this.element.find( "li.ui-listview-item-active" )
				.removeClass( "ui-listview-item-active" );

				if ( this.options.highlight ) {
					search = input.val();

					this.element.find( "li" ).each(function() {
						$( this ).removeHighlight();
						$( this ).highlight( search );
					});
				}
			}
		},
		submitHandler: function() {
			if ( this.element.find( "li.ui-listview-item-active" ).length !== 0 ) {
				var href = this.element.find( "li.ui-listview-item-active a" ).attr( "href" );

				$( ":mobile-pagecontainer" ).pagecontainer( "change", href );
				return false;
			}

			if ( this.options.submitTo ) {
				this.submitTo();
			}
		}
	});
})( jQuery );

});
