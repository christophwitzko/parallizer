var parallizer = require('./parallizer.js')

var files = [
    'http://nodejs.org/dist/v0.10.28/node-v0.10.28-darwin-x64.tar.gz',
    'http://nodejs.org/dist/v0.10.28/node-v0.10.28-darwin-x86.tar.gz',
    'http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-x64.tar.gz',
    'http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-x86.tar.gz'
  ]

function downloadFile (url, dest, cb) {
  console.log('downloading %s -> %s', url, dest)
  /*
  // use request (https://github.com/request/request) to download file
  var dr = request(url)
  var df = fs.createWriteStream(dest)
  dr.pipe(df)
  dr.on('end', cb)
  dr.on('error', cb)*/
  setTimeout(cb, 2000) // simulate downloading
}

var prl = new parallizer.Parallel(1, function () {
  console.log('done.')
})

files.forEach(function (v, i) {
  prl.add(downloadFile, [v, i + '.tar.gz'], function () {}, null, 0)
  // prl.sadd(downloadFile, v, i + '.tar.gz')
})

setTimeout(function () {
  console.log('paused.')
  prl.pause()
  setTimeout(function () {
    console.log('starting...')
    prl.start()
  }, 3000)
}, 1000)
