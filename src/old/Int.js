var BITS = 64;
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

    return result.map((e) => (e === "" ? "0" : e));
}

function sign(x) {
    if (parseFloat(x) < 0) {
        return -1;
    } else {
        return 1;
    }
    
}


function abs(x) {
    if(x.charAt(0) === "-")
        return x.slice(1)
    return x;
}

function Int(x, s) {
    if (!(this instanceof Int)) {
        return new Int(x,s);
    } else if (x instanceof Int) {
        //Clone
        this.a = a.a;
        this.b = a.b;
    } else {
        if (typeof x === "number" && typeof s === "undefined") {
            this.x = toBase(Math.abs(x) + "", 2).join("");
            this.s = sign(x);
        } else if(typeof x === "string" && typeof s === "undefined") {
            this.x = toBase(abs(x), 2).join("");
            this.s = sign(s);
        } else {
            this.x = x;
            this.s = s;
        }
    }
}



module.exports = Int;