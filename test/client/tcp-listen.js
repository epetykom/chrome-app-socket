var bops = require('bops')
var socket = require('../../')

var LISTEN_PORT = Number(process.env.LISTEN_PORT)
var READY_PORT = Number(process.env.READY_PORT)

var server = socket.TCPListenSocket(LISTEN_PORT)

server.on('listening', function () {
  // Report to node that the TCP server is listening
  var readySock = socket.dgram.createSocket('udp4')
  readySock.send('listening', 0, 'listening'.length, READY_PORT, '127.0.0.1')
})

server.on('connection', function (sock) {
  console.log('Connection opened from ' + sock.host + ':' + sock.port)

  sock.on('data', function (data) {
    console.log('Got data: ' + bops.to(data))
    if (bops.to(data) === 'beep') {
      sock.write('boop')
    } else {
      sock.write('fail')
    }
  })

})