var url = "https://fdch.github.io/letras";
var repo = "https://github.com/fdch/letras";
var email = "fch226@nyu.edu";
var https = "https://spreadsheets.google.com/feeds/list/";
var altjson = "/public/values?alt=json";
var w, h;
var spreadsheetID = "1umuxkyz_4xrxgX_qS-tmOMK7CqGuNS67KFzRhFGuP5A/";
var containers = "<div id=content></div>";
var lit = https + spreadsheetID + "2" + altjson;

//https://spreadsheets.google.com/feeds/list/1umuxkyz_4xrxgX_qS-tmOMK7CqGuNS67KFzRhFGuP5A/2/public/values?alt=json

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

function rtimeMake(x)
{
	return(Math.floor(Math.random()*x));
}



function getLit(x,sheet)
{
  loadJSON(sheet, function(response) {
  	var poem=[];
    var words=[];
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry)
    {
    	var e = entry[i];
      var aa = e.gsx$aa.$t;
      var bb = e.gsx$bb.$t;
      var cc = e.gsx$cc.$t;
      var dd = e.gsx$dd.$t;
      var ee = e.gsx$ee.$t;
      var ff = e.gsx$ff.$t;
      var gg = e.gsx$gg.$t;
      var hh = e.gsx$hh.$t;
      var ii = e.gsx$ii.$t;
      var jj = e.gsx$jj.$t;
      words.push(aa,bb,cc,dd,ee,ff,gg,hh,ii,jj);
    	
      var thres1 = 1;
		  var randomNumber = Math.random() * 10000;
		  if (randomNumber < thres1) {
			  var xpos = rtimeMake(w/2) + w/2;
			  var ypos = rtimeMake(20);
			  var fsize = Math.random()*2 + 0.8;
        var wording = "<p style=\"font-size:"+fsize+"em;\
                                margin-left:"+xpos+"px;\
                                margin-top:"+ypos+"px\">" + words[rtimeMake(words.length)] + "</p>";
  	    poem.push(wording);
		  }
    }
    var counts = {};
    words.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    counts.sort();
    var max_val = Math.max.apply(Math, counts);
    for (var j in counts)
      if (counts[j] > 1)
        x.append("<p style=font-size:"+count[j]/max_val*2+1+"em>"+j+": " +counts[j]);

    for (var k in poem)
        x.append(poem[k]);

  });
}


$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append(containers);
  getLit($("#content"),lit);
});