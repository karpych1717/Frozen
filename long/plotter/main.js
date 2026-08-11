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

const size = 100
let dx = 1, dy
const h = 0.001
let ans1x = new Array(size), ans1y = new Array(size)
ans1x[0] = 0
ans1y[0] = 3
for (let i = 1; i < size; i++) {
    let y = ans1y[i-1]
    for (let t = 0; t < dx; t += h) {
        dy = -2 * y * h
        y = y + dy
    }

    ans1x[i] = ans1x[i-1] + dx
    ans1y[i] = y
}

let ans2x = new Array(size), ans2y = new Array(size)
ans2x[0] = 0
ans2y[0] = 3
for (let i = 1; i < size; i++) {
    ans2x[i] = ans2x[i-1] + dx
    ans2y[i] = 3 * Math.exp(-2 * ans2x[i])
}

plotter.plot(ans1x, ans1y, "red")
plotter.plot(ans2x, ans2y, "blue")