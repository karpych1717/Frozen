/* global _canvas */
'use strict'
import Circle from './Circle.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')
const frame = 100
const arr = new Array(10)
for (let i = 0; i < 10; i++) {
    arr[i] = new Circle(
        frame + Math.random() * (_canvas.width - 2 * frame),
        frame + Math.random() * (_canvas.height - 2 * frame),
        20,
        'rgb(Math.random()*255, Math.random()*255, Math.random()*255)'
    )
}
for (let i = 0; i < 10; i++) {
    arr[i].drawIt(context)
}