/* global _canvas */
'use strict'
import Circle from './Circle.js'
import Vector from './Vector.js'

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
        40,
        'rgb(' + Math.random()*255 + ', ' + Math.random()*255 + ', ' + Math.random()*255 + ')'
    )
}
for (let i = 0; i < 10; i++) {
    arr[i].drawIt(context)
}

function fIndividual(idx, arr) {
    let answer = 0
    for (let i = 0; i < arr.length; i++) {
        if (i == idx) continue
        answer += Math.max(0,
            arr[idx].r + arr[i].r - Math.sqrt(
                (arr[idx].x - arr[i].x) ** 2 +
                (arr[idx].y - arr[i].y) ** 2
            )
        )
    }
    return answer
}

function f(arr) {
    let answer = 0
    for (let i = 0; i < arr.length; i++) {
        answer += fIndividual(i, arr)
    }
    return answer
}

function fDerivativeIndividual(idx, dx, dy, arr) {
    const fCallX1 = f(arr)
    arr[idx].x += dx
    const fCallX2 = f(arr)
    arr[idx].x -= dx
    const fCallY1 = f(arr)
    arr[idx].y += dy
    const fCallY2 = f(arr)
    arr[idx].y -= dy
    return new Vector((fCallX2 - fCallX1) / dx, (fCallY2 - fCallY1) / dy)
}

function fDerivative(dx, dy, arr) {
    const D = new Array(arr.length)
    for (let i = 0; i < arr.length; i++) {
        D[i] = fDerivativeIndividual(i, dx, dy, arr)
    }
    return D
}

console.log(f(arr))
console.log(fDerivative(10, 10, arr))