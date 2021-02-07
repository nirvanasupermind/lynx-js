function int(s) {
    return { "value": s, "__proto__": Int.prototype };
}

function Int(s, t = 10) {
    if (!(this instanceof Int)) {
        return new Int(s);
    } else if (s instanceof Int) {
        //Clone
        this.value = s.value;
    } else {
        if (typeof s === "number")
            s = Math.floor(s);

        s = s.toString()
        s = fromBase(s, t);
        this.value = twosComplement(s.toString());
    }
}

Int.BITS = 48;

var thePower = pow("2", Int.BITS);
var assert = require("assert");
var PAD_DIGITS = 5000;

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//Determine if number (as a string) is even
function isEven(n) {
    return "02468".includes(n.slice(-1));
}

//Determine if number (as a string) is odd
function isOdd(n) {
    return !(isEven(n));
}


function factorial(n) {
    if ((n === 0) || (n === 1))
        return 1;
    else
        return (n * factorial(n - 1));
}


//taken from https://locutus.io/php/strings/ord/
function ord(string) {
    const str = string + ''
    const code = str.charCodeAt(0)
    if (code >= 0xD800 && code <= 0xDBFF) {
        // High surrogate (could change last hex to 0xDB7F to treat
        // high private surrogates as single characters)
        const hi = code
        if (str.length === 1) {
            // This is just a high surrogate with no following low surrogate,
            // so we return its value;
            return code
            // we could also throw an error as it is not a complete character,
            // but someone may want to know
        }
        const low = str.charCodeAt(1)
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000
    }
    if (code >= 0xDC00 && code <= 0xDFFF) {
        // Low surrogate
        // This is just a low surrogate with no preceding high surrogate,
        // so we return its value;
        return code
        // we could also throw an error as it is not a complete character,
        // but someone may want to know
    }
    return code
}


var longDivision = function (n, d) {
    var num = String(n),
        numLength = num.length,
        remainder = 0,
        answer = '',
        i = 0;
    while (i < numLength) {
        var digit = i < numLength ? parseInt(num[i]) : 0;
        if (i == numLength) {
            answer = answer + ".";
        }
        answer = answer + Math.floor((digit + (remainder * 10)) / d);
        remainder = (digit + (remainder * 10)) % d;
        i++;
    }
    while (answer.charAt(0) === "0")
        answer = answer.substring(1);
    return answer;
}

// function longDivision(number, divisor) {

//     //As result can be very large store it in string  
//     var ans = "";
//     //Find prefix of number that is larger than divisor.  
//     var idx = 0;
//     var temp = ord(number[idx]) - ord('0');
//     while (temp < divisor) {
//         temp = (temp * 10 + ord(number[idx + 1]) - ord('0'));
//         idx += 1;
//     }
//     idx += 1;

//     //Repeatedly divide divisor with temp. After every division, update temp to 
//     //include one more digit.  
//     while (number.length > idx) {
//         //Store result in answer i.e. temp / divisor  
//         ans += String.fromCharCode((temp / divisor) + ord('0'));
//         //Take next digit of number 
//         temp = ((temp % divisor) * 10 + ord(number[idx]) - ord('0'));
//         idx += 1;
//     }

//     ans += String.fromCharCode((temp / divisor) + ord('0'));

//     //If divisor is greater than number  
//     if (ans.length === 0) {
//         return "0";
//     }
//     //else return ans  
//     return ans;
// }



function compareTo(a, b) {
    a = pad(a, PAD_DIGITS);
    b = pad(b, PAD_DIGITS);
    return a.localeCompare(b);
}

//taken from https://stackoverflow.com/questions/929910/modulo-in-javascript-large-number
function modulo(divident, divisor) {
    var cDivident = '';
    var cRest = '';

    for (var i in divident) {
        var cChar = divident[i];
        var cOperator = cRest + '' + cDivident + '' + cChar;

        if (cOperator < parseInt(divisor)) {
            cDivident += '' + cChar;
        } else {
            cRest = cOperator % divisor;
            if (cRest == 0) {
                cRest = '';
            }
            cDivident = '';
        }

    }
    cRest += '' + cDivident;
    if (cRest == '') {
        cRest = 0;
    }
    return cRest;
}

//taken from https://codereview.stackexchange.com/questions/92966/multiplying-and-adding-big-numbers-represented-with-strings
function multiply(a, b) {
    if (parseFloat(a) == 0 || parseFloat(b) == 0) {
        return '0';
    }

    a = a.split('').reverse();
    b = b.split('').reverse();
    var result = [];

    for (var i = 0; a[i] >= 0; i++) {
        for (var j = 0; b[j] >= 0; j++) {
            if (!result[i + j]) {
                result[i + j] = 0;
            }

            result[i + j] += a[i] * b[j];
        }
    }

    for (var i = 0; result[i] >= 0; i++) {
        if (result[i] >= 10) {
            if (!result[i + 1]) {
                result[i + 1] = 0;
            }

            result[i + 1] += parseInt(result[i] / 10);
            result[i] %= 10;
        }
    }

    return result.reverse().join('');
}

function pow(a, b) {
    var result = "1";
    for (var i = 0; i < b; i++) {
        result = multiply(result, a);
    }

    return result;
}

function log(b, z) {
    var i = 0;
    while (compareTo(pow(b, i), z) <= 0) {
        i++;
    }

    return i - 1;
}


function toBase(num, base) {
    assert(base >= 1 && base <= ALPHABET.length);
    if (base === 1)
        return "1".repeat(parseFloat(num)).split("");
    var quotient = num;
    var result = [];
    var numDigits = log(base + "", num) + 1;
    for (var i = 0; i < numDigits; i++) {
        var j = numDigits - i;
        var power = pow(base + "", j - 1);
        quotient = longDivision(num, power);
        num = modulo(num, power);
        result.push(quotient);
    }

    return result.map((e) => (e === "" ? "0" : e)).map((e) => ALPHABET[parseFloat(e)]);
}

function sign(x) {
    if (parseFloat(x) < 0) {
        return -1;
    } else {
        return 1;
    }

}

/**
 * Program to add VERY large numbers in javascript
 * Note - numbers should be passed as strings.
 * example -
 * add("15", "15");  // returns "30"
 *
 */
function add(str1, str2) {

    let sum = "";  // our result will be stored in a string.

    // we'll need these in the program many times.
    let str1Length = str1.length;
    let str2Length = str2.length;

    // if s2 is longer than s1, swap them.
    if (str2Length > str1Length) {
        let temp = str2;
        str2 = str1;
        str1 = temp;
    }

    let carry = 0;  // number that is carried to next decimal place, initially zero.
    let a;
    let b;
    let temp;
    let digitSum;
    for (let i = 0; i < str1.length; i++) {
        a = parseInt(str1.charAt(str1.length - 1 - i));      // get ith digit of str1 from right, we store it in a
        b = parseInt(str2.charAt(str2.length - 1 - i));      // get ith digit of str2 from right, we store it in b
        b = (b) ? b : 0;                                    // make sure b is a number, (this is useful in case, str2 is shorter than str1
        temp = (carry + a + b).toString();                  // add a and b along with carry, store it in a temp string.
        digitSum = temp.charAt(temp.length - 1);            //
        carry = parseInt(temp.substr(0, temp.length - 1));  // split the string into carry and digitSum ( least significant digit of abSum.
        carry = (carry) ? carry : 0;                        // if carry is not number, make it zero.

        sum = (i === str1.length - 1) ? temp + sum : digitSum + sum;  // append digitSum to 'sum'. If we reach leftmost digit, append abSum which includes carry too.

    }

    return sum;     // return sum

}



var ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function fromBase(num, base) {
    assert(base >= 1 && base <= ALPHABET.length);
    if (num.charAt(0) === "-")
        return "-" + fromBase(num.slice(1), base);
    if (base === 1) { //bijective unary
        assert(num.split("").every((e) => e === "1"))
        return num.length + "";
    }

    var trunc = ALPHABET.substr(0, base);
    var result = "0";
    for (var i = 0; i < num.length; i++) {
        var j = num.length - i;
        var t1 = multiply(ALPHABET.indexOf(num.charAt(i)) + "", pow(base + "", j - 1));
        result = add(result, t1);
    }

    return result;
}

const subtract = (a, b) => [a, b].map(n => [...n].reverse()).reduce((a, b) => a.reduce((r, d, i) => {
    let s = d - (b[i] || 0)
    if (s < 0) {
        s += 10
        a[i + 1]--
    }
    return '' + s + r
}, '').replace(/^0+/, ''))


function abs(x) {
    if (x.charAt(0) === "-")
        return x.slice(1)
    return x;
}

function twosComplement(n) {
    if (n.charAt(0) === "-") {
        // console.log(thePower,subtract(thePower, n.slice(1)));
        // console.log(thePower)
        return  pad(toBase(subtract(thePower,n.slice(1)), 2).join("").slice(-Int.BITS), Int.BITS, "0");
    } else {
        return pad(toBase(n, 2).join("").slice(-Int.BITS), Int.BITS, "0");
    }
}


function eq(a, b) {
    return compareTo(a, b) === 0;
}

function addDigits(a, b, c) {
    return (parseFloat(a) + parseFloat(b) + parseFloat(c)).toString(2);
}

/**
 * Addition.
 */
Int.prototype.add = function (that) {
    that = new Int(that);
    var a = this.value;
    var b = that.value;

    var longer = a.length > b.length ? a : b;
    var shorter = a.length > b.length ? b : a;

    // while (shorter.length < longer.length)
    //     shorter = "0" + shorter;

    a = longer;
    b = shorter;

    var carry = '0';
    var sum = "";
    for (var i = 0; i < a.length; i++) {
        var place = a.length - i - 1;
        var digisum = addDigits(a.charAt(place), b.charAt(place), carry);
        if (digisum.length != 1)
            carry = digisum.charAt(0);
        else
            carry = '0';
        sum = digisum.charAt(digisum.length - 1) + sum;
    }

    // sum = carry + sum;

    return int(sum);
}

/**
 * Returns the negated value.
 */
Int.prototype.neg = function () {
    return int(this.value.split("").map((e) => e === "0" ? "1" : "0").join("")).add(1);
}

/**
 * Subtraction.
 */
Int.prototype.sub = function (that) {
    that = new Int(that);
    return this.add(that.neg());
}

/**
 * Multiplication.
 */
Int.prototype.mul = function (that) {
    that = new Int(that);
    return new Int(multiply(this.toString2(), that.toString2()));
}


/**
 * Division.
 */
Int.prototype.div = function (that) {
    that = new Int(that);

    if (this.value.charAt(0) === "1" && that.value.charAt(0) === "1")
        return this.neg().div(that.neg())
    if (this.value.charAt(0) === "1" && that.value.charAt(0) === "0")
        return this.neg().div(that).neg()
    if (this.value.charAt(0) === "0" && that.value.charAt(0) === "1")
        return this.div(that.neg()).neg()

    return new Int(longDivision(this.toString(), that.toString()));
}


/**
 * Fast modular exponentiation for a ^ b mod n
 * @returns {number}
 */
var fastModularExponentiation = function (a, b, n) {
    a = a % n;
    var result = 1;
    var x = a;

    while (b > 0) {
        var leastSignificantBit = b % 2;
        b = Math.floor(b / 2);

        if (leastSignificantBit == 1) {
            result = result * x;
            result = result % n;
        }

        x = x * x;
        x = x % n;
    }
    return result;
};

/**
 * Exponentiation.
 */
Int.prototype.pow = function (that) {
    that = new Int(that);
    if (that.compareTo(0) < 0)
        return new Int(0);
    if (this.toNumber() === 1 || this.toNumber() === 0)
        return this;
    if(this.value.charAt(0) === "1" && that.and(1).compareTo(0) === 0)
        return this.neg().pow(that);
    if(this.value.charAt(0) === "1" && that.and(1).compareTo(1) === 0)
        return this.neg().pow(that).neg();
    if (Math.pow(this.toNumber(),that.toNumber()) > thePower)
        return new Int(fastModularExponentiation(this.toNumber(), that.toNumber(), thePower));
    return new Int(pow(this.toString2(),that.toNumber()));
}



/**
 * Bitwise AND.
 */
Int.prototype.and = function (that) {
    that = new Int(that);
    function and(a, b) {
        return Number(Boolean(Number(a)) && Boolean(Number(b))) + "";
    }

    return int(this.value.split("").map((num, index) => and(num, that.value.charAt(index))).join(""));
}

/**
 * Bitwise OR.
 */
Int.prototype.or = function (that) {
    that = new Int(that);
    function or(a, b) {
        return Number(Boolean(Number(a)) || Boolean(Number(b))) + "";
    }

    return int(this.value.split("").map((num, index) => or(num, that.value.charAt(index))).join(""));
}


/**
 * Bitwise NOT.
 */
Int.prototype.not = function (that) {
    return this.neg().add(1);
}

/**
 * Bitwise XOR.
 */
Int.prototype.xor = function (that) {
    that = new Int(that);
    function xor(a, b) {
        return Number(Boolean(Number(a)) !== Boolean(Number(b))) + "";
    }

    return int(this.value.split("").map((num, index) => xor(num, that.value.charAt(index))).join(""));
}



/**
 * Compares two numbers, returns 1 if greater, 0 if equal, and -1 if less than.
 */
Int.prototype.compareTo = function (that) {
    return compareTo(this.toString(10), that.toString(10));
}

/**
 * Applies square root.
 */
Int.prototype.sqrt = function() {
    if(this.compareTo(0) <= 0) {
        return 0;
    }

    var xn = this.div(2);
    for(var i = 0; i < 100; i++) {
        xn = xn.add(this.div(xn)).div(2);
    }

    return xn;
}

/**
 * Converts the number to Number.
 */
Int.prototype.toNumber = function () {
    return parseInt(this.value.substr(1), 2);
}

Int.prototype.toString = function (radix = 10) {
    // console.log(this.value);
    if (this.value.charAt(0) === "1" && this.toNumber() !== 0)
        return "-" + this.neg().toString();
    if (this.toNumber() === 0)
        return "0"
    return toBase(fromBase(this.value, 2), parseFloat(radix)).join("");
}

Int.prototype.toString2 = function (radix = 10) {
    // console.log(this.value);
    return toBase(fromBase(this.value, 2), parseFloat(radix)).join("");
}

module.exports = Int;