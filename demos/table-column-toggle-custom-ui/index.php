<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table Column toggle: Custom column togglers - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="demo-script">
( function( $ ) {

var ui = $.extend( function( key, reCache ) {
		if ( !ui.cached[ key ] || reCache ) {
			ui.cached[ key ] = ui[ key ]();
		}
		return ui.cached[ key ];
	}, {
		cached: {},
		table: function() {
			return $( "#custom-ui-example" );
		},
		headers: function() {
			return $( "thead > tr:first-child > *", this( "table" ) );
		},
		firstRow: function() {
			return $( "tbody > tr:first-child > *", this( "table" ) );
		},
		checkboxes: function() {
			return $( "#custom-ui-example-footer input" );
		}
	});

function updateHeaders() {
	var firstRow = ui( "firstRow" ),
		checkboxes = ui( "checkboxes" );

	ui( "headers" ).each( function( index ) {
		$( this ).width( firstRow.eq( index ).width() );
		checkboxes.filter( "[value='" + index + "']" )
			.prop( "checked", firstRow.eq( index ).css( "display" ) === "table-cell" )
			.checkboxradio( "refresh" );
	});
}

$( window ).on( "throttledresize", updateHeaders );

$( document )
	.on( "pagecreate", "#demo-page", function() {

		// Adds a class that hides the headers and checkbox so they don't appear in the wrong state
		// when the page is first shown
		ui( "headers" ).addClass( "ui-loading" );
		ui( "checkboxes" ).parent().addClass( "ui-loading" );
	})
	.on( "pagecontainershow", function( event, data ) {
		if ( data.toPage.attr( "id" ) === "demo-page" ) {
			updateHeaders();

			// After the headers have been updated, it's safe to remove the ui-loading class
			ui( "headers" ).removeClass( "ui-loading" );
			ui( "checkboxes" ).parent().removeClass( "ui-loading" );
		}
	})
	.on( "change", "#custom-ui-example-footer input", function() {
		var checkbox = $( this );

		ui( "table" ).table( "setColumnVisibility",
			parseInt( checkbox.val() ), checkbox.prop( "checked" ) );
		updateHeaders();
	});

$( document ).on( "toolbarcreate", "#custom-ui-example-footer", function() {
	$( this ).controlgroup({
		type: "horizontal",
		enhanced: true
	});
});

})( jQuery );
	</script>
	<style id="demo-style">
#custom-ui-example-footer .ui-checkbox.ui-loading,
#custom-ui-example > thead > tr:first-child > th.ui-loading {
	visibility: hidden;
}

#custom-ui-example > thead > tr:first-child {
	border-bottom-width: 0;
}

#custom-ui-example th,
#custom-ui-example td {
	box-sizing: border-box;
}

#custom-ui-example-footer {
	border-top-width: 0;
	border-bottom-width: 0;
}

#custom-ui-example-footer .ui-controlgroup-controls,
#custom-ui-example-footer label {
	display: block;
}

#custom-ui-example-footer .ui-btn.ui-first-child {
	border-left-width: 0;
}

#custom-ui-example-footer .ui-btn.ui-last-child {
	border-right-width: 0;
}

#custom-ui-example-footer .ui-btn {
	white-space: nowrap;
	text-align: center;
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

        <h1>Table Column toggle: Custom column togglers</h1>

		<p>You can create your own controls for allowing users to manipulate the visibility of individual table columns instead of using the built-in button plus popup combination. The best way to achieve this is to use the <a href="http://jquerymobile.com/download-builder/">download builder</a> to create a version of jQuery Mobile that does not contain the columntoggle table's popup extension. That way, you retain the ability to show/hide columns both responsively and on-demand (via the <code>setColumnVisibility()</code> method) while removing the superfluous code weight of the popup extension and the startup performance cost of constructing a popup, a controlgroup, several checkboxes, and a button.</p>

		<a href="#demo-page" class="ui-btn ui-btn-inline ui-corner-all ui-shadow">Open demo</a>

		<div data-demo-html="#demo-page" data-demo-css="#demo-style" data-demo-js="#demo-script"></div><!--/demo-html -->

	</div><!-- /content -->


	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

	<div data-role="page" id="demo-page">
		<table data-role="table" id="custom-ui-example" data-column-button="false" data-column-ui="false" data-mode="columntoggle" class="ui-responsive table-stroke">
			<thead>
				<tr id="custom-ui-example-header-row" data-role="header" data-position="fixed" data-tap-toggle="false">
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
					<td><a href="http://en.wikipedia.org/wiki/Citizen_Kane" data-rel="external">Citizen Kane</a></td>
					<td>1941</td>
					<td>100%</td>
					<td>74</td>
				</tr>
				<tr>
					<th>2</th>
					<td><a href="http://en.wikipedia.org/wiki/Casablanca_(film)" data-rel="external">Casablanca</a></td>
					<td>1942</td>
					<td>97%</td>
					<td>64</td>
				</tr>
				<tr>
					<th>3</th>
					<td><a href="http://en.wikipedia.org/wiki/The_Godfather" data-rel="external">The Godfather</a></td>
					<td>1972</td>
					<td>97%</td>
					<td>87</td>
				</tr>
				<tr>
					<th>4</th>
					<td><a href="http://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>
					<td>1939</td>
					<td>96%</td>
					<td>87</td>
				</tr>
				<tr>
					<th>5</th>
					<td><a href="http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>
					<td>1962</td>
					<td>94%</td>
					<td>87</td>
				</tr>
					<tr>
					<th>6</th>
					<td><a href="http://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>
					<td>1964</td>
					<td>92%</td>
					<td>74</td>
				</tr>
				<tr>
					<th>7</th>
					<td><a href="http://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>
					<td>1967</td>
					<td>91%</td>
					<td>122</td>
				</tr>
				<tr>
					<th>8</th>
					<td><a href="http://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>
					<td>1939</td>
					<td>90%</td>
					<td>72</td>
				</tr>
				<tr>
					<th>9</th>
					<td><a href="http://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin' in the Rain</a></td>
					<td>1952</td>
					<td>89%</td>
					<td>85</td>
				</tr>
				<tr>
					<th>10</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>
					<td>2010</td>
					<td>84%</td>
					<td>78</td>
				</tr>
				<tr>
					<th>11</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Seven_Samurai" data-rel="external">Seven Samurai</a></td>
					<td>1954</td>
					<td>100%</td>
					<td>57</td>
				</tr>
				<tr>
					<th>12</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Scent_of_a_Woman_%281992_film%29" data-rel="external">Scent of a Woman</a></td>
					<td>1992</td>
					<td>88%</td>
					<td>42</td>
				</tr>
				<tr>
					<th>13</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Taxi_Driver_%28film%29" data-rel="external">Taxi Driver</a></td>
					<td>1976</td>
					<td>98%</td>
					<td>63</td>
				</tr>
				<tr>
					<th>14</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Patton_%28film%29" data-rel="external">Patton</a></td>
					<td>1970</td>
					<td>98%</td>
					<td>41</td>
				</tr>
				<tr>
					<th>15</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Metropolis_%28film%29" data-rel="external">Metropolis</a></td>
					<td>1927</td>
					<td>99%</td>
					<td>115</td>
				</tr>
				<tr>
					<th>16</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/King_Kong_%281933_film%29" data-rel="external">King Kong</a></td>
					<td>1933</td>
					<td>98%</td>
					<td>54</td>
				</tr>
				<tr>
					<th>17</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/On_The_Waterfront" data-rel="external">On the Waterfront</a></td>
					<td>1954</td>
					<td>100%</td>
					<td>56</td>
				</tr>
				<tr>
					<th>18</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Lawrence_Of_Arabia_%28film%29" data-rel="external">Lawrance of Arabia</a></td>
					<td>1962</td>
					<td>99%</td>
					<td>70</td>
				</tr>
				<tr>
					<th>19</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Apocalypse_Now" data-rel="external">Apocalypse Now</a></td>
					<td>1979</td>
					<td>99%</td>
					<td>76</td>
				</tr>
				<tr>
					<th>20</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Finding_Nemo" data-rel="external">Finding Nemo</a></td>
					<td>2003</td>
					<td>99%</td>
					<td>238</td>
				</tr>
				<tr>
					<th>21</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Toy_Story" data-rel="external">Toy Story</a></td>
					<td>1995</td>
					<td>100%</td>
					<td>78</td>
				</tr>
				<tr>
					<th>22</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Jaws_%28film%29" data-rel="external">Jaws</a></td>
					<td>1975</td>
					<td>98%</td>
					<td>63</td>
				</tr>
				<tr>
					<th>23</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/The_Terminator" data-rel="external">The Terminator</a></td>
					<td>1984</td>
					<td>100%</td>
					<td>50</td>
				</tr>
				<tr>
					<th>24</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Aliens_%28film%29" data-rel="external">Aliens</a></td>
					<td>1986</td>
					<td>98%</td>
					<td>59</td>
				</tr>
				<tr>
					<th>25</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Airplane!" data-rel="external">Airplane!</a></td>
					<td>1980</td>
					<td>98%</td>
					<td>56</td>
				</tr>
				<tr>
					<th>26</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/E.T._the_Extra-Terrestrial" data-rel="external">E.T. the Extra-Terrestrial</a></td>
					<td>1982</td>
					<td>98%</td>
					<td>98</td>
				</tr>
				<tr>
					<th>27</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/The_Good,_The_Bad_and_The_Ugly" data-rel="external">The Good, the Bad and the Ugly</a></td>
					<td>1966</td>
					<td>97%</td>
					<td>67</td>
				</tr>
				<tr>
					<th>28</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Saving_Private_Ryan" data-rel="external">Saving Private Ryan</a></td>
					<td>1998</td>
					<td>92%</td>
					<td>116</td>
				</tr>
				<tr>
					<th>29</th>
					<td class="title"><a href="http://en.wikipedia.org/wiki/Brazil_%281985_film%29" data-rel="external">Brazil</a></td>
					<td>1985</td>
					<td>98%</td>
					<td>45</td>
				</tr>
			</tbody>
		</table>
		<form id="custom-ui-example-footer" data-role="footer" data-position="fixed" data-tap-toggle="false" class="ui-controlgroup ui-controlgroup-horizontal">
			<div class="ui-controlgroup-controls ui-grid-c">
				<label><input type="checkbox" value="0" data-wrapper-class="ui-block-a">Rank</label>
				<label><input type="checkbox" value="2" data-wrapper-class="ui-block-b">Year</label>
				<label><input type="checkbox" value="3" data-wrapper-class="ui-block-c">Rotten Tomato Rating</label>
				<label><input type="checkbox" value="4" data-wrapper-class="ui-block-d">Reviews</label>
			</div>
		</form>
	</div>

</body>
</html>
