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
const x0 = 0, xMax = 1
let dx = (xMax - x0 + 1) / size, dy
const h = 0.001

let ans1x = new Array(size), ans1y = new Array(size)
ans1x[0] = x0
ans1y[0] = 0
for (let i = 1; i < size; i++) {
    let y = ans1y[i-1]
    for (let t = 0; t < dx; t += h) {
        dy = (y + Math.sin((ans1x[i-1] + t) * 25)) * h
        y = y + dy
    }

    ans1x[i] = ans1x[i-1] + dx
    ans1y[i] = y
}

let ans2x = new Array(size), ans2y = new Array(size)
ans2x[0] = x0
ans2y[0] = 0
for (let i = 1; i < size; i++) {
    ans2x[i] = ans2x[i-1] + dx
    ans2y[i] = (25/626) * Math.exp(ans2x[i]) - (1/626) * Math.sin(ans2x[i]*25) - (25/626) * Math.cos(ans2x[i]*25)
}

plotter.plot(ans1x, ans1y, "red")
plotter.plot(ans2x, ans2y, "blue")

console.log("x0:", x0, "xMax:", xMax, "N:", size)