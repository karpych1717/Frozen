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
    this.idx = -1
  }

  next () {
    this.idx++
    if (this.idx >= this.array.length) {
      return {value: undefined, done: true}
    }
    return {value: this.array[this.idx], done: false}
  }
}

class Iterable {
  constructor (array) {
    this.array = array
  }

  getIterator () {
    return new Iterator(this.array)
  }
}

export default Iterable