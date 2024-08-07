function render (time) {
  dt = Math.floor(time - told)
  ctx.clearRect(0, 0, 500, 500)
  FREEFALL.update(dt)
  FREEFALL.display()
  window.requestAnimationFrame(render)

  told = time
}

function getCollisionType (first, second) {
  const delthaX = second.x - first.x
  const delthaY = second.y - first.y

  const horisontal = Math.abs(delthaY) < (first.height + second.height) / 2
  const vertical = Math.abs(delthaX) < (first.width + second.width) / 2
  
  if (vertical && horisontal) return 'full'
  if (vertical) return 'vertical'
  if (horisontal) return 'horisontal'

  return 'none'
}

function keydownHandler (event) {
  //console.log(event.code) // використати це для визначення кнопки
  if (event.code === "ArrowLeft" || event.code === "KeyA") FREEFALL.left_button = true
  if (event.code === "ArrowRight" || event.code === "KeyD") FREEFALL.right_button = true
}

function keyupHandler (event) {
  if (event.code === "ArrowLeft" || event.code === "KeyA") FREEFALL.left_button = false
  if (event.code === "ArrowRight" || event.code === "KeyD") FREEFALL.right_button = false
}