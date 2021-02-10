# The Class `NdArray`
The class `NdArray` contains useful basic numerical constants and methods for tensors. It can also be used as an efficient multi-dimensional container of generic data.

## Prototype
### `NdArray.prototype.add(that)`
Element-wise addition.

#### Example
```js
var x0 = new lynx.NdArray([4,5]);
var x1 = new lynx.NdArray([1,2]);
console.log(x0.add(x1).toString()) /*array([5,7])*/
```

### `NdArray.prototype.constructor(value)`
The constructor for NdArray. It takes an Array and returns the corresponding NdArray. Note that `new` can be omitted.

#### Example
```js
console.log(new lynx.NdArray([1,2,3])) /*array([1,2,3])*/
```

### `NdArray.prototype.div(that)`

Element-wise division.

#### Example
```js
var x0 = new lynx.NdArray([[3,5,3],[5,2,5],[6,1,4]]);
var x1 = new lynx.NdArray([[4,2,5],[5,4,4],[2,4,6]]);
console.log(x0.div(x1).toString()) /*array([[0.75,2.5,0.6],
    [1,0.5,1.25],
    [3,0.25,0.6666666666666666]])*/
```

### `NdArray.prototype.divide(that)`
Alias for `NdArray.prototype.div(that)`.

### `NdArray.prototype.dot(that)`
Dot product of two arrays. Currently, it does not support 3D and higher input.
#### Example
```js
var x0 = new lynx.NdArray([2,2,1,6]);
var x1 = new lynx.NdArray([1,5,5,3]);
console.log(x0.dot(x1)) /*35*/
```

### `NdArray.prototype.get(..n)`
Returns the element of an NdArray at a given index. It is 0-based, and accepts negative indices for indexing from the end of the array.

#### Example
```js
var x0 = new lynx.NdArray([[5,3],[6,3]]);
console.log(x0.get(-1,0)) /*6*/
```



### `NdArray.prototype.max()`
Return the maximum.

#### Example
```js
var x0 = new lynx.NdArray([2,6]);
console.log(x0.max()) /*6*/
```

### `NdArray.prototype.min()`
Return the minimum.
#### Example
```js
var x0 = new lynx.NdArray([2,6]);
console.log(x0.min()) /*2*/
```

### `NdArray.prototype.minus(that)`
Alias for `NdArray.prototype.sub(that)`.

### `NdArray.prototype.mod(that)`
Element-wise modulo.

#### Example
```js
var x0 = new lynx.NdArray([2,5,6,2]);
var x1 = new lynx.NdArray([1,3,6,4]);
console.log(x0.mod(x1).toString()) /*array([0,2,0,2])*/
```


### `NdArray.prototype.modular(that)`
Alias for `NdArray.prototype.mod(that)`.

### `NdArray.prototype.mul(that)`
Element-wise multiplication.

#### Example
```js
var x0 = new lynx.NdArray([[3,1],[3,1]]);
var x1 = new lynx.NdArray([[4,6],[3,5]]);
console.log(x0.mul(x1).toString()) /*array([[12,6],
    [9,5]])*/
```

### `NdArray.prototype.multiply(that)`
Alias for `NdArray.prototype.mul(that)`.

### `NdArray.prototype.ndim()`
Number of array dimensions.

#### Example
```js
var x0 = new lynx.NdArray([[2]]);
console.log(x0.ndim()) /*2*/
```

### `NdArray.prototype.plus(that)`
Alias for `NdArray.prototype.add(that)`.

### `NdArray.prototype.set(...m)`
Overwrites the element of an NdArray at a given index. It is 0-based, and accepts negative indices for indexing from the end of the array.

#### Example
```js
var x0 = new lynx.NdArray([3,3]);
x0.set(0,4);
console.log(x0.toString()); /*array([4,3])*/
```

### `NdArray.prototype.shape()`
Tuple of array dimensions.

#### Example
```js
var x0 = new lynx.NdArray([[1,4,4],[4,4,3],[6,5,1]]);
console.log(x0.shape().toString()) /*3,3*/
```


### `NdArray.prototype.sub(that)`

Element-wise subtraction.

#### Example
```js
var x0 = new lynx.NdArray([[2]]);
var x1 = new lynx.NdArray([[4]]);
console.log(x0.sub(x1).toString()) /*array([[-2]])*/
```

### `NdArray.prototype.times(that)`
Alias for `NdArray.prototype.mul(that)`.


### `NdArray.prototype.toString()`
Converts the array to String.

#### Example
```js
var x0 = new lynx.NdArray([[1,6,4],[4,3,6],[2,5,6]]);
console.log(x0.toString()) /*array([[1,6,4],
    [4,3,6],
    [2,5,6]])*/
```


### `NdArray.prototype.tolist()`
Converts the array to Array.


#### Example
```js
var x0 = new lynx.NdArray([1,3,2,6]);
console.log(x0.tolist().toString()) /*1,3,2,6*/
```

# The Class `Dual`
The class `Dual` represents [dual numbers](https://mathworld.wolfram.com/DualNumber.html). 

## Prototype

### `Dual.prototype.add(that)`
Addition.

#### Example
```js
var x0 = new lynx.Dual(0.5,2.5);
var x1 = new lynx.Dual(2.5,0.5);
console.log(x0.add(x1).toString()) /*3+3E*/
```

### `Dual.prototype.constructor(a,b=0)`
The constructor for Dual. Takes two numbers representing the real and imaginary part of the value. Note that `new` can be omitted.

#### Example
```js
var x0 = new lynx.Dual(3,6);
console.log(x0.toString()); //3+6E
```

### `Dual.prototype.div(that)`
Division.

#### Example
```js
var x0 = new lynx.Dual(1,7.5);
var x1 = new lynx.Dual(8,3);
console.log(x0.div(x1).toString()) /*0.125+0.890625E*/
```

### `Dual.prototype.divide(that)`
Alias for `Dual.prototype.div(that)`.

### `Dual.prototype.minus(that)`
Alias for `Dual.prototype.sub(that)`.

### `Dual.prototype.mul(that)`
Multiplication.

#### Example
```js
var x0 = new lynx.Dual(2.5,2);
var x1 = new lynx.Dual(1,2.5);
console.log(x0.mul(x1).toString()) /*2.5+8.25E*/
```

### `Dual.prototype.multiply(that)`
Alias for `Dual.prototype.mul(that)`.

### `Dual.prototype.pow(that)`
Exponentiation.

#### Example
```js
var x0 = new lynx.Dual(1,5.5);
var x1 = new lynx.Dual(3,2.5);
console.log(x0.pow(x1).toString()) /*1+16.5E*/
```

### `Dual.prototype.sub(that)`
Subtraction.

#### Example
```js
var x0 = new lynx.Dual(0.5,4);
var x1 = new lynx.Dual(0,4);
console.log(x0.sub(x1).toString()) /*0.5+0E*/
```

### `Dual.prototype.times(that)`
Alias for `Dual.prototype.mul(that)`.

### `Dual.prototype.toString()`
Converts the number to String.

#### Example
```js
var x0 = new lynx.Dual(0,1);
console.log(x0.toString()); //1E
```


# Miscellaneous
## `size(x,y)`
Returns the number of elements in an NdArray along a given axis.

### Example
```js
var x0 = new lynx.NdArray([[3.5],[1.5]]);
console.log(lynx.size(x0,0)); /*2*/
```




## `acos(x)`


Inverse cosine. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = new lynx.NdArray([[0],[0.88]]);
console.log(lynx.acos(x0)) /*array([[1.5707963267948966],
    [0.4949341263408955]])*/
```

## `arange(x,y,z)`
Returns an array of evenly spaced values within a given interval. If `z` is an array, the spacings will alternate.

### Example
```js
console.log(lynx.arange(0,10,[0.3,0.3,0.4]).toString()); /*array([0,0.3,0.7,1,1.3,1.7,2,2.3,2.7,3,3.3,3.7,4,4.3,4.7,5,5.3,5.7,6,6.3,6.7,7,7.3
,7.7,8,8.3,8.7,9,9.3,9.7])*/
```

## `asin(x)`
Inverse sine. If the input is an array, the function will be performed element-wise.
### Example
```js
var x0 = new lynx.NdArray([0.1,0.46,0.74,0.02,0.72]);
console.log(lynx.asin(x0)) /*array([0.1001674211615598,0.4779951985189524,0.833070
3583416478,0.02000133357339049,0.80380231893303])*/
```

## `atan(x)`
Inverse tangent. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = -1
console.log(lynx.atan(x0)) /*3.141592653589793*/
```

## `cbrt(x)`
Returns the cube root. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = 1.3;
console.log(lynx.cbrt(x0)) /*1.091392883061106*/
```

## `ceil(x)`
Returns ceil of number. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = new lynx.Dual(0.42,0.6);
console.log(lynx.ceil(x0)) /*1+0E*/
```


## `cos(x)`
Computes cosine. If the input is an array, the function will be performed element-wise.
### Example
```js
var x0 = new lynx.NdArray([3.5]);
console.log(lynx.cos(x0)) /*array([-0.9364566872907963])*/
```

## `euler_gamma`
Constant representing γ = 0.57721..., the mathematical constant recurring in analysis and number theory.

## `exp(x)`
Exponential function. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = new lynx.Dual(0,0.5);
console.log(lynx.exp(x0)) /*1+0.5E*/
```
## `exponential(x)`
Alias for `exp(x)`.

## `fac(x)`
Factorial. Uses gamma function for non-integers. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = new lynx.NdArray([8.5,2.5]);
console.log(lynx.fac(x0)) /*array([119292.46190360367,3.3233491087856915])*/
```
## `fact(x)`
Alias for `fac(x)`.

## `factorial(x)`
Alias for `fac(x)`.

## `floor(x)`
Returns floor of number. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = new lynx.NdArray([[5.5],[2.5]]);
console.log(lynx.floor(x0)) /*array([[5],
    [2]])*/
```


## `full(x,fill_value)`
Return a new NdArray of given shape, filled with fill_value.

### Example
```js
console.log(lynx.full([2,2],3));  /*array([[3,3],
       [3,3]])*/
```

## `identity(x)`
Return the identity array. The identity array is a square array with ones on the main diagonal.

### Example
```js
var x0 = 2;
console.log(lynx.identity(x0)) /*array([[1,0],
    [0,1]])*/
```

## `integral(f,a,b,n=5000)`
Use composite trapezoidal rule with "n" subintervals to compute integral.
### Example
```js
var f = (n) => 2*n+1;
console.log(lynx.integral(f,0,6)); /*41.99999999999993*/
```

## `lambertw(x)`
Applies [Lambert W function](https://en.wikipedia.org/wiki/Lambert_W_function). If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = 7;
console.log(lynx.lambertw(x0)) /*1.5243452049841442*/
```

## `log(x)`
Returns the natural logarithm. If the input is an array, the function will be performed element-wise. For negative numbers, the absolute value will be applied.

### Example
```js
var x0 = new lynx.NdArray([[-4.5],[-1]]);
console.log(lynx.log(x0)) /*array([[1.5040773967762742],
    [0]])*/
```

## `ones(x)`
Return a new NdArray of given shape, filled with ones. 

### Example
```js
console.log(lynx.ones([4])) /*array([1,1,1,1])*/
```


## `rint(x)`
Alias for `round(x)`.

## `round(x)`
Returns the rounded number. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = 2.5;
console.log(lynx.round(x0)) /*3*/
```

## `sin(x)`
Computes sine. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = new lynx.Dual(-2,-3.5);
console.log(lynx.sin(x0)) /*-0.9092974268256817+1.4565139279149983E*/
```

## `size(x,y)`
Returns the number of elements in an NdArray along a given axis.

```js
var x0 = new lynx.NdArray([[0.5,1.5,2],
    [0.5,2.5,1]]);
console.log(lynx.size(x0,1).toString()) /*3*/
```

## `sqrt(x)`
Returns the square root. If the input is an array, the function will be performed element-wise. For negative numbers, the real part (`0`) will be returned.

### Example
```js
var x0 = new lynx.Dual(0.5,0.5)
console.log(lynx.sqrt(x0)) /*0.7071067811865476+0.35355339059327373E*/
```

## `tan(x)`
Computes tangent. If the input is an array, the function will be performed element-wise.

### Example
```js
var x0 = new lynx.NdArray([2,-3,-0.5,-1.5,-4])
console.log(lynx.tan(x0)) /*array([-2.185039863261519,0.1425465430742778,-0.54630
24898437905,-14.101419947171719,-1.1578212823495777])*/
```



## `zeros(x)`
Return a new NdArray of given shape, filled with zeros. 

### Example
```js
console.log(lynx.zeros([2,3]).toString()) /*array([[0,0,0],
       [0,0,0]])*/
```

