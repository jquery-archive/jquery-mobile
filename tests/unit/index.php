<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
  <div style="float: left; width: 500px;">
    <h1 id="qunit-header"><a href="#">jQuery Mobile Complete Test Suite</a></h1>
    <h2 id="qunit-banner"></h2>
    <ol id="qunit-tests">
    </ol>
  </div>
	<iframe data-src="/tests/unit/{{testdir}}" name="testFrame" id="testFrame" width="800px" height="100%" style="float: left; border: 0px;" scrolling="no">
	</iframe>
	<link rel="stylesheet" href="../../external/qunit.css"></link>
	<script src="/js/jquery.js"></script>
	<script src="../../external/qunit.js"></script>
  <script type="text/javascript">
    window.testDirectories = [
  <?php
  // TODO move to php which produces json or data attrs. This is just dirty.
  if ($handle = opendir(getcwd())) {
    while (false !== ($file = readdir($handle))) {
      if (is_dir($file) && $file[0] !== "." ) {
         echo "'$file',\n";
      }
    }

    closedir($handle);
  }
  ?>
   ];
  </script>
	<script src="runner.js"></script>
</body>
</html>
