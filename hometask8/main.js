/* global canvasSetUp, getPicture, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()
const shipSprite = getPicture('black_box/ship.png')

const correctionX = -25
const correctionY = -25
const correctionAngl = Math.PI / 4
const anglespeed = 0.03
const AVelocity = 0.1
const VelocityFriction = 0.1

let angletarget = 0
let angle = 0
let xmouse
let ymouse
let told = 0
let x = 375
let y = 250
let Vx = 0
let Vy = 0

shipSprite.onload = updateAndRender()

function updateAndRender () { // time didn't work sadly (shows NaN)
  update()
  render()
  window.requestAnimationFrame(updateAndRender)
}

cvs.addEventListener('pointerdown', handleClick)

function handleClick (event) {
  xmouse = event.offsetX
  ymouse = event.offsetY
}

function update() {
  angletarget = Math.atan((y - ymouse) / (x - xmouse))
  if (xmouse < x) angletarget += Math.PI

  if (Math.abs(angletarget - angle) > Math.PI) {
    if (angle > angletarget) angle -= Math.PI * 2
    else angle += Math.PI * 2
  }
  if (Math.abs(angle - angletarget) < anglespeed) angle = angletarget
  else if (angle > angletarget) angle -= anglespeed
  else angle += anglespeed

  Vx += Math.cos(angle) * AVelocity
  Vy += Math.sin(angle) * AVelocity
  x += Vx
  y += Vy

  x = Math.min(Math.max(x, 0), 750)
  y = Math.min(Math.max(y, 0), 500)

  Vx -= Vx * VelocityFriction
  Vy -= Vy * VelocityFriction
}

function render() {
  ctx.clearRect(0, 0, 750, 500)
  ctx.translate(x, y)
  ctx.rotate(angle + correctionAngl)

  ctx.drawImage(shipSprite, correctionX, correctionY)

  ctx.rotate(-angle - correctionAngl)
  ctx.translate(-x, -y)
}