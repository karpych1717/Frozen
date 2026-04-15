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
}

export default Map