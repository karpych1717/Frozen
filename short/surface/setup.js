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

class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

const kSurface = 1
const kColision = 10
const kEscape = 0
function fIndividual(idx, arr) {
  let answer = surface(arr[idx].x, arr[idx].y) * kSurface
  for (let i = 0; i < arr.length; i++) {
      if (i == idx) continue
      answer += Math.max(0,
          arr[idx].r + arr[i].r - Math.sqrt(
              (arr[idx].x - arr[i].x) ** 2 +
              (arr[idx].y - arr[i].y) ** 2
          ) * kColision
      )
  }
  return answer
}

function f(arr) {
  let answer = 0
  for (let i = 0; i < arr.length; i++) {
      answer += fIndividual(i, arr)
  }
  return answer
}

function fDerivativeIndividual(idx, dx, dy, arr) {
  const fCallX1 = f(arr)
  arr[idx].x += dx
  const fCallX2 = f(arr)
  arr[idx].x -= dx
  const fCallY1 = f(arr)
  arr[idx].y += dy
  const fCallY2 = f(arr)
  arr[idx].y -= dy
  return new Vector((fCallX2 - fCallX1) / dx, (fCallY2 - fCallY1) / dy)
}

function fDerivative(dx, dy, arr) {
  const D = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
      D[i] = fDerivativeIndividual(i, dx, dy, arr)
  }
  return D
}

function cycle(dx, dy, arr) {
  const D = fDerivative(dx, dy, arr)
  for (let i = 0; i < arr.length; i++) {
      arr[i].x -= D[i].x
      arr[i].y -= D[i].y
  }
}

document.onpointerdown = () => {
  for (let i = 0; i < 10; i++) {
      cycle(5, 5, arr)
  }
  context.clearRect(0, 0, 500, 500)
  drawSurface()
  drawBalls()
}