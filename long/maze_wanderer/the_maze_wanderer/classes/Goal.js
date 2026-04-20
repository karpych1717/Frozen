import Point from "./Point.js"

class Goal {
  constructor (x, y, a, l = 50, r = 3) {
    this.x = x
    this.y = y
    this.a = a - Math.PI/2
    this.l = l
    this.r = r
    this.c1 = "red"
    this.c2 = "blue"
  }

  drawIt (context) {
    context.beginPath()
    context.arc(this.x, this.y, this.r, this.a, this.a + Math.PI)
    context.fillStyle = this.c1
    context.fill()
    context.stroke()
    context.beginPath()
    context.arc(this.x, this.y, this.r, this.a + Math.PI, this.a)
    context.fillStyle = this.c2
    context.fill()
    context.stroke()
    context.beginPath()
    context.moveTo(
      this.x + this.l * Math.cos(this.a),
      this.y + this.l * Math.sin(this.a)
    )
    context.lineTo(
      this.x - this.l * Math.cos(this.a),
      this.y - this.l * Math.sin(this.a)
    )
    context.strokeStyle = "White"
    context.stroke()
  }

  check(wanderer) {
    let p = new Point(wanderer.square.x, wanderer.square.y)
    p = p.rotate(this.x, this.y, this.a)
    if (p.y - this.y < 0) return true
    return false
  }
}

export default Goal