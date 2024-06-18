class Rectangle {
  constructor (x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  drawIt (ctx) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke()
  }

  updateIt (dt) {
    // No speed to use! By function a SET will do.
  }

  setIt (new_x, new_y) {
    this.x = new_x
    this.y = new_y
  }
}

class Bullet extends Rectangle {
  constructor (x, y, Vx, Vy, size, color) {
    super(x, y, size, size, color)

    this.Vx = Vx
    this.Vy = Vy
  }

  updateIt (dt) {
    this.x += this.Vx * dt
    this.y += this.Vy * dt
  }
}

class Palette extends Rectangle {
  constructor (x, y, width, height, color) {
    super(x, y, width, height, color)

    this.Vx = 0
  }

  updateIt (dt) {
    this.x += this.Vx * dt
    this.x = Math.min(Math.max(this.x, 0), 400)
  }
}