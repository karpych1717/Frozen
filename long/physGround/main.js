/* global canvasSetUp, log, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()

cvs.addEventListener('pointerdown', handleClick)

function handleClick (event) {
  ctx.save()

  ctx.strokeStyle = 'white'

  ctx.beginPath()
  ctx.arc(event.offsetX, event.offsetY, 10, 0, 2 * Math.PI)
  ctx.stroke()

  ctx.restore()
}
