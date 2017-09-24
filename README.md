# choo-detached

# Example

```javascript
var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo-detached')

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
