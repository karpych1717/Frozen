'use strict'

_canvas.width = 500
_canvas.height = 500
_canvas.style.border = '1px solid green'

const context = _canvas.getContext('2d')
const imageData =
  context.createImageData(_canvas.width, _canvas.height)

const data = imageData.data

const surface = (x, y) => {
  return (
    255 + 255 * Math.cos(2 * Math.PI / 100 * x) * Math.cos(2 * Math.PI / 500 * y)
  ) / 2 | 0
}

const drawSurface = () => {
  for (let y = 0; y < _canvas.height; y++) {
    for (let x = 0; x < _canvas.width; x++) {
      const i = (y * _canvas.width + x) * 4

      const z = surface(x, y)

      data[i] = z
      data[i + 1] = z
      data[i + 2] = z
      data[i + 3] = 255
    }
  }

  context.putImageData(imageData, 0, 0);
}

class Ball {
  constructor (r, x, y) {
    this.r = r
    this.x = x
    this.y = y

    this.color =
      `rgb(${256*Math.random() | 0} ${256*Math.random() | 0} ${256*Math.random() | 0})`
  }

  drawIt () {
    context.save()
    context.fillStyle = this.color

    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    context.fill()

    context.restore()
  }
}

const amountOfBalls = 20
const arr = new Array(amountOfBalls)

function fillBallArray () {
  for (let i = 0; i < amountOfBalls; i++) {
    arr[i] = new Ball(
      10,
      0,
      0
    )
  }
}

const frame = 125
function assignRandomPositions () {
  for (let i = 0; i < amountOfBalls; i++) {
    arr[i].x = frame + Math.random() * (_canvas.width - 2 * frame)
    arr[i].y = frame + Math.random() * (_canvas.height - 2 * frame)
  }
}

function drawBalls () {
  for (let i = 0; i < amountOfBalls; i++) {
    arr[i].drawIt()
  }
}
