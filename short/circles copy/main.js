/* global _canvas */
'use strict'
import Circle from './Circle.js'

_canvas.width = 500
_canvas.height = 300
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const B = 1
const U = 100
const pm = 8.96 * 1e3
const pe = 1.68 * 1e-8
const d = 0.1

function a(l) {
    return B * U / (pm * pe) / (d + 4 * l)
}

for (let l = 0; l < 100; l += 1) {
    console.log("l:", l, "t:", Math.sqrt(l / a(l)))
}