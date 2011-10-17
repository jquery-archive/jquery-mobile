<?php
$location = isset($_GET['location']) ? $_GET['location'] : '02135';

//get xml from google api
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://www.google.com/ig/api?weather='. $location);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10); 
$result = curl_exec($ch); 
curl_close($ch);

//parse xml (thx KomunitasWeb.com for pointers)
$xml = simplexml_load_string($result);
$information = $xml->xpath("/xml_api_reply/weather/forecast_information");
$current = $xml->xpath("/xml_api_reply/weather/current_conditions");
$forecast_list = $xml->xpath("/xml_api_reply/weather/forecast_conditions");
?>
<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>jQuery Mobile Framework - Weather for <?php echo $information[0]->city['data']; ?></title> 
	<link rel="stylesheet"  href="../../css/themes/default/" />
	<script src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.0a2/jquery.mobile-1.0a2.min.js"></script>
	<style>
		.current { text-align: left; }
		h1 { font-size: 1.3em; text-align: center;  }
		.ui-listview img { left: auto; margin: 10px; position: absolute; right: 10px; }
		.current { position: relative; }
		.current img { float: left; margin: 5px 10px 0 0; }
		.current p { font-weight: bold; font-size: 1.1em; margin-left: 20px; }
		.ui-mobile label { position: absolute; left: -9999px; }
		.ui-input-search, .min-width-480px .ui-input-search { margin: 5px auto; width: auto; float: none; display: block; }
	</style>
	<script>
		$('div').live('pagecreate',function(){
			$('.ui-listview img').removeClass('ui-corner-bl');
		});
	</script>
</head> 
<body> 

<div data-role="page" data-theme="a">

	<form action="" method="get" class="ui-body ui-body-a ">
		<label for="location">Change zip code:</label>
		<input type="search" name="location" id="location" value="<?php echo$location; ?>" placeholder="zip code..." data-theme="a" />
		<input type="submit" data-role="nojs" value="submit" />
			</form>


	<div data-role="content">
		<h1>Currently in <?=$information[0]->city['data']; ?>:</h1>
		<div class="current ui-body ui-bar-a ui-corner-all">

            <img src="<?php echo 'http://www.google.com' . $current[0]->icon['data']?>" alt="weather">
            <p class="condition">
            <?php echo $current[0]->temp_f['data']; ?>&deg; F,
            <?php echo $current[0]->condition['data']; ?>
            
            </p>
        </div>


        <ul data-role="listview" data-inset="true" data-theme="a">
        	<li data-role="list-divider">This week's forecast</li>
        <?php foreach ($forecast_list as $forecast) : ?>
        
        	<li>
            <img src="<?php echo 'http://www.google.com' . $forecast->icon['data']; ?>"> 
            <h3><?php echo $forecast->day_of_week['data']; ?></h3>
            <p>
	            <?php echo $forecast->low['data']; ?>&deg; F - <?php echo $forecast->high['data']; ?>&deg; F,
	            <?php echo $forecast->condition['data']; ?>
            </p>
            </li>
        	
        <?php endforeach; ?>
		</ul> 
	</div>
	
	
</div>

</body>
</html>
