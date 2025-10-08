/* global _canvas */
'use strict'
import Hexagon from './Classes.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const test = new Hexagon(250, 250, 16, "blue")
test.drawIt(context)