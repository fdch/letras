$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append(containers);
  getLit($("#content"),lit);
  for (var i=0; i<=rtimeMake(20)+4; i++)
  	poems[i%4];
});