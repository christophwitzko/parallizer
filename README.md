# parallizer
[![Travis](https://img.shields.io/travis/christophwitzko/parallizer.svg?style=flat)](https://travis-ci.org/christophwitzko/parallizer) [![Coveralls](https://img.shields.io/coveralls/christophwitzko/parallizer.svg?style=flat)](https://coveralls.io/r/christophwitzko/parallizer?branch=master) [![Code Climate](https://img.shields.io/codeclimate/github/christophwitzko/parallizer.svg?style=flat)](https://codeclimate.com/github/christophwitzko/parallizer) [![npm](https://img.shields.io/npm/v/parallizer.svg?style=flat)](https://www.npmjs.com/package/parallizer) [![npm](https://img.shields.io/npm/dm/parallizer.svg?style=flat)](https://www.npmjs.com/package/parallizer)

> Parallizer is a tool that makes working with asynchronous functions much easier.

## Installation

    $ npm install parallizer --save

## Example

```js
var parallizer = require('parallizer');

//creates a new Parallel object
//that will only run 3 functions at the same time.
var prl = new parallizer.Parallel(3);

//very important: last argument must be the callback.
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

### new parallizer.Parallel([max], [cb], [paused])

Creates an new Parallel object.

**Arguments**

* `max` - The maximum concurrent running functions. (Default: 1)
* `cb` - The callback that will be called if all functions have been executed.
* `paused` - The queue is initially paused.

---------------------

### parallel.sadd(fn[, arg1[, arg2[, ...]]])

Adds a function to the queue an executes it if possible.

**Arguments**

* `fn` - The function to be called, last argument must be a callback.
* `arg1, arg2, ...` - Arguments for `fn`.

---------------------

### parallel.add(fn, [args], [cb], [scope], [high])

This function does the same like `parallel.sadd`, but with a different API.

**Arguments**

* `fn` - The function to be called, last argument must be a callback.
* `args` - An array specifying the arguments with which `fn` should be called.
* `cb` - Callback (last argument) of `fn`.
* `scope` - The scope (this reference) in which the `fn` is executed.
* `high` - If `true`, pushes `fn` in front of the queue.

---------------------

### parallel.start()

Starts the paused queue.

---------------------

### parallel.pause()

Pauses the queue.

## Tests

    $ npm install && npm test

## Licence

The [MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright © 2015 [Christoph Witzko](https://twitter.com/christophwitzko)
