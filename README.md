## choo-detached
[![npm version](https://badge.fury.io/js/choo-detached.svg)](https://badge.fury.io/js/choo-detached) 

A wrapper around choo API that allows to use choo components without a baked-in routing layer. 

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Example

```javascript
var choo = require('choo-detached')
var html = require('choo-detached/html')
var log = require('choo-log')

var app = choo()
app.use(log())
app.use(countStore)
app.component(mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body>
      <h1>count is ${state.count}</h1>
      <button onclick=${onclick}>Increment</button>
    </body>
  `

  function onclick () {
    emit('increment', 1)
  }
}

function countStore (state, emitter) {
  state.count = 0
  emitter.on('increment', function (count) {
    state.count += count
    emitter.emit('render')
  })
}
```
