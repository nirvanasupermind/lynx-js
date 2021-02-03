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
The constructor for NdArray. It takes an Array and returns the corresponding NdArray.

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
console.log(x0.dot(x1)) /* 35 */
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

