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

const x0 = 0, xMax = 1, N_steps = 100
const y0 = 5
let dx = (xMax - x0) / N_steps, dy
const h = 0.01

let ans1x = new Array(N_steps + 1), ans1y = new Array(N_steps + 1)
ans1x[0] = x0
ans1y[0] = y0
for (let i = 1; i <= N_steps; i++) {
    let y = ans1y[i-1]
    for (let t = 0; t < dx; t += h) {
        dy = (y + 100 * Math.cos(10 * (ans1x[i-1] + t)) - 10 * Math.sin(10 * (ans1x[i-1] + t))) * h
        y = y + dy
    }

    ans1x[i] = ans1x[i-1] + dx
    ans1y[i] = y
}

const analyticalPoints = 100
let ans2x = new Array(analyticalPoints), ans2y = new Array(analyticalPoints)
for (let i = 0; i < analyticalPoints; i++) {
    ans2x[i] = x0 + (xMax - x0) * i / (analyticalPoints - 1)
    ans2y[i] = 5 * Math.exp(ans2x[i]) + 10 * Math.sin(10 * ans2x[i])
}

plotter.plot(ans1x, ans1y, "red")
plotter.plot(ans2x, ans2y, "blue")

console.log("x0:", x0, "xMax:", xMax, "N_steps:", N_steps)