/* global _canvas */
'use strict'
import Circle from './Circle.js'
import Dot from './Dot.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const speed = 0.5
const C = new Dot(250, 250, 10, "red")

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
}

function update(dt) {
  C.update(dt)
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