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
          if (Math.abs(this.y1 - intersects[i].y) < Math.abs(this.y0 - this.y1)) {
            this.x1 = intersects[i].x
            this.y1 = intersects[i].y
          }
        }
      }
    }
  }

  updateByTree(tree, map, v) {
    if (tree[v].d == 0) {
      for (let i = tree[v].x; i < tree[v].x + tree[v].l; i++) {
        for (let j = tree[v].y; j < tree[v].y + tree[v].l; j++) {
          if (map[i][j] == null) continue
          this.updateBySquare(map[i][j])
        }
      }
      return
    }

    let blocks = new Array()
    for (let i = -2; i <= 1; i++) {
      let r = new Ray(this.x0, this.y0, this.a)
      r.updateBySquare(tree[4*v+i].sq)
      if (r.length() < r.maxLength-10) {
        blocks.push([r.length(), v*4+i])
      }
    }

    blocks.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i][0] >= this.length()) break
      this.updateByTree(tree, map, blocks[i][1])
      if (this.length() < this.maxLength - 10) return
    }
  }
}

export default Ray