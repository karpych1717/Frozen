function render (time) {
  dt = Math.floor(time - told)
  ctx.clearRect(0, 0, 500, 500)
  update(dt)
  display()
  window.requestAnimationFrame(render)

  told = time
}

function update (dt) {
  if (steering > 0) palette.Vx = 0.5
  if (steering < 0) palette.Vx = -0.5
  if (steering === 0) palette.Vx = 0
  //console.log(steering)
  // спочатку апдейт всіх сутностей
  // потім перевірка на всі collisions і що воно сі трапляє
  palette.updateIt(dt)
  bullet.updateIt(dt)

  if (bullet.x <= 0) bullet.Vx = Math.abs(bullet.Vx)
  if (bullet.x >= 480) bullet.Vx = Math.abs(bullet.Vx) * -1
  if (bullet.y <= 0) bullet.Vy = Math.abs(bullet.Vy)
  if (bullet.y > 480) {
    //bullet.Vy = Math.abs(bullet.Vy) * -1
    bullet.Vx = 0
    bullet.Vy = 0
  }

  if (bullet.y > 440) {
    if (bullet.x - 100 < palette.x && palette.x < bullet.x + 20) {
      bullet.Vy = Math.abs(bullet.Vy) * -1
      if (palette.Vx > 0) bullet.Vx = Math.abs(bullet.Vx)
      if (palette.Vx < 0) bullet.Vx = Math.abs(bullet.Vx) * -1
    }
  }

  for (let i = 0; i < targets.length; i++) {
    if (bullet.x - 20 <= targets[i].x && targets[i].x <= bullet.x + 20) {
      if (bullet.y - 20 <= targets[i].y && targets[i].y <= bullet.y + 20) {
        if (Math.abs(targets[i].x - bullet.x) > Math.abs(targets[i].y - bullet.y)) {
          bullet.Vx *= -1
        } else {
          bullet.Vy *= -1
        }
        targets[i].x = -20
        targets[i].y = -20
      }
    }
  }
}

function display () {
  // намалювати всі сутності
  palette.drawIt(ctx)
  bullet.drawIt(ctx)
  for (let i = 0; i < targets.length; i++) {
    targets[i].drawIt(ctx)
  }
}

function keydownHandler (event) {
  //console.log(event.code) // використати це для визначення кнопки
  if (last_press_1 != event.code) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      steering -= 1
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      steering += 1
    }
    last_press_1 = event.code
  }
}

function keyupHandler (event) {
  if (last_press_2 != event.code) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      steering += 1
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      steering -= 1
    }
    last_press_2 = event.code
  }
}