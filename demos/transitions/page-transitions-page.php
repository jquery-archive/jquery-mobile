<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Transitions - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>

	<div data-role="page" id="page-success" data-dom-cache="true"><!-- page-->
		<div data-role="header" data-theme="a">
		<h1>Page</h1>
		</div><!-- /header -->

		<div class="ui-content" role="main">
		<p>That was an animated page transition effect to a page that we added with a <code>data-transition</code> attribute on the link. This uses a different background theme swatch to see how that looks with the transitions.</p>
		<p>Since it uses CSS animations, this should be hardware accelerated on many devices. To see transitions, 3D transform support is required so if you only saw a fade transition that's the reason.</p>

			<form action="#" method="get">
			<h2>Here's a few form elements</h2>

			<p>These are here to see if this slows down rendering.</p>

				<div class="ui-field-contain">
		         <label for="name">Text Input:</label>
		         <input type="text" name="name" id="name" value="">
				</div>

				<div class="ui-field-contain">
				<label for="textarea">Textarea:</label>
				<textarea cols="40" rows="8" name="textarea" id="textarea"></textarea>
				</div>

				<div class="ui-field-contain">
					<label for="slider2">Flip switch:</label>
					<select name="slider2" id="slider2" data-role="slider">
						<option value="off">Off</option>
						<option value="on">On</option>
					</select>
				</div>

				<div class="ui-field-contain">
					<label for="slider">Slider:</label>
				 	<input type="range" name="slider" id="slider" value="0" min="0" max="100" data-highlight="true">
				</div>

			</form>

			<a href="index.php" class="ui-btn ui-corner-all ui-shadow ui-btn-b ui-btn-inline" data-rel="back">Take me back</a>
		</div>

		<div data-role="footer" data-theme="a">
			<div style="margin:5px 10px;"><!-- To add a bit of spacing -->
			<label for="search" class="ui-hidden-accessible">Search:</label>
	        <input type="search" name="password" id="search" placeholder="Search..." value="">
			</div>
		</div><!-- /footer -->
	</div>
</body>
</html>
