/* global canvasSetUp, getPicture, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()
const shipSprite = getPicture('black_box/ship.png')

const correctionX = -25
const correctionY = -25
const correctionAngl = Math.PI / 4
const anglespeed = 0.003
const AVelocity = 0.01
const VelocityFriction = 0.01

let state = false
let angletarget = 0
let angle = 0
let xmouse = 100
let ymouse = 100
let told = 0
let dt = 0
let x = 375
let y = 250
let Vx = 0
let Vy = 0

shipSprite.onload = updateAndRender()

function updateAndRender (time) {
  update(time)
  render()
  window.requestAnimationFrame(updateAndRender)
}

cvs.addEventListener('pointerdown', handleClick)
cvs.addEventListener('pointermove', handleMove)

function handleClick (event) {
  state = !state
}

function handleMove (event) {
  if (state) {
    xmouse = event.offsetX
    ymouse = event.offsetY
  }
}

function update(time) {
  dt = Math.floor(time - told)
  if (dt > 0) {
    angletarget = Math.atan((y - ymouse) / (x - xmouse))
    if (xmouse < x) angletarget += Math.PI

    if (Math.abs(angletarget - angle) > Math.PI) {
      if (angle > angletarget) angle -= Math.PI * 2
      else angle += Math.PI * 2
    }
    if (Math.abs(angle - angletarget) < anglespeed * dt) angle = angletarget
    else if (angle > angletarget) angle -= anglespeed * dt
    else angle += anglespeed * dt

    Vx += Math.cos(angle) * AVelocity
    Vy += Math.sin(angle) * AVelocity
    x += Vx * dt
    y += Vy * dt

    x = Math.min(Math.max(x, 0), 750)
    y = Math.min(Math.max(y, 0), 500)

    Vx -= Vx * VelocityFriction * dt
    Vy -= Vy * VelocityFriction * dt
  }
  told = time
}

function render() {
  ctx.clearRect(0, 0, 750, 500)
  ctx.translate(x, y)
  ctx.rotate(angle + correctionAngl)

  ctx.drawImage(shipSprite, correctionX, correctionY)

  ctx.rotate(-angle - correctionAngl)
  ctx.translate(-x, -y)
}