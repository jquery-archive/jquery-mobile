<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table Reflow: Stripes and strokes - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style>
		.movie-list thead th,
		.movie-list tbody tr:last-child {
			border-bottom: 1px solid #d6d6d6; /* non-RGBA fallback */
			border-bottom: 1px solid rgba(0,0,0,.1);
		}
		.movie-list tbody th,
		.movie-list tbody td {
			border-bottom: 1px solid #e6e6e6; /* non-RGBA fallback  */
			border-bottom: 1px solid rgba(0,0,0,.05);
		}
		.movie-list tbody tr:last-child th,
		.movie-list tbody tr:last-child td {
			border-bottom: 0;
		}
		.movie-list tbody tr:nth-child(odd) td,
		.movie-list tbody tr:nth-child(odd) th {
			background-color: #eeeeee; /* non-RGBA fallback  */
			background-color: rgba(0,0,0,.04);
		}
    </style>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
        <a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
        <a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
    </div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Table Reflow: Stripes and strokes</h1>

        <h3>Top Movies</h3>

		<div data-demo-html="true" data-demo-css="true">

            <table data-role="table" id="movie-table-custom" data-mode="reflow" class="movie-list ui-responsive">
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
                  <td class="title"><a href="http://en.wikipedia.org/wiki/Citizen_Kane" data-rel="external">Citizen Kane</a></td>
                  <td>1941</td>
                  <td>100%</td>
                  <td>74</td>
                  <td>Orson Welles</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/Casablanca_(film)" data-rel="external">Casablanca</a></td>
                  <td>1942</td>
                  <td>97%</td>
                  <td>64</td>
                  <td>Michael Curtiz</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/The_Godfather" data-rel="external">The Godfather</a></td>
                  <td>1972</td>
                  <td>97%</td>
                  <td>87</td>
                  <td>Francis Ford Coppola</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>
                  <td>1939</td>
                  <td>96%</td>
                  <td>87</td>
                  <td>Victor Fleming</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>
                  <td>1962</td>
                  <td>94%</td>
                  <td>87</td>
                  <td>Sir David Lean</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>
                  <td>1964</td>
                  <td>92%</td>
                  <td>74</td>
                  <td>Stanley Kubrick</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>
                  <td>1967</td>
                  <td>91%</td>
                  <td>122</td>
                  <td>Mike Nichols</td>
                </tr>
                <tr>
                  <th>8</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>
                  <td>1939</td>
                  <td>90%</td>
                  <td>72</td>
                  <td>Victor Fleming</td>
                </tr>
                <tr>
                  <th>9</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin' in the Rain</a></td>
                  <td>1952</td>
                  <td>89%</td>
                  <td>85</td>
                  <td>Stanley Donen, Gene Kelly</td>
                </tr>
                <tr>
                  <th>10</th>
                  <td class="title"><a href="http://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>
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

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
