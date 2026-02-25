import Point from "./Point.js"
import Square from "./Square.js"

class SquarePhysics extends Square {
  constructor (x, y, a, l, col) {
    super(x, y, a, l, col)
    this.ax = 0
    this.ay = 0
    this.vx = 0
    this.vy = 0
    this.m = 1
    this.fx = 0
    this.fy = 0
    this.fxR = 0
    this.fyR = 0
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
    context.fillStyle = this.col
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(this.x,this.y)
    context.lineTo(
        this.x + Math.cos(this.a) * this.l,
        this.y + Math.sin(this.a) * this.l
    )
    context.fillStyle = "black"
    context.fill()
    context.stroke()
  }
  
  updateIt(dt) {
    this.fx = this.fxR * Math.cos(-this.a) + this.fyR * Math.sin(-this.a)
    this.fy = -this.fxR * Math.sin(-this.a) + this.fyR * Math.cos(-this.a)
    this.ax = this.fx / this.m
    this.ay = this.fy / this.m
    this.vx += this.ax * dt
    this.vy += this.ay * dt
    
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.a += this.va * dt
  }
}

export default SquarePhysics