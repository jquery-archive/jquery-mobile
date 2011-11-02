<?php
  $db = new SQLiteDatabase('stats.db');

  // hand to God I tried CREATE TABLE IF NOT EXISTS and it persisted with
  // a syntax error. The IDENTICAL query sans IF NOT EXISTS works perfectly
  // http://www.sqlite.org/lang_createtable.html
  @$db->query('CREATE TABLE stats (id INTEGER, agent TEXT, point TEXT, value REAL, PRIMARY KEY (id))');

  // making a sad attempt here to provide a clean REST-respecting url scheme.
  // stats with a GET returns - wait for it - the stats, and a post with the
  // the right params will create a new entry
  if ( $_SERVER['REQUEST_METHOD'] == "GET" ) {
     $json = Array();
     $results = $db->query( 'SELECT point, value FROM stats' );

     // TODO not sure if there's a better way to convert db results into
     // a json encodable data structure
     while($row = $results->fetch(SQLITE3_ASSOC)){
          array_push($json, $row);
     }

     header("Content-Type: application/json");
     echo json_encode($json);
  }  elseif ( $_POST['datapoint'] && $_POST['value'] && $_POST['agent'] ){
     // TODO it is not clear from the docs if there's an easier way to do the
     // escaped query interpolation here. Suggestions welcome :(
     $data_point = sqlite_escape_string( $_POST['datapoint'] );
     $value = sqlite_escape_string( $_POST['value'] );
     $agent = sqlite_escape_string( $_POST['agent'] );
     $db->query('INSERT INTO stats (agent, point, value) VALUES ("' . $agent . '", "' . $data_point . '",' . $value . ')');

     echo "success";
  }
?>