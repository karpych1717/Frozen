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

let alpha = 0
let omega = 0
let epsilon = 0
let torque = 0

let left = false
let right = false

setInterval(render, dt)

document.onkeydown = (event) => {
  if (event.code === 'KeyA') left = true
  if (event.code === 'KeyD') right = true
}

document.onkeyup = (event) => {
  if (event.code === 'KeyA') left = false
  if (event.code === 'KeyD') right = false
}

function render () {
  clear()
  draw()
  update()
}

function draw () {
  ctx.translate(x, y)
  ctx.rotate(-alpha)

  ctx.drawImage(rectPic, -rectPic.width / 2, -rectPic.height / 2)

  if (left)
    ctx.drawImage(firePic, -rectPic.width / 2, -firePic.height - rectPic.height / 2)
  if (right)
    ctx.drawImage(firePic, rectPic.width / 2 - firePic.width / 2, -firePic.height - rectPic.height / 2)

  ctx.rotate(Math.PI)

  if (left)
    ctx.drawImage(firePic, -rectPic.width / 2, -firePic.height - rectPic.height / 2)
  if (right)
    ctx.drawImage(firePic, rectPic.width / 2 - firePic.width / 2, -firePic.height - rectPic.height / 2)

  ctx.rotate(-Math.PI)

  ctx.rotate(alpha)
  ctx.translate(-x, -y)
}

function update () {
  torque = 0
  if (left && !right) torque = thrust * arm * 2
  if (!left && right) torque = -thrust * arm * 2
  epsilon = torque / inertia
  omega += epsilon * dt
  alpha += omega * dt
}

function clear () {
  ctx.clearRect(0, 0, 750, 500)
}
