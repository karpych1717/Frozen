/* global _canvas */
'use strict'
import Circle from './Circle.js'
import Vector from './Vector.js'
import Line from './Line.js'
import Square from './Square.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const A = new Circle(200, 250, 10, "red")
const B = new Circle(300, 250, 10, "blue")
const ray = new Line(A.x, A.y, B.x, B.y)

const C = new Circle(0, 0, 5, "yellow")
const S = new Square(100, 100, 100, "green")
const border = new Square(0, 0, 500, "blue")
let p = new Vector(0, 0)

draw(context)



let moveA = false
let moveB = false
let moveS = false

function draw(context) {
    context.clearRect(0, 0, 500, 500)
    A.drawIt(context)
    B.drawIt(context)
    S.drawIt(context)
    
    p.x = 1000000
    p.y = 1000000

    let intersects = border.getIntersectByLine(ray)
    intersects = intersects.concat(S.getIntersectByLine(ray))
    for (let i = 0; i < intersects.length; i++) {
        C.x = intersects[i].x
        C.y = intersects[i].y
        C.drawIt(context)

        if ((A.x >= B.x && C.x >= B.x) || (A.x <= B.x && C.x <= B.x)) {
            if (Math.abs(B.x - C.x) < Math.abs(B.x - p.x)) {
                p.x = C.x
                p.y = C.y
            }
        }

        if (A.x == B.x) {
            if ((A.y >= B.y && C.y >= B.y) || (A.y <= B.y && C.y <= B.y)) {
                if (Math.abs(B.y - C.y) < Math.abs(B.y - p.y)) {
                    p.x = C.x
                    p.y = C.y
                }
            }
        }
    }

    context.beginPath()
    context.moveTo(p.x, p.y)
    context.lineTo(B.x, B.y)
    context.lineWidth = 2
    context.strokeStyle = "Lime"
    context.stroke()
    context.strokeStyle = '#000000'
    context.lineWidth = 1
}

function clickHandler(event) {
    //console.log(event.offsetX, event.offsetY)

    let distanceA = (A.x - event.offsetX) ** 2 + (A.y - event.offsetY) ** 2
    let distanceB = (B.x - event.offsetX) ** 2 + (B.y - event.offsetY) ** 2
    let onA = false
    let onB = false
    let onS = false
    if (distanceA <= A.r ** 2) onA = true
    if (distanceB <= B.r ** 2) onB = true

    if (S.x <= event.offsetX &&
        event.offsetX <= S.x + S.l &&
        S.y <= event.offsetY &&
        event.offsetY <= S.y + S.l
    ) onS = true

    if (onA && !moveA) {
        moveA = true
        moveB = false
        moveS = false
    } else if (onB && !moveB) {
        moveA = false
        moveB = true
        moveS = false
    } else if (onS && !moveS) {
        moveA = false
        moveB = false
        moveS = true
    } else {
        moveA = false
        moveB = false
        moveS = false
    }

}

function moveHandler(event, context) {
    //console.log(event.offsetX, event.offsetY)

    if (moveA) {
        A.x = event.offsetX
        A.y = event.offsetY
        ray.update(A.x, A.y, B.x, B.y)

        draw(context)
    }

    if (moveB) {
        B.x = event.offsetX
        B.y = event.offsetY
        ray.update(A.x, A.y, B.x, B.y)

        draw(context)
    }

    if (moveS) {
        S.x = event.offsetX - S.l / 2
        S.y = event.offsetY - S.l / 2

        draw(context)
    }

}

_canvas.onpointerdown = (event) => clickHandler(event)
_canvas.onpointermove = (event) => moveHandler(event, context)