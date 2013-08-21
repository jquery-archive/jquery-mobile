<!DOCTYPE html>
<html>
<head>
  <title>iOS 7 problem</title>
  <meta charset="utf-8">
  
  <meta name="viewport" content="initial-scale=1" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="apple-mobile-web-app-title" content="iOS 7 problem" />

  <link href="http://code.jquery.com/mobile/git/jquery.mobile-git.css" rel="stylesheet" type="text/css" />
  <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
  <script src="../../js/"></script>

  <script>
    jQuery(document).ready(function($) {
      $('#test_button').submit(function(e){
        e.preventDefault();
        $.mobile.changePage('#page2');
      });
    });   
  </script>
  
  <style>
    #edit-with-js-bin { display: none !important; }
  </style>
</head>
<body>
  
  <div data-role="page" id="page1">
  
    <div data-role="header">
      <h1>Page 1</h1>
    </div><!-- /header -->
    
    <div data-role="content" id="content">
      <form name="test_button" id="test_button" action="." method="POST" data-ajax="false">
          <input type="submit" value="Go to Page 2" data-theme="g" data-icon="plus" />
      </form>
      <input type="text" id="foo"/>
      <p>
        Save as home screen app and test with iOS7. Go to "Page 2". If you click the left widgets you'll be redirected to page 1.
        If you click the right widgets you'll be redirected to page 3.<br />
        <br />
        It seems to be a problem with the new iOS 7 select widget. With iOS 6 there's no such problem.<br />
        <br />
        The problem occurs also with Google Chrome Mobile but this test page is only for iOS homescreen apps (Safari Webkit in homescreen app mode).
      </p>  

    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
      <div class="nav_footer" data-role="navbar" data-id="navigation" data-tap-toggle="false" data-position="fixed">
        <ul>
          <li><a href="#page1" class="ui-btn-active ui-state-persist">Page 1</a></li>
          <li><a href="#page2">Page 2</a></li>
          <li><a href="#page3">Page 3</a></li>
        </ul>
      </div>
    </div>
    
  </div><!-- /page -->
      
     
  
  <div data-role="page" id="page2">
  
    <div data-role="header">
      <h1>Page 2</h1>
    </div><!-- /header -->
    
    <div data-role="content" id="content">
     
      <br />
      <br />
      <div>Click into the widgets and you will be redirected to another page ... (try several times)</div>
      <br />
      <br />
      <br />


            <form name="test_form" action="." method="POST">

                <div id="test_widgets">
              
                    <div data-role="fieldcontain">
                        <label for="reservation_start_date">Problem widgets:</label>
                        <div class="ui-grid-a">
                            <div class="ui-block-a">
                                <div class="default_widget">
<select id="reservation_start_date" name="reservation_start_date"><option value="2013-09-16">Mo. 16. Sept.</option><option value="2013-09-17">Di. 17. Sept.</option><option value="2013-09-18">Mi. 18. Sept.</option><option value="2013-09-19">Do. 19. Sept.</option><option value="2013-09-20">Fr. 20. Sept.</option><option value="2013-09-21">Sa. 21. Sept.</option><option value="2013-09-22">So. 22. Sept.</option><option value="2013-09-23" selected="selected">Mo. 23. Sept. (Heute)</option><option value="2013-09-24">Di. 24. Sept.</option><option value="2013-09-25">Mi. 25. Sept.</option><option value="2013-09-26">Do. 26. Sept.</option><option value="2013-09-27">Fr. 27. Sept.</option><option value="2013-09-28">Sa. 28. Sept.</option><option value="2013-09-29">So. 29. Sept.</option><option value="2013-09-30">Mo. 30. Sept.</option></select>
                                </div>
                            </div>
                            <div class="ui-block-b">
                                <div class="default_widget">
<select id="reservation_start_time" name="reservation_start_time"><option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00 (Jetzt)</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select>                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- reservation_widgets_default -->
            </form>
            <br />
      <br />
      <div>Click into the widgets and you will be redirected to another page ... (try several times)</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>Click into the widgets and you will be redirected to another page ... (try several times)</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>Click into the widgets and you will be redirected to another page ... (try several times)</div>
      <br />
      <br />
      <br />

    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
      <div class="nav_footer" data-role="navbar" data-id="navigation" data-tap-toggle="false" data-position="fixed">
        <ul>
          <li><a href="#page1">Page 1</a></li>
          <li><a href="#page2" class="ui-btn-active ui-state-persist">Page 2</a></li>
          <li><a href="#page3">Page 3</a></li>
        </ul>
      </div>
    </div>
    
  </div><!-- /page -->


  <div data-role="page" id="page3">
  
    <div data-role="header">
      <h1>Page 3</h1>
    </div><!-- /header -->
    
    <div data-role="content" id="content">
      
      <p>Page3</p>
      
    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
      <div class="nav_footer" data-role="navbar" data-id="navigation" data-tap-toggle="false" data-position="fixed">
        <ul>
          <li><a href="#page1">Page 1</a></li>
          <li><a href="#page2">Page 2</a></li>
          <li><a href="#page3" class="ui-btn-active ui-state-persist">Page 3</a></li>
        </ul>
      </div>
    </div>
    
  </div><!-- /page -->
   
  
</body>
</html>