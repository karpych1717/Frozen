class Rectangle {
  constructor (x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  drawIt (ctx) {
    // 
  }

  updateIt (dt) {

  }
}

class Bullet extends Rectangle {
  constructor (x, y, Vx, Vy, size, color) {
    super(x, y, size, size, color)

    this.Vx = Vx
    this.Vy = Vy
  }

  updateIt (dt) {
    //
  }
}

class Palette extends Rectangle {
  constructor (x, y, width, height, color) {
    super(x, y, width, height, color)

    this.Vx = 0
  }

  updateIt (dt) {
    //
  }
}