import { curve } from './script.js'
import { context } from './script.js'

function render () {
  curve.drawIt(context)
  requestAnimationFrame(render)
}

export { render }