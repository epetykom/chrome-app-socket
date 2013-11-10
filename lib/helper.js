var bops = require('bops')

/**
 * Convert given data to a Uint8Array. The underlying ArrayBuffer is
 * guaranteed to be the same size as the Uint8Array.
 *
 * @param  {Uint8Array|ArrayBuffer|string} data
 * @return {Uint8Array}      [description]
 */
exports.toBuffer = function (data) {
  if (bops.is(data)) {
    if (data.length === data.buffer.length) {
      return data
    } else {
      // If data is a Uint8Array (TypedArrayView) AND its underlying ArrayBuffer
      // has a different size (larger) then we create a new Uint8Array and
      // underlying ArrayBuffer that are the exact same size. This is necessary
      // because Chrome's `sendTo` consumes the underlying ArrayBuffer.
      var newBuf = bops.create(data.length)
      bops.copy(data, newBuf, 0, 0, data.length)
      return newBuf
    }
  } else if (typeof data === 'string') {
    return bops.from(data)
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data)
  } else {
    throw new Error('Cannot convert data to ArrayBuffer type')
  }
}