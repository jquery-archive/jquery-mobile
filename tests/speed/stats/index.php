<?php
  $db = new PDO('sqlite:./stats.db');
  $db->query('CREATE TABLE IF NOT EXISTS stats (id INTEGER, agent TEXT, point TEXT, value REAL, time TIMESTAMP, pathname TEXT, PRIMARY KEY (id))');

  // making a sad attempt here to provide a clean REST-respecting url scheme.
  // stats with a GET returns - wait for it - the stats, and a post with the
  // the right params will create a new entry
  if ( $_SERVER['REQUEST_METHOD'] == "GET" ) {
     $json = Array();
     $st = $db->prepare( 'SELECT point, avg(value) as avg_value, pathname, strftime(\'%Y-%m-%d\', time) as day FROM stats GROUP BY pathname, point, strftime(\'%Y-%m-%d\', time) ORDER BY time;' );
     $st->execute();
     $result = $st->fetchAll(PDO::FETCH_ASSOC);
     header("Content-Type: application/json");
     echo json_encode($result);
  }  elseif ( $_POST['datapoint'] && $_POST['value'] && $_POST['agent'] && $_POST['pathname']) {
     $st = $db->prepare('INSERT INTO stats (agent, point, value, pathname, time) VALUES (:agent,  :data_point, :value, :pathname, DATETIME(\'now\'))');
     $st->execute(array(
            ':agent' => $_POST['agent'],
            ':data_point' => $_POST['datapoint'],
            ':value' => $_POST['value'],
            ':pathname' => $_POST['pathname']
        ));

     echo "success";
  }
?>