import Square from "./Square.js"

class Dot extends Square {
  constructor (x, y, a, l, col) {
    super(x, y, a, l, col)
    this.vx = 0
    this.vy = 0
    this.va = 0
    this.speed = 0
  }

  update (dt) {
    this.vx = this.speed * Math.cos(this.a)
    this.vy = this.speed * Math.sin(this.a)
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.a += this.va * dt
  }

  drawIt (context) {
    context.beginPath()
    context.moveTo(
      this.x + this.l * Math.sqrt(2) * Math.cos(this.a + Math.PI / 4),
      this.y + this.l * Math.sqrt(2) * Math.sin(this.a + Math.PI / 4)
    )
    for (let i = 1; i <= 4; i++) {
      context.lineTo(
        this.x + this.l *
        Math.sqrt(2) * Math.cos(this.a + Math.PI / 4 + Math.PI / 2 * i),
        this.y + this.l *
        Math.sqrt(2) * Math.sin(this.a + Math.PI / 4 + Math.PI / 2 * i)
      )
    }
    context.fillStyle = `hsl(${this.col},100%,50%)`;
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(this.x, this.y)
    context.lineTo(
      this.x + this.l * 2 * Math.cos(this.a),
      this.y + this.l * 2 * Math.sin(this.a)
    )
    context.fillStyle = "black";
    context.fill()
    context.stroke()
  }
}

export default Dot