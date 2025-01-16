const DT = 33
const WIDTH = 500
const HEIGHT = 500

const K = 0.1

document.body.style.margin = 0
document.body.style.textAlign = 'center'

_canvas.width = WIDTH
_canvas.height = HEIGHT
_canvas.style.background = 'black'

const context = _canvas.getContext('2d')

class Dot {
  constructor (value = 0, speed = 0, acceleration = 0, mass = 1) {
    this.value = value
    this.speed = speed
    this.acceleration = acceleration
    this.mass = mass
  }
}

const picture = new ImageData(WIDTH, HEIGHT)

// ** RGBA drawing sample **
{
  const BASE = 501000

  picture.data[BASE] = 255
  picture.data[BASE + 1] = 0
  picture.data[BASE + 2] = 0
  picture.data[BASE + 3] = 255

  picture.data[BASE + 4] = 0
  picture.data[BASE + 5] = 255
  picture.data[BASE + 6] = 0
  picture.data[BASE + 7] = 255

  picture.data[BASE + 8] = 0
  picture.data[BASE + 9] = 0
  picture.data[BASE + 10] = 255
  picture.data[BASE + 11] = 255

  context.putImageData(picture, 0, 0)
}
// *************************

setInterval(loop, DT)
document.onpointerdown = handleClick

function handleClick(event) {
  const x = Math.round(event.offsetX)
  const y = Math.round(event.offsetY)

  pushSquare(x, y, 20)
}

function pushSquare (x, y, size) {

}

function loop() {
  draw()
  update()
}

function draw () {

}

// [0; +inf) -> [0; 255)
function saturation(input) {
  return Math.round(
    255 * (1 - Math.exp(-input / 64))
  )
}

function update () {

}
