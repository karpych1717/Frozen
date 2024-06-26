function render (time) {
  dt = Math.floor(time - told)
  ctx.clearRect(0, 0, 500, 500)
  update(dt)
  display()
  window.requestAnimationFrame(render)

  told = time
}

function isIn (A, B) {
  if (A.x + A.width >= B.x && B.x + B.width >= A.x) {
    if (A.y + A.height >= B.y && B.y + B.height >= A.y) {
      return true
    }
  }
  return false
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

  if (bullet.x <= 0) {
    bullet.Vx = Math.abs(bullet.Vx)
  }
  if (bullet.x >= WIDTH - bullet.width) {
    bullet.Vx = Math.abs(bullet.Vx) * -1
  }
  if (bullet.y <= 0) {
    bullet.Vy = Math.abs(bullet.Vy)
  }
  if (bullet.y > HEIGHT - bullet.height) {
    //bullet.Vy = Math.abs(bullet.Vy) * -1
    bullet.Vx = 0
    bullet.Vy = 0
  }

  if (isIn(bullet, palette)) {
    if (bullet.y + bullet.height - palette.y < Math.min(bullet.x + bullet.width - palette.x, palette.x + palette.width - bullet.x)) {
      bullet.Vy = Math.abs(bullet.Vy) * -1
      if (palette.Vx > 0) bullet.Vx = Math.abs(bullet.Vx)
      if (palette.Vx < 0) bullet.Vx = Math.abs(bullet.Vx) * -1
    } else {
      if (palette.x + palette.width / 2 > bullet.x + bullet.width / 2) {
        bullet.Vx = Math.abs(bullet.Vx) * -1
      } else {
        bullet.Vx = Math.abs(bullet.Vx)
      }
    }
  }

  for (let i = 0; i < targets.length; i++) {
    if (isIn(bullet, targets[i])) {
      if (Math.abs(targets[i].x - bullet.x) > Math.abs(targets[i].y - bullet.y)) {
        bullet.Vx *= -1
      } else {
        bullet.Vy *= -1
      }
      targets[i].x = -targets[i].width
      targets[i].y = -targets[i].height
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