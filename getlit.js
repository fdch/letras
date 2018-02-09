
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

    	// First poem based on random probabilities
      var thres1 = 3;
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

    
    //x.append(["<p>--------------------------1----------------------</p>","<p>"]);
    for (var k in poem)
        x.append(poem[k]);


    // Second poem based on frequency-based probabilities

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
      if (counts[j] > 200) { //could be useful to limit this
        var fontsize = counts[j]/max_val * 8 + 0.5;
        var stylish = "display:block;font-size:"+fontsize+"em";
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
    
    
    //x.append(["<p>--------------------------2----------------------</p>","<p>"]);
    for (var l in poemProbs){
      if (Math.random()>=0.8) {
        x.append("<span style=\"display:block;margin-top:"+(rtimeMake(20)-10)+"px;\"></span>");
      }
      x.append(poemProbs[l]+" ")
    }x.append("</p>");


    // Third poem based on least and most used words


    //var leastMost = onlyOnce.concat(manyTimes);
    //shuffle(leastMost);
    //x.append(["<p>--------------------------3----------------------</p>","<p>"]);
    //for (var l in leastMost)
    //    x.append(leastMost[l]+" ")
    //x.append("</p>");
    


    //var leastMost = onlyOnce.concat(manyTimes);
    //shuffle(leastMost);
    //x.append(["<p>--------------------------3----------------------</p>","<p>"]);
    var thirdLength = (rtimeMake(30)+10);
    var thirdPoem=[];
    for (var i = 0; i <= thirdLength; i++) { 
        var xpos = rtimeMake(w/2) + w/2;
        var ypos = rtimeMake(20);
        var fsize = Math.random()*2 + 0.8;

        if (0.5 <= Math.random())
          var myword = manyTimes[rtimeMake(manyTimes.length)];
        else
          var myword = onlyOnce[rtimeMake(onlyOnce.length)];

        var wording = "<p style=\"font-size:"+fsize+"em;\
                                margin-left:"+xpos+"px;\
                                margin-top:"+ypos+"px\">" + myword + "</p>";
        if (Math.random()>0.3){
          x.append(thirdPoem)
          thirdPoem=[];
        } else
          thirdPoem.push(wording);
    }
    if(thirdPoem.length) {
        x.append(thirdPoem)
        thirdPoem=[];
    }
    x.append("</p>");

    // The large list of words with their freq of occurence

    //x.append(["<p>--------------------------list----------------------</p>","<p>"]);
    for (var i in listFreq)
      x.append(listFreq[i]);

  });
}
