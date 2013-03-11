<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table Column toggle: Heading groups - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<style>
		.th-groups th {
			text-align: center;
			background-color: rgba(0,0,0,.1);
			border-right: 1px solid #fff;
		}
		.th-groups th.totals {
			background-color: rgba(0,0,0,.5);
			color: #fff;
			text-shadow: none;
		}
		/* Show priority 1 at 320px (20em x 16px) */
		@media screen and (min-width: 20em) {
			th.ui-table-priority-1,
			td.ui-table-priority-1 {
				display: table-cell;
			}
		}
		/* Show priority 2 at 480px (30em x 16px) */
		@media screen and (min-width: 30em) {
			th.ui-table-priority-2,
			td.ui-table-priority-2 {
				display: table-cell;
			}
		}
		/* Show priority 3 at 640px (40em x 16px) */
		@media screen and (min-width: 40em) {
			th.ui-table-priority-3,
			td.ui-table-priority-3 {
				display: table-cell;
			}
		}
		/* Show priority 4 at 800px (50em x 16px) */
		@media screen and (min-width: 50em) {
			th.ui-table-priority-4,
			td.ui-table-priority-4 {
				display: table-cell;
			}
		}
		/* Show priority 5 at 960px (60em x 16px) */
		@media screen and (min-width: 60em) {
			th.ui-table-priority-5,
			td.ui-table-priority-5 {
				display: table-cell;
			}
		}
		/* Show priority 6 at 1200 (75em x 16px) */
		@media screen and (min-width: 75em) {
			th.ui-table-priority-6,
			td.ui-table-priority-6 {
				display: table-cell;
			}
		}
		/* Manually hidden */
		th.ui-table-cell-hidden,
		td.ui-table-cell-hidden {
			display: none;
		}
		/* Manually shown */
		th.ui-table-cell-visible,
		td.ui-table-cell-visible {
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

        <h1>Table Column toggle: Heading groups</h1>

        <p>The columns of data are shown and toggled as sets under each grouped heading for each financial quarter. In this example, the totals are shown at narrow widths, then more historical quarters are revealed at wider widths by assigning priorities to the columns.</p>

        <div data-demo-html="true" data-demo-css="true">

         	<table data-role="table" id="financial-table" data-column-btn-theme="b" data-column-popup-theme="a" data-mode="columntoggle" class="table-stroke">
				<thead>
					<tr class="th-groups">
						<td></td>
						<th colspan="3" data-priority="6">Q1 2012</th>
						<th colspan="3" data-priority="5">Q2 2012</th>
						<th colspan="3" data-priority="4">Q3 2012</th>
						<th colspan="3" data-priority="3">Q4 2012</th>
						<th colspan="3" data-priority="1" class="totals">YTD Totals</th>
					</tr>
					<tr>
						<th>Store</th>

						<th>Income</th>
						<th>Profit</th>
						<th>Change</th>

						<th>Income</th>
						<th>Profit</th>
						<th>Change</th>

						<th>Income</th>
						<th>Profit</th>
						<th>Change</th>

						<th>Income</th>
						<th>Profit</th>
						<th>Change</th>

						<th>Income</th>
						<th>Profit</th>
						<th>Change</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th>Boston</th>

						<td>2,898</td>
						<td>739</td>
						<td>-5.8%</td>

						<td>3,647</td>
						<td>1,354</td>
						<td>+5.8%</td>

						<td>4,981</td>
						<td>2,246</td>
						<td>+13.4%</td>

						<td>3,457</td>
						<td>1,259</td>
						<td>-3.9%</td>

						<td>12,463</td>
						<td>6,234</td>
						<td>+5.9%</td>
					</tr>

					<tr>
						<th>Chicago</th>

						<td>2,898</td>
						<td>739</td>
						<td>-5.8%</td>

						<td>3,647</td>
						<td>1,354</td>
						<td>+5.8%</td>

						<td>4,981</td>
						<td>2,246</td>
						<td>+13.4%</td>

						<td>3,457</td>
						<td>1,259</td>
						<td>-3.9%</td>

						<td>12,463</td>
						<td>6,234</td>
						<td>+5.9%</td>
					</tr>
					<tr>
						<th>NYC</th>

						<td>2,898</td>
						<td>739</td>
						<td>-5.8%</td>

						<td>3,647</td>
						<td>1,354</td>
						<td>+5.8%</td>

						<td>4,981</td>
						<td>2,246</td>
						<td>+13.4%</td>

						<td>3,457</td>
						<td>1,259</td>
						<td>-3.9%</td>

						<td>12,463</td>
						<td>6,234</td>
						<td>+5.9%</td>
					</tr>
				</tbody>
			</table>

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
