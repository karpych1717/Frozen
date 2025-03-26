class Rectangle {
  constructor (x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  isOverIt (x, y) {
    if (this.x <= x && x <= this.x + this.w && this.y <= y && y <= this.y + this.h) {
      return true
    }
    return false
  }
}

export default Rectangle
