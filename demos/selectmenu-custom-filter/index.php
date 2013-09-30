<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Filterable inside custom select - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
	$.mobile.document

		// "filter-menu-menu" is the ID generated for the listview when it is created
		// by the custom selectmenu plugin. Upon creation of the listview widget we
		// want to prepend an input field to the list to be used for a filter.
		.on( "listviewcreate", "#filter-menu-menu", function( e ) {
			var input,
				listbox = $( "#filter-menu-listbox" ),
				form = listbox.jqmData( "filter-form" ),
				listview = $( e.target );

			// We store the generated form in a variable attached to the popup so we
			// avoid creating a second form/input field when the listview is
			// destroyed/rebuilt during a refresh.
			if ( !form ) {
				input = $( "<input data-type='search'></input>" );
				form = $( "<form></form>" ).append( input );

				input.textinput();

				$( "#filter-menu-listbox" )
					.prepend( form )
					.jqmData( "filter-form", form );
			}

			// Instantiate a filterable widget on the newly created listview and
			// indicate that the generated input is to be used for the filtering.
			listview.filterable({ input: input });
		})

		// The custom select list may show up as either a popup or a dialog,
		// depending how much vertical room there is on the screen. If it shows up
		// as a dialog, then the form containing the filter input field must be
		// transferred to the dialog so that the user can continue to use it for
		// filtering list items.
		//
		// After the dialog is closed, the form containing the filter input is
		// transferred back into the popup.
		.on( "pagebeforeshow pagehide", "#filter-menu-dialog", function( e ) {
			var form = $( "#filter-menu-listbox" ).jqmData( "filter-form" ),
				placeInDialog = ( e.type === "pagebeforeshow" ),
				destination = placeInDialog ? $( e.target ).find( ".ui-content" ) : $( "#filter-menu-listbox" );

			form
				.find( "input" )

				// Turn off the "inset" option when the filter input is inside a dialog
				// and turn it back on when it is placed back inside the popup, because
				// it looks better that way.
				.textinput( "option", "inset", !placeInDialog )
				.end()
				.prependTo( destination );
		});
	</script>
	<style>
		.ui-selectmenu.ui-popup .ui-input-search {
			margin-left: .5em;
			margin-right: .5em;
		}
		.ui-selectmenu.ui-dialog .ui-content {
			padding-top: 0;
		}
		.ui-selectmenu.ui-dialog .ui-selectmenu-list {
			margin-top: 0;
		}
		.ui-selectmenu.ui-popup .ui-selectmenu-list li.ui-first-child .ui-btn {
			border-top-width: 1px;
			-webkit-border-radius: 0;
			border-radius: 0;
		}
		.ui-selectmenu.ui-dialog .ui-header {
			border-bottom-width: 1px;
		}
	</style>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left" role="button">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right" role="button">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

    <h1>Filterable inside custom select</h1>

		<p>
		This examples shows how you can filter the list inside a custom select menu.
		</p>

		<p>You can create an input field and prepend it to the popup and/or the dialog used by the custom select menu list and you can use it to filter items inside the list by instantiating a filterable widget on the list.</p>

		<div data-demo-html="true" data-demo-js="true" data-demo-css="true">
			<form>
				<select id="filter-menu" data-native-menu="false">
					<option value="SFO">San Francisco</option>
					<option value="LAX">Los Angeles</option>
					<option value="YVR">Vancouver</option>
					<option value="YYZ">Toronto</option>
				</select>
			</form>
		</div>

	</div><!-- /content -->

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
