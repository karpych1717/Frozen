import Circle from "./Circle.js"

class Dot extends Circle {
  constructor (x, y, r, c) {
    super(x, y, r, c)
    this.vx = 0
    this.vy = 0
    this.angle = 0
  }

  update (dt) {
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.vx = 0
    this.vy = 0
  }

  drawIt (context) {
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    context.fillStyle = this.c;
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(this.x, this.y)
    context.lineTo(
      this.x + this.r * 2 * Math.cos(this.angle),
      this.y + this.r * 2 * Math.sin(this.angle)
    )
    context.fillStyle = "black";
    context.fill()
    context.stroke()
  }
}

export default Dot