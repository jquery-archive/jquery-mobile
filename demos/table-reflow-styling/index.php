<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table Reflow: Custom styles - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style>
		/* These apply across all breakpoints because they are outside of a media query */
		/* Make the labels light gray all caps across the board */
		.movie-list thead th,
		.movie-list tbody th .ui-table-cell-label,
		.movie-list tbody td .ui-table-cell-label {
			text-transform: uppercase;
			font-size: .7em;
			color: rgba(0,0,0,0.5);
			font-weight: normal;
		}
		/* White bg, large blue text for rank and title */
		.movie-list tbody th {
			font-size: 1.2em;
			background-color: #fff;
			color: #77bbff;
			text-align: center;
		}
		/*  Add a bit of extra left padding for the title */
		.movie-list tbody td.title {
			padding-left: .8em;
		}
		/* Add strokes */
		.movie-list thead th {
			border-bottom: 1px solid #d6d6d6; /* non-RGBA fallback */
			border-bottom: 1px solid rgba(0,0,0,.1);
		}
		.movie-list tbody th,
		.movie-list tbody td {
			border-bottom: 1px solid #e6e6e6; /* non-RGBA fallback  */
			border-bottom: 1px solid rgba(0,0,0,.05);
		}
		/*  Custom stacked styles for mobile sizes */
		/*  Use a max-width media query so we don't have to undo these styles */
		@media (max-width: 40em) {
			/*  Negate the margin between sections */
			.movie-list tbody th {
				margin-top: 0;
				text-align: left;
			}
			/*  White bg, large blue text for rank and title */
			.movie-list tbody th,
			.movie-list tbody td.title {
				display: block;
				font-size: 1.2em;
				line-height: 110%;
				padding: .5em .5em;
				background-color: #fff;
				color: #77bbff;
				-moz-box-shadow: 0 1px 6px rgba(0,0,0,.1);
				-webkit-box-shadow: 0 1px 6px rgba(0,0,0,.1);
				box-shadow: 0 1px 6px rgba(0,0,0,.1);
			}
			/*  Hide labels for rank and title */
			.movie-list tbody th .ui-table-cell-label,
			.movie-list tbody td.title .ui-table-cell-label {
				display: none;
			}
			/*  Position the title next to the rank, pad to the left */
			.movie-list tbody td.title {
				margin-top: -2.1em;
				padding-left: 2.2em;
				border-bottom: 1px solid rgba(0,0,0,.15);
			}
			/*  Make the data bold */
			.movie-list th,
			.movie-list td {
				font-weight: bold;
			}
			/* Make the label elements a percentage width */
			.movie-list td .ui-table-cell-label,
			.movie-list th .ui-table-cell-label {
				min-width: 20%;
			}
		}

		/* Media query to show as a standard table at wider widths */
		@media ( min-width: 40em ) {
			/* Show the table header rows */
			.movie-list td,
			.movie-list th,
			.movie-list tbody th,
			.movie-list tbody td,
			.movie-list thead td,
			.movie-list thead th {
				display: table-cell;
				margin: 0;
			}
			/* Hide the labels in each cell */
			.movie-list td .ui-table-cell-label,
			.movie-list th .ui-table-cell-label {
				display: none;
			}
		}
		/* Hack to make IE9 and WP7.5 treat cells like block level elements */
		/* Applied in a max-width media query up to the table layout breakpoint so we don't need to negate this */
		@media ( max-width: 40em ) {
			.movie-list td,
			.movie-list th {
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

		<h1>Table Reflow: Custom styles</h1>

		<p>Custom styles for the reflow table at stacked widths.</p>

        <h3>Top Movies</h3>

		<div data-demo-html="true" data-demo-css="true">

            <table data-role="table" id="movie-table-custom" data-mode="reflow" class="movie-list">
              <thead>
                <tr>
                  <th data-priority="1">Rank</th>
                  <th style="width:40%">Movie Title</th>
                  <th data-priority="2">Year</th>
                  <th data-priority="3"><abbr title="Rotten Tomato Rating">Rating</abbr></th>
                  <th data-priority="4">Reviews</th>
                  <th data-priority="4">Director</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/Citizen_Kane" data-rel="external">Citizen Kane</a></td>
                  <td>1941</td>
                  <td>100%</td>
                  <td>74</td>
                  <td>Orson Welles</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/Casablanca_(film)" data-rel="external">Casablanca</a></td>
                  <td>1942</td>
                  <td>97%</td>
                  <td>64</td>
                  <td>Michael Curtiz</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/The_Godfather" data-rel="external">The Godfather</a></td>
                  <td>1972</td>
                  <td>97%</td>
                  <td>87</td>
                  <td>Francis Ford Coppola</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>
                  <td>1939</td>
                  <td>96%</td>
                  <td>87</td>
                  <td>Victor Fleming</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>
                  <td>1962</td>
                  <td>94%</td>
                  <td>87</td>
                  <td>Sir David Lean</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>
                  <td>1964</td>
                  <td>92%</td>
                  <td>74</td>
                  <td>Stanley Kubrick</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>
                  <td>1967</td>
                  <td>91%</td>
                  <td>122</td>
                  <td>Mike Nichols</td>
                </tr>
                <tr>
                  <th>8</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>
                  <td>1939</td>
                  <td>90%</td>
                  <td>72</td>
                  <td>Victor Fleming</td>
                </tr>
                <tr>
                  <th>9</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin' in the Rain</a></td>
                  <td>1952</td>
                  <td>89%</td>
                  <td>85</td>
                  <td>Stanley Donen, Gene Kelly</td>
                </tr>
                <tr>
                  <th>10</th>
                  <td class="title"><a href="https://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>
                  <td>2010</td>
                  <td>84%</td>
                  <td>78</td>
                  <td>Christopher Nolan</td>
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
