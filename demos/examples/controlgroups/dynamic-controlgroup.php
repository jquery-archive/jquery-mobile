<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dynamic controlgroup - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script>
		( function( $, undefined ) {
			var counter = 0;
			$( document ).bind( "pageinit", function( e ) {
				$( "#prepend, #append", e.target ).on( "click", function( e ) {
					counter++;

					var widgetType = $( "[name='radio-widget']:checked" ).attr( "id" ),
						group = $( "#my-controlgroup" ),
						$el,
						action = function() {
							var action = $( "[name='radio-action']:checked" ).attr( "id" );
							if ( $( $el[1] ).is( "select" ) && action === "hide" ) {
								$el = $( $el[1] ).parents( ".ui-select" );
							}
							$el[ action ]();
							group.controlgroup( "refresh" );
						};

					if ( widgetType === "link" ) {

						$el = $( "<a href='#'>Link " + counter + "</a>" ).bind( "click", action );
						$( "#my-controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
						$el.buttonMarkup();

					} else if ( widgetType === "select" ) {

						$el = $( "<label for='widget" + counter + "'>Select " + counter + "</label><select id='widget" + counter + "'><option value='option1'>Select " + counter + "</option><option value='option2'>Select option</option></select>" );
						$( $el[ 1 ] ).bind( "change", action);
						$( "#my-controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
						$( $el[ 1 ] ).selectmenu();

					} else {

						$el = $( "<label for='widget" + counter + "'>Checkbox " + counter + "</label><input type='checkbox' id='widget" + counter + "'></input>" );
						$( $el[ 1 ] ).bind( "change", action );
						$( "#my-controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
						$( $el[ 1 ] ).checkboxradio();

					}

					group.controlgroup( "refresh" );
				});

				$( "[name='radio-orientation']" ).bind( "change", function( e ) {
					$( "#my-controlgroup" ).controlgroup( "option", "type", ( $( "#isHorizontal" ).is( ":checked" ) ? "horizontal" : "vertical" ) );
				});
			});
		})( jQuery );
	</script>
	<style>

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

	<div data-role="content" class="jqm-content">

        <h1>Dynamic controlgroup</h1>

        <p>This demo shows how you can dynamically make changes to a controlgroup.</p>

        <div data-demo-html="true" data-demo-js="true" data-demo-css="true">

            <form>
            	<div class="ui-body ui-body-d ui-corner-all">
                	<p>Controlgroup...</p>
                	<div data-role="controlgroup" id="my-controlgroup"><!-- items will be injected here --></div>
                </div>
            </form>

            <div data-role="fieldcontain">
                <label for="prepend">Add item</label>
                <button id="prepend" data-role="button" data-mini="true" data-inline="true">Prepend</button>
                <label for="append" class="ui-hidden-accessible">Action</label>
                <button id="append" data-role="button" data-mini="true" data-inline="true">Append</button>
            </div>

            <form action="#" method="get">
            	<div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Widget type</legend>
    
                        <input type="radio" name="radio-widget" id="link" value="link" checked="checked">
                        <label for="link">Link</label>
    
                        <input type="radio" name="radio-widget" id="select" value="select">
                        <label for="select">Select</label>
    
                        <input type="radio" name="radio-widget" id="checkbox" value="checkbox">
                        <label for="checkbox">Checkbox</label>
                    </fieldset>
            	</div>

            	<div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Action<br><small>on click/change</small></legend>
    
                        <input type="radio" name="radio-action" id="remove" value="remove" checked="checked">
                        <label for="remove">Remove</label>
    
                        <input type="radio" name="radio-action" id="hide" value="hide">
                        <label for="hide">Hide</label>
    
                        <input type="radio" name="radio-action" id="width" value="width">
                        <label for="width">Nothing</label>
                    </fieldset>
            	</div>

            	<div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Switch orientation</legend>
    
                        <input type="radio" name="radio-orientation" id="isVertical" value="isVertical" checked="checked">
                        <label for="isVertical">Vertical</label>
    
                        <input type="radio" name="radio-orientation" id="isHorizontal" value="isHorizontal">
                        <label for="isHorizontal">Horizontal</label>
                    </fieldset>
            	</div>
                
            </form>

        </div><!--/demo-html -->

		</div><!-- /content -->

		<div data-role="footer" class="jqm-footer">
			<p class="jqm-version"></p>
			<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->
	</body>
	</html>
