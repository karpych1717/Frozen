'use strict'

import Point from "./Point.js"
import Square from "./Square.js"

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const a = new Square(100, 100, 0, 50, "red")
const b = new Square(300, 300, 0, 50, "red")

function update(dt) {
    a.va = 0
    b.va = 0
    if (movingId == 1 && spacePressed) {
        a.va = 0.005
    } else if (movingId == 2 && spacePressed) {
        b.va = 0.005
    }

    a.updateIt(dt)
    b.updateIt(dt)

    if (a.squareIntersecting(b)) {
        a.col = "green"
        b.col = "green"
    } else {
        a.col = "red"
        b.col = "red"
    }
}

function draw() {
    a.drawIt(context)
    b.drawIt(context)
}

let told = 0
function render (time) {
  let dt = Math.floor(time - told)
  context.clearRect(0, 0, 500, 500)
  
  update(dt)
  draw()

  window.requestAnimationFrame(render)
  told = time
}

window.requestAnimationFrame(render)

let movingId = 0
let movingDelta = new Point(0, 0)
let spacePressed = false

function mouseUpHandler(event) {
    let p = new Point(event.offsetX, event.offsetY)
    movingId = 0
}

function pointerDownHandler(event) {
    let p = new Point(event.offsetX, event.offsetY)
    if (a.isPointIn(p)) {
        movingId = 1
        movingDelta = a.pointToCenter(p)
    } else if (b.isPointIn(p)) {
        movingId = 2
        movingDelta = b.pointToCenter(p)
    } else {
        movingId = 0
    }
}

function mouseMoveHandler(event) {
    let p = new Point(event.offsetX, event.offsetY)
    if (movingId == 1) {
        a.transformPosition(p.addPoint(movingDelta))
    } else if (movingId == 2) {
        b.transformPosition(p.addPoint(movingDelta))
    }
}

function keyUpHandler(event) {
    spacePressed = false
}

function keyDownHandler(event) {
    if (event.key == ' ') {
        spacePressed = true
    }
}

document.onmouseup = mouseUpHandler
document.onpointerdown = pointerDownHandler
document.onmousemove = mouseMoveHandler
document.onkeydown = keyDownHandler
document.onkeyup = keyUpHandler