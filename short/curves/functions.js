import { context } from './script.js'
import { WIDTH } from './script.js'
import { HEIGHT } from './script.js'
import { curve } from './script.js'
import { transform } from './script.js'
import { mouse } from './script.js'

let cycle_count = 0
function render () {
  context.clearRect(0, 0, WIDTH, HEIGHT)
  curve.drawIt(context)
  transform.iterate(curve)
  transform.drawIt(curve, context)
  cycle_count++;
  requestAnimationFrame(render)
}

function cypher (x, n) { // [0, n - 1] to [-1, 1]
  return 2 * x / (n - 1) - 1
}

function decypher (x, n) { // [-1, 1] to [0, n - 1]
  return (x + 1) * (n - 1) / 2
}

function pointerDownHandler (event) {
  mouse.up = false
}

function pointerUpHandler (event) {
  mouse.up = true
}

function pointerMoveHandler (event) {
  if (!mouse.up) {
    mouse.update(event.offsetX, event.offsetY)
    curve.update(mouse.x, mouse.y)
  }
}

export { render }
export { pointerDownHandler }
export { pointerUpHandler }
export { pointerMoveHandler }
export { cypher }
export { decypher }