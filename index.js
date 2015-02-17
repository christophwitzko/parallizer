'use strict'

var callbackCount = require('callback-count')
var nextTick = require('next-tick')

function Parallizer (max, col, paused) {
  if (!(this instanceof Parallizer)) return new Parallizer(max, col, paused)
  var pm = parseInt(max, 10)
  this._max = (!isNaN(pm) && pm > 0) ? pm : 1
  this._running = 0
  this._queue = []
  this._paused = !!paused
  this._col = null
  if (typeof col === 'function') {
    this._col = callbackCount(nextTick.apply.bind(nextTick, null, [col]))
  }
}

Parallizer.prototype.add = function (fn, args, cb, scope, high) {
  var self = this
  if (!(args instanceof Array)) args = []
  if (typeof cb !== 'function') cb = function () {}
  args.push(function() {
    cb.apply(this, Array.prototype.slice.call(arguments))
    if (self._col) self._col.next()
    self._running--
    self._check()
  })
  fn = (typeof fn === 'function') ? fn : function () {}
  var fno = fn.apply.bind(fn, scope || null, args || [])
  self._queue[high ? 'unshift' : 'push'](fno)
  if (self._col) self._col.inc()
  self._check()
}

Parallizer.prototype.sadd = function () {
  var fa = Array.prototype.slice.call(arguments)
  if (fa.length > 0) {
    var fn = fa.shift()
    var cb = function () {}
    if (fa.length > 0 && typeof fa[fa.length - 1] === 'function') cb = fa.pop()
    this.add(fn, fa, cb)
  }
}

Parallizer.prototype._check = function () {
  if (!this._paused && this._running < this._max && this._queue.length > 0) {
    this._running++
    nextTick(this._queue.shift())
  }
}

Parallizer.prototype.pause = function () {
  this._paused = true
}

Parallizer.prototype.start = function () {
  this._paused = false
  this._check()
}

// backwards compatibility
Parallizer.Parallel = Parallizer

module.exports = Parallizer
