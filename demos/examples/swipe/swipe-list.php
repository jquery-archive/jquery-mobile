<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Swipe to delete list item - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script>
		$( document ).on( "pageinit", "#demo-page", function() {

			// Swipe to remove list item
			$( document ).on( "swipeleft swiperight", "#list li.ui-li", function( event ) {
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
					var listitem = $( this ).parent( "li.ui-li" );

					confirmAndDelete( listitem );
				});
			}

			function confirmAndDelete( listitem, transition ) {
				// Highlight the list item that will be removed
				listitem.addClass( "ui-btn-down-d" );
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
							// Remove the highlight
							.removeClass( "ui-btn-down-d" )
							// Add the class for the transition direction
							.addClass( transition )
							// When the transition is done...
							.on( "webkitTransitionEnd transitionend otransitionend", function() {
								// ...the list item will be removed
								listitem.remove();
								// ...the list will be refreshed and the temporary class for border styling removed
								$( "#list" ).listview( "refresh" ).find( ".ui-li.border" ).removeClass( "border" );
							})
							// During the transition the previous list item should get bottom border
							.prev( "li.ui-li" ).addClass( "border" );
					}
					// If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
					else {
						listitem.remove();
						$( "#list" ).listview( "refresh" );
					}
				});
				// Remove active state and unbind when the cancel button is clicked
				$( "#confirm #cancel" ).on( "click", function() {
					listitem.removeClass( "ui-btn-down-d" );
					$( "#confirm #yes" ).off();
				});
			}
		});
    </script>
	<style>
		/* Left transition */
		li.ui-li.left {
			-webkit-transition: -webkit-transform 250ms ease;
			-webkit-transform: translateX(-100%);
			-moz-transition: -moz-transform 250ms ease;
			-moz-transform: translateX(-100%);
			-o-transition: -o-transform 250ms ease;
			-o-transform: translateX(-100%);
			transition: transform 250ms ease;
			transform: translateX(-100%);
			border-top-width: 0; /* We switch to border bottom on previous list item */
			border-right-width: 1px;
		}
		/* Right transition */
		li.ui-li.right {
			-webkit-transition: -webkit-transform 250ms ease;
			-webkit-transform: translateX(100%);
			-moz-transition: -moz-transform 250ms ease;
			-moz-transform: translateX(100%);
			-o-transition: -o-transform 250ms ease;
			-o-transform: translateX(100%);
			transition: transform 250ms ease;
			transform: translateX(100%);
			border-top-width: 0; /* We switch to border bottom on previous list item */
			border-left-width: 1px;
		}
		/* Border bottom for the previous list item during the transition*/
		li.ui-li.border {
			border-bottom-width: 1px;
		}
		/* Hide the delete button on touch devices */
		.touch .delete {
			display: none;
		}
		.touch .ui-link-inherit {
			padding-right: 15px !important;
		}
		/* Custom styling for the popup */
		#confirm {
			border: 1px solid;
			border-color: #044062; /* Fallback for older browsers */
			border-color: rgba(4,64,98,.4);
			background: #456f9a; /* Fallback for older browsers */
			background: rgba(69,111,154,.8);
			-moz-box-shadow: 0 2px 6px rgba(69,111,154,.5), inset 0 1px rgba(255,255,255,.3), inset 0 6px rgba(255,255,255,.1), inset 0 10px 20px rgba(255,255,255,.25), inset 0 -15px 30px rgba(69,111,154,.3);
			-webkit-box-shadow: 0 2px 6px rgba(69,111,154,.5), inset 0 1px rgba(255,255,255,.3), inset 0 6px rgba(255,255,255,.1), inset 0 10px 20px rgba(255,255,255,.25), inset 0 -15px 30px rgba(69,111,154,.3);
			box-shadow: 0 2px 6px rgba(69,111,154,.5), inset 0 1px rgba(255,255,255,.3), inset 0 6px rgba(255,255,255,.1), inset 0 10px 20px rgba(255,255,255,.25), inset 0 -15px 30px rgba(69,111,154,.3);
			max-width: 250px;
		}
		#confirm p {
			color: #fff;
			text-shadow: 0 1px 1px rgba(0,0,0,.6);
			margin-bottom: .75em;
		}
		/* Make the buttons inherit the popup border-radius (.ui-corner-all) */
		#confirm div, #confirm .ui-btn-corner-all {
			-webkit-border-radius: inherit;
			border-radius: inherit;
		}
		#confirm #cancel {
			background-image: none;
		}
		#confirm .topic.ui-li-desc {
			font-size: inherit; /* The cloned topic will have class ui-li-desc so we negate the font-size settings of this class */
			text-align: center;
		}
    </style>
</head>
<body>

<div data-role="page" id="demo-intro" class="jqm-demos">

    <div data-role="header" class="jqm-header">
        <h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content">

        <h1>Swipe to delete list item</h1>

        <div data-demo-html="#sample-page" data-demo-js="true" data-demo-css="true">
            <p>This demo shows how you can remove list items by swiping left or right. For devices without touchscreen there is a delete button. This demo also contains a custom styled confirmation popup.</p>

            <p><a href="#demo-page" data-transition="fade" data-role="button" data-inline="true" data-theme="c">Open swipe list demo</a></p>
        </div>

	</div><!-- /content -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->

<div data-role="page" id="demo-page" data-title="Inbox" data-theme="d">
<!--
NOTE: If you modify this page make sure you copy your modifications over to
#sample-page below so that your modifications will be reflected in the source
code view
-->
    <div data-role="header" data-position="fixed" data-theme="b">
        <h1>Inbox</h1>
        <a href="#demo-intro" data-rel="back" data-icon="arrow-l" data-iconpos="notext">Back</a>
        <a href="#" onclick="window.location.reload()" data-icon="back" data-iconpos="notext">Refresh</a>
    </div><!-- /header -->

    <div data-role="content">

        <ul id="list" class="touch" data-role="listview" data-icon="false" data-split-icon="delete" data-split-theme="d">
            <li>
                <a href="#demo-mail">
                    <h3>Avery Walker</h3>
                    <p class="topic"><strong>Re: Dinner Tonight</strong></p>
                    <p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
                    <p class="ui-li-aside"><strong>4:48</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Amazon.com</h3>
                    <p class="topic"><strong>4-for-3 Books for Kids</strong></p>
                    <p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
                    <p class="ui-li-aside"><strong>4:37</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Mike Taylor</h3>
                    <p class="topic"><strong>Re: This weekend in Maine</strong></p>
                    <p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
                    <p class="ui-li-aside"><strong>3:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Redfin</h3>
                    <p class="topic"><strong>Redfin listing updates for today</strong></p>
                    <p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
                    <p class="ui-li-aside"><strong>2:52</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Angela Smith</h3>
                    <p class="topic"><strong>Link Request</strong></p>
                    <p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
                    <p class="ui-li-aside"><strong>1:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Stephen Weber</h3>
                    <p class="topic"><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
                    <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
                    <p class="ui-li-aside"><strong>11:24</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>jQuery Team</h3>
                    <p class="topic"><strong>Boston Conference Planning</strong></p>
                    <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
                    <p class="ui-li-aside"><strong>9:18</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Avery Walker</h3>
                    <p class="topic"><strong>Re: Dinner Tonight</strong></p>
                    <p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
                    <p class="ui-li-aside"><strong>4:48</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Amazon.com</h3>
                    <p class="topic"><strong>4-for-3 Books for Kids</strong></p>
                    <p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
                    <p class="ui-li-aside"><strong>4:37</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Mike Taylor</h3>
                    <p class="topic"><strong>Re: This weekend in Maine</strong></p>
                    <p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
                    <p class="ui-li-aside"><strong>3:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Redfin</h3>
                    <p class="topic"><strong>Redfin listing updates for today</strong></p>
                    <p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
                    <p class="ui-li-aside"><strong>2:52</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Angela Smith</h3>
                    <p class="topic"><strong>Link Request</strong></p>
                    <p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
                    <p class="ui-li-aside"><strong>1:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Stephen Weber</h3>
                    <p class="topic"><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
                    <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
                    <p class="ui-li-aside"><strong>11:24</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>jQuery Team</h3>
                    <p class="topic"><strong>Boston Conference Planning</strong></p>
                    <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
                    <p class="ui-li-aside"><strong>9:18</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
        </ul>

    </div><!-- /content -->

    <div id="confirm" class="ui-content" data-role="popup" data-theme="none">

        <p id="question">Are you sure you want to delete</p>

        <div class="ui-grid-a">
            <div class="ui-block-a">
                <a id="yes" data-role="button" data-mini="true" data-shadow="false" data-theme="b" data-rel="back">Yes</a>
            </div>
            <div class="ui-block-b">
                <a id="cancel" data-role="button" data-mini="true" data-shadow="false" data-theme="b" data-rel="back">Cancel</a>
            </div>
        </div>

	</div><!-- /popup -->

</div><!-- /page -->

<div data-role="page" id="sample-page" data-title="Inbox" data-theme="d">

    <div data-role="header" data-position="fixed" data-theme="b">
        <h1>Inbox</h1>
        <a href="#demo-intro" data-rel="back" data-icon="arrow-l" data-iconpos="notext">Back</a>
        <a href="#" onclick="window.location.reload()" data-icon="back" data-iconpos="notext">Refresh</a>
    </div><!-- /header -->

    <div data-role="content">

        <ul id="list" class="touch" data-role="listview" data-icon="false" data-split-icon="delete" data-split-theme="d">
            <li>
                <a href="#demo-mail">
                    <h3>Avery Walker</h3>
                    <p class="topic"><strong>Re: Dinner Tonight</strong></p>
                    <p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
                    <p class="ui-li-aside"><strong>4:48</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Amazon.com</h3>
                    <p class="topic"><strong>4-for-3 Books for Kids</strong></p>
                    <p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
                    <p class="ui-li-aside"><strong>4:37</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Mike Taylor</h3>
                    <p class="topic"><strong>Re: This weekend in Maine</strong></p>
                    <p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
                    <p class="ui-li-aside"><strong>3:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Redfin</h3>
                    <p class="topic"><strong>Redfin listing updates for today</strong></p>
                    <p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
                    <p class="ui-li-aside"><strong>2:52</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Angela Smith</h3>
                    <p class="topic"><strong>Link Request</strong></p>
                    <p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
                    <p class="ui-li-aside"><strong>1:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Stephen Weber</h3>
                    <p class="topic"><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
                    <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
                    <p class="ui-li-aside"><strong>11:24</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>jQuery Team</h3>
                    <p class="topic"><strong>Boston Conference Planning</strong></p>
                    <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
                    <p class="ui-li-aside"><strong>9:18</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Avery Walker</h3>
                    <p class="topic"><strong>Re: Dinner Tonight</strong></p>
                    <p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
                    <p class="ui-li-aside"><strong>4:48</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Amazon.com</h3>
                    <p class="topic"><strong>4-for-3 Books for Kids</strong></p>
                    <p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
                    <p class="ui-li-aside"><strong>4:37</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Mike Taylor</h3>
                    <p class="topic"><strong>Re: This weekend in Maine</strong></p>
                    <p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
                    <p class="ui-li-aside"><strong>3:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Redfin</h3>
                    <p class="topic"><strong>Redfin listing updates for today</strong></p>
                    <p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
                    <p class="ui-li-aside"><strong>2:52</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Angela Smith</h3>
                    <p class="topic"><strong>Link Request</strong></p>
                    <p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
                    <p class="ui-li-aside"><strong>1:24</strong>PM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>Stephen Weber</h3>
                    <p class="topic"><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
                    <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
                    <p class="ui-li-aside"><strong>11:24</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
            <li>
                <a href="#demo-mail">
                    <h3>jQuery Team</h3>
                    <p class="topic"><strong>Boston Conference Planning</strong></p>
                    <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
                    <p class="ui-li-aside"><strong>9:18</strong>AM</p>
                </a>
                <a href="#" class="delete">Delete</a>
            </li>
        </ul>

    </div><!-- /content -->

    <div id="confirm" class="ui-content" data-role="popup" data-theme="none">

        <p id="question">Are you sure you want to delete</p>

        <div class="ui-grid-a">
            <div class="ui-block-a">
                <a id="yes" data-role="button" data-mini="true" data-shadow="false" data-theme="b" data-rel="back">Yes</a>
            </div>
            <div class="ui-block-b">
                <a id="cancel" data-role="button" data-mini="true" data-shadow="false" data-theme="b" data-rel="back">Cancel</a>
            </div>
        </div>

	</div><!-- /popup -->

</div><!-- /page -->

<div data-role="page" id="demo-mail" data-title="Demo" data-theme="d">

    <div data-role="header" data-position="fixed" data-theme="b">
        <h1>Demo</h1>
        <a href="#demo-page" data-rel="back" data-icon="arrow-l" data-iconpos="notext">Back</a>
    </div><!-- /header -->

    <div data-role="content">

    	<p>This is just a landing page for demo purposes.</p>

        <p><a href="#demo-page" data-rel="back" data-role="button" data-inline="true" data-icon="arrow-l" data-iconpos="left">Back</a></p>

    </div><!-- /content -->

</div><!-- /page -->

</body>
</html>
