// lynx Library
// Copyright (c) nirvanasupermind
// Usage permitted under terms of MIT License

var lynx = require("./lynx.js");
console.log(new lynx._.Int(3).pow(48)+"")
//=================
function root(f) {
    function fDash(x) {
        var h = 1.5e-8;
        return (f(x.add(h)).sub(f(x.sub(h)))).div(2*h);
    }
    


    var result = new lynx.Dual(1);
    for(var i = 0; i < 75; i++) {
        result = result.sub(f(result).div(fDash(result)));
    }

    return result;
}
//=================
function rng() { return Math.floor(Math.random() * len * 2)/2 };
var len = +new Date() % 13;
var useMat = +new Date() % 2;
function randomDual() {
    return [rng(),rng()];
}


function ndCall(n) {
    return "new lynx.Dual(" + n + ")";
}

function getExample(method) {
    var examples = [];
    for (var i = 0; i < method.length - 1; i++) {
        examples.push(randomDual());
    }

    var code = [];
    var args = [];
    for (var i = 0; i < examples.length; i++) {
        if (i > 0) { args.push("x" + i); }
        code.push(["var x", i, " = ", ndCall(examples[i])].join(""));
    }

    eval(code.join("\n"));
    code.push("console.log(x0." + method + "(" + args + ").toString()) /*" + eval("x0." + method + "(" + args + ")") + "*/")
    return code.join("\n");
}

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

console.log(Object.getOwnPropertyNames(lynx.Dual.prototype).sort())

console.log(getExample("sub"));