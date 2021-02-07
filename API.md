(WiP)

# The Class `NdArray`
The class `NdArray` can represent tensors.
## Prototype
### `add(that)`
Element-wise addition.

#### Example
```js
var x0 = new lynx.NdArray([4,5])
var x1 = new lynx.NdArray([1,2])
console.log(x0.add(x1).toString()) /*array([5,7])*/
```

### `constructor(value)`
The constructor for NdArray. It takes an Array and returns the corresponding NdArray. Note that `new` can be omitted.

#### Example
```js
console.log(new lynx.NdArray([1,2,3])) /*array([1,2,3])*/
```

### `div(that)`

Element-wise division.

#### Example
```js
var x0 = new lynx.NdArray([[3,5,3],[5,2,5],[6,1,4]])
var x1 = new lynx.NdArray([[4,2,5],[5,4,4],[2,4,6]])
console.log(x0.div(x1).toString()) /*array([[0.75,2.5,0.6],
    [1,0.5,1.25],
    [3,0.25,0.6666666666666666]])*/
```

### `divide(that)`
Alias for `div`.

### `dot(that)`
Dot product of two arrays. Currently, it does not support 3D and higher input.
#### Example
```js
var x0 = new lynx.NdArray([2,2,1,6])
var x1 = new lynx.NdArray([1,5,5,3])
console.log(x0.dot(x1)) /*35*/
```

### `get(..n)`
Returns the element of an NdArray at a given index. It is 0-based, and accepts negative indices for indexing from the end of the array.

#### Example
```js
var x0 = new lynx.NdArray([[5,3],[6,3]])
console.log(x0.get(-1,0)) /*6*/
```



### `max()`
Return the maximum.

#### Example
```js
var x0 = new lynx.NdArray([2,6])
console.log(x0.max()) /*6*/
```

### `min()`
Return the minimum.
#### Example
```js
var x0 = new lynx.NdArray([2,6])
console.log(x0.min()) /*2*/
```

### `minus(that)`
Alias for `sub(that)`.

### `mod(that)`
Element-wise modulo.

#### Example
```js
var x0 = new lynx.NdArray([2,5,6,2])
var x1 = new lynx.NdArray([1,3,6,4])
console.log(x0.mod(x1).toString()) /*array([0,2,0,2])*/
```


### `modular(that)`
Alias for `mod(that)`.

### `mul(that)`
Element-wise multiplication.

#### Example
```js
var x0 = new lynx.NdArray([[3,1],[3,1]])
var x1 = new lynx.NdArray([[4,6],[3,5]])
console.log(x0.mul(x1).toString()) /*array([[12,6],
    [9,5]])*/
```

### `multiply(that)`
Alias for `mul(that)`.

### `ndim()`
Number of array dimensions.

#### Example
```js
var x0 = new lynx.NdArray([[2]])
console.log(x0.ndim()) /*2*/
```

### `plus(that)`
Alias for `add(that)`.

### `set(...m)`
Overwrites the element of an NdArray at a given index. It is 0-based, and accepts negative indices for indexing from the end of the array.

#### Example
```js
var x0 = new lynx.NdArray([3,3])
x0.set(0,4);
console.log(x0.toString()); /*array([4,3])*/
```

### `shape()`
Tuple of array dimensions.

#### Example
```js
var x0 = new lynx.NdArray([[1,4,4],[4,4,3],[6,5,1]])
console.log(x0.shape().toString()) /*3,3*/
```


### `sub(that)`

Element-wise subtraction.

#### Example
```js
var x0 = new lynx.NdArray([[2]])
var x1 = new lynx.NdArray([[4]])
console.log(x0.sub(x1).toString()) /*array([[-2]])*/
```

### `times(that)`
Alias for `mul(that)`.


### `toString()`
Converts the array to String.

#### Example
```js
var x0 = new lynx.NdArray([[1,6,4],[4,3,6],[2,5,6]])
console.log(x0.toString()) /*array([[1,6,4],
    [4,3,6],
    [2,5,6]])*/
```


### `tolist()`
Converts the array to Array.


#### Example
```js
var x0 = new lynx.NdArray([1,3,2,6])
console.log(x0.tolist().toString()) /*1,3,2,6*/
```

