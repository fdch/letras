var poem=[], words=[];
var tercerPoem=[];
var poemProbs=[];
var listFreq=[];
var onlyOnce=[];
var manyTimes=[];
var thres = [1,10000];
var counts = {};

function firstPoem (tar,src) {
// First poem based on random probabilities
  for (var i=0; i < words.length; i++)
    if ((Math.random() * thres[1]) < thres[0]) {
      var xpos = "margin-left:"+(rtimeMake(w/2) + w/2)+"px;";
      var ypos = "margin-top:"+rtimeMake(20)+"px;";
      var fsize = "font-size:"+(Math.random()*2 + 0.8)+"em;";
      tar.append("<p style=\""+fsize+xpos+ypos+"\">"+src[i]+"</p>");
    }
}

function getFrequencies () {
// Second poem based on frequency-based probabilities
// Get frequency of occurence of a word in words[],
// into the object "counts"
  words.forEach(function(x) { counts[x] = (counts[x] || 0)+1}); 

  var max_val = maxValue(counts);
  var wordsLength = words.length;
  
  for (var j in counts) {
    var probs = counts[j]/wordsLength * 100;
    if (counts[j] > 200) { //could be useful to limit this
      var fontsize = counts[j]/max_val * 8 + 0.5;
      var stylish = "display:block;font-size:"+fontsize+"em";
      // The large list of words with their freq of occurence
      listFreq.push("<span style=\""+stylish+"\">"+j+":" +counts[j]+"</span>");
    } else if (counts[j] <= 200) {
      onlyOnce.push(j);//least frequent
    }
    if (counts[j] >= 5000){
      manyTimes.push(j);//most frequent
    }
    if (probs >= Math.random()) {
      poemProbs.push(j);
    }
  }
}
function secondPoem(tar,src){
  for (var l in src){
    if (Math.random()>=0.8)
      tar.append("<span style=\"display:block;margin-top:"+(rtimeMake(20)-10)+"px;\"></span>");
    tar.append(src[l]+" ")
  }
}

function thirdPoem(tar,src,least,most){
// Third poem based on least and most frequent words
  for (var i = 0; i <= rtimeMake(30)+10; i++) { 
    var xpos = rtimeMake(w/2) + w/2;
    var ypos = rtimeMake(20);
    var fsize = Math.random()*2 + 0.8;
    if (0.5 <= Math.random())
      var word = most[rtimeMake(most.length)];
    else
      var word = least[rtimeMake(least.length)];
    var wording = "<p style=\"font-size:"+fsize+"em;\
                            margin-left:"+xpos+"px;\
                            margin-top:"+ypos+"px\">" + word + "</p>";
    if (Math.random()>0.3){
      tar.append(src)
      src=[];
    } else
      src.push(wording);
  }
  if(src.length) {
      tar.append(src)
      src=[];
  }
}

function getLit(x,sheet)
{
  loadJSON(sheet, function(response) {
  	
    var f = JSON.parse(response);
    var entry = f.feed.entry;
    for (var i in entry) {
    	var e  = entry[i];
      var aa = e.gsx$aa.$t; var bb = e.gsx$bb.$t; var cc = e.gsx$cc.$t;
      var dd = e.gsx$dd.$t; var ee = e.gsx$ee.$t; var ff = e.gsx$ff.$t;
      var gg = e.gsx$gg.$t; var hh = e.gsx$hh.$t; var ii = e.gsx$ii.$t; 
      var jj = e.gsx$jj.$t;
      words.push(aa,bb,cc,dd,ee,ff,gg,hh,ii,jj);
    }
    
    
    firstPoem(x,words);
    getFrequencies();
    secondPoem(x,poemProbs);
    thirdPoem(x,tercerPoem,onlyOnce,manyTimes);
    x.append(listFreq);


  });
}
