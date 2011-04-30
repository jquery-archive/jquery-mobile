$(document).bind("mobileinit", function(event) {
  $.mobile.addResolutionBreakpoints([360, 600, 640, 800, 960, 1280]);
});
function use_media_helpers() {
  var widthBreakpoints = [320, 360, 480, 600, 640, 768, 800, 960, 1024, 1200, 1280];
  $("#widthList li").hide();
  $("#widthList .title").show();

  for (var i = 0; i < widthBreakpoints.length; i++){
    $(".min-width-"+widthBreakpoints[i]+"px #widthList .min"+widthBreakpoints[i]).show();
    $(".max-width-"+widthBreakpoints[i]+"px #widthList .max"+widthBreakpoints[i]).show();
  }

  $("#orientList li").hide();
  $("#orientList .title").show();
  if ($('html').hasClass("portrait")) $("#orientList .port").show();
  if ($('html').hasClass("landscape")) $("#orientList .land").show();
}