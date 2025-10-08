class Circle {
  constructor (x, y, r, c) {
    this.x = x
    this.y = y
    this.r = r
    this.c = c
  }

  drawIt (context) {
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    context.fillStyle = this.c;
    context.fill()
    context.stroke()
  }
}

class Hexagon {
  constructor (x, y, h, c) {
    this.x = x
    this.y = y
    this.h = h
    this.c = c
  }

  drawIt (context) {
    context.beginPath()
    context.moveTo(this.x - this.h / 2, this.y)
    context.lineTo(this.x - this.h / 4, this.y - this.h / 2)
    context.lineTo(this.x + this.h / 4, this.y - this.h / 2)
    context.lineTo(this.x + this.h / 2, this.y)
    context.lineTo(this.x + this.h / 4, this.y + this.h / 2)
    context.lineTo(this.x - this.h / 4, this.y + this.h / 2)
    context.lineTo(this.x - this.h / 2, this.y)
    context.fillStyle = this.c;
    context.fill()
    context.stroke()
  }
}

export default Hexagon