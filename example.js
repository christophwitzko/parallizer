var parallizer = require('./parallizer.js');

var files = ['http://nodejs.org/dist/latest/node-v0.10.28-darwin-x64.tar.gz', 'http://nodejs.org/dist/latest/node-v0.10.28-darwin-x86.tar.gz', 'http://nodejs.org/dist/latest/node-v0.10.28-linux-x64.tar.gz', 'http://nodejs.org/dist/latest/node-v0.10.28-linux-x86.tar.gz'];

function downloadFile(url, dest, cb){
  console.log('downloading %s -> %s', url, dest);
  /*
  use request (https://github.com/mikeal/request) to download file
  var dr = request(url);
  var df = fs.createWriteStream(dest);
  dr.pipe(df);
  dr.on('end', cb);
  dr.on('error', cb);*/
  setTimeout(cb, 1000);
}

var prl = parallizer.Parallel(1, function(){
  console.log('done.');
});

files.forEach(function(v, i){
  prl.sadd(downloadFile, v, i + '.tar.gz');
});