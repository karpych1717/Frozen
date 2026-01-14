/* global _canvas */
'use strict'
import Circle from './Circle.js'
import Vector from './Vector.js'
import Line from './Line.js'
import Square from './Square.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const A = new Circle(200, 250, 10, "red")
const B = new Circle(300, 250, 10, "blue")
const ray = new Line(A.x, A.y, B.x, B.y)

const C = new Circle(0, 0, 5, "yellow")
const border = new Square(0, 0, 500, "blue")

const SqMoveId = 3
const squares = new Array(5)
for (let i = 0; i < squares.length; i++) {
  squares[i] = new Square(100, 100, 50, "green")
}
let p = new Vector(0, 0)

draw(context)



let move = 0

function draw(context) { // work in progress
    context.clearRect(0, 0, 500, 500)
    A.drawIt(context)
    B.drawIt(context)
    ray.drawIt(context)

    p.x = 1000000
    p.y = 1000000
    
    for (let i = 0; i < squares.length; i++) {
      squares[i].drawIt(context)
    }

    let intersects = border.getIntersectByLine(ray)
    for (let i = 0; i < intersects.length; i++) {
      C.x = intersects[i].x
      C.y = intersects[i].y
      C.drawIt(context)
      
      if ((A.x >= B.x && C.x >= B.x) || (A.x <= B.x && C.x <= B.x)) {
        if (Math.abs(B.x - C.x) < Math.abs(B.x - p.x)) {
          p.x = intersects[i].x
          p.y = intersects[i].y
          break
        }
      }

      if (A.x == B.x) {
        if ((A.y >= B.y && C.y >= B.y) || (A.y <= B.y && C.y <= B.y)) {
          if (Math.abs(B.y - C.y) < Math.abs(B.y - p.y)) {
            p.x = intersects[i].x
            p.y = intersects[i].y
            break
          }
        }
      }
    }
    for (let idx = 0; idx < squares.length; idx++) {
      intersects = squares[idx].getIntersectByLine(ray)
      for (let i = 0; i < intersects.length; i++) {
        C.x = intersects[i].x
        C.y = intersects[i].y
        C.drawIt(context)
        
        if ((A.x >= B.x && C.x >= B.x) || (A.x <= B.x && C.x <= B.x)) {
          if (Math.abs(B.x - C.x) < Math.abs(B.x - p.x)) {
            p.x = intersects[i].x
            p.y = intersects[i].y
          }
        }

        if (A.x == B.x) {
          if ((A.y >= B.y && C.y >= B.y) || (A.y <= B.y && C.y <= B.y)) {
            if (Math.abs(B.y - C.y) < Math.abs(B.y - p.y)) {
              p.x = intersects[i].x
              p.y = intersects[i].y
            }
          }
        }
      }
    }
    console.log(p.x, p.y)
    context.beginPath()
    context.moveTo(p.x, p.y)
    context.lineTo(B.x, B.y)
    context.lineWidth = 2
    context.strokeStyle = "Lime"
    context.stroke()
    context.strokeStyle = '#000000'
    context.lineWidth = 1
}

function clickHandler(event) {
  //console.log(event.offsetX, event.offsetY)

  if (A.onIt(event.offsetX, event.offsetY) && move != 1) {
    move = 1
  } else if (B.onIt(event.offsetX, event.offsetY) && move != 2) {
    move = 2
  } else {
    let moveOld = move
    move = 0
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].onIt(event.offsetX, event.offsetY) && moveOld != i + SqMoveId) {
        move = i + SqMoveId
        break
      }
    }
  }
  console.log(move)
}

function moveHandler(event, context) {
  //console.log(event.offsetX, event.offsetY)
  console.log(move)
  if (move == 1) {
    A.x = event.offsetX
    A.y = event.offsetY
    ray.update(A.x, A.y, B.x, B.y)
  }

  if (move == 2) {
    B.x = event.offsetX
    B.y = event.offsetY
    ray.update(A.x, A.y, B.x, B.y)
  }

  if (move > 2) {
    squares[move - SqMoveId].x = event.offsetX - squares[move - SqMoveId].l / 2
    squares[move - SqMoveId].y = event.offsetY - squares[move - SqMoveId].l / 2
  }

  if (move != 0) {
    draw(context)
  }
}

_canvas.onpointerdown = (event) => clickHandler(event)
_canvas.onpointermove = (event) => moveHandler(event, context)