/* global canvasSetUp, getPicture, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()
const shipSprite = getPicture('black_box/ship.png')

const angle = 0

shipSprite.onload = updateAndRender()

function updateAndRender (time) {
  // update(dt)
  // render(dt)

  window.requestAnimationFrame(updateAndRender)
}

cvs.addEventListener('pointerdown', handleClick)

function handleClick (event) {
  ctx.translate(event.offsetX, event.offsetY)
  ctx.rotate(angle + Math.PI / 4)

  ctx.drawImage(shipSprite, 0, 0)

  ctx.rotate(-angle - Math.PI / 4)
  ctx.translate(-event.offsetX, -event.offsetY)
}
