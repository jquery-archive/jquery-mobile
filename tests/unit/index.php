<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
	<link rel="stylesheet" href="../../external/qunit.css"></link>
</head>
<body>
  <div style="float: left; width: 500px;">
    <h1 id="qunit-header"><a href="#">jQuery Mobile Test Suite</a></h1>
    <h2 id="qunit-banner"></h2>
    <ol id="qunit-tests">
    </ol>
  </div>
  <!-- under normal circumstances inline styles would be a poor choice, but in this case
       I think an entire link and stylesheet is a waste -->
	<iframe data-src="../../tests/unit/{{testdir}}" name="testFrame" id="testFrame" width="800px" height="100%" style="float: left; border: 0px; height: 100%;" scrolling="no">
	</iframe>
	<script src="../../js/jquery.js"></script>
	<script src="../../external/qunit.js"></script>
	<script src="runner.js"></script>
</body>
</html>
