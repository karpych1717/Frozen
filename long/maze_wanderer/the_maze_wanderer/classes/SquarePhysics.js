import Point from "./Point.js"
import Square from "./Square.js"
import Line from './Line.js'
import Ray from './Ray.js'

class SquarePhysics extends Square {
  constructor (x, y, a, l, col, g, Kr) {
    super(x, y, a, l, col)
    this.g = g
    this.Kr = Kr

    this.rays = new Array(3)
    this.rays[0] = new Ray(this.x, this.y, this.a + Math.PI / 4)
    this.rays[1] = new Ray(this.x, this.y, this.a)
    this.rays[2] = new Ray(this.x, this.y, this.a - Math.PI / 4)

    this.ax = 0
    this.ay = 0
    this.vx = 0
    this.vy = 0
    this.m = 1
    this.fx = 0
    this.fy = 0
    this.fxR = 0
    this.fyR = 0

    this.lastX = 0
    this.lastY = 0
  }

  setPosition(x, y, a) {
    this.x = x
    this.y = y
    this.a = a
    this.resetLine()
  }

  resetVariables() {
    this.ax = 0
    this.ay = 0
    this.vx = 0
    this.vy = 0
    this.m = 1
    this.fx = 0
    this.fy = 0
    this.fxR = 0
    this.fyR = 0

    this.lastX = 0
    this.lastY = 0
  }

  resetLine() {
    this.rays[0].update(this.x, this.y, this.a + Math.PI / 4)
    this.rays[1].update(this.x, this.y, this.a)
    this.rays[2].update(this.x, this.y, this.a - Math.PI / 4)
  }

  updateLine(square) {
    for (let i = 0; i < 3; i++) {
      this.rays[i].updateBySquare(square)
    }
  }

  speed() {
    return Math.sqrt(this.vx ** 2 + this.vy ** 2)
  }

  drawIt (context, drawLines = false) {
    context.beginPath()
    context.moveTo(
        this.x + Math.cos(this.a + Math.PI / 4) * this.halfDiagonal,
        this.y + Math.sin(this.a + Math.PI / 4) * this.halfDiagonal
    )
    for (let i = 1; i <= 9; i += 2) {
        context.lineTo(
            this.x + Math.cos(this.a + Math.PI * i / 4) * this.halfDiagonal,
            this.y + Math.sin(this.a + Math.PI * i / 4) * this.halfDiagonal
        )
    }
    if (this.col != "null") {
      context.strokeStyle = "white"
      context.lineWidth = 0.25
      context.fillStyle = this.col
      context.fill()
    }
    context.stroke()
    context.beginPath()
    context.moveTo(this.x,this.y)
    context.lineTo(
        this.x + Math.cos(this.a) * this.l,
        this.y + Math.sin(this.a) * this.l
    )
    context.strokeStyle = "black"
    context.lineWidth = 1
    context.fillStyle = "black"
    context.fill()
    context.stroke()

    if (drawLines) {
      for (let i = 0; i < 3; i++) {
        this.rays[i].drawIt(context)
      }
    }
  }
  
  updateIt(dt) {
    this.fx = this.fxR * Math.cos(-this.a) + this.fyR * Math.sin(-this.a)
    this.fy = -this.fxR * Math.sin(-this.a) + this.fyR * Math.cos(-this.a)
    this.ax = this.fx / this.m
    this.ay = this.fy / this.m

    this.lastX = this.x
    this.lastY = this.y

    this.x += this.vx * dt + this.ax * dt * dt / 2
    this.y += this.vy * dt + this.ay * dt * dt / 2
    
    this.vx += this.ax * dt
    this.vy += this.ay * dt
    
    let v = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    let speedAngle = Math.atan2(this.vy, this.vx)
    this.aFx = -v * this.Kr * Math.cos(speedAngle)
    this.aFy = -v * this.Kr * Math.sin(speedAngle)

    if (Math.abs(this.vx) < Math.abs(this.aFx * dt)) this.vx = 0
    else this.vx += this.aFx * dt

    if (Math.abs(this.vy) < Math.abs(this.aFy * dt)) this.vy = 0
    else this.vy += this.aFy * dt
    
    this.a += this.va * dt
  }

  updateItX(dt) {
    this.fx = this.fxR * Math.cos(-this.a) + this.fyR * Math.sin(-this.a)
    this.ax = this.fx / this.m
    
    this.x += this.vx * dt + this.ax * dt * dt / 2
    
    this.vx += this.ax * dt
    
    let v = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    let speedAngle = Math.atan2(this.vy, this.vx)
    this.aFx = -v * this.Kr * Math.cos(speedAngle)

    if (Math.abs(this.vx) < Math.abs(this.aFx * dt)) this.vx = 0
    else this.vx += this.aFx * dt
  }
  
  updateItY(dt) {
    this.fy = -this.fxR * Math.sin(-this.a) + this.fyR * Math.cos(-this.a)
    this.ay = this.fy / this.m
    
    this.y += this.vy * dt + this.ay * dt * dt / 2
    
    this.vy += this.ay * dt

    let v = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    let speedAngle = Math.atan2(this.vy, this.vx)
    this.aFy = -v * this.Kr * Math.sin(speedAngle)

    if (Math.abs(this.vy) < Math.abs(this.aFy * dt)) this.vy = 0
    else this.vy += this.aFy * dt
  }
  
  updateItA(dt) {
    this.a += this.va * dt
  }

  copy() {
    const sq = new SquarePhysics(
      this.x, this.y, this.a, this.l, this.col,this.g, this.kf, this.Kr
    )
    
    sq.ax = this.ax
    sq.ay = this.ay
    sq.vx = this.vx
    sq.vy = this.vy
    sq.m = this.m
    sq.fx = this.fx
    sq.fy = this.fy
    sq.fxR = this.fxR
    sq.fyR = this.fyR
    sq.va = this.va

    return sq
  }

  nextPosition(dt) {
    const sq = this.copy()
    sq.updateIt(dt)
    return sq
  }
}

export default SquarePhysics