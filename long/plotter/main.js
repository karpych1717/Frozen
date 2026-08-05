/* global _canvas */
'use strict'
import Plotter from './Plotter.js'
import Vector from './Vector.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'white'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const plotter = new Plotter(_canvas)

plotter.plot([1, 2, 3, 4], [1, 4, 2, 3])