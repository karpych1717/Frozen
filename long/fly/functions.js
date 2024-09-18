let dt, time_old = 0
function render (time) {
  dt = time - time_old
  dt = Math.min(dt, 30)
  time_old = time
  ctx.clearRect(0, 0, BOX_WIDTH, BOX_HEIGHT)
  draw()
  update(dt)
  requestAnimationFrame(render)
}

function draw () {
  body.drawIt(ctx)
  wing.drawIt(ctx)
  tail.drawIt(ctx)
}

function update (dt) {
  Ff = getAirFriction(V.x, V.y)
  F = Vector.add(Fg, Ff)
  A = Vector.multiply(1 / M, F)
  V = Vector.add(Vector.multiply(dt / K_dt, A), V)
  //console.log(V)

  body.x += V.x * dt / K_dt
  body.y += V.y * dt / K_dt
  if (body.x < 0) body.x = BOX_WIDTH
  if (body.x > BOX_WIDTH) body.x = 0
  if (body.y < 0) body.y = BOX_HEIGHT
  if (body.y > BOX_HEIGHT) body.y = 0

  if (keyboard['keyA'] && !keyboard['keyD']) body.angle += ROTATION_SPEED
  if (!keyboard['keyA'] && keyboard['keyD']) body.angle -= ROTATION_SPEED
  console.log(keyboard['keyA'], keyboard['keyD'])
  body.angle %= Math.PI * 2

  wing.x = WING_DISTANCE * Math.sin(WING_DIFF_ANGLE - body.angle) + body.x
  wing.y = WING_DISTANCE * Math.cos(WING_DIFF_ANGLE - body.angle) + body.y
  wing.angle = body.angle + WING_ANGLE
  tail.x = TAIL_DISTANCE * Math.sin(TAIL_DIFF_ANGLE - body.angle) + body.x
  tail.y = TAIL_DISTANCE * Math.cos(TAIL_DIFF_ANGLE - body.angle) + body.y
  tail.angle = body.angle + TAIL_ANGLE
}

function keydownHandler (event) {
  console.log(event.code)
  if (!keyboard.hasOwnProperty(event.code)) return;
  keyboard[event.code] = true
}

function keyupHandler (event) {
  if (!keyboard.hasOwnProperty(event.code)) return;
  keyboard[event.code] = false
}

function getAirFriction(Vx, Vy) {
  const x1 = Math.abs(Math.cos(body.angle)) * body.width
  const x2 = Math.abs(Math.sin(body.angle)) * body.height

  const y1 = Math.abs(Math.sin(body.angle)) * body.width
  const y2 = Math.abs(Math.cos(body.angle)) * body.height

  return new Vector(Kf * (y1 + y2) * body.z * Vx, Kf * (x1 + x2) * body.z * Vy)
}