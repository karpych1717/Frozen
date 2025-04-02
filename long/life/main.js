/* global _canvas */
'use strict'
import simpleFunction from './sample.js'
import Button from './Button.js'
import clickHandler from './clickHandler.js'
import mouseUpHandler from './mouseUpHandler.js'
import Field from './field.js'
import Mouse from './Mouse.js'

_canvas.width = 750
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

export const togglePauseButton = new Button(700, 0, 50, 50, () => field.togglePause())
togglePauseButton.drawIt(context)

export const randomButton = new Button(700, 100, 50, 50, () => field.fillRandom())
randomButton.drawIt(context)

export const clearButton = new Button(700, 200, 50, 50, () => field.clear())
clearButton.drawIt(context)

export const field = new Field (25, 25, 0, 0, 500, 500, true)
field.drawIt(context)

export const mouse = new Mouse()

function loop () {
    field.cycle(context)
    console.log(mouse.state)
}

setInterval(loop, 330)

// const field = new Field (...)
// const togglePauseButton = new Button(200, 300, 30, 30, () => field.togglePause() )

document.onpointerdown = clickHandler
document.onpointerup = mouseUpHandler