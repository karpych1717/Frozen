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

class Rectangle {
  constructor (x, y, w, h, val, border_px = 0) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.val = val
    this.border_px = border_px
  }

  drawIt (context) {
    context.beginPath()
    context.fillStyle = `rgb(${0}, ${0}, ${0})`
    context.fillRect(this.x, this.y, this.x + this.w, this.y + this.h)
    context.fillStyle = `rgb(${this.val}, ${this.val}, ${this.val})`
    context.fillRect(
      this.x + this.border_px,
      this.y + this.border_px,
      this.x + this.w - this.border_px,
      this.y + this.h - this.border_px
    )
    context.fill()
    context.stroke()
  }
}


class Field {
  constructor (x, y, w, h, n, m) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.n = n
    this.m = m

    let w_ = this.w / this.n
    let h_ = this.h / this.m

    this.field = new Array(n)
    for (let i = 0; i < n; i += 1) {
      this.field[i] = new Array(m)
      for (let j = 0; j < m; j += 1) {
        this.field[i][j] = new Rectangle(this.x + w_ * i, this.y + h_ * j, w_, h_, 122, 1)
      }
    }
  }

  drawIt (context) {
    for (let i = 0; i < this.n; i += 1) {
      for (let j = 0; j < this.m; j += 1) {
        this.field[i][j].drawIt(context)
      }
    }
  }
}

export default Field