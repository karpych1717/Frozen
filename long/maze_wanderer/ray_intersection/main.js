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

const moveSpeedB = 3
let mouseToSquare = new Vector(0, 0)

const SqMoveId = 3
const squareSide = 50
const squares = new Array(10)
for (let i = 0; i < squares.length; i++) {
  squares[i] = new Square(
    Math.random() * (_canvas.width - squareSide),
    Math.random() * (_canvas.height - squareSide),
    squareSide,
    "green"
  )
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
    
    context.beginPath()
    context.moveTo(p.x, p.y)
    context.lineTo(B.x, B.y)
    context.lineWidth = 2
    context.strokeStyle = "Lime"
    context.stroke()
    context.strokeStyle = '#000000'
    context.lineWidth = 1
}

function pointerUpHandler(event) {
  move = 0
}

function clickHandler(event) {
  //console.log(event.offsetX, event.offsetY)

  let moveOld = move
  move = 0
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].onIt(event.offsetX, event.offsetY) && moveOld != i + SqMoveId) {
      move = i + SqMoveId
      mouseToSquare.x = squares[i].x - event.offsetX
      mouseToSquare.y = squares[i].y - event.offsetY
      break
    }
  }
}

function moveHandler(event, context) {
  //console.log(event.offsetX, event.offsetY)
  A.x = event.offsetX
  A.y = event.offsetY

  if (move > 2) {
    squares[move - SqMoveId].x = event.offsetX + mouseToSquare.x
    squares[move - SqMoveId].y = event.offsetY + mouseToSquare.y
  }

  ray.update(A.x, A.y, B.x, B.y)
  draw(context)
}

function keyPressHandler(event) {
  const angleAB = Math.atan2(A.x - B.x, A.y - B.y)
  let updateB = false
  if (event.code === "KeyW") {
    B.x += moveSpeedB * Math.sin(angleAB)
    B.y += moveSpeedB * Math.cos(angleAB)
    updateB = true
  }
  if (event.code === "KeyS") {
    B.x -= moveSpeedB * Math.sin(angleAB)
    B.y -= moveSpeedB * Math.cos(angleAB)
    updateB = true
  }
  if (event.code === "KeyA") {
    B.x += moveSpeedB * Math.sin(angleAB + Math.PI / 2)
    B.y += moveSpeedB * Math.cos(angleAB + Math.PI / 2)
    updateB = true
  }
  if (event.code === "KeyD") {
    B.x -= moveSpeedB * Math.sin(angleAB + Math.PI / 2)
    B.y -= moveSpeedB * Math.cos(angleAB + Math.PI / 2)
    updateB = true
  }
  if (updateB) {
    B.x = Math.min(Math.max(0, B.x), _canvas.width)
    B.y = Math.min(Math.max(0, B.y), _canvas.height)
    ray.update(A.x, A.y, B.x, B.y)
    draw(context)
  }
}

_canvas.onpointerup = (event) => pointerUpHandler(event)
_canvas.onpointerdown = (event) => clickHandler(event)
_canvas.onpointermove = (event) => moveHandler(event, context)
document.addEventListener("keydown", (event) => keyPressHandler(event));