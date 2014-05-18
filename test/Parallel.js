var parallizer = require('../parallizer.js');

var testFn = function(cb){
  setTimeout(cb, 100);
};

describe('#parallizer.Parallel()', function(){
  it('should run function', function(done){
    var prl = new parallizer.Parallel();
    prl.sadd(testFn, done);
  })
  describe('#sadd()', function(){
    it('should call collector callback (1)', function(done){
      var prl = new parallizer.Parallel(1, done);
      prl.sadd(testFn);
      prl.sadd(testFn);
    })
    it('should call collector callback (2)', function(done){
      var prl = new parallizer.Parallel(2, done);
      prl.sadd(testFn);
      prl.sadd(testFn);
    })
  })
  describe('#add()', function(){
    it('should call collector callback (1)', function(done){
      var prl = new parallizer.Parallel(1, done);
      prl.add(testFn);
      prl.add(testFn);
    })
    it('should call collector callback (2)', function(done){
      var prl = new parallizer.Parallel(2, done);
      prl.add(testFn);
      prl.add(testFn);
    })
  })
})