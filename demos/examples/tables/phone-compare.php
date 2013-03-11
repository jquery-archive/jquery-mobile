<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table Column toggle demo: Phone comparison - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<style>
		/*These apply across all breakpoints because they are outside of a media query */
		table.phone-compare thead th {
			background-color: #fff;
		}
		table.phone-compare thead th h4 {
			text-transform: uppercase;
			font-size: 0.6em;
			margin: 0;
		}
		table.phone-compare thead th h3 {
			font-size: .9em;
			margin: -.4em 0 .8em 0;
		}
		table.phone-compare th.label {
			text-transform: uppercase;
			font-size: 0.6em;
			opacity: 0.5;
			padding: 1.2em .8em;
			background-color: #ddd;
		}
		table.phone-compare tbody tr.photos td {
			background-color: #fff;
			padding: 0;
		}
		table.phone-compare tbody tr.photos img {
			max-width: 100%;
			min-width: 60px;
		}
		/*	Use the target selector to style the column chooser button */
		a[href="#phone-table-popup"] {
			margin-bottom: 1.2em;
		}
		/* Show priority 1 at 320px (20em x 16px) */
		@media screen and (min-width: 20em) {
			.phone-compare th.ui-table-priority-1,
			.phone-compare td.ui-table-priority-1 {
				display: table-cell;
			}
		}
		/* Show priority 2 at 560px (35em x 16px) */
		@media screen and (min-width: 35em) {
			.phone-compare th.ui-table-priority-2,
			.phone-compare td.ui-table-priority-2 {
				display: table-cell;
			}
		}
		/* Show priority 3 at 720px (45em x 16px) */
		@media screen and (min-width: 45em) {
			.phone-compare th.ui-table-priority-3,
			.phone-compare td.ui-table-priority-3 {
				display: table-cell;
			}
		}
		/* Manually hidden */
		.phone-compare th.ui-table-cell-hidden,
		.phone-compare td.ui-table-cell-hidden {
			display: none;
		}
		/* Manually shown */
		.phone-compare th.ui-table-cell-visible,
		.phone-compare td.ui-table-cell-visible {
			display: table-cell;
		}
	</style>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../../search.php' ); ?>
    </div><!-- /header -->

	<div data-role="content" class="jqm-content jqm-fullwidth">

        <h1>Popular Phones</h1>

		<p>This is an example of how to use the column toggle table to create a comparison view where products can be shown or hidden.</p>

		<div data-demo-html="true" data-demo-css="true">

			<table data-role="table" id="phone-table" data-mode="columntoggle" data-column-btn-text="Compare..." data-column-btn-theme="a" class="phone-compare ui-shadow table-stroke">
              <thead>
                <tr>
                  <th class="label">Model</th>
                <th>
					<h4>Apple</h4>
					<h3>iPhone 5</h3>
				</th>
				<th data-priority="1">
					<h4>Samsung</h4>
					<h3>Galaxy S III</h3>
				</th>
				<th data-priority="2">
					<h4>Nokia</h4>
					<h3>Lumia 920</h3>
				</th>
				<th data-priority="3">
					<h4>HTC</h4>
					<h3>One X</h3>
				</th>
                </tr>
              </thead>
              <tbody>
                <tr class="photos">
                  <th class="label">Photo</th>
                  <td><a href="#img-iphone5" data-rel="popup" data-position-to="window"><img src="../../_assets/img/phone_iphone5.png" /></a></td>
                  <td><a href="#img-galaxy" data-rel="popup" data-position-to="window"><img src="../../_assets/img/phone_galaxy3.png" /></a></td>
                  <td><a href="#img-lumia" data-rel="popup" data-position-to="window"><img src="../../_assets/img/phone_lumia920.png" /></a></td>
                  <td><a href="#img-onex" data-rel="popup" data-position-to="window"><img src="../../_assets/img/phone_onex.png" /></a></td>
                </tr>
                <tr>
                  <th class="label">Height</th>
                  <td>4.87"</td>
                  <td>5.38"</td>
                  <td>5.11"</td>
                  <td>5.3"</td>
                </tr>
                <tr>
                  <th class="label">Width</th>
                  <td>2.31"</td>
                  <td>2.78"</td>
                  <td>2.79"</td>
                  <td>2.75"</td>
                </tr>
                <tr>
                  <th class="label">Depth</th>
                  <td>0.3"</td>
                  <td>0.34"</td>
                  <td>0.42"</td>
                  <td>0.37"</td>
                </tr>
                <tr>
                  <th class="label">Weight (lbs.)</th>
                  <td>0.25</td>
                  <td>0.29</td>
                  <td>0.41</td>
                  <td>0.29</td>
                </tr>
              </tbody>
            </table>

			<!-- Popups for lightbox images -->

			<div id="img-iphone5" data-role="popup" data-overlay-theme="a">
				<img src="../../_assets/img/phone_iphone5.png">
			</div>

			<div id="img-galaxy" data-role="popup" data-overlay-theme="a">
				<img src="../../_assets/img/phone_galaxy3.png">
			</div>

			<div id="img-lumia" data-role="popup" data-overlay-theme="a">
				<img src="../../_assets/img/phone_lumia920.png">
			</div>

			<div id="img-onex" data-role="popup" data-overlay-theme="a">
				<img src="../../_assets/img/phone_onex.png">
			</div>

		</div><!-- /data-demo -->

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
