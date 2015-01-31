var parallizer = require('../parallizer.js')

/* global describe */
/* global it */

var collector = new parallizer.Collector()

describe('#parallizer.Collector()', function () {
  it('should call callback', function (done) {
    var col = new parallizer.Collector(done)
    col.start()
    col.done()
  })
  describe('#start()', function () {
    it('should increase counter', function () {
      collector.start()
      collector._count.should.equal(1)
    })
  })
  describe('#done()', function () {
    it('should decrease counter', function () {
      collector.done()
      collector._count.should.equal(0)
    })
  })
})
