<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navbar - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header" data-position="fixed">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content jqm-fullwidth">

		<ul data-role="listview" data-theme="d" data-dividertheme="e" data-filter="true" data-filter-theme="d" data-filter-placeholder="Search messages...">
			<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
			<li><a href="#">
				<h3>Stephen Weber</h3>
				<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
				<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
				<p class="ui-li-aside"><strong>6:24</strong>PM</p>
			</a></li>
			<li><a href="#">
				<h3>jQuery Team</h3>
				<p><strong>Boston Conference Planning</strong></p>
				<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
				<p class="ui-li-aside"><strong>9:18</strong>AM</p>
			</a></li>
			<li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-li-count">1</span></li>
			<li><a href="#">
				<h3>Avery Walker</h3>
				<p><strong>Re: Dinner Tonight</strong></p>
				<p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
				<p class="ui-li-aside"><strong>4:48</strong>PM</p>
			</a></li>
			<li data-role="list-divider">Wednesday, October 6, 2010 <span class="ui-li-count">3</span></li>
			<li><a href="#">
				<h3>Amazon.com</h3>
				<p><strong>4-for-3 Books for Kids</strong></p>
				<p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
				<p class="ui-li-aside"><strong>12:47</strong>PM</p>
			</a></li>
			<li><a href="#">
				<h3>Mike Taylor</h3>
				<p><strong>Re: This weekend in Maine</strong></p>
				<p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
				<p class="ui-li-aside"><strong>6:24</strong>AM</p>
			</a></li>
			<li><a href="#">
				<h3>Redfin</h3>
				<p><strong>Redfin listing updates for today</strong></p>
				<p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
				<p class="ui-li-aside"><strong>5:52</strong>AM</p>
			</a></li>
				<li data-role="list-divider">Tuesday, October 5, 2010 <span class="ui-li-count">3</span></li>
				<li><a href="index.html">
					<h3>Angela Smith</h3>
					<p><strong>Link Request</strong></p>
					<p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
					<p class="ui-li-aside"><strong>6:24</strong>AM</p>
				</a></li>
				<li><a href="index.html">
					<h3>Mike Taylor</h3>
					<p><strong>This weekend in Maine</strong></p>
					<p>Sounds good, let me check into our plans.</p>
					<p class="ui-li-aside"><strong>6:24</strong>AM</p>
				</a></li>
		</ul>

		</div><!-- /content -->

		<div data-role="footer" data-id="foo1" data-position="fixed">
			<div data-role="navbar">
				<ul>
					<li><a href="footer-persist-a.php" data-prefetch="true" data-transition="none">Info</a></li>
					<li><a href="footer-persist-b.php" data-prefetch="true" data-transition="none">Friends</a></li>
					<li><a href="footer-persist-c.php" data-prefetch="true" data-transition="none">Albums</a></li>
					<li><a href="footer-persist-d.php" data-prefetch="true" data-transition="none" class="ui-btn-active ui-state-persist">Emails</a></li>
				</ul>
			</div><!-- /navbar -->
		</div><!-- /footer -->

		<?php include( '../../global-nav.php' ); ?>

		</div><!-- /page -->
		</body>
		</html>
