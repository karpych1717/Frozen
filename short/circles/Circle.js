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
<<<<<<< HEAD
=======

  getRadius () {
    return this.r
  }
>>>>>>> c5d8e7526032d3364816a8981ff16fa3a7f2248f
}

export default Circle