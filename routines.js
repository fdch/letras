
function linkify(x) {
  return(x.replace(/ /g,"_").toLowerCase());
}

function makeHref(x) {
  return("<a href=\"#"+linkify(x)+"\">"+x+" </a>");
}

function loadJSON(x,callback) {
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

function rtimeMake(x) {
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

function countFreq(tar,src) {
// src is an array, target is an object
  Array.src.forEach(function(x) { tar[x] = (tar[x] || 0)+1; });
}

function maxValue(source){
// get maximum value of an object
    return (Math.max(...Object.values(source)));
}

//cSorted = Object.keys(counts).sort(function(a,b){return counts[a]-counts[b]})


function appendTarget(tar,src){
  for (var i in srcc) tar.append(src[i]);
}















