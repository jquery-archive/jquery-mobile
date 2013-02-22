<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dynamic controlgroup - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../_assets/favicon.ico">
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
						group = $( "#controlgroup" ),
						$el,
						action = function() {
							var option = $( "[name='radio-option']:checked" ).attr( "id" );
							$el[ option ](); group.controlgroup( "refresh" );
						};
		
					if ( widgetType === "link" ) {
						
						$el = $( "<a href='#'>Link " + counter + "</a>" ).bind( "click", action );
						$( "#controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
						$el.buttonMarkup();
						
					} else if ( widgetType === "select" ) {
						
						$el = $( "<label for='widget" + counter + "'>Select " + counter + "</label><select id='widget" + counter + "'><option id='widget" + counter + "' value='default'>Select " + counter + "</option><option value='remove'>Select</option></select>" );
						$( $el[ 1 ] ).bind( "change", action);
						$( "#controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
						$( $el[ 1 ] ).selectmenu();
						
					} else {
						
						$el = $( "<label for='widget" + counter + "'>Checkbox " + counter + "</label><input type='checkbox' id='widget" + counter + "'></input>" );
						$( $el[ 1 ] ).bind( "change", action );
						$( "#controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
						$( $el[ 1 ] ).checkboxradio();
						
					}
		
					group.controlgroup( "refresh" );
				});
				
				$( "[name='radio-orientation']" ).bind( "change", function( e ) {
					$( "#controlgroup" ).controlgroup( "option", "type", ( $( "#isHorizontal" ).is( ":checked" ) ? "horizontal" : "vertical" ) );
				});
			});
		})( jQuery );
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#panel-nav" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->
	
	<div data-role="content" class="jqm-content">
	
        <h1>Dynamic controlgroup</h1>
        
        <p>This demo shows how you can dynamically make changes to a controlgroup.</p> 
        
        <div data-demo-html="true" data-demo-js="true">
			<div class="ui-grid-a">
				<div class="ui-block-a">
                    <div data-role="fieldcontain">
                        <a href="#" id="prepend" data-role="button" data-corners="true" data-inline="true">Prepend</a>
                        <a href="#" id="append" data-role="button" data-corners="true" data-inline="true">Append</a>
                    </div>
					<form action="#" method="get">
                        <fieldset data-role="controlgroup" data-type="horizontal">
                            <legend>Widget type</legend>
                            
                            <input type="radio" name="radio-widget" id="link" value="link" checked="checked">
                            <label for="link">Link</label>

                            <input type="radio" name="radio-widget" id="select" value="select">
                            <label for="select">Select</label>

                            <input type="radio" name="radio-widget" id="checkbox" value="checkbox">
                            <label for="checkbox">Checkbox</label>
                        </fieldset>
                        
                        <fieldset data-role="controlgroup" data-type="horizontal">
                            <legend>Operation<br><small>click on the controlgroup item to perform</small></legend>
                            
                            <input type="radio" name="radio-option" id="remove" value="remove" checked="checked">
                            <label for="remove">Remove</label>

                            <input type="radio" name="radio-option" id="hide" value="hide">
                            <label for="hide">Hide</label>

                            <input type="radio" name="radio-option" id="width" value="width">
                            <label for="width">Nothing</label>
                        </fieldset>
                        
                        <fieldset data-role="controlgroup" data-type="horizontal">
                            <legend>Orientation</legend>
                            
                            <input type="radio" name="radio-orientation" id="isVertical" value="isVertical" checked="checked">
                            <label for="isVertical">Vertical</label>

                            <input type="radio" name="radio-orientation" id="isHorizontal" value="isHorizontal">
                            <label for="isHorizontal">Horizontal</label>
                        </fieldset>
					</form>
				</div><!-- /block-a -->
				<div class="ui-block-b">
                	<form>
						<div data-role="controlgroup" id="controlgroup"></div>
                    </form>
				</div><!-- /block-b -->
			</div><!-- /grid -->
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
