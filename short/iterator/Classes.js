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
    this.value = undefined
    this.done = false
  }

  next () {
    this.idx++
    if (this.idx >= this.array.length) {
      this.value = undefined
      this.done = true
      return [undefined, true]
    }
    this.value = this.array[this.idx]
    return [this.array[this.idx], false]
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