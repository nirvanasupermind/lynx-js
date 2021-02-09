(WiP)

# The Class `NdArray`
The class `NdArray` contains useful basic numerical constants and methods for tensors. It can also be used as an efficient multi-dimensional container of generic data.

## Prototype
### `NdArray.prototype.add(that)`
Element-wise addition.

#### Example
```js
var x0 = new lynx.NdArray([4,5])
var x1 = new lynx.NdArray([1,2])
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
var x0 = new lynx.NdArray([[3,5,3],[5,2,5],[6,1,4]])
var x1 = new lynx.NdArray([[4,2,5],[5,4,4],[2,4,6]])
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
var x0 = new lynx.NdArray([2,2,1,6])
var x1 = new lynx.NdArray([1,5,5,3])
console.log(x0.dot(x1)) /*35*/
```

### `NdArray.prototype.get(..n)`
Returns the element of an NdArray at a given index. It is 0-based, and accepts negative indices for indexing from the end of the array.

#### Example
```js
var x0 = new lynx.NdArray([[5,3],[6,3]])
console.log(x0.get(-1,0)) /*6*/
```



### `NdArray.prototype.max()`
Return the maximum.

#### Example
```js
var x0 = new lynx.NdArray([2,6])
console.log(x0.max()) /*6*/
```

### `NdArray.prototype.min()`
Return the minimum.
#### Example
```js
var x0 = new lynx.NdArray([2,6])
console.log(x0.min()) /*2*/
```

### `NdArray.prototype.minus(that)`
Alias for `NdArray.prototype.sub(that)`.

### `NdArray.prototype.mod(that)`
Element-wise modulo.

#### Example
```js
var x0 = new lynx.NdArray([2,5,6,2])
var x1 = new lynx.NdArray([1,3,6,4])
console.log(x0.mod(x1).toString()) /*array([0,2,0,2])*/
```


### `NdArray.prototype.modular(that)`
Alias for `NdArray.prototype.mod(that)`.

### `NdArray.prototype.mul(that)`
Element-wise multiplication.

#### Example
```js
var x0 = new lynx.NdArray([[3,1],[3,1]])
var x1 = new lynx.NdArray([[4,6],[3,5]])
console.log(x0.mul(x1).toString()) /*array([[12,6],
    [9,5]])*/
```

### `NdArray.prototype.multiply(that)`
Alias for `NdArray.prototype.mul(that)`.

### `NdArray.prototype.ndim()`
Number of array dimensions.

#### Example
```js
var x0 = new lynx.NdArray([[2]])
console.log(x0.ndim()) /*2*/
```

### `NdArray.prototype.plus(that)`
Alias for `NdArray.prototype.add(that)`.

### `NdArray.prototype.set(...m)`
Overwrites the element of an NdArray at a given index. It is 0-based, and accepts negative indices for indexing from the end of the array.

#### Example
```js
var x0 = new lynx.NdArray([3,3])
x0.set(0,4);
console.log(x0.toString()); /*array([4,3])*/
```

### `NdArray.prototype.shape()`
Tuple of array dimensions.

#### Example
```js
var x0 = new lynx.NdArray([[1,4,4],[4,4,3],[6,5,1]])
console.log(x0.shape().toString()) /*3,3*/
```


### `NdArray.prototype.sub(that)`

Element-wise subtraction.

#### Example
```js
var x0 = new lynx.NdArray([[2]])
var x1 = new lynx.NdArray([[4]])
console.log(x0.sub(x1).toString()) /*array([[-2]])*/
```

### `NdArray.prototype.times(that)`
Alias for `NdArray.prototype.mul(that)`.


### `NdArray.prototype.toString()`
Converts the array to String.

#### Example
```js
var x0 = new lynx.NdArray([[1,6,4],[4,3,6],[2,5,6]])
console.log(x0.toString()) /*array([[1,6,4],
    [4,3,6],
    [2,5,6]])*/
```


### `NdArray.prototype.tolist()`
Converts the array to Array.


#### Example
```js
var x0 = new lynx.NdArray([1,3,2,6])
console.log(x0.tolist().toString()) /*1,3,2,6*/
```

# The Class `Dual`
The class `Dual` represents [dual numbers](https://mathworld.wolfram.com/DualNumber.html). 

## Prototype

### `Dual.prototype.add(that)`
Addition.

#### Example
```js
var x0 = new lynx.Dual(0.5,2.5)
var x1 = new lynx.Dual(2.5,0.5)
console.log(x0.add(x1).toString()) /*3+3E*/
```

### `Dual.prototype.constructor(a,b=0)`
The constructor for Dual. Takes two numbers representing the real and imaginary part of the value. Note that `new` can be omitted.

#### Example
```js
var x0 = new lynx.Dual(3,6)
console.log(x0.toString()); //3+6E
```

### `Dual.prototype.div(that)`
Division.

#### Example
```js
var x0 = new lynx.Dual(1,7.5)
var x1 = new lynx.Dual(8,3)
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
var x0 = new lynx.Dual(2.5,2)
var x1 = new lynx.Dual(1,2.5)
console.log(x0.mul(x1).toString()) /*2.5+8.25E*/
```

### `Dual.prototype.multiply(that)`
Alias for `Dual.prototype.mul(that)`.

### `Dual.prototype.pow(that)`
Exponentiation.

#### Example
```js
var x0 = new lynx.Dual(1,5.5)
var x1 = new lynx.Dual(3,2.5)
console.log(x0.pow(x1).toString()) /*1+16.5E*/
```

### `Dual.prototype.sub(that)`
Subtraction.

#### Example
```js
var x0 = new lynx.Dual(0.5,4)
var x1 = new lynx.Dual(0,4)
console.log(x0.sub(x1).toString()) /*0.5+0E*/
```

### `Dual.prototype.times(that)`
Alias for `Dual.prototype.mul(that)`.

### `Dual.prototype.toString()`
Converts the number to String.

#### Example
```js
var x0 = new lynx.Dual(0,1)
console.log(x0.toString()); //1E
```


