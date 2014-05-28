<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table Column toggle: Customization options - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="financial-table-style">
.financial-table-columns-button {
	margin: 0;
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

        <h1>Table Column toggle: Customization options</h1>

        <p>This table illustrates the standard customization options for a column toggle table. The table has a custom theme and label text for the column chooser button, and a theme set on the popup.</p>

        <p>The table background is themed by adding <code>class="ui-body-d"</code> to the table element. The table header is given a themed appearance by adding the <code>class="ui-bar-d"</code> to the header row. The striped rows are created by adding the <code>table-stripe</code> class to the table element.</p>

        <h3>Top Movies</h3>

		<div data-demo-html="true">

			<table data-role="table" id="table-custom-2" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-button-theme="b" data-column-button-text="Columns to display..." data-column-popup-theme="a">

                <thead>
                  <tr class="ui-bar-d">
                    <th data-priority="2">Rank</th>
                    <th>Movie Title</th>
                    <th data-priority="3">Year</th>
                    <th data-priority="1"><abbr title="Rotten Tomato Rating">Rating</abbr></th>
                    <th data-priority="5">Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td><a href="https://en.wikipedia.org/wiki/Citizen_Kane" data-rel="external">Citizen Kane</a></td>
                    <td>1941</td>
                    <td>100%</td>
                    <td>74</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td><a href="https://en.wikipedia.org/wiki/Casablanca_(film)" data-rel="external">Casablanca</a></td>
                    <td>1942</td>
                    <td>97%</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td><a href="https://en.wikipedia.org/wiki/The_Godfather" data-rel="external">The Godfather</a></td>
                    <td>1972</td>
                    <td>97%</td>
                    <td>87</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td><a href="https://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>
                    <td>1939</td>
                    <td>96%</td>
                    <td>87</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td><a href="https://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>
                    <td>1962</td>
                    <td>94%</td>
                    <td>87</td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <td><a href="https://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>
                    <td>1964</td>
                    <td>92%</td>
                    <td>74</td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td><a href="https://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>
                    <td>1967</td>
                    <td>91%</td>
                    <td>122</td>
                  </tr>
                  <tr>
                    <th>8</th>
                    <td><a href="https://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>
                    <td>1939</td>
                    <td>90%</td>
                    <td>72</td>
                  </tr>
                  <tr>
                    <th>9</th>
                    <td><a href="https://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin' in the Rain</a></td>
                    <td>1952</td>
                    <td>89%</td>
                    <td>85</td>
                  </tr>
                  <tr>
                    <th>10</th>
                    <td class="title"><a href="https://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>
                    <td>2010</td>
                    <td>84%</td>
                    <td>78</td>
                  </tr>
                </tbody>
              </table>

		</div><!-- /data-demo -->

		<h2>No Button</h2>
		<p>You can prevent the table widget from generating a button by adding the <code>data-column-button="false"</code> attribute to the table element. The popup will still be created, and it will have an ID that is equal to the ID of the table plus the suffix <code>"-popup"</code>, so you can manually add an anchor that will open the popup.</p>

		<div data-demo-html="true" data-demo-css="#financial-table-style">
			<table data-role="table" id="financial-table" data-mode="columntoggle" class="ui-responsive" data-column-button="false">
				<thead>
					<tr class="th-groups">
						<td><a href="#financial-table-popup" data-rel="popup" class="financial-table-columns-button ui-btn ui-corner-all">Quarters</a></td>
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
		  </div>
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
