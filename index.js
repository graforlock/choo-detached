const assert = require('assert')
const Choo = require('choo')

function Detached (opts) {
  opts = opts || {}
  if (!(this instanceof Detached)) return new Detached(opts)
  Choo.call(this, opts)

  this._detached = opts.detached === undefined ? true : opts.detached

  if (this._detached) {
    this._historyEnabled = false
    this._hrefEnabled = false

    this.handler = null

    var self = this
    this.router = function () {
      assert.notEqual(self.handler, null, 'choo: component has no existing component handler')

      return self.handler(self.state, function (eventName, data) {
        self.emitter.emit(eventName, data)
      })
    }
    this.router.on = function () {}
  }
}

Detached.prototype = Object.create(Choo.prototype)
Detached.prototype.constructor = Detached

Detached.prototype.component = function (handler) {
  assert.notEqual(this._detached, false, 'choo: attempt to mount component in non-detached mode')
  assert.equal(typeof handler, 'function', 'choo: handler should be type function')

  this.handler = handler
}

module.exports = Detached
