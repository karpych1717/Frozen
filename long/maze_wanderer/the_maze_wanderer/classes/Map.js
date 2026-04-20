import Square from "./Square.js"

class Map {
  constructor(n, m, squareLength) {
    this.n = n
    this.m = m
    this.squareLength = squareLength
    
    this.map = new Array(this.n)
    for (let i = 0; i < this.n; i++) {
        this.map[i] = new Array(this.m)
        for (let j = 0; j < this.m; j++) {
            this.map[i][j] = new Square(
                this.squareLength / 2 + i * this.squareLength,
                this.squareLength / 2 + j * this.squareLength,
                0,
                this.squareLength,
                "green"
            )
        }
    }
  }

  drawIt(context) {
    for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.m; j++) {
            if (this.map[i][j] == null) continue;
            this.map[i][j].drawIt(context)
        }
    }
  }

  checkSquare(sq) {
    for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.m; j++) {
            if (this.map[i][j] == null) continue;
            if (sq.squareIntersecting(this.map[i][j])) {
                return true
            }
        }
    }
    return false
  }

  eraseArc(x, y, a1, a2, R, r) {
    for (let a = a1; a >= a2; a -= 0.01) {
      for (let l = r; l <= R; l += 1) {
        const xi = Math.round(x + l * Math.sin(a))
        const yi = Math.round(y + l * Math.cos(a))
        this.map[
          Math.min(Math.max(xi, 0), this.n-1)][
          Math.min(Math.max(yi, 0), this.m-1)
        ] = null
      }
    }
  }

  eraseRect(x1, y1, x2, y2) {
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        this.map[i][j] = null
      }
    }
  }
}

export default Map