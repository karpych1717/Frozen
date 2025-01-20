const DT = 0.1
const WIDTH = 500
const HEIGHT = 500

const K = 0.1

const Kside = 1 / 8
const Kcorner = Kside / 1.141

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

  updateIt(f) {
    this.acceleration = f / this.mass
    this.speed -= this.acceleration * DT
  }

  updateIt2() {
    this.value -= this.speed * DT
  }
}

plane = new Array(WIDTH)
for (let i = 0; i < WIDTH; i++) {
  plane[i] = new Array(HEIGHT)

  for (let j = 0; j < HEIGHT; j++) {
    plane[i][j] = new Dot()
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
  const xl = Math.max(x - size / 2, 0)
  const xr = Math.min(x + size / 2, WIDTH - 1)
  const yl = Math.max(y - size / 2, 0)
  const yr = Math.min(y + size / 2, HEIGHT - 1)

  for (let xi = xl; xi < xr; xi++) {
    for (let yi = yl; yi < yr; yi++) {
      plane[xi][yi].value += 127
    }
  }
}

function loop() {
  draw()
  update()
}

// [0; +inf) -> [0; 255)
function saturation(input) {
  return Math.round(
    255 * (1 - Math.exp(-input / 64))
  )
}

function draw () {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (plane[x][y].value >= 0) {
        updateImage(
          getImagePointer(x, y),
          saturation(plane[x][y].value),
          0,
          0,
          255
        )
      } else {
        updateImage(
          getImagePointer(x, y),
          0,
          0,
          saturation(-plane[x][y].value),
          255
        )
      }
    }
  }

  context.putImageData(picture, 0, 0)
}

function update () {
  let avg
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      avg = 0

      if (x > 0) {
        if (y > 0) avg += plane[x - 1][y - 1].value * Kcorner
        avg += plane[x - 1][y].value * Kside
        if (y < HEIGHT - 1) avg += plane[x - 1][y + 1].value * Kcorner
      }
      if (x < WIDTH - 1) {
        if (y > 0) avg += plane[x + 1][y - 1].value * Kcorner
        avg += plane[x + 1][y].value * Kside
        if (y < HEIGHT - 1) avg += plane[x + 1][y + 1].value * Kcorner
      }

      if (y > 0) avg += plane[x][y - 1].value * Kside
      if (y < HEIGHT - 1) avg += plane[x][y + 1].value * Kside

      avg = avg / 8
      plane[x][y].updateIt(-K * (plane[x][y].value - avg))
    }
  }
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      plane[x][y].updateIt2()
    }
  }
}

function getImagePointer(x, y) {
  return (y * WIDTH + x) * 4
}

function updateImage(p, r, g, b, a) {
  picture.data[p] = r
  picture.data[p + 1] = g
  picture.data[p + 2] = b
  picture.data[p + 3] = a
}