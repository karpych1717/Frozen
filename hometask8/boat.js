/* global canvasSetUp, log, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()
cvs.addEventListener('pointermove', handleMove)

const WIDTH = 750
const HEIGHT = 500
const VelocityAcceleration = 0.01
const VelocityFriction = 0.01
const MaxVelocityAcceleration = 0.1
const RotationalFriction = 0.02
const RotationalAcceleration = 0.01
const MaxRotationAcceleration = 0.1

const img = new Image()
img.src = './boat.png'
img.onload = () => {ctx.drawImage(img, -14, -16)}

let gotomouse = false
let controlfrommouse = false

let x = WIDTH / 2
let y = HEIGHT / 2
let xcord = 0
let ycord = 0
let angle = -Math.PI / 2
let AVelocity = 0
let Vx = 0
let Vy = 0
let Arot = 0

document.onkeydown = function(event) {
  if (event.key === "ArrowUp") {
    AVelocity += VelocityAcceleration
  } else if (event.key === "ArrowDown") {
    AVelocity -= VelocityAcceleration
  } else if (event.key === "ArrowLeft") {
    Arot -= RotationalAcceleration
  } else if (event.key === "ArrowRight") {
    Arot += RotationalAcceleration
  }
}

function drawboat(x, y, angle) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  img.onload()
  ctx.restore()
}

function simulateboat() {
  drawboat(x, y, angle)
  if (gotomouse === true) {
    angle = Math.atan((y - ycord) / (x - xcord))
    if (xcord < x) angle = angle + Math.PI
  }
  Vx += Math.cos(angle) * AVelocity
  Vy += Math.sin(angle) * AVelocity
  x += Vx
  y += Vy
  angle += Arot

  Vx -= Vx * VelocityFriction
  Vy -= Vy * VelocityFriction
  Arot -= Arot * RotationalFriction

  if (x > WIDTH) x = 0
  if (x < 0) x = WIDTH
  if (y > HEIGHT) y = 0
  if (y < 0) y = HEIGHT
  Arot = Math.min(Math.max(Arot, -MaxRotationAcceleration), MaxRotationAcceleration)
  AVelocity = Math.min(Math.max(AVelocity, -MaxVelocityAcceleration), MaxVelocityAcceleration)
}

function handleMove(event) {
  xcord = event.offsetX
  ycord = event.offsetY
  if (controlfrommouse === true) {
    angle = Math.atan((HEIGHT / 2 - event.offsetY) / (WIDTH / 2 - event.offsetX))
    if (event.offsetX < WIDTH / 2) angle = angle + Math.PI
  }
}

requestAnimationFrame(render)
function render (time) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  simulateboat()
  requestAnimationFrame(render)
}