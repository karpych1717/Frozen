import { curve } from './script.js'
import { context } from './script.js'

function render () {
  curve.drawIt(context)
  requestAnimationFrame(render)
}

function cypher (x, n) { // [0, n - 1] to [-1, 1]
  return 2 * x / (n - 1) - 1
}

function decypher (x, n) { // [-1, 1] to [0, n - 1]
  return (x + 1) * (n - 1) / 2
}

export { render }
export { cypher }
export { decypher }