'use strict'

_canvas.width = 500
_canvas.height = 500
_canvas.style.border = '1px solid green'

const kSurface = 1
const kColision = 5
const kEscape = 25

const amountOfBalls = 20
const arr = new Array(amountOfBalls)

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

class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

function fillBallArray () {
  for (let i = 0; i < amountOfBalls; i++) {
    arr[i] = new Ball(
      10,
      0,
      0
    )
  }
}

const frameWidth = 125
function assignRandomPositionsToBalls () {
  for (let i = 0; i < amountOfBalls; i++) {
    arr[i].x = frameWidth + Math.random() * (_canvas.width - 2 * frameWidth)
    arr[i].y = frameWidth + Math.random() * (_canvas.height - 2 * frameWidth)
  }
}

function drawBalls () {
  for (let i = 0; i < amountOfBalls; i++) {
    arr[i].drawIt()
  }
}

function IndividualValueFunction(idx, arr) {
  let answer = surface(arr[idx].x, arr[idx].y) * kSurface
  if (
    arr[idx].x < arr[idx].r / 2 ||
    arr[idx].x > _canvas.width - arr[idx].r / 2 ||
    arr[idx].y < arr[idx].r / 2 ||
    arr[idx].y > _canvas.height - arr[idx].r / 2
  ) {
    answer += 1 * kEscape
  }
  for (let i = 0; i < arr.length; i++) {
      if (i == idx) continue
      answer += Math.max(0,
          arr[idx].r + arr[i].r - Math.sqrt(
              (arr[idx].x - arr[i].x) ** 2 +
              (arr[idx].y - arr[i].y) ** 2
          )
      ) * kColision
  }
  return answer
}

function ValueFunction(arr) {
  let answer = 0
  for (let i = 0; i < arr.length; i++) {
      answer += IndividualValueFunction(i, arr)
  }
  return answer
}

function IndividualDerivativeFunction(idx, dx, dy, arr) {
  arr[idx].x -= dx
  const fCallX1 = ValueFunction(arr)
  arr[idx].x += dx * 2
  const fCallX2 = ValueFunction(arr)
  arr[idx].x -= dx
  arr[idx].y -= dy
  const fCallY1 = ValueFunction(arr)
  arr[idx].y += dy * 2
  const fCallY2 = ValueFunction(arr)
  arr[idx].y -= dy
  return new Vector((fCallX2 - fCallX1) / dx, (fCallY2 - fCallY1) / dy)
}

function DerivativeFunction(dx, dy, arr) {
  const D = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
      D[i] = IndividualDerivativeFunction(i, dx, dy, arr)
  }
  return D
}

function cycle(dx, dy, arr) {
  const D = DerivativeFunction(dx, dy, arr)
  for (let i = 0; i < arr.length; i++) {
      arr[i].x -= D[i].x
      arr[i].y -= D[i].y
  }
}

document.onpointerdown = () => {
  for (let i = 0; i < 1; i++) {
      cycle(5, 5, arr)
  }
  context.clearRect(0, 0, 500, 500)
  drawSurface()
  drawBalls()
}