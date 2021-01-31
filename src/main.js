// lynx Library
// Copyright (c) nirvanasupermind
// Usage permitted under terms of MIT License

var lynx = require("./lynx.js");

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}

function funcDec(a) {
    return a.name+"("+getParamNames(a)+")";
}

function funcBody(a) {
    return a+"";
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}


function getPrototype(n) {
    var m = n;
    n = n.prototype;
    n = Object.getOwnPropertyNames(n).map((e) => `${m.name}.prototype.${e}(${getParamNames(m.prototype[e])})`);
    n = n.map((e) => `- [${e}](#${e.replace(/\s+/g,"-").replace(/\.|\(/g,"").toLowerCase()}`);
    return n.sort().join("\n");
}

function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
}



pbcopy(getPrototype(lynx.NdArray));