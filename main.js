$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append(containers);
  getLit($("#content"),lit);
  firstPoem($("#content"),words);
  getFrequencies();
  secondPoem($("#content"),poemProbs);
  thirdPoem($("#content"),tercerPoem,onlyOnce,manyTimes);
  firstPoem($("#content"),words);
  getFrequencies();
  secondPoem($("#content"),poemProbs);
  thirdPoem($("#content"),tercerPoem,onlyOnce,manyTimes);
});