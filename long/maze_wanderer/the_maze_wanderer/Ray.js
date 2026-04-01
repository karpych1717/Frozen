import Line from './Line.js'

class Ray extends Line {
  constructor (x, y, a) {
    super(0, 0, 0, 0)
    this.a = a

    this.maxLength = 10000

    this.update(x, y, a)
  }

  update(x, y, a) {
    this.a = a
    super.update(
      x,
      y,
      x + this.maxLength * Math.cos(this.a),
      y + this.maxLength * Math.sin(this.a)
    )
  }

  updateBySquare(square) {
    const intersects = square.getIntersectByLine(this)
    for (let i = 0; i < intersects.length; i++) {
      if (
        (this.x0 >= this.x1 && intersects[i].x >= this.x1) ||
        (this.x0 <= this.x1 && intersects[i].x <= this.x1)
      ) {
        if (Math.abs(this.x1 - intersects[i].x) < Math.abs(this.x0 - this.x1)) {
          this.x1 = intersects[i].x
          this.y1 = intersects[i].y
        }
      }

      if (this.x0 == this.x1) {
        if (
          (this.y0 >= this.y1 && intersects[i].y >= this.y1) ||
          (this.y0 <= this.y1 && intersects[i].y <= this.y1)
        ) {
          if (Math.abs(this.line.y1 - intersects[i].y) < Math.abs(this.y0 - this.y1)) {
            this.x1 = intersects[i].x
            this.y1 = intersects[i].y
          }
        }
      }
    }
  }
}

export default Ray