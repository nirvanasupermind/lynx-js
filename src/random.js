var NdArray = require("./NdArray.js");
var misc = require("./misc.js");
var random = new (function () {
    /**
    * Random values in a given shape.
    @param {number|number[]} shape
    */
    function rand(shape) {
        var result = NdArray._.applyScalar(Math.random,misc.zeros(shape).tolist());
        return new NdArray(result);
    }
    
    this.rand = rand;
})();

module.exports = random;