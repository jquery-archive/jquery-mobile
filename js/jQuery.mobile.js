/*!
 * jQuery Mobile
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( $, window, undefined ) {
	// if we're missing support for any of these, then we're a C-grade browser
	if ( !$.support.display || !$.support.position || !$.support.overflow || !$.support.floatclear ) {
		return;
	}	

	var $window = $(window),
		$html = $('html'),
		$head = $('head'),
		$body,
		$loader = $('<div class="ui-loader ui-body-c ui-corner-all fade in"><span class="ui-icon ui-icon-loading spin"></span><h1>loading.</h1></div>'),
		startPage,
		startPageId = 'ui-page-start',
		activePageClass = 'ui-page-active',
		pageTransition,
		transitions = 'slide slideup slidedown pop flip fade dissolve swap',
		transitionDuration = 350,
		backBtnText = "Back",
		urlStack = [ {
			url: location.hash.replace( /^#/, "" ),
			transition: "slide"
		} ],
		nextPageRole = null,
		noCache = '.ui-dialog';
	
	
	
	
	
	// hide address bar
	function hideBrowserChrome() {
		// prevent scrollstart and scrollstop events
		$.event.special.scrollstart.enabled = false;
		window.scrollTo( 0, 0 );
		setTimeout(function() {
			$.event.special.scrollstart.enabled = true;
		}, 150 );
	}
	
	function manageGlobalNav(){
		if($('.ui-page-active:last').is('.ui-globalnav-expanded')){
			$('[data-role="globalnav"]').hide();
		}
		else{
			$('[data-role="globalnav"]').show();
		}
	}
	
	// send a link through hash tracking
	$.fn.ajaxClick = function() {
		var href = $( this ).attr( "href" );
		pageTransition = $( this ).attr( "data-transition" ) || "slide";
		nextPageRole = $( this ).attr( "data-rel" );
		
		// let the hashchange event handler take care of everything else
		location.hash = href;
		
		// note: if it's a non-local-anchor and Ajax is not supported, go to page
		if ( href.match( /^[^#]/ ) && !$.support.ajax ) {
			window.location = href;
		}
		
		return this;
	};
	
	// ajaxify all navigable links
	$( "a:not([href=#]):not([target=_blank]):not([rel=external])" ).live( "click", function() {
		$( this ).ajaxClick();
		return false;
	});
	
	// turn on/off page loading message.. also hides the ui-content div
	function pageLoading( done ) {
		if ( done ) {
			$html.removeClass( "ui-loading" );
			//fade in page content, remove loading msg
			//$('.ui-page-active .ui-content')//.addClass('dissolve in');
		} else {
			$html.addClass( "ui-loading" );
			$loader.appendTo( $body ).addClass( "dissolve in" );
		}
	};
	
	// transition between pages - based on transitions from jQtouch
	function changePage( from, to, transition, back ) {
		hideBrowserChrome();
		
		// kill keyboard (thx jQtouch :) )
		$( document.activeElement ).blur();
		
		// animate in / out
		from.addClass( transition + " out " + ( back ? "reverse" : "" ) );
		to.appendTo($body).addClass( activePageClass + " " + transition +
			" in " + ( back ? "reverse" : "" ) );
		//make sure globalnav is on top	
		$('[data-role="globalnav"]').appendTo($body);	
		
		// callback - remove classes, etc
		to.animationComplete(function() {
			from.add( to ).removeClass(" out in reverse " + transitions );
			from.removeClass( activePageClass );
			pageLoading( true );
			manageGlobalNav();
			$.fixedToolbars.show();
		});
	};
	
	$(function() {
		$body = $( "body" );
		pageLoading();
		
		// needs to be bound at domready (for IE6)
		// find or load content, make it active
		$window.bind( "hashchange", function(e) {
			var url = location.hash.replace( /^#/, "" ),
				stackLength = urlStack.length,
				// pageTransition only exists if the user clicked a link
				back = !pageTransition && stackLength > 1 &&
					urlStack[ stackLength - 2 ].url === url,
				transition = pageTransition || "slide";
			pageTransition = undefined;
			
			// if the new href is the same as the previous one
			if ( back ) {
				transition = urlStack.pop().transition;
			} else {
				urlStack.push({ url: url, transition: transition });
			}
			
			//remove any pages that shouldn't cache
			$(noCache).remove();
			
			//function for setting role of next page
			function setPageRole( newPage ) {
				if ( nextPageRole ) {
					newPage.attr( "data-role", nextPageRole );
					nextPageRole = undefined;
				}
			}
			
			if ( url ) {
				// see if content is present already
				var localDiv = $( "[id='" + url + "']" );
				if ( localDiv.length ) {
					if ( localDiv.is( "[data-role]" ) ) {
						setPageRole( localDiv );
					}
					mobilize( localDiv );
					changePage( $( ".ui-page-active" ), localDiv, transition, back );
				} else { //ajax it in
					pageLoading();
					var newPage = $( "<div>" )
						.appendTo( $body )
						.load( url + ' [data-role="page"]', function() {
							// TODO: test this (avoids querying the dom for new element):
//							var newPage = $( this ).find( ".ui-page" ).eq( 0 )
//								.attr( "id", url );
//							$( this ).replaceWith( newPage );
//							setPageRole( newPage );
//							mobilize( newPage );
//							changePage( $( ".ui-page-active" ), newPage, transition, back );
							$( this ).replaceWith(
								$( this ).find( '[data-role="page"]' ).eq( 0 ).attr( "id", url ) );
							var newPage = $( "[id='" + url + "']" );
							setPageRole( newPage );
							mobilize( newPage );
							changePage( $( ".ui-page-active" ), newPage, transition, back );
						});
				}
			} else {
				// either we've backed up to the root page url
				// or it's the first page load with no hash present
				var currentPage = $( ".ui-page-active" );
				if ( currentPage.length && !startPage.is( ".ui-page-active" ) ) {
					changePage( currentPage, startPage, transition, back );
				} else {
					startPage.addClass( activePageClass );
					manageGlobalNav();
					$.fixedToolbars.show();
					pageLoading( true );
				}
			}
		});
		
		hideBrowserChrome();
	});
	
	
	
	
	
	//add orientation class on flip/resize.
	$window.bind( "orientationchange", function( event, data ) {
		$html.removeClass( "portrait landscape" ).addClass( data.orientation );
	});
	
	//add mobile, loading classes to doc
	$html.addClass('ui-mobile');
	
	//insert mobile meta (any other metas needed? webapp? iPhone icon? etc)
	$head.append('<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />');
	
	//potential (probably incomplete) fallback to workaround lack of animation callbacks. 
	//should this be extended into a full special event?
	// note: Expects CSS animations use transitionDuration (350ms)
	$.fn.animationComplete = function(callback){
		if($.support.WebKitAnimationEvent){
			return $(this).one('webkitAnimationEnd', callback); //check out transitionEnd (opera per Paul's request)
		}
		else{
			setTimeout(callback, transitionDuration);
		}
	};
	
	
	
	//markup-driven enhancements, to be called on any ui-page upon loading
	function mobilize($el){	
		//to-do: make sure this only runs one time on a page (or maybe per component)
		return $el.not('[data-mobilized]').each(function(){		
			//add ui-page class
			$el.addClass('ui-page');
			//dialog
			$el.filter('[data-role="dialog"]').dialog();
			//checkboxes, radios
			$el.find('input[type=radio],input[type=checkbox]').customCheckboxRadio();
			//custom buttons
			$el.find('button, input[type=submit]').customButton();
			//custom text inputs
			$el.find('input[type=text],input[type=password],textarea').customTextInput();
			//collapsible groupings
			$el.find('[data-role="collapsible"]').collapsible();
			//single-field separators
			$el.find('.field').fieldcontain();
			//selects
			$el.find('select').customSelect();
			//global nav
			$el.find('[data-role="globalnav"]').globalnav();
			//fix toolbars
			$el.fixHeaderFooter();
			//buttons from links in headers,footers,bars, or with data-role
			$el.find('.ui-header a, .ui-footer a, .ui-bar a, [data-role="button"]').not('.ui-btn').buttonMarkup();
			//vertical controlgroups
			$el.find('[data-role="controlgroup"]:not([data-type="horizontal"])').controlgroup();
			//horizontal controlgroups
			$el.find('[data-role="controlgroup"][data-type="horizontal"]').controlgroup({direction: 'horizontal'});
			//listview from data role
			$el.find('[data-role="listview"]').listview();
			//links within content areas
			$el.find('.ui-body a:not(.ui-btn):not(.ui-link-inherit)').addClass('ui-link');
			//rewrite "home" links to mimic the back button (pre-js, these links are usually "home" links)	
			var backBtn = $el.find('.ui-header a.ui-back');
			if(!backBtn.length){
				backBtn = $('<a href="#" class="ui-back" data-icon="arrow-l"></a>').appendTo($el.find('.ui-header')).buttonMarkup();
			}
			backBtn
				.click(function(){
					history.go(-1);
					return false;
				})
				.find('.ui-btn-text').text(backBtnText);
			$el.attr('data-mobilized',true);	
		});
	};

	//dom-ready
	$(function(){
		
	
		//mobilize all pages present
		mobilize($('[data-role="page"]'));
		
		//set up active page - mobilize it!
		startPage = $('body > .ui-page:first');
		
		//make sure it has an ID - for finding it later
		if(!startPage.attr('id')){ 
			startPage.attr('id', startPageId); 
		}
		
		//trigger a new hashchange, hash or not
		$window.trigger( "hashchange" );
		
		//update orientation 
		$html.addClass( $.event.special.orientationchange.orientation( $window ) );
		
		//swipe right always triggers a back 
		$body.bind('swiperight.jqm',function(){
			history.go(-1);
			return false;
		});	
		
		//some debug stuff for the events pages
		$('body').bind('scrollstart scrollstop swipe swipeleft swiperight tap taphold turn',function(e){
			$('#eventlogger').prepend('<div>Event fired: '+ e.type +'</div>');
		});
	});
})( jQuery, this );
