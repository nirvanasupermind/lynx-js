// lynx Library
// Copyright (c) nirvanasupermind
// Usage permitted under terms of MIT License


var NdArray = require("./NdArray.js");
var Dual = require("./Dual.js")
var type = NdArray._.type;
var applyScalar = NdArray._.applyScalar;

//from https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
var _cf = (function () {
    function _shift(x) {
        var parts = x.toString().split('.');
        return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);
    }
    return function () {
        return Array.prototype.reduce.call(arguments, function (prev, next) { return prev === undefined || next === undefined ? undefined : Math.max(prev, _shift(next)); }, -Infinity);
    };
})();

Math.a = function () {
    var f = _cf.apply(null, arguments); if (f === undefined) return undefined;
    function cb(x, y, i, o) { return x + f * y; }
    return Array.prototype.reduce.call(arguments, cb, 0) / f;
};

Math.s = function (l, r) { var f = _cf(l, r); return (l * f - r * f) / f; };

Math.m = function () {
    var f = _cf.apply(null, arguments);
    function cb(x, y, i, o) { return (x * f) * (y * f) / (f * f); }
    return Array.prototype.reduce.call(arguments, cb, 1);
};

Math.d = function (l, r) { var f = _cf(l, r); return (l * f) / (r * f); };

/**
 * Returns the number of elements in an NdArray along a given axis.
 * @param {*} x 
 * @param {number} y 
 */
function size(x, y) {
    x = x.value;
    for (var i = 0; i < y; i++) {
        x = x[0];
    }
    return x.length;
}

/**
 * Return a new NdArray of given shape, filled with zeros. 
 * @param {number|number[]} x 
 */
function zeros(x) {
    if (x.length === 1 || typeof x === "number") {
        x = NdArray._.list(x)
        return new NdArray(JSON.parse("[" + "0,".repeat(x[0] - 1) + "0" + "]"));
    }

    var result = JSON.parse(JSON.stringify(new Array(x[0]))).map(() => zeros(x.slice(1)).value);
    return new NdArray(result);
}
/**
 * Return a new NdArray of given shape, filled with ones. 
 * @param {number|number[]} x 
 */
function ones(x) {
    if (x.length === 1 || typeof x === "number") {
        x = NdArray._.list(x)
        return new NdArray(JSON.parse("[" + "1,".repeat(x[0] - 1) + "1" + "]"));
    }

    var result = JSON.parse(JSON.stringify(new Array(x[0]))).map(() => ones(x.slice(1)).value);
    return new NdArray(result);
}

/**
 * Return a new NdArray of given shape, filled with fill_value.
 * @param {number|number[]} x 
 * @param {number|number[]} fill_value 
 */
function full(x, fill_value) {
    fill_value = type(fill_value) === "Number" ? fill_value : NdArray._.list(fill_value)
    if (x.length === 1 || type(x) === "Number") {
        x = NdArray._.list(x)
        return new NdArray(JSON.parse("[" + `${JSON.stringify(fill_value)},`.repeat(x[0] - 1) + JSON.stringify(fill_value) + "]"));
    }

    var result = JSON.parse(JSON.stringify(new Array(x[0]))).map(() => full(x.slice(1), fill_value).value);
    return new NdArray(result);
}



/**
 * Returns an array of evenly spaced values within a given interval.
 * @param {number} x 
 * @param {number} y 
 * @param {number} [z]
 */
function arange(x, y, z = 1) {
    z = NdArray._.list(z)
    var result = new NdArray([]);
    var j = 0;
    for (var i = x; i < y; i = Math.a(i, z[j % z.length])) {
        j++;
        result.set(j, i);
    }

    return result;
}

/**
 * Return the identity array. The identity array is a square array with ones on the main diagonal.
 * @param {number} x 
 */
function identity(x) {
    x = parseFloat(x);
    var result = [];
    for(var i = 0; i < x; i++) {
        result.push([])
        for(var j = 0; j < x; j++) {
            if(i === j) {
                result[i].push(1);
            } else {
                result[i].push(0);
            }
        }
    }

    return new NdArray(result);
}
/**
 * Computes sine. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function sin(x) {
    if (type(x) === "Dual") { //dual number
        return new Dual(Math.sin(x.a), x.b * Math.cos(x.a));
    } else if (type(x) === "NdArray" || type(x) === "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.sin, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.sin(x);
    }
}

/**
 * Computes cosine. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function cos(x) {
    if (type(x) === "Dual") { //dual number
        return new Dual(Math.cos(x.a), -x.b * Math.sin(x.a));
    } else if (type(x) === "NdArray" || type(x) === "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.cos, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.cos(x);
    }
}


/**
 * Computes tangent. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function tan(x) {
    if (type(x) === "Dual") { //dual number
        return new Dual(Math.tan(x.a), x.b * 1 / (Math.cos(x.a) * Math.cos(x.a)));
    } else if (type(x) === "NdArray" || type(x) === "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.tan, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.tan(x);
    }
}


/**
 * Inverse sine. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function asin(x) {
    if (type(x) === "Dual") { //dual number
        var t1 = 1 / Math.sqrt(1 - (x.a * x.a));
        return new Dual(Math.asin(x.a), x.b * t1);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.asin, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.asin(x);
    }
}


/**
 * Inverse cosine. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function acos(x) {
    if (type(x) === "Dual") { //dual number
        var t1 = -1 / Math.sqrt(1 - (x.a * x.a));
        return new Dual(Math.asin(x.a), x.b * t1);
    } else if (type(x) === "NdArray" || type(x) === "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.acos, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.acos(x);
    }
}

/**
 * Inverse tangent. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function atan(x) {
    if (type(x) === "Dual") { //dual number
        var t1 = 1 / (1 + (x.a * x.a));
        return new Dual(Math.asin(x.a), x.b * t1);
    } else if (type(x) === "NdArray" || type(x) === "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.atan, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.acos(x);
    }
}


/**
 * Exponential function. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function exp(x) {
    if (type(x) === "Dual") { //dual number
        return new Dual(Math.exp(x.a), b * Math.exp(x.a));
    } else if (type(x) === "NdArray" || type(x) === "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.exp, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.exp(x);
    }
}

var exponential = exp;


/**
 * Returns the natural logarithm. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function log(x) {
    if (type(x) === "Dual") { //dual number
        return new Dual(Math.log(Math.abs(x.a)), x.ab / x.a);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(log, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.log(Math.abs(x));
    }
}

var logarithm = log;

function _sqrt(n) {
    return (n > 0) ? Math.sqrt(n) : 0;
}

/**
 * Returns the square root. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function sqrt(x) {
    if (type(x) === "Dual") { //dual number
        var t1 = 1 / (2 * _sqrt(x.a));
        return new Dual(_sqrt(x.a), x.b * t1);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(_sqrt, x.value));
    } else { //number
        x = parseFloat(x);
        return _sqrt(x);
    }
}

/**
 * Returns the cube root. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function cbrt(x) {
    if (type(x) === "Dual") { //dual number
        var t1 = 1 / (3 * Math.cbrt(x.a * x.a));
        return new Dual(Math.cbrt(x.a), x.b * t1);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.cbrt, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.cbrt(x);
    }
}


/**
 * Returns ceil of number. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function ceil(x) {
    if (type(x) === "Dual") { //dual number
        // var t1 = 1 / (3 * Math.cbrt(x.a * x.a));
        return new Dual(Math.ceil(x.a), 0);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.ceil, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.round(x);
    }
}


/**
 * Returns floor of number. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function floor(x) {
    if (type(x) === "Dual") { //dual number
        // var t1 = 1 / (3 * Math.cbrt(x.a * x.a));
        return new Dual(Math.floor(x.a), 0);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.round, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.round(x);
    }
}



/**
 * Returns the rounded number. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function round(x) {
    if (type(x) === "Dual") { //dual number
        // var t1 = 1 / (3 * Math.cbrt(x.a * x.a));
        return new Dual(Math.round(x.a), 0);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(Math.round, x.value));
    } else { //number
        x = parseFloat(x);
        return Math.round(x);
    }
}

var rint = round;

/**
 * Use composite trapezoidal rule with "n" subintervals to compute integral.
 * @param {function} f 
 * @param {number} a
 * @param {number} b
 * @param {number} [n] 
 */
function integral(f, a, b, n = 5000) {
    var t1 = (b - a) / n;
    var t2 = f(a) / 2;
    for (var k = 1; k <= n - 1; k++) {
        var u1 = k * t1;
        t2 += f(a + u1);
    }
    t2 += f(b) / 2;
    return t1 * t2;
}



//from https://github.com/Naruyoko/OmegaNum.js/blob/master/OmegaNum.js
//All of these are from Patashu's break_eternity.js
var OMEGA = 0.56714329040978387299997;  //W(1,0)
//from https://math.stackexchange.com/a/465183
//The evaluation can become inaccurate very close to the branch point
function f_lambertw(z, tol) {
    if (tol === undefined) tol = 1e-10;
    var w;
    var wn;
    if (!Number.isFinite(z)) return z;
    if (z === 0) return z;
    if (z === 1) return OMEGA;
    if (z < 10) w = 0;
    else w = Math.log(z) - Math.log(Math.log(z));
    for (var i = 0; i < 100; ++i) {
        wn = (z * Math.exp(-w) + w * w) / (w + 1);
        if (Math.abs(wn - w) < tol * Math.abs(wn)) return wn;
        w = wn;
    }
    throw Error("Iteration failed to converge: " + z);
    //return Number.NaN;
};

/**
 * Applies Lambert W function. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function lambertw(x) {
    if (type(x) === "Dual") { //dual number
        var h = Math.sqrt(Number.EPSILON);
        var t1 = (f_lambertw(x.a + h) - f_lambertw(x.a - h)) / (2 * h); //numerical derivative
        return new Dual(f_lambertw(x.a), x.b * t1);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(f_lambertw, x.value));
    } else { //number
        x = parseFloat(x);
        return f_lambertw(x);
    }
}

/**
 * Factorial. Uses gamma function for non-integers. If the input is an NdArray, the function will be performed element-wise.
 * @param {*} x 
 */
function fac(x) {
    if (type(x) === "Dual") { //dual number
        var h = Math.sqrt(Number.EPSILON);
        var t1 = (fac(x.a + h) - fac(x.a - h)) / (2 * h); //numerical derivative
        return new Dual(fac(x.a), x.b * t1);
    } else if (type(x) === "NdArray" || type(x) == "Array") { //array
        x = new NdArray(x);
        return new NdArray(applyScalar(fac, x.value));
    } else { //number
        x = parseFloat(x);
        if (x >= 0 && x < 20 && x === Math.floor(x)) {
            switch (x) { //Return some preset values for small integers
                case 0: return 1;
                case 1: return 1;
                case 2: return 2;
                case 3: return 6;
                case 4: return 24;
                case 5: return 120;
                case 6: return 720;
                case 7: return 5040;
                case 8: return 40320;
                case 9: return 362880;
                case 10: return 3628800;
                case 11: return 39916800;
                case 12: return 479001600;
                case 13: return 6227020800;
                case 14: return 87178291200;
                case 15: return 1307674368000;
                case 16: return 20922789888000;
                case 17: return 355687428096000;
                case 18: return 6402373705728000;
                case 19: return 121645100408832000;
            }
        } else if (x >= 0) {
            //tweaked Ramanujan approximation by Hirschhorn & Villarino
            var n = x;
            var theta = 1 - (11 / (8 * n)) + (79 / (112 * n * n));
            var t1 = Math.sqrt(Math.PI);
            var t2 = Math.pow(n / Math.E, n);
            var t3 = 8 * n * n * n + 4 * n * n + n + theta / 30;
            return t1 * t2 * Math.pow(t3, 1 / 6);
        } else {
            //use Weierstrass's definition for negative numbers
            var z = x + 1;
            var t1 = Math.exp(-euler_gamma * z) / z;
            var t2 = 1;
            for (var i = 1; i < 1000; i++) {
                var u1 = Math.exp(z / i);
                t2 *= Math.pow(1 + (z / i), -1) * u1;
            }
            return t1 * t2;

        }
    }
}


var factorial = fact = fac;

var euler_gamma = 0.5772156649015329;
module.exports = { size, zeros, ones, full, arange, sin, cos, tan, asin, acos, atan, exp, log, sqrt, cbrt, floor, ceil, round, lambertw, integral, euler_gamma, rint, exponential, fac, fact, factorial, logarithm, identity };