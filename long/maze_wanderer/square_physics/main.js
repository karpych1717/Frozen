/* global _canvas */
'use strict'
import Circle from './Circle.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

let angle = 0
const C = new Circle(250, 250, 10, "red")

let timeOld = 0
function draw(time) {
  dt = Math.floor(time - timeOld)
  context.clearRect(0, 0, 500, 500)
  C.drawIt(context)
  console.log(dt, time)
  timeOld = time
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)

function keydownHandler(event) {
  if (event.code === "KeyA") angle += 0.1
  if (event.code === "KeyD") angle -= 0.1
  if (event.code === "KeyW") {
    C.x += 1 * Math.sin(angle)
    C.y += 1 * Math.cos(angle)
  }
  if (event.code === "KeyS") {
    C.x -= 1 * Math.sin(angle)
    C.y -= 1 * Math.cos(angle)
  }
}
document.onkeydown = keydownHandler