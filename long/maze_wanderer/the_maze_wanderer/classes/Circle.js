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

  onIt (x, y) {
    return (this.x - x) ** 2 + (this.y - y) ** 2 <= this.r ** 2
  }

  getRadius () {
    return this.r
  }
}

export default Circle