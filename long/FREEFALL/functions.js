function render (time) {
  dt = Math.floor(time - told)
  ctx.clearRect(0, 0, 500, 500)
  FREEFALL.update(dt)
  FREEFALL.display()
  window.requestAnimationFrame(render)

  told = time
}

function keydownHandler (event) {
  //console.log(event.code) // використати це для визначення кнопки
  if (last_press != event.code) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      steering -= 1
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      steering += 1
    }
    last_press = event.code
  }
}

function keyupHandler (event) {
  if (true) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      steering += 1
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      steering -= 1
    }
    if (last_press === event.code) last_press = ""
  }
}