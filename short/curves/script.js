import { render } from './functions.js'
import { Curve } from './classes.js'

const WIDTH = 500
const HEIGHT = 300

_canvas.width = WIDTH
_canvas.height = HEIGHT
_canvas.style.background = 'black'

export const curve = new Curve(50, WIDTH, HEIGHT)

const context = _canvas.getContext('2d')

render(context)
