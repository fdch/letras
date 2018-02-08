var url = "https://fdch.github.io/letras";
var repo = "https://github.com/fdch/letras";
var email = "fch226@nyu.edu";
var title = "Letras";
var subtitle = "...";
var https = "https://spreadsheets.google.com/feeds/list/";
var altjson = "/public/values?alt=json";
var w, h;
var spreadsheetID = "1umuxkyz_4xrxgX_qS-tmOMK7CqGuNS67KFzRhFGuP5A/";
var titleData = "\
<header>\
<h1 onclick=\"location.href='"+ url + "'\">"+ title +"</h1>\
<h2 onclick=\"location.href='" + url + "'\">" + subtitle + "</h2>\
</header>";
var containers = "<div id=content></div>";
var lit = https + spreadsheetID + "1" + altjson;

function linkify(x)
{
  return(x.replace(/ /g,"_").toLowerCase());
}

function makeHref(x)
{
  return("<a href=\"#"+linkify(x)+"\">"+x+" </a>");
}

function loadJSON(x,callback)
{
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', x, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

words = [];

function getLit(sheet, arr)
{
  loadJSON(sheet, function(response) {
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
      var e = entry[i];
      var word = e.gsx$a.$t;
      arr.push(word);
    }
  });
}


$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append([titleData, containers]);
  getLit(lit, words);
  for (var i = 0; i < words.length; i++){
  	var wording = "<p>" + words[i] + "</p>";
  	$("#content").append(wording);	
  }
  
});