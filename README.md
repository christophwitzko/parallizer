# parallizer
[![Build Status](https://api.travis-ci.org/christophwitzko/parallizer.svg?branch=master)](https://travis-ci.org/christophwitzko/parallizer) [![Coverage Status](https://coveralls.io/repos/christophwitzko/parallizer/badge.png?branch=master)](https://coveralls.io/r/christophwitzko/parallizer?branch=master) [![Code Climate](https://codeclimate.com/github/christophwitzko/parallizer.png)](https://codeclimate.com/github/christophwitzko/parallizer) [![NPM version](https://badge.fury.io/js/parallizer.svg)](http://badge.fury.io/js/parallizer)

[![NPM](https://nodei.co/npm/parallizer.png?downloads=true&stars=true)](https://nodei.co/npm/parallizer/)

> Parallizer is a tool that makes working with asynchronous functions much easier!

## Installation

    $ npm install parallizer

## Example

```js
var parallizer = require('parallizer');

var prl = new parallizer.Parallel(3); //creates a new Parallel object that will only run 3 functions at the same time.

var add2 = function(id, rnd, cb){ //very important: last argument must be the callback.
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

* `max` - The maximum concurrent running functions. (Default: 1)
* `cb` - The callback that will be called if all functions have been executed.

---------------------------------------

### parallel.sadd(fn[, arg1[, arg2[, ...]]])

Adds a function to the queue an executes it if possible.

__Arguments__

* `fn` - The function to be called, last argument must be a callback.
* `arg1, arg2, ...` - Arguments for `fn`.

---------------------------------------

### parallel.add(fn, [args], [cb], [scope], [high])

This Function does the same like `parallel.sadd`, but with a different API.

__Arguments__

* `fn` - The function to be called, last argument must be a callback.
* `args` - An array specifying the arguments with which `fn` should be called.
* `cb` - Callback (last argument) of `fn`.
* `scope` - The scope (this reference) in which the `fn` is executed.
* `high` - If `true`, pushes `fn` in front of the queue.


__Example__

```js
var parallizer = require('parallizer');

var prl = new parallizer.Parallel(3); //creates a new Parallel object, that will only run 3 functions at the same time.

var add2 = function(id, cb){ //very important: last argument must be the callback.
  var self = this;
  setTimeout(function(){
    cb(id, self.rnd);
  }, 100);
};

for(var i = 0; i < 100; i++){
  var rnd = Math.floor(Math.random()*500);
  prl.add(add2, ['ID#' + i], function(id, rnd){
    console.log(id + ': ' + rnd);
  }, {rnd: rnd});
}
```

## Tests

    $ npm install && npm test

## Licence

The MIT License (MIT)

Copyright (c) 2014 Christoph Witzko
