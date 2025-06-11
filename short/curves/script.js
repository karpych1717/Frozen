import { render } from './functions.js'

const WIDTH = 500
const HEIGHT = 300

_canvas.width = WIDTH
_canvas.height = HEIGHT
_canvas.style.background = 'black'

const context = _canvas.getContext('2d')

render()
