<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Swipe to delete list item - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$( document ).on( "pagecreate", "#demo-page", function() {

			// Swipe to remove list item
			$( document ).on( "swipeleft swiperight", "#list li", function( event ) {
				var listitem = $( this ),
					// These are the classnames used for the CSS transition
					dir = event.type === "swipeleft" ? "left" : "right",
					// Check if the browser supports the transform (3D) CSS transition
					transition = $.support.cssTransform3d ? dir : false;

					confirmAndDelete( listitem, transition );
			});

			// If it's not a touch device...
			if ( ! $.mobile.support.touch ) {

				// Remove the class that is used to hide the delete button on touch devices
				$( "#list" ).removeClass( "touch" );

				// Click delete split-button to remove list item
				$( ".delete" ).on( "click", function() {
					var listitem = $( this ).parent( "li" );

					confirmAndDelete( listitem );
				});
			}

			function confirmAndDelete( listitem, transition ) {
				// Highlight the list item that will be removed
				listitem.children( ".ui-button" ).addClass( "ui-button-active" );
				// Inject topic in confirmation popup after removing any previous injected topics
				$( "#confirm .topic" ).remove();
				listitem.find( ".topic" ).clone().insertAfter( "#question" );
				// Show the confirmation popup
				$( "#confirm" ).popup( "open" );
				// Proceed when the user confirms
				$( "#confirm #yes" ).on( "click", function() {
					// Remove with a transition
					if ( transition ) {

						listitem
							// Add the class for the transition direction
							.addClass( transition )
							// When the transition is done...
							.on( "webkitTransitionEnd transitionend otransitionend", function() {
								// ...the list item will be removed
								listitem.remove();
								// ...the list will be refreshed and the temporary class for border styling removed
								$( "#list" ).listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
							})
							// During the transition the previous button gets bottom border
							.prev( "li" ).children( "a" ).addClass( "border-bottom" )
							// Remove the highlight
							.end().end().children( ".ui-button" ).removeClass( "ui-button-active" );
					}
					// If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
					else {
						listitem.remove();
						$( "#list" ).listview( "refresh" );
					}
				});
				// Remove active state and unbind when the cancel button is clicked
				$( "#confirm #cancel" ).on( "click", function() {
					listitem.children( ".ui-button" ).removeClass( "ui-button-active" );
					$( "#confirm #yes" ).off();
				});
			}
		});
    </script>
	<style>
		/* Left transition */
		li.left {
			-webkit-transition: -webkit-transform 250ms ease;
			-webkit-transform: translateX(-100%);
			-moz-transition: -moz-transform 250ms ease;
			-moz-transform: translateX(-100%);
			-o-transition: -o-transform 250ms ease;
			-o-transform: translateX(-100%);
			transition: transform 250ms ease;
			transform: translateX(-100%);
		}
		/* Right transition */
		li.right {
			-webkit-transition: -webkit-transform 250ms ease;
			-webkit-transform: translateX(100%);
			-moz-transition: -moz-transform 250ms ease;
			-moz-transform: translateX(100%);
			-o-transition: -o-transform 250ms ease;
			-o-transform: translateX(100%);
			transition: transform 250ms ease;
			transform: translateX(100%);
		}
		/* Border bottom for the previous button during the transition*/
		li.left a.ui-button,
		li.right a.ui-button {
			border-top-width: 0;
			border-left-width: 1px;
			border-right-width: 1px;
		}
		li a.ui-button.border-bottom {
			border-bottom-width: 1px;
		}
		/* Hide the delete button on touch devices */
		ul.touch li.ui-listview-item-has-alternate a.delete {
			display: none;
		}
		ul.touch li.ui-listview-item-has-alternate a.ui-button {
			margin-right:0;
		}
		/* Styling for the popup */
		#confirm p {
			text-align: center;
			font-size: inherit;
			margin-bottom: .75em;
		}
    </style>
</head>
<body>

<div data-role="page" id="demo-intro" class="jqm-demos">

    <div data-role="toolbar" data-type="header" class="jqm-header">
        <h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Swipe to delete list item</h1>

		<p>This demo shows how you can remove list items by swiping left or right. For devices without touchscreen there is a delete button. This demo also contains a custom styled confirmation popup.</p>

		<p><a href="#demo-page" data-transition="fade" class="ui-button ui-corner-all ui-shadow ui-button-inline">Open swipe list demo</a></p>

        <div data-demo-html="#demo-page" data-demo-js="true" data-demo-css="true"></div>

    </div><!-- /content -->

    <?php include( '../jqm-navmenu.php' ); ?>

    <div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
        <p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
        <p>Copyright jQuery Foundation</p>
    </div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

<div data-role="page" id="demo-page" data-title="Inbox">

    <div data-role="toolbar" data-type="header" data-position="fixed" data-theme="b">
        <h1>Inbox</h1>
        <a href="#demo-intro" data-rel="back" class="ui-button ui-button-icon-only ui-corner-all ui-toolbar-header-button-left"><span class="ui-icon ui-icon-caret-l"></span>Back</a>
        <a href="#" onclick="window.location.reload()" class="ui-button ui-button-icon-only ui-corner-all ui-toolbar-header-button-right"><span class="ui-icon ui-icon-back"></span>Refresh</a>
    </div><!-- /header -->

    <div role="main" class="ui-content">

        <ul id="list" class="touch" data-role="listview" data-icon="false" data-split-icon="delete">
            <li>
                <a href="#demo-mail">
                    <h3>Avery Walker</h3>
                    <p class="topic"><strong>Re: Dinner Tonight</strong></p>
                    <p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
                    <p class="ui-listview-item-aside"><strong>4:48</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Amazon.com</h3>
                    <p class="topic"><strong>4-for-3 Books for Kids</strong></p>
                    <p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
                    <p class="ui-listview-item-aside"><strong>4:37</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Mike Taylor</h3>
                    <p class="topic"><strong>Re: This weekend in Maine</strong></p>
                    <p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
                    <p class="ui-listview-item-aside"><strong>3:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Redfin</h3>
                    <p class="topic"><strong>Redfin listing updates for today</strong></p>
                    <p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
                    <p class="ui-listview-item-aside"><strong>2:52</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Angela Smith</h3>
                    <p class="topic"><strong>Link Request</strong></p>
                    <p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
                    <p class="ui-listview-item-aside"><strong>1:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Stephen Weber</h3>
                    <p class="topic"><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
                    <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
                    <p class="ui-listview-item-aside"><strong>11:24</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>jQuery Team</h3>
                    <p class="topic"><strong>Boston Conference Planning</strong></p>
                    <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
                    <p class="ui-listview-item-aside"><strong>9:18</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Avery Walker</h3>
                    <p class="topic"><strong>Re: Dinner Tonight</strong></p>
                    <p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
                    <p class="ui-listview-item-aside"><strong>4:48</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Amazon.com</h3>
                    <p class="topic"><strong>4-for-3 Books for Kids</strong></p>
                    <p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
                    <p class="ui-listview-item-aside"><strong>4:37</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Mike Taylor</h3>
                    <p class="topic"><strong>Re: This weekend in Maine</strong></p>
                    <p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
                    <p class="ui-listview-item-aside"><strong>3:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Redfin</h3>
                    <p class="topic"><strong>Redfin listing updates for today</strong></p>
                    <p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
                    <p class="ui-listview-item-aside"><strong>2:52</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Angela Smith</h3>
                    <p class="topic"><strong>Link Request</strong></p>
                    <p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
                    <p class="ui-listview-item-aside"><strong>1:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Stephen Weber</h3>
                    <p class="topic"><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
                    <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
                    <p class="ui-listview-item-aside"><strong>11:24</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>jQuery Team</h3>
                    <p class="topic"><strong>Boston Conference Planning</strong></p>
                    <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
                    <p class="ui-listview-item-aside"><strong>9:18</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
        </ul>

    </div><!-- /content -->

    <div id="confirm" class="ui-content" data-role="popup" data-theme="a">

        <p id="question">Are you sure you want to delete:</p>

        <div class="ui-grid-a">
            <div class="ui-block-a">
                <a id="yes" class="ui-button ui-corner-all ui-mini ui-button-a" data-rel="back">Yes</a>
            </div>
            <div class="ui-block-b">
                <a id="cancel" class="ui-button ui-corner-all ui-mini ui-button-a" data-rel="back">Cancel</a>
            </div>
        </div>

	</div><!-- /popup -->

</div><!-- /page -->

</body>
</html>
