/* global _canvas */
'use strict'
import Iterator from './Classes.js'

_canvas.width = 500
_canvas.height = 300
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

