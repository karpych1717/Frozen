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

let angle = 0
const C = new Dot(250, 250, 10, "red")

let timeOld = 0
function draw(time) {
  let dt = Math.floor(time - timeOld)
  context.clearRect(0, 0, 500, 500)

  C.update(dt)
  C.drawIt(context)

  timeOld = time
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)

function keydownHandler(event) {
  if (event.code === "KeyA") C.angle -= 0.1
  if (event.code === "KeyD") C.angle += 0.1
  if (event.code === "KeyW") {
    C.vx = 1 * Math.cos(C.angle)
    C.vy = 1 * Math.sin(C.angle)
  }
  if (event.code === "KeyS") {
    C.vx = -1 * Math.cos(C.angle)
    C.vy = -1 * Math.sin(C.angle)
  }
}
document.onkeydown = keydownHandler