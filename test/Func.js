var parallizer = require('../parallizer.js')

var testFunc = new parallizer.Func(function(io){return io + this.a}, ['hell'], {a: 'o'})

describe('#parallizer.Func()', function(){
  it('should match arguments length', function(){
    testFunc._fn.length.should.equal(1)
  })
  it('should match args', function(){
    testFunc._args.should.eql(['hell'])
  })
  it('should match scope', function(){
    testFunc._scope.should.eql({a: 'o'})
  })
  describe('#run()', function(){
    it('should run function correct', function(){
      testFunc.run().should.equal('hello')
    })
  })
  describe('#getBindFn()', function(){
    it('should run function correct', function(){
      var bfn = testFunc.getBindFn()
      bfn().should.equal('hello')
    })
  })
})