chrome-app-socket
==========
### Chrome App Sockets (TCP/UDP) made easy!

This module lets you use the Node.js [net](http://nodejs.org/api/net.html) (TCP) and [dgram](http://nodejs.org/api/dgram.html) (UDP) APIs in [Chrome Packaged Apps](http://developer.chrome.com/apps/about_apps.html).

Instead of learning the quirks of Chrome's `chrome.socket` API for networking in Chrome Apps just **use the higher-level node API you're familiar with**. Then, compile your code with [browserify](https://github.com/substack/node-browserify) and you're all set!

This is a meta-package that just wraps [chrome-dgram](https://github.com/feross/chrome-dgram) and [chrome-net](https://github.com/feross/chrome-net).

This module is used by [webtorrent](https://github.com/feross/webtorrent).

## Installation

`npm install chrome-app-socket`

## Usage

Use node's `net` and `dgram` APIs, including all parameter list shorthands and variations.

Example TCP client:

```js
var net = require('chrome-app-socket').net

var client = net.createConnection({
  port: 1337,
  host: '127.0.0.1'
})

client.write('beep')

client.on('data', function (data) {
  console.log(data)
})

// .pipe() streaming API works too!

```

Example TCP server:

```js
var net = require('chrome-app-socket').net

var server = net.createServer()

server.on('listening', function () {
  console.log('listening')
})

server.on('connection', function (sock) {
  console.log('Connection from ' + sock.remoteAddress + ':' + sock.remotePort)
  sock.on('data', function (data) {
    console.log(data)
  })
})

server.listen(1337)

```

Example UDP client/bind:

```js
var dgram = require('chrome-app-socket').dgram

var sock = dgram.createSocket('udp4')

sock.send('beep', 0, 'beep'.length, 1337, '127.0.0.1')

sock.on('message', function (data, rInfo) {
  console.log('Got data from ' + rInfo.address + ':' + rInfo.port)
  console.log(data)
})

```

See nodejs.org for full API documentation: [net](http://nodejs.org/api/net.html) & [dgram](http://nodejs.org/api/dgram.html)

## Contributing

To run tests, use `npm test`. The tests will run TCP and UDP servers and launch a few different Chrome Packaged Apps with browserified client code. The tests currently require Chrome Canary on Mac. If you're on Windows or Linux, feel free to send a pull request to fix this limitation.

## MIT License

Copyright (c) [Feross Aboukhadijeh](http://feross.org) & John Hiesey