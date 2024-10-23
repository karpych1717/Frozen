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
    Fm = new Vector(body.angle, MOTOR_POWER, 'Polar')
  } else {
    Fm = new Vector(body.angle,           0, 'Polar')
  }
  if (keyboard["KeyS"]) {
    body.z = BODY_HEIGHT * 5
  } else {
    body.z = BODY_HEIGHT
  }
  F.clear()
  A.clear()
  V.clear()
  
  Fl = getLift()
  Ff = getAirFriction(V.x, V.y)
  F.add(Ff, Fm)
  A.multyplyNumber(1 / M, F)
  V.add(A.multyplyNumber(dt / K_dt), V)

  body.x += V.x * dt / K_dt
  body.y += V.y * dt / K_dt
  if (body.x < 0) body.x = BOX_WIDTH
  if (body.x > BOX_WIDTH) body.x = 0
  if (body.y < 0) body.y = BOX_HEIGHT
  if (body.y > BOX_HEIGHT) body.y = 0

  if (keyboard['KeyA'] && !keyboard['KeyD']) {
    body.angle -= ROTATION_SPEED
    Fm = new Vector(body.angle, Fm.module, 'Polar')
  }
  if (!keyboard['KeyA'] && keyboard['KeyD']) {
    body.angle += ROTATION_SPEED
    Fm = new Vector(body.angle, Fm.module, 'Polar')
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

function getAngle(x, y) {
  const angle = Math.atan(y / x)
  if (x >= 0 && y >= 0) return angle
  if (x >= 0 && y < 0) return angle
  if (x < 0 && y >= 0) return angle + Math.PI
  if (x < 0 && y < 0) return angle - Math.PI
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

  return new Vector(-Kf * (y1 + y2) * body.z * Vx, -Kf * (x1 + x2) * body.z * Vy, 'Cartesian')
}

function getLift() {
  const attack_angle = -getAngle(V.x, V.y) + wing.angle
  const lift_value = V.module * Kl * (wing.width * wing.z) * Math.cos(attack_angle)
  const angle = (body.angle + Math.PI * 3 / 2) % (Math.PI * 2)
  let vect = new Vector(angle, lift_value, 'Polar')
  return vect
}