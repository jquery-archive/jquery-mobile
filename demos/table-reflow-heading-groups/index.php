<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table Reflow: Heading groups - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style>
		.th-groups th {
			background-color: rgba(0,0,0,0.07);
			border-right: 1px solid #fff;
			text-align: center;
		}
		@media screen and (max-width: 72em) {
			/* Style the first cell in a row in a dark bar */
			.financial-table-reflow th: first-child {
				color: #fff;
				background-color: #555;
				font-size: 1.2em;
				padding: .3em .6em .3em .6em;
				-webkit-text-shadow: none;
				-moz-text-shadow: none;
				text-shadow: none;
			}
			/* Hide the label in the first cell */
			.financial-table-reflow th: first-child .ui-table-cell-label {
				display: none;
			}
			/* Make the grouped header labels green */
			.ui-table-reflow th .ui-table-cell-label-top,
			.ui-table-reflow td .ui-table-cell-label-top {
				font-weight: bold;
				color: #319B47;
				font-size: 1.1em;
			}
		}
		/* Media query to show as a standard table at wider widths, must be very wide for this table */
		@media screen and (min-width: 72em) {
			/* Show the table header rows */
			.financial-table-reflow td,
			.financial-table-reflow th,
			.financial-table-reflow tbody th,
			.financial-table-reflow tbody td,
			.financial-table-reflow thead td,
			.financial-table-reflow thead th {
				display: table-cell;
				margin: 0;
			}
			/* Hide the labels in each cell */
			.financial-table-reflow td .ui-table-cell-label,
			.financial-table-reflow th .ui-table-cell-label {
				display: none;
			}
		}
		/* Hack to make IE9 and WP7.5 treat cells like block level elements */
		/* Applied in a max-width media query up to the table layout breakpoint so we don't need to negate this*/
		@media (max-width: 72em) {
			.financial-table-reflow td,
			.financial-table-reflow th {
				width: 100%;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				float: left;
				clear: left;
			}
		}
	</style>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
    </div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Table Reflow: Heading groups</h1>

        <p>This table will stack the data into label value pairs at narrow widths. The grouped column headings are displayed as subheadings between data sets. The screen needs to be wide before it shows the tabular format so the media query is set to 72em (1,152px). There are custom styles for the first row to set the background to dark gray with white text and hide the label so it looks more like a section divider.</p>

        <div data-demo-html="true" data-demo-css="true">

        	<table data-role="table" id="financial-table-reflow" data-mode="reflow" class="financial-table-reflow table-stroke">
				<thead>
					<tr class="th-groups">
						<th></th>
						<th colspan="3">Q1 2012</th>
						<th colspan="3">Q2 2012</th>
						<th colspan="3">Q3 2012</th>
						<th colspan="3">Q4 2012</th>
						<th colspan="3" class="totals">YTD Totals</th>
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

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

</body>
</html>
