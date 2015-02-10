var parallizer = require('../parallizer.js')

/* global describe */
/* global it */
/* eslint new-cap:0 */

var testFn = function (cb) {
  setTimeout(cb, 100)
}

describe('#parallizer.Parallel()', function () {
  it('should run function', function (done) {
    this.timeout(110)
    var prl = new parallizer.Parallel()
    prl.sadd(testFn, done)
  })
  describe('#sadd()', function () {
    it('should call collector callback (1)', function (done) {
      this.timeout(220)
      var prl = parallizer.Parallel(1, done)
      prl.sadd(testFn)
      prl.sadd(testFn)
    })
    it('should call collector callback (2)', function (done) {
      this.timeout(110)
      var prl = parallizer.Parallel(2, done)
      prl.sadd(testFn)
      prl.sadd(testFn)
    })
  })
  describe('#add()', function () {
    it('should call collector callback (1)', function (done) {
      this.timeout(220)
      var col = parallizer.Collector(done)
      var prl = parallizer.Parallel(1, col)
      prl.add(testFn)
      prl.add(testFn)
    })
    it('should call collector callback (2)', function (done) {
      this.timeout(110)
      var prl = parallizer.Parallel(2, done)
      prl.add(testFn)
      prl.add(testFn)
    })
  })
  describe('#start() and #pause()', function () {
    it('should start queue', function (done) {
      this.timeout(110)
      var prl = parallizer.Parallel(1, done, true)
      prl.sadd(testFn)
      prl.start()
    })
    it('should pause queue', function (done) {
      this.timeout(330)
      var prl = parallizer.Parallel(1, done)
      prl.sadd(testFn)
      prl.sadd(testFn)
      setTimeout(function () {
        prl.pause()
        setTimeout(prl.start.bind(prl), 150)
      }, 50)
    })
  })
})
