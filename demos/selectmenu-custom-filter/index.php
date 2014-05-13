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
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
$.mobile.document

	// The custom selectmenu plugin generates an ID for the listview by suffixing the ID of the
	// native widget with "-menu". Upon creation of the listview widget we want to place an
	// input field before the list to be used for a filter.
	.on( "listviewcreate", "#filter-menu-menu,#title-filter-menu-menu", function( event ) {
		var input,
			list = $( event.target )
			form = list.jqmData( "filter-form" );

		// We store the generated form in a variable attached to the popup so we avoid creating a
		// second form/input field when the listview is destroyed/rebuilt during a refresh.
		if ( !form ) {
			input = $( "<input data-type='search'></input>" );
			form = $( "<form></form>" ).append( input );

			input.textinput();

			list
				.before( form )
				.jqmData( "filter-form", form )	;
			form.jqmData( "listview", list );
		}

		// Instantiate a filterable widget on the newly created listview and indicate that the
		// generated input is to be used for the filtering.
		list.filterable({
			input: input,
			children: "> li:not(:jqmData(placeholder='true'))"
		});
	})

	// The custom select list may show up as either a popup or a dialog, depending how much
	// vertical room there is on the screen. If it shows up as a dialog, then the form containing
	// the filter input field must be transferred to the dialog so that the user can continue to
	// use it for filtering list items.
	.on( "pagebeforeshow", "#filter-menu-dialog,#title-filter-menu-dialog", function( event ) {
		var dialog = $( event.target )
			listview = dialog.find( "ul" ),
			form = listview.jqmData( "filter-form" );

		// Attach a reference to the listview as a data item to the dialog, because during the
		// pagehide handler below the selectmenu widget will already have returned the listview
		// to the popup, so we won't be able to find it inside the dialog with a selector.
		dialog.jqmData( "listview", listview );

		// Place the form before the listview in the dialog.
		listview.before( form );
	})

	// After the dialog is closed, the form containing the filter input is returned to the popup.
	.on( "pagehide", "#filter-menu-dialog,#title-filter-menu-dialog", function( event ) {
		var listview = $( event.target ).jqmData( "listview" ),
			form = listview.jqmData( "filter-form" );

		// Put the form back in the popup. It goes ahead of the listview.
		listview.before( form );
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
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

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

		<p>You can also handle custom menus with placeholder items:</p>

		<div data-demo-html="true" data-demo-js="true" data-demo-css="true">
			<form>
				<select id="title-filter-menu" data-native-menu="false">
					<option>Select fruit...</option>
					<option value="orange">Orange</option>
					<option value="apple">Apple</option>
					<option value="peach">Peach</option>
					<option value="lemon">Lemon</option>
				</select>
			</form>
		</div>

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
