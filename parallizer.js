/*!
 * parallizer
 * https://github.com/christophwitzko/parallizer
 *
 * Copyright 2014 Christoph Witzko
 * Released under the MIT license
 */

(function(){
'use strict'

var parallizer = {}

var nextTick = (typeof process === 'object' && typeof process.nextTick === 'function') ? process.nextTick : function(fn){setTimeout(fn, 0)}

function Func(fn, args, scope){
  if(!(this instanceof Func)) return new Func(fn, args, scope)
  this._fn = (typeof fn === 'function') ? fn : function(){}
  this._args = (args && typeof args.length !== 'undefined') ? args : []
  this._scope = scope || {}
}

Func.prototype.run = function(){
  return this._fn.apply(this._scope, this._args)
}

Func.prototype.getBindFn = function(){
  return this.run.bind(this)
}

parallizer.Func = Func


function Collector(cb){
  if(!(this instanceof Collector)) return new Collector(cb)
  this._count = 0
  this._cb = (typeof cb === 'function') ? cb : function(){}
}

Collector.prototype.start = function(){
  this._count++
}

Collector.prototype.done = function(){
  this._count--
  if(this._count === 0) nextTick(this._cb)
}

parallizer.Collector = Collector


function Parallel(max, col, paused){
  if(!(this instanceof Parallel)) return new Parallel(max, col, paused)
  var pm = parseInt(max, 10)
  this._max = (!isNaN(pm) && pm > 0) ? pm : 1
  this._running = 0
  this._queue = []
  this._paused = !!paused
  this._col = null
  if(typeof col === 'function') this._col = new Collector(col)
  if(col instanceof Collector) this._col = col
}

Parallel.prototype.add = function(fn, args, cb, scope, high){
  var self = this
  if(!(args instanceof Array)) args = []
  if(typeof cb !== 'function') cb = function(){}
  args.push(function(){
    cb.apply(this, Array.prototype.slice.call(arguments))
    if(self._col) self._col.done()
    self._running--
    self._check()
  })
  var fno = new Func(fn, args, scope)
  self._queue[high ? 'unshift': 'push'](fno)
  if(self._col) self._col.start()
  self._check()
}

Parallel.prototype.sadd = function(){
  var fa = Array.prototype.slice.call(arguments)
  if(fa.length > 0){
    var fn = fa.shift()
    var cb = function(){}
    if(fa.length > 0 && typeof fa[fa.length - 1] === 'function') cb = fa.pop()
    this.add(fn, fa, cb)
  }
}

Parallel.prototype._check = function(){
  if(!this._paused && this._running < this._max && this._queue.length > 0){
    var fno = this._queue.shift()
    this._running++
    nextTick(fno.getBindFn())
  }
}

Parallel.prototype.pause = function(){
  this._paused = true
}

Parallel.prototype.start = function(){
  this._paused = false
  this._check()
}

parallizer.Parallel = Parallel

if(typeof module === 'object' && typeof module.exports === 'object'){
  module.exports = parallizer
}

if(typeof define === 'function' && define.amd){
  define('parallizer', [], function(){return parallizer})
}

if(typeof window === 'object'){
  window.parallizer = parallizer
}

})()
