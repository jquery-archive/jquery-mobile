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
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>Grouped column headers</h1>
		
		<p>It's fairly common to need to logically group multiple columns together under a heading group for financial or scientific data. The framework can support the most simple version of this by allowing for two rows of table headers (<code>TH</code>), with the first row containing simple <code>colspan</code> attributes to group the columns below. In this configuration, the framework will add a  class to the label of the first cell in each group to allow you to style these differently and provide additional visual hierarchy. </p>

		<div data-demo-html="true">
		    <table data-role="table" id="temp-table" data-mode="reflow" class="ui-responsive table-stroke">
			<thead>
				<tr>
					<th data-priority="persist">Paris</th>
					<th colspan="2">Average Temperatures (C)</th>
					<th colspan="2">Average Rainfall</th>
				</tr>
				<tr>
					<th data-priority="persist">Month</th>
					<th data-priority="1">Minimum Temp</th>
					<th data-priority="1">Maximum Temp</th>
					<th data-priority="2">Precipitaion (mm)</th>
					<th data-priority="2">Rainfall Days</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Jaunuary</th>
					<td>3</td>
					<td>8</td>
					<td>17.8</td>
					<td>10</td>
				</tr>
				<tr>
					<th>February</th>
					<td>2</td>
					<td>9</td>
					<td>21.7</td>
					<td>9</td>
				</tr>
				<tr>
					<th>March</th>
					<td>4</td>
					<td>13</td>
					<td>24.2</td>
					<td>10</td>
				</tr>
				<tr>
					<th>April</th>
					<td>6</td>
					<td>15</td>
					<td>24.6</td>
					<td>11</td>
				</tr>
				<tr>
					<th>May</th>
					<td>10</td>
					<td>20</td>
					<td>26.2</td>
					<td>10</td>
				</tr>
				<tr>
					<th>June</th>
					<td>13</td>
					<td>23</td>
					<td>25.1</td>
					<td>9</td>
				</tr>
				<tr>
					<th>July</th>
					<td>15</td>
					<td>25</td>
					<td>21.7</td>
					<td>7</td>
				</tr>
				<tr>
					<th>August</th>
					<td>15</td>
					<td>25</td>
					<td>21.4</td>
					<td>7</td>
				</tr>
				<tr>
					<th>September</th>
					<td>11</td>
					<td>21</td>
					<td>15.6</td>
					<td>8</td>
				</tr>
				<tr>
					<th>October</th>
					<td>9</td>
					<td>17</td>
					<td>25.3</td>
					<td>11</td>
				</tr>
				<tr>
					<th>November</th>
					<td>5</td>
					<td>11</td>
					<td>22.4</td>
					<td>12</td>
				</tr>
				<tr>
					<th>December</th>
					<td>3</td>
					<td>8</td>
					<td>26.6</td>
					<td>12</td>
				</tr>
			</tbody>
		</table>
	</div><!--/demo-html -->
		</div><!-- /content -->

		<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
