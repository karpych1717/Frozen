import { render } from './functions.js'
import { pointerDownHandler } from './functions.js'
import { pointerUpHandler } from './functions.js'
import { pointerMoveHandler } from './functions.js'
import { Curve } from './classes.js'
import { Mouse } from './classes.js'

export const WIDTH = 500
export const HEIGHT = 300

_canvas.width = WIDTH
_canvas.height = HEIGHT
_canvas.style.background = 'black'

export const context = _canvas.getContext('2d')

export const curve = new Curve(50, WIDTH, HEIGHT)
export const mouse = new Mouse(WIDTH, HEIGHT)

render(context)

_canvas.onpointerdown = pointerDownHandler
_canvas.onpointerup = pointerUpHandler
_canvas.onpointermove = pointerMoveHandler