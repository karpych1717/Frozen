import { curve } from './script.js'

function render (context) {
  curve.drawIt(context)
  requestAnimationFrame(render(context))
}

export { render }