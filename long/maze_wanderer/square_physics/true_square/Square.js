import Point from "./Point.js"

class Square extends Point {
  constructor (x, y, a, l, col) {
    super(x, y)
    this.a = a
    this.l = l
    this.col = col

    this.va = 0

    this.halfLength = l / 2;
    this.halfDiagonal = l / Math.sqrt(2);
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
      context.strokeStyle = this.col
      context.fillStyle = this.col
      context.fill()
    }
    context.stroke()
  }

  corners() {
    const corners = new Array(4)
    for (let i = 0; i < 4; i++) {
        let angle = this.a + Math.PI / 4 + Math.PI / 2 * i
        corners[i] = new Point(
            this.x + Math.cos(angle) * this.halfDiagonal,
            this.y + Math.sin(angle) * this.halfDiagonal
        )
    }
    return corners
  }

  isPointIn(p) {
    return p.rotate(this.x, this.y, this.a).isInBox(
        this.x - this.halfLength,
        this.y - this.halfLength,
        this.x + this.halfLength,
        this.y + this.halfLength
    )
  }

  pointToCenter(p) {
    return new Point(this.x - p.x, this.y - p.y)
  }

  transformPosition(p) {
    this.x = p.x
    this.y = p.y
  }
  
  updateIt(dt) {
    this.a += this.va * dt
  }

  squareIntersecting(sq) {
    let corners1 = this.corners()
    let corners2 = sq.corners()
    for (let i = 0; i < 4; i++) {
        if (sq.isPointIn(corners1[i])) {
            return true
        }
        if (this.isPointIn(corners2[i])) {
            return true
        }
    }
    return false
  }

  boundToBox(x1, y1, x2, y2) {
    this.x = Math.min(Math.max(this.x, 
      x1),
      x2
    )
    this.y = Math.min(Math.max(this.y, 
      y1),
      y2
    )
  }
}

export default Square