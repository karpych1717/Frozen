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

const A = new Circle(200, 250, 10, "red")
const B = new Circle(300, 250, 10, "blue")
draw(context)



let moveA = false
let moveB = false

function draw(context) {
    context.clearRect(0, 0, 500, 500)
    A.drawIt(context)
    B.drawIt(context)
}

function clickHandler(event) {
    //console.log(event.offsetX, event.offsetY)

    let distanceA = (A.x - event.offsetX) ** 2 + (A.y - event.offsetY) ** 2
    let distanceB = (B.x - event.offsetX) ** 2 + (B.y - event.offsetY) ** 2
    let onA = false
    let onB = false
    if (distanceA <= A.r ** 2) onA = true
    if (distanceB <= B.r ** 2) onB = true

    if (onA && !moveA) {
        moveA = true
        moveB = false
    } else if (onB && !moveB) {
        moveA = false
        moveB = true
    } else {
        moveA = false
        moveB = false
    }

}

function moveHandler(event, context) {
    //console.log(event.offsetX, event.offsetY)

    if (moveA) {
        A.x = event.offsetX
        A.y = event.offsetY

        draw(context)
    }

    if (moveB) {
        B.x = event.offsetX
        B.y = event.offsetY

        draw(context)
    }

}

_canvas.onpointerdown = (event) => clickHandler(event)
_canvas.onpointermove = (event) => moveHandler(event, context)