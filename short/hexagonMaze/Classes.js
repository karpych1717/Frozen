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

class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
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
    context.lineTo(this.x - this.h / 4, this.y - this.h * Math.sqrt(3) / 4)
    context.lineTo(this.x + this.h / 4, this.y - this.h * Math.sqrt(3) / 4)
    context.lineTo(this.x + this.h / 2, this.y)
    context.lineTo(this.x + this.h / 4, this.y + this.h * Math.sqrt(3) / 4)
    context.lineTo(this.x - this.h / 4, this.y + this.h * Math.sqrt(3) / 4)
    context.lineTo(this.x - this.h / 2, this.y)
    context.fillStyle = this.c;
    context.fill()
    context.stroke()
  }
}

class Field {
  constructor (hexagonWidth, x, y, w, h) {
    this.hexagonWidth = hexagonWidth
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.hexagonHeight = this.hexagonWidth * Math.sqrt(3) / 2

    this.n = Math.floor(4 * this.w / 3 / this.hexagonWidth)
    if (this.n == 1) {
      this.m = Math.floor(this.h / this.hexagonHeight)
    } else {
      this.m = Math.floor(this.h / this.hexagonHeight - 1 / 2)
      if (this.m == 0) {
        this.m = Math.floor(this.h / this.hexagonHeight)
      }
    }

    this.dx = (this.w - this.hexagonWidth - this.hexagonWidth * 3 / 4 * (this.n - 1)) / 2
    if (this.n == 1) {
      this.dy = (this.h - this.hexagonHeight * this.m) / 2
    } else {
      this.dy = (this.h - this.hexagonHeight * this.m - this.hexagonHeight / 2) / 2
    }

    this.field = new Array(this.n)
    for (let i = 0; i < this.n; i++) {
      this.field[i] = new Array(this.m)
      for (let j = 0; j < this.m; j++) {
        this.field[i][j] = new Hexagon(
          this.dx + this.hexagonWidth / 2 + i * this.hexagonWidth * 3 / 4,
          this.dy + this.hexagonHeight / 2 + j * this.hexagonHeight,
          this.hexagonWidth,
          `grey`
        )
        if (i % 2 == 1) this.field[i][j].y += this.hexagonHeight / 2
      }
    }
  }

  drawIt(context) {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        this.field[i][j].drawIt(context)
      }
    }
  }

  setColorByVal(x, y, color) {
    if (x < 0 || y < 0 || x > this.n || y > this.m) {
      console.log("ERROR SetColor Boundary")
      return -1
    }
    this.field[x][y].c = `rgb(${color}, ${color}, ${color})` 
  }

  getNeighbours(x, y) {
    let ret = new Array()

    if (x != 0) {
      ret.push(new Vector(x-1, y))
    }
    if (x != this.n - 1) {
      ret.push(new Vector(x+1, y))
    }
    if (y != 0) {
      ret.push(new Vector(x, y-1))
    }
    if (y != this.m - 1) {
      ret.push(new Vector(x, y+1))
    }
    if (x % 2 == 0) {
      if (x != 0 && y != 0) {
        ret.push(new Vector(x-1, y-1))
      }
      if (x != this.n - 1 && y != 0) {
        ret.push(new Vector(x+1, y-1))
      }
    } else {
      if (x != 0 && y != this.m - 1) {
        ret.push(new Vector(x-1, y+1))
      }
      if (x != this.n - 1 && y != this.m - 1) {
        ret.push(new Vector(x+1, y+1))
      }
    }
    
    return ret
  }
}

export default Field