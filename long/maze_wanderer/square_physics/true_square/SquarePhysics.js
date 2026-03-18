import Point from "./Point.js"
import Square from "./Square.js"
import Line from './Line.js'

class SquarePhysics extends Square {
  constructor (x, y, a, l, col, g, kf, Kr) {
    super(x, y, a, l, col)
    this.g = g
    this.kf = kf
    this.Kr = Kr

    this.lineLength = 1000
    this.line = new Line(
      x, y, 
      this.lineLength * Math.cos(a),
      this.lineLength * Math.sin(a)
    )
    this.drawLine = new Line(
      x, y, 
      this.lineLength * Math.cos(a),
      this.lineLength * Math.sin(a)
    )

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

  resetLine() {
    console.log(this.drawLine.x1, this.drawLine.y1)
    this.line.x0 = this.x
    this.line.y0 = this.y
    this.line.x1 = this.lineLength * Math.cos(this.a)
    this.line.y1 = this.lineLength * Math.sin(this.a)

    this.drawLine.x0 = this.x
    this.drawLine.y0 = this.y
    this.drawLine.x1 = 1000000
    this.drawLine.y1 = 1000000
  }

  updateLine(square) {
    const intersects = square.getIntersectByLine(this.line)
    for (let i = 0; i < intersects.length; i++) {
      if (
        (this.line.x0 >= this.line.x1 && intersects[i].x >= this.line.x1) ||
        (this.line.x0 <= this.line.x1 && intersects[i].x <= this.line.x1)
      ) {
        if (Math.abs(this.line.x1 - intersects[i].x) < Math.abs(this.line.x1 - this.drawLine.x1)) {
          this.drawLine.x1 = intersects[i].x
          this.drawLine.y1 = intersects[i].y
        }
      }

      if (this.line.x0 == this.line.x1) {
        if (
          (this.line.y0 >= this.line.y1 && intersects[i].y >= this.line.y1) ||
          (this.line.y0 <= this.line.y1 && intersects[i].y <= this.line.y1)
        ) {
          if (Math.abs(this.line.y1 - intersects[i].y) < Math.abs(this.line.y1 - this.drawLine.y1)) {
            this.drawLine.x1 = intersects[i].x
            this.drawLine.y1 = intersects[i].y
          }
        }
      }
    }
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

    this.drawLine.drawIt(context)
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

  updateItX(dt) {
    this.fx = this.fxR * Math.cos(-this.a) + this.fyR * Math.sin(-this.a)
    this.ax = this.fx / this.m
    
    this.x += this.vx * dt + this.ax * dt * dt / 2
    
    this.vx += this.ax * dt

    this.aF = this.kf * this.g
    this.aFx = this.aF * Math.cos(this.a)
    
    let v = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    let fF2 = -v * this.Kr
    let a2 = Math.atan2(this.vy, this.vx) + Math.PI
    this.aFx += fF2 * Math.cos(a2)

    if (Math.abs(this.vx) < Math.abs(this.aFx * dt)) this.vx = 0
    else if (this.vx < 0) {
      this.vx += Math.abs(this.aFx * dt)
    } else {
      this.vx -= Math.abs(this.aFx * dt)
    }
  }
  
  updateItY(dt) {
    this.fy = -this.fxR * Math.sin(-this.a) + this.fyR * Math.cos(-this.a)
    this.ay = this.fy / this.m
    
    this.y += this.vy * dt + this.ay * dt * dt / 2
    
    this.vy += this.ay * dt

    this.aF = this.kf * this.g
    this.aFy = this.aF * Math.sin(this.a)
    
    let v = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    let fF2 = -v * this.Kr
    let a2 = Math.atan2(this.vy, this.vx) + Math.PI
    
    this.aFy += fF2 * Math.sin(a2)

    if (Math.abs(this.vy) < Math.abs(this.aFy * dt)) this.vy = 0
    else if (this.vy < 0) {
      this.vy += Math.abs(this.aFy * dt)
    } else {
      this.vy -= Math.abs(this.aFy * dt)
    }
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
    sq.aF = this.aF
    sq.aFx = this.aFx
    sq.aFy = this.aFy
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