/* global _canvas */
'use strict'
import simpleFunction from './sample.js'
import Button from './Button.js'
import Slider from './Slider.js'
import clickHandler from './clickHandler.js'
import mouseUpHandler from './mouseUpHandler.js'
import mouseMoveHandler from './mouseMoveHandler.js'
import Field from './field.js'
import Mouse from './Mouse.js'

_canvas.width = 750
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

export const togglePauseButton = new Button(630, 20, 100, 140, () => field.togglePause())
togglePauseButton.drawIt(context)

export const randomButton = new Button(630, 180, 100, 140, () => field.fillRandom())
randomButton.drawIt(context)

export const clearButton = new Button(630, 340, 100, 140, () => field.clear())
clearButton.drawIt(context)

export const slider = new Slider(550, 20, 50, 460, 0, 205)
slider.drawIt(context)

export const field = new Field (25, 25, 0, 0, 500, 500, true)
field.drawIt(context)

export const mouse = new Mouse()

export const sliderMouse = new Mouse()

let loopIntervalId
let sliderValueUsed = 0.5

function loop () {
    field.cycle(context)
}
loopIntervalId = setInterval(loop, 33 + 297 * sliderValueUsed)

function UIloop () {
    slider.drawIt(context)

    if (sliderValueUsed != slider.value()) {
        sliderValueUsed = slider.value()

        clearInterval(loopIntervalId)
        loopIntervalId = setInterval(loop, 33 + 297 * sliderValueUsed)
    }
}
setInterval(UIloop, 33)

// const field = new Field (...)
// const togglePauseButton = new Button(200, 300, 30, 30, () => field.togglePause() )

document.onpointerdown = clickHandler
document.onpointerup = mouseUpHandler
document.onpointermove = mouseMoveHandler