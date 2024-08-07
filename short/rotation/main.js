/* global canvasSetUp, log, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()

const rectPic = new Image()
const firePic = new Image()

rectPic.src = 'rect.png'
firePic.src = 'fire.png'

const dt = 33

const inertia = 400_000
const thrust = 1
const arm = 1

const x = 375
const y = 250

let angle = 0
let angle_speed = 0
let angle_acceleration = 0
let torque = 0

let left_button = false
let right_button = false

setInterval(render, dt)

document.onkeydown = (event) => {
  if (event.code === 'KeyA') left_button = true
  if (event.code === 'KeyD') right_button = true
}

document.onkeyup = (event) => {
  if (event.code === 'KeyA') left_button = false
  if (event.code === 'KeyD') right_button = false
}

function render () {
  clear()
  draw()
  update()
}

function draw () {
  ctx.translate(x, y)
  ctx.rotate(-angle)

  ctx.drawImage(rectPic, -rectPic.width / 2, -rectPic.height / 2)

  if (left_button)
    ctx.drawImage(firePic, -rectPic.width / 2, -firePic.height - rectPic.height / 2)
  if (right_button)
    ctx.drawImage(firePic, rectPic.width / 2 - firePic.width / 2, -firePic.height - rectPic.height / 2)

  ctx.rotate(Math.PI)

  if (left_button)
    ctx.drawImage(firePic, -rectPic.width / 2, -firePic.height - rectPic.height / 2)
  if (right_button)
    ctx.drawImage(firePic, rectPic.width / 2 - firePic.width / 2, -firePic.height - rectPic.height / 2)

  ctx.rotate(-Math.PI)

  ctx.rotate(angle)
  ctx.translate(-x, -y)
}

function update () {
  torque = 0
  if (left_button && !right_button) torque = thrust * arm * 2
  if (!left_button && right_button) torque = -thrust * arm * 2

  angle_acceleration = torque / inertia

  angle_speed += angle_acceleration * dt

  angle += angle_speed * dt
}

function clear () {
  ctx.clearRect(0, 0, 750, 500)
}
