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

//from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
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

    // First poem based on predefined probabilities
    x.append(["<p>--------------------------1----------------------</p>","<p>"]);
    for (var k in poem)
        x.append(poem[k]);

    // Get frequency of occurence of a word in words[], into the object "counts"
    var counts = {};
    words.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });


    var values = Object.values(counts);
    //cSorted = Object.keys(counts).sort(function(a,b){return counts[a]-counts[b]})

    var max_val = Math.max(...values);
    var wordsLength = words.length;
    var poemProbs=[];
    var listFreq=[];
    var onlyOnce=[];
    var manyTimes=[];

    for (var j in counts) {
      var probs = counts[j]/wordsLength * 100;
      if (counts[j] > 1) { //could be useful to limit this
        var fontsize = counts[j]/max_val * 2 + 1;
        var stylish = "display:block;font-size:"+fontsize+"em";
        listFreq.push("<span style=\""+stylish+"\">"+j+": " +counts[j]+" | "+probs+" %</span>");
      } else if (counts[j] == 1) {
        onlyOnce.push(j);
      }
      if (counts[j] >= 5000){
        manyTimes.push(j);
      }
      if (probs >= Math.random()) {
        poemProbs.push(j);
      }
    }
    
    // Second poem based on probabilities
    x.append(["<p>--------------------------2----------------------</p>","<p>"]);
    for (var l in poemProbs)
        x.append(poemProbs[l]+" ")
    x.append("</p>");


    // Third poem based on least and most used words
    //var leastMost = onlyOnce.concat(manyTimes);
    //shuffle(leastMost);
    //x.append(["<p>--------------------------3----------------------</p>","<p>"]);
    //for (var l in leastMost)
    //    x.append(leastMost[l]+" ")
    //x.append("</p>");
    

    // Third poem based on least and most used words
    //var leastMost = onlyOnce.concat(manyTimes);
    //shuffle(leastMost);
    x.append(["<p>--------------------------3----------------------</p>","<p>"]);
    for (var i = 0; i <= (rtimeMake(256)+10); i++) { 
        if (0.2 <= Math.random())
          var myword = manyTimes[rtimeMake(manyTimes.length)];
        else
          var myword = onlyOnce[rtimeMake(onlyOnce.length)];
        x.append(myword+" ")
    }
    x.append("</p>");

  });
}


$(document).ready(function(x) {
  if ((w = $(window).width()) >= 600) w = w*0.5;
  h = $(window).height();
  $("body").append(containers);
  getLit($("#content"),lit);
});