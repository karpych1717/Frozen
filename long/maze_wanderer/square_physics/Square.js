import Vector from "./Vector.js"

class Square {
  constructor (x, y, a, l, col) {
    this.x = x
    this.y = y
    this.a = a
    this.l = l
    this.col = col
  }

  corners() {
    const corners = new Array(4)
    for (let i = 0; i < 4; i++) {
      corners[i] = new Vector(
        this.x + this.l * Math.sqrt(2) * Math.cos(this.a + Math.PI / 4 + Math.PI / 2 * i),
        this.y + this.l * Math.sqrt(2) * Math.sin(this.a + Math.PI / 4 + Math.PI / 2 * i)
      )
    }
    return corners
  }

  truncate (x1, y1, x2, y2) {
    let corners = this.corners()
    for (let i = 0; i < 4; i++) {
      this.x = Math.max(this.x, x1 + this.x - corners[i].x)
      this.x = Math.min(this.x, x2 - corners[i].x + this.x)
      this.y = Math.max(this.y, y1 + this.y - corners[i].y)
      this.y = Math.min(this.y, y2 - corners[i].y + this.y)
    }
  } 

  drawIt (context) {
    context.beginPath()
    let corners = this.corners()
    context.moveTo(corners[3].x, corners[3].y)
    for (let i = 0; i < 4; i++) {
      context.lineTo(corners[i].x, corners[i].y)
    }
    context.fillStyle = `hsl(${this.col},100%,50%)`
    context.fill()
    context.stroke()
  }

  touches (other) {
    const A = this.corners()
    const B = other.corners()

    const project = (pts, axis) => {
      let min = Infinity
      let max = -Infinity
      for (const p of pts) {
        const dot = p.x * axis.x + p.y * axis.y
        min = Math.min(min, dot)
        max = Math.max(max, dot)
      }
      return { min, max }
    }

    const overlaps = (p1, p2) => p1.max >= p2.min && p2.max >= p1.min

    const axes = []
    for (let i = 0; i < 4; i++) {
      const nextA = (i + 1) % 4
      const edgeA = { x: A[nextA].x - A[i].x, y: A[nextA].y - A[i].y }
      axes.push({ x: -edgeA.y, y: edgeA.x })

      const nextB = (i + 1) % 4
      const edgeB = { x: B[nextB].x - B[i].x, y: B[nextB].y - B[i].y }
      axes.push({ x: -edgeB.y, y: edgeB.x })
    }

    for (const axis of axes) {
      const pA = project(A, axis)
      const pB = project(B, axis)
      if (!overlaps(pA, pB)) return false
    }

    return true
  }


}

export default Square