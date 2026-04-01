/* global _canvas */
'use strict'
import Circle from './Circle.js'
import Dot from './Dot.js'
import Square from './Square.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const speed = 0.3
const C = new Dot(250, 250, 0, 10, 0)

const squares = new Array(10)
for (let i = 0; i < squares.length; i++) {
  let overlap = true
  let attempts = 0
  while (overlap && attempts < 1000) {
    attempts += 1
    overlap = false
    squares[i] = new Square(Math.random() * 500, Math.random() * 500, Math.random() * Math.PI * 2, 25, 200)
    for (let j = 0; j < i; j++) {
      if (squares[i].touches(squares[j])) {
        overlap = true
        break;
      }
    }
  }
}

let timeOld = 0

function render(time) {
  let dt = Math.floor(time - timeOld)

  draw(context)
  update(dt)

  timeOld = time
  requestAnimationFrame(render)
}
requestAnimationFrame(render)

function draw(context) {
  context.clearRect(0, 0, 500, 500)
  C.drawIt(context)

  for (let i = 0; i < squares.length; i++) {
    squares[i].drawIt(context)
  }
}

function update(dt) {
  C.update(dt)
  C.truncate(0, 0, 500, 500)
  
  for (let i = 0; i < squares.length; i++) {
    if (C.touches(squares[i])) {
      squares[i].col += 1
    }
  }
}

function keyupHandler(event) {
  if (event.code === "KeyA") C.va = 0
  if (event.code === "KeyD") C.va = 0
  if (event.code === "KeyW") C.speed = 0
  if (event.code === "KeyS") C.speed = 0
}

function keydownHandler(event) {
  if (event.code === "KeyA") C.va = -0.01
  if (event.code === "KeyD") C.va = 0.01
  if (event.code === "KeyW") C.speed = speed
  if (event.code === "KeyS") C.speed = -speed
}

document.onkeyup = keyupHandler
document.onkeydown = keydownHandler