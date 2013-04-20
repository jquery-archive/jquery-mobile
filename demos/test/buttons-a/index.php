<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Button test - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<script src="../../../js/jquery.js"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page">

	<div data-role="header">
		<h1>Button test</h1>
		<a href="../../" data-rel="back" data-icon="back" data-iconpos="notext">Back</a>
	</div><!-- /header -->

	<div data-role="content">

			
				<a href="#" data-role="button">Anchor</a>
				<form>
					<button>Button</button>
					<input type="button" value="Input">
					<input type="submit" value="Submit">
					<input type="reset" value="Reset">
				</form>
			

			
				<p>
					<a href="#" data-role="button" data-inline="true">True</a>
					<a href="#" data-role="button" data-inline="true">False</a>
				</p>
			

			
				<p>
					<a href="#" data-role="button" data-theme="a" data-inline="true">A</a>
					<a href="#" data-role="button" data-theme="b" data-inline="true">B</a>
				</p>
			

			
				<p>
					<a href="#" data-role="button" data-mini="true" data-inline="true">Cancel</a>
					<a href="#" data-role="button" data-mini="true" data-inline="true" data-icon="check" data-theme="b">Place order</a>
				</p>
			

			
				<a href="#" data-role="button" data-icon="plus" data-iconpos="notext" data-inline="true">Plus</a>
				<a href="#" data-role="button" data-icon="minus" data-iconpos="notext" data-inline="true">Minus</a>
				<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-inline="true">Delete</a>
				<a href="#" data-role="button" data-icon="arrow-l" data-iconpos="notext" data-inline="true">Arrow left</a>
				<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-inline="true">Arrow right</a>
				<a href="#" data-role="button" data-icon="arrow-u" data-iconpos="notext" data-inline="true">Arrow up</a>
				<a href="#" data-role="button" data-icon="arrow-d" data-iconpos="notext" data-inline="true">Arrow down</a>
				<a href="#" data-role="button" data-icon="check" data-iconpos="notext" data-inline="true">Check</a>
				<a href="#" data-role="button" data-icon="gear" data-iconpos="notext" data-inline="true">Gear</a>
				<a href="#" data-role="button" data-icon="refresh" data-iconpos="notext" data-inline="true">Refresh</a>
				<a href="#" data-role="button" data-icon="forward" data-iconpos="notext" data-inline="true">Forward</a>
				<a href="#" data-role="button" data-icon="back" data-iconpos="notext" data-inline="true">Back</a>
				<a href="#" data-role="button" data-icon="grid" data-iconpos="notext" data-inline="true">Grid</a>
				<a href="#" data-role="button" data-icon="star" data-iconpos="notext" data-inline="true">Star</a>
				<a href="#" data-role="button" data-icon="alert" data-iconpos="notext" data-inline="true">Alert</a>
				<a href="#" data-role="button" data-icon="info" data-iconpos="notext" data-inline="true">Info</a>
		        <a href="#" data-role="button" data-icon="home" data-iconpos="notext" data-inline="true">Home</a>
		        <a href="#" data-role="button" data-icon="search" data-iconpos="notext" data-inline="true">Search</a>
				<a href="#" data-role="button" data-icon="bars" data-iconpos="notext" data-inline="true">Bars</a>
				<a href="#" data-role="button" data-icon="edit" data-iconpos="notext" data-inline="true">Edit</a>
			

			
					<a href="#" data-role="button" data-inline="true">Text only</a>
					<a href="#" data-role="button" data-icon="arrow-l" data-iconpos="left" data-inline="true">Left</a>
					<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right" data-inline="true">Right</a>
					<a href="#" data-role="button" data-icon="arrow-u" data-iconpos="top" data-inline="true">Top</a>
					<a href="#" data-role="button" data-icon="arrow-d" data-iconpos="bottom" data-inline="true">Bottom</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-inline="true">Icon only</a>
			

			
				<div data-role="controlgroup">
					<a href="#" data-role="button">Timeline</a>
					<a href="#" data-role="button">Mentions</a>
					<a href="#" data-role="button">Retweets</a>
				</div>
			

			
				<div data-role="controlgroup" data-type="horizontal">
					<a href="#" data-role="button">Yes</a>
					<a href="#" data-role="button">No</a>
					<a href="#" data-role="button">Maybe</a>
				</div>
			

			
				<div data-role="controlgroup" data-type="horizontal" data-mini="true">
				    <a href="#" data-role="button" data-iconpos="notext" data-icon="plus" data-theme="b">Add</a>
				    <a href="#" data-role="button" data-iconpos="notext" data-icon="delete" data-theme="b">Delete</a>
				    <a href="#" data-role="button" data-iconpos="notext" data-icon="grid" data-theme="b">More</a>
				</div>
			

			
				<a href="#" data-role="button" data-icon="gear" data-theme="b">Default</a>
				<a href="#" data-role="button" data-icon="gear" data-corners="false" data-theme="b">No rounded corners</a>
				<a href="#" data-role="button" data-icon="gear" data-shadow="false" data-theme="b">No button shadow</a>
				<a href="#" data-role="button" data-icon="gear" data-iconshadow="false" data-theme="b">No icon disc shadow</a>
			

			
				<a href="#" data-role="button" class="ui-disabled">Disabled anchor via class</a>
				<form>
					<button disabled>Button with disabled attribute</button>
					<input type="button" value="Input with disabled attribute" disabled>
				</form>
			

	</div><!-- /content -->

	<div data-role="footer">
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->
</body>
</html>
