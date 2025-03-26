/* global _canvas */
'use strict'
import simpleFunction from './sample.js'
import Button from './Button.js'
document.onclick = clickHandler

_canvas.width = 750
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const pause = new Button(700, 50, 50, 50, () => alert("Hello world"))
pause.drawIt(context)

// const field = new Field (...)
// const togglePauseButton = new Button(200, 300, 30, 30, () => field.togglePause() )
