/* global canvasSetUp, log, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()

cvs.addEventListener('pointerdown', handleClick)

let x
let y

function handleClick (event) {
  x = event.offsetX
  y = event.offsetY
}

setInterval(render, 500)

function render () {
  ctx.save()

  ctx.clearRect(0, 0, 750, 500)

  y += 10
  ctx.beginPath()
  ctx.strokeStyle = 'white'
  ctx.arc(x, y, 10, 0, 2 * Math.PI)
  ctx.stroke()

  ctx.restore()
}
