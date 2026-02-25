'use strict'

document.body.style.margin= 0

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'black'

const context = _canvas.getContext('2d')
context.fillStyle = 'white'
context.strokeStyle = 'white'

class Rect {
  constructor (x = 0, y = 0, v = 0, m = 1) {
    this.x = x
    this.y = y
    this.v = v
    this.m = m
  }

  drawIt () {
    context.fillRect(this.x - half_side, this.y - half_side, side, side)
  }

  updateIt () {
    this.y += this.v * DT
  }

  updateVelocity (f) {
    this.v += f / this.m * DT
  }

  forceTo (rect) {
    return (rect.y - this.y) * K
    // formula is simplified due to fixed X
  }
}

const DT = 1
const AMOUNT = 330
const K = 0.0001

const side = 1
const half_side = side / 2

const rectangles = []
const jump_sq_setup = (_canvas.width + side) / (AMOUNT + 1)
for (let i = 0; i < AMOUNT + 2; i++) {
  rectangles.push(new Rect(jump_sq_setup * i - half_side, _canvas.height / 2))
}
rectangles[0].x -= half_side;
rectangles[AMOUNT + 1].x += half_side;

for (let i = 2; i <= AMOUNT; i++) {
  rectangles[i].m = rectangles[i - 1].m * 0.95
}

setInterval(loop, DT)
_canvas.onpointerdown = clickHandler

function loop () {
  draw()
  update()
}

function draw () {
  context.clearRect(0, 0, _canvas.width, _canvas.height)
  context.beginPath();
  context.moveTo(rectangles[0].x + half_side, rectangles[0].y);
  for (let i = 1; i <= AMOUNT; i++) {
    rectangles[i].drawIt();
    context.lineTo(rectangles[i].x - half_side, rectangles[i].y);
    context.moveTo(rectangles[i].x + half_side, rectangles[i].y);
  }
  context.lineTo(
    rectangles[AMOUNT + 1].x - half_side,
    rectangles[AMOUNT + 1].y
  );

  context.stroke();
}

let force_left, force_right
function update () {
  force_right = rectangles[0].forceTo(rectangles[1])

  for (let i = 1; i <= AMOUNT; i++) {
    force_left = -force_right
    force_right = rectangles[i].forceTo(rectangles[i + 1])

    rectangles[i].updateVelocity(force_left + force_right)
  }
  for (let i = 1; i <= AMOUNT; i++) {
    rectangles[i].updateIt()
  }
}

function clickHandler () {
  rectangles[1].v = 2
}