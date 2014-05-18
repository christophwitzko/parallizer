# parallizer
[![Build Status](https://api.travis-ci.org/christophwitzko/parallizer.svg?branch=master)](https://travis-ci.org/christophwitzko/parallizer) [![NPM version](https://badge.fury.io/js/parallizer.svg)](http://badge.fury.io/js/parallizer)

[![NPM](https://nodei.co/npm/parallizer.png?downloads=true&stars=true)](https://nodei.co/npm/parallizer/)

> Parallizer is a tool that makes working with asynchronous functions much easier!

## Installation

    $ npm install parallizer

## Example

```
var parallizer = require('parallizer');

var prl = new parallizer.Parallel(3);

var add2 = function(id, rnd, cb){
  setTimeout(function(){
    cb(id, rnd);
  }, 100);
};

for(var i = 0; i < 100; i++){
  var rnd = Math.floor(Math.random()*500);
  prl.sadd(add2, 'ID#' + i, rnd, function(id, rnd){
    console.log(id + ': ' + rnd);
  });
}

```

## Documentation

### new parallizer.Parallel([max], [cb])

Creates an new Parallel object.

__Arguments__

* `max` - The maximum concurrent running functions. Default: 1;
* `cb` - The callback that will be called if all functions have been executed.

---------------------------------------

### parallel.sadd(fn[, arg1[, arg2[, ...]]])

Adds a function to the queue an executes it if possible.

__Arguments__

* `fn` - The function to be called, last argument must be a callback.
* `arg1, arg2, ...` - Arguments for the function; if the last argument is a function it is used as callback.

---------------------------------------

### parallel.add(fn, [args], [cb], [scope], [high])

This Function does the same like `parallel.sadd`, but with a different API.

__Arguments__

* `fn` - The function to be called, last argument must be a callback.
* `args` - An array of the arguments of the function.
* `cb` - Last argument of the function (callback).
* `scope` - The scope of the `fn`.
* `high` - If `true`, pushes `fn` in front of the queue.

## Tests

    $ npm install && npm test

## Licence

The MIT License (MIT)

Copyright (c) 2014 Christoph Witzko
