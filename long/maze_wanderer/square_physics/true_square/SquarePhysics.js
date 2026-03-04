import Point from "./Point.js"
import Square from "./Square.js"

class SquarePhysics extends Square {
  constructor (x, y, a, l, col, g, kf, Kr) {
    super(x, y, a, l, col)
    this.g = g
    this.kf = kf
    this.Kr = Kr

    this.ax = 0
    this.ay = 0
    this.vx = 0
    this.vy = 0
    this.m = 1
    this.fx = 0
    this.fy = 0
    this.fxR = 0
    this.fyR = 0
    this.aF = 0
    this.aFx = 0
    this.aFy = 0
  }

  drawIt (context) {
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
  }
  
  updateIt(dt) {
    this.fx = this.fxR * Math.cos(-this.a) + this.fyR * Math.sin(-this.a)
    this.fy = -this.fxR * Math.sin(-this.a) + this.fyR * Math.cos(-this.a)
    this.ax = this.fx / this.m
    this.ay = this.fy / this.m
    
    this.x += this.vx * dt + this.ax * dt * dt / 2
    this.y += this.vy * dt + this.ay * dt * dt / 2
    
    this.vx += this.ax * dt
    this.vy += this.ay * dt

    this.aF = this.kf * this.g
    this.aFx = this.aF * Math.cos(this.a)
    this.aFy = this.aF * Math.sin(this.a)
    
    let v = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    let fF2 = -v * this.Kr
    let a2 = Math.atan2(this.vy, this.vx) + Math.PI
    this.aFx += fF2 * Math.cos(a2)
    this.aFy += fF2 * Math.sin(a2)

    if (Math.abs(this.vx) < Math.abs(this.aFx * dt)) this.vx = 0
    else if (this.vx < 0) {
      this.vx += Math.abs(this.aFx * dt)
    } else {
      this.vx -= Math.abs(this.aFx * dt)
    }

    if (Math.abs(this.vy) < Math.abs(this.aFy * dt)) this.vy = 0
    else if (this.vy < 0) {
      this.vy += Math.abs(this.aFy * dt)
    } else {
      this.vy -= Math.abs(this.aFy * dt)
    }
    
    this.a += this.va * dt
  }
}

export default SquarePhysics