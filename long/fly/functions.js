let dt, time_old = 0
function render (time) {
  dt = time - time_old
  dt = Math.min(dt, 30)
  time_old = time
  if (!keyboard["KeyP"]) {
    ctx.clearRect(0, 0, BOX_WIDTH, BOX_HEIGHT)
    draw()
    update(dt)
    if (keyboard["KeyL"]) {
      console.log(F)
      console.log(V)
      console.log(A)
      console.log(body.x, body.y)
    }
  }
  requestAnimationFrame(render)
}

function draw () {
  body.drawIt(ctx)
  wing.drawIt(ctx)
  tail.drawIt(ctx)
}

function update (dt) {
  if (keyboard["KeyW"]) {
    Fm.setup_converted(body.angle, MOTOR_POWER)
  } else {
    Fm.setup_converted(body.angle, 0)
  }
  if (keyboard["KeyS"]) {
    body.z = BODY_HEIGHT * 5
  } else {
    body.z = BODY_HEIGHT
  }
  
  Ff = getAirFriction(V.x, V.y)
  F = Vector.add(Fg, Ff, Fm)
  A = Vector.multiply(1 / M, F)
  V = Vector.add(Vector.multiply(dt / K_dt, A), V)

  body.x += V.x * dt / K_dt
  body.y += V.y * dt / K_dt
  if (body.x < 0) body.x = BOX_WIDTH
  if (body.x > BOX_WIDTH) body.x = 0
  if (body.y < 0) body.y = BOX_HEIGHT
  if (body.y > BOX_HEIGHT) body.y = 0

  if (keyboard['KeyA'] && !keyboard['KeyD']) {
    body.angle -= ROTATION_SPEED
    Fm.setup_converted(body.angle, Fm.module)
  }
  if (!keyboard['KeyA'] && keyboard['KeyD']) {
    body.angle += ROTATION_SPEED
    Fm.setup_converted(body.angle, Fm.module)
  }
  
  body.angle %= Math.PI * 2

  wing.x = WING_DISTANCE * Math.sin(WING_DIFF_ANGLE - body.angle) + body.x
  wing.y = WING_DISTANCE * Math.cos(WING_DIFF_ANGLE - body.angle) + body.y
  wing.angle = body.angle + WING_ANGLE
  tail.x = TAIL_DISTANCE * Math.sin(TAIL_DIFF_ANGLE - body.angle) + body.x
  tail.y = TAIL_DISTANCE * Math.cos(TAIL_DIFF_ANGLE - body.angle) + body.y
  tail.angle = body.angle + TAIL_ANGLE
}

function keydownHandler (event) {
  if (!keyboard.hasOwnProperty(event.code)) return
  if (event.code == "KeyP" || event.code == "KeyL") {
    keyboard[event.code] = !keyboard[event.code]
  } else {
    keyboard[event.code] = true
  }
}

function keyupHandler (event) {
  if (!keyboard.hasOwnProperty(event.code) || event.code == "KeyP" || event.code == "KeyL") return
  keyboard[event.code] = false
}

function getAirFriction(Vx, Vy) {
  const x1 = Math.abs(Math.cos(body.angle)) * body.width
  const x2 = Math.abs(Math.sin(body.angle)) * body.height

  const y1 = Math.abs(Math.sin(body.angle)) * body.width
  const y2 = Math.abs(Math.cos(body.angle)) * body.height

  return new Vector(Kf * (y1 + y2) * body.z * Vx, Kf * (x1 + x2) * body.z * Vy)
}