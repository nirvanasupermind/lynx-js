(WiP)
# Table of Contents
- [Class NdArray](#classndarray)
    - [NdArray.prototype.add(that)](#ndarrayprototypeaddthat)
    - [NdArray.prototype.constructor(value)](#ndarrayprototypeconstructorvalue)
    - [NdArray.prototype.div(that)](#ndarrayprototypedivthat)
    - [NdArray.prototype.divide(that)](#ndarrayprototypedividethat)
    - [NdArray.prototype.dot(that)](#ndarrayprototypedotthat)
    - [NdArray.prototype.get(...n)](#ndarrayprototypegetn)
    - [NdArray.prototype.max()](#ndarrayprototypemax)
    - [NdArray.prototype.min()](#ndarrayprototypemin)
    - [NdArray.prototype.minus(that)](#ndarrayprototypeminusthat)
    - [NdArray.prototype.mod(that)](#ndarrayprototypemodthat)
    - [NdArray.prototype.modular(that)](#ndarrayprototypemodularthat)
    - [NdArray.prototype.mul(that)](#ndarrayprototypemulthat)
    - [NdArray.prototype.multiply(that)](#ndarrayprototypemultiplythat)
    - [NdArray.prototype.ndim()](#ndarrayprototypendim)
    - [NdArray.prototype.plus(that)](#ndarrayprototypeplusthat)
    - [NdArray.prototype.set(...m)](#ndarrayprototypesetm)
    - [NdArray.prototype.shape()](#ndarrayprototypeshape)
    - [NdArray.prototype.sub(that)](#ndarrayprototypesubthat)
    - [NdArray.prototype.times(that)](#ndarrayprototypetimesthat)
    - [NdArray.prototype.toString()](#ndarrayprototypetostring)
    - [NdArray.prototype.tolist()](#ndarrayprototypetolist)
- [Class "Dual"]
    - [Dual.prototype.add(that)](#dualprototypeaddthat)
    - [Dual.prototype.constructor(a,b=0)](#dualprototypeconstructorab0)
    - [Dual.prototype.div(that)](#dualprototypedivthat)
    - [Dual.prototype.divide(that)](#dualprototypedividethat)
    - [Dual.prototype.minus(that)](#dualprototypeminusthat)
    - [Dual.prototype.mul(that)](#dualprototypemulthat)
    - [Dual.prototype.multiply(that)](#dualprototypemultiplythat)
    - [Dual.prototype.plus(that)](#dualprototypeplusthat)
    - [Dual.prototype.pow(that)](#dualprototypepowthat)
    - [Dual.prototype.sub(that)](#dualprototypesubthat)
    - [Dual.prototype.times(that)](#dualprototypetimesthat)
    - [Dual.prototype.toString()](#dualprototypetostring)


# Class NdArray
Represents a mathematical tensor or array, an algebraic object that describes a (multilinear) relationship between sets of algebraic objects related to a vector space. 

## `NdArray.prototype.add(that)`
Element-wise addition.

## `NdArray.prototype.constructor(value)`
The constructor for NdArray. It takes an Array and returns the corresponding NdArray.