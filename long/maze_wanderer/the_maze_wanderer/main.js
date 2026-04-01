'use strict'

import Point from "./Point.js"
import Square from "./Square.js"
import SquarePhysics from "./SquarePhysics.js"
import Matrix from "./Matrix.js"
import Brain from "./Brain.js"

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const n = 50
const m = 50
const squareLength = 10

const keyboard = {}

const brain = new Brain(new Matrix(4, 3), new Matrix(3, 4))
brain.inner.random()
brain.output.random()

let map = new Array(n)
for (let i = 0; i < n; i++) {
    map[i] = new Array(m)
    for (let j = 0; j < m; j++) {
        map[i][j] = new Square(
            squareLength / 2 + i * squareLength,
            squareLength / 2 + j * squareLength,
            0,
            squareLength,
            "red"
        )
    }
}

for (let i = 5; i < 25; i++) {
    for (let j = 5; j < 20; j++) {
        map[i][j] = null
    }
}
for (let i = 16; i < 45; i++) {
    for (let j = 20; j < 45; j++) {
        map[i][j] = null
    }
}

const a = new SquarePhysics(100, 100, 0, 25, "blue", 9.8, 0.001)
const Acceleration = 0.001

function checkPosition(sq) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (map[i][j] == null) continue;
            if (sq.squareIntersecting(map[i][j])) {
                return true
            }
        }
    }
    return false
}

function update(dt) {

    const input = new Array(4)
    for (let i = 0; i < 4; i++) input[i] = new Array(1)
    for (let i = 0; i < 3; i++) input[i] = a.rays[i].length()
    input[3] = a.speed()
    const decision = brain.calculate(new Matrix(4, 1, input))
    console.log(decision)

    const nextAx = a.copy()
    nextAx.updateItX(dt)
    const nextAy = a.copy()
    nextAy.updateItY(dt)

    if (checkPosition(nextAx)) {
        a.vx = -0.1 * a.vx
    }
    if (checkPosition(nextAy)) {
        a.vy = -0.1 * a.vy
    }
    if (checkPosition(nextAx) || checkPosition(nextAy)) {
        a.fxR = -0.1 * a.fxR
    }
    const nextA = a.copy()
    nextA.updateIt(dt)
    if (checkPosition(nextA)) {
        a.va = 0
    }
    a.updateIt(dt)

    a.resetLine()
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (map[i][j] == null) continue;
            
            a.updateLine(map[i][j])

            if (a.squareIntersecting(map[i][j])) {
                map[i][j].col = "red"
            } else {
                map[i][j].col = "green"
            }
        }
    }

    a.boundToBox(0, 0, 500, 500)
}

function draw() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (map[i][j] == null) continue;
            map[i][j].drawIt(context)
        }
    }
    
    a.drawIt(context)
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

function mouseUpHandler(event) {
    let p = new Point(event.offsetX, event.offsetY)
}

function pointerDownHandler(event) {
    let p = new Point(event.offsetX, event.offsetY)
}

function mouseMoveHandler(event) {
    let p = new Point(event.offsetX, event.offsetY)
}

function keyUpHandler(event) {
    keyboard[event.code] = false
}

function keyDownHandler(event) {
    keyboard[event.code] = true
}

document.onmouseup = mouseUpHandler
document.onpointerdown = pointerDownHandler
document.onmousemove = mouseMoveHandler
document.onkeydown = keyDownHandler
document.onkeyup = keyUpHandler