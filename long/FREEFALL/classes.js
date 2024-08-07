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
    ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke()
  }

  updateIt (dt) {
    // No speed to use!
  }

  setIt (new_x, new_y) {
    this.x = new_x
    this.y = new_y
  }
  
}

class Target extends Rectangle {
  constructor (x, y, width,  height, color, last_collision) {
    super(x, y, width, height, color)
    this.last_collision = 'none'
  }
}

class Bullet extends Target {
  constructor (x, y, Vx, Vy, width,  height, color, last_collision) {
    super(x, y, width, height, color, last_collision)

    this.Vx = Vx
    this.Vy = Vy
  }

  updateIt (dt) {
    this.x += this.Vx * dt
    this.y += this.Vy * dt
    this.Vy += G * dt
    if (this.Vy > 0) this.Vy += A * dt
    if (this.Vy < 0) this.Vy -= A * dt
  }
}

class Palette extends Target {
  constructor (x, y, width, height, color, last_collision) {
    super(x, y, width, height, color, last_collision)

    this.Vx = 0
    this.V = 0.5
  }

  updateIt (dt) {
    this.x += this.Vx * dt
    this.x = Math.min(Math.max(this.x, this.width / 2), WIDTH - this.width / 2)
  }
}