import { circles } from './main.js'
import { context } from './main.js'

function makeBall(x_, y_) {
  let x = x_
  let y = y_
  let vx = 0 * Math.sin(2 * Math.PI * Math.random())
  let vy = 0 * Math.cos(2 * Math.PI * Math.random())
  let r = 10
  let c = "blue"

  let ax = 0
  let ay = 0.05

  let xBoundary = 500
  let yBoundary = 500

  function displayAndMove(context) {
    x += vx + ax / 2
    y += vy + ay / 2

    vx += ax
    vy += ay

    if (r >= x) {
      x = r
      vx = Math.abs(vx)
    }
    if (x >= xBoundary - r) {
      x = xBoundary - r
      vx = -Math.abs(vx)
    }

    if (r >= y) {
      y = r
      vy = Math.abs(vy)
    }
    if (y >= yBoundary - r) {
      y = yBoundary - r
      vy = -Math.abs(vy)
    }

    context.beginPath()
    context.arc(x, y, r, 0, 2 * Math.PI)
    context.fillStyle = c;
    context.fill()
    context.stroke()
  }

  return displayAndMove
}

function render () {
  context.clearRect(0, 0, 500, 500)

  for (const displayAndMove of circles) displayAndMove(context)

  requestAnimationFrame(render)
}

export { render }
export { makeBall }