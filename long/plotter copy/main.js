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
const y0 = 1, t0 = 0
let dx = (xMax - x0) / N_steps, dy, dt

let ansx = new Array(N_steps + 1), ansy = new Array(N_steps + 1), anst = new Array(N_steps + 1)
ansx[0] = x0
ansy[0] = y0
anst[0] = t0

for (let i = 1; i <= N_steps; i++) {
    let y = ansy[i-1]
    let t = anst[i-1]

    dy = t * dx
    dt = (5 * t - 6 * y) * dx
    y = y + dy
    t = t + dt

    ansx[i] = ansx[i-1] + dx
    ansy[i] = y
    anst[i] = t
}

let ans2x = new Array(N_steps), ans2y = new Array(N_steps)
for (let i = 0; i < N_steps; i++) {
    ans2x[i] = x0 + (xMax - x0) * i / (N_steps - 1)
    ans2y[i] = 3 * Math.exp(2 * ans2x[i]) - 2 * Math.exp(3 * ans2x[i])
}

plotter.plot(ansx, ansy, "red")
plotter.plot(ans2x, ans2y, "blue")

console.log("x0:", x0, "xMax:", xMax, "N_steps:", N_steps)
