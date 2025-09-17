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

class Iterator {
  constructor (array) {
    this.array = array
    this.iterator = array[0]
    this.idx = 0
  }

  get () {
    return this.iterator
  }

  last () {
    if (this.idx >= this.array.length - 1) return true
    return false
  }

  next () {
    if (this.last()) return null
    this.idx++
    this.iterator = this.array[this.idx]
    return 0
  }
}

export default Iterator