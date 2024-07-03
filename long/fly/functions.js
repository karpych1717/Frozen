let dt, time_old = 0
function render (time) {
  dt = time - time_old
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
  body.angle += ROTATION_SPEED * Math.max(Math.min(rotation, 1), -1)

  wing.x = WING_DISTANCE * Math.sin(WING_DIFF_ANGLE - body.angle) + body.x
  wing.y = WING_DISTANCE * Math.cos(WING_DIFF_ANGLE - body.angle) + body.y
  wing.angle = body.angle + WING_ANGLE
  tail.x = TAIL_DISTANCE * Math.sin(TAIL_DIFF_ANGLE - body.angle) + body.x
  tail.y = TAIL_DISTANCE * Math.cos(TAIL_DIFF_ANGLE - body.angle) + body.y
  tail.angle = body.angle + TAIL_ANGLE
}

function keydownHandler (event) {
  if (last_press != event.code) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      rotation -= 1
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      rotation += 1
    }
    last_press = event.code
  }
}

function keyupHandler (event) {
  if (true) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      rotation += 1
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      rotation -= 1
    }
    if (last_press === event.code) last_press = ""
  }
}