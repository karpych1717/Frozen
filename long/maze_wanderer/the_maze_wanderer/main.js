'use strict'

import Point from "./classes/Point.js"
import Square from "./classes/Square.js"
import SquarePhysics from "./classes/SquarePhysics.js"
import Matrix from "./classes/Matrix.js"
import Brain from "./classes/Brain.js"
import Wanderer from "./classes/Wanderer.js"

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

for (let r = 10; r <= 24; r++) {
    for (let angle = 0; angle < 360; angle += 0.5) {
        const x = Math.ceil(n/2 + r * Math.sin(angle))-1
        const y = Math.ceil(m/2 + r * Math.cos(angle))-1
        map[x][y] = null
    }
}

const wandererCount = 5
const wanderer = new Array(wandererCount)
for (let i = 0; i < wandererCount; i++) {
    wanderer[i] = new Wanderer(new SquarePhysics(100, 100, 0, 25, "blue", 9.8, 0.001))
}

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

function score() {
    for (let idx = 0; idx < wandererCount; idx++) {
        const lastAngle = Math.atan2(
            wanderer[idx].square.lastY,
            wanderer[idx].square.lastX
        )
        const newAngle = Math.atan2(
            wanderer[idx].square.y,
            wanderer[idx].square.x
        )
        wanderer[idx].score += (newAngle - lastAngle) * -10
    }
}

function update(dt) {
    for (let idx = 0; idx < wandererCount; idx++) {
        wanderer[idx].updateIt(dt)

        const nextAx = wanderer[idx].square.copy()
        nextAx.updateItX(dt)
        const nextAy = wanderer[idx].square.copy()
        nextAy.updateItY(dt)

        if (checkPosition(nextAx)) {
            wanderer[idx].square.vx = -0.1 * wanderer[idx].square.vx
        }
        if (checkPosition(nextAy)) {
            wanderer[idx].square.vy = -0.1 * wanderer[idx].square.vy
        }
        if (checkPosition(nextAx) || checkPosition(nextAy)) {
            wanderer[idx].square.fxR = -0.1 * wanderer[idx].square.fxR
        }
        const nextA = wanderer[idx].square.copy()
        nextA.updateIt(dt)
        if (checkPosition(nextA)) {
            wanderer[idx].square.va = 0


            wanderer[idx].score -= 1
        }
        wanderer[idx].square.updateIt(dt)

        wanderer[idx].square.resetLine()
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (map[i][j] == null) continue;
                
                wanderer[idx].square.updateLine(map[i][j])

                if (wanderer[idx].square.squareIntersecting(map[i][j])) {
                    map[i][j].col = "red"
                } else {
                    map[i][j].col = "green"
                }
            }
        }

        wanderer[idx].square.boundToBox(0, 0, 500, 500)
    }
}

function draw() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (map[i][j] == null) continue;
            map[i][j].drawIt(context)
        }
    }
    
    for (let i = 0; i < wandererCount; i++) {
        wanderer[i].drawIt(context)
    }
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let told = 0, timer = 0
const maxDt = 50
function render (time) {
  let dt = Math.floor(time - told)
  if (dt > maxDt) dt = maxDt
  timer += dt

  if (timer < 2000) {
    context.clearRect(0, 0, 500, 500)
    
    update(dt)
    score()
    draw()
  } else {
    let bestIdx = 0;
    for (let i = 1; i < wandererCount; i++) {
        if (wanderer[bestIdx].score < wanderer[i].score) {
            bestIdx = i;
        }
    }

    const bestBrain = wanderer[bestIdx].brain.clone();

    for (let i = 0; i < wandererCount; i++) {
        wanderer[i] = new Wanderer(new SquarePhysics(100, 100, 0, 25, "blue", 9.8, 0.001));
        wanderer[i].brain = bestBrain.clone();
        wanderer[i].mutate(0.1);
    }
    timer = 0
  }

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