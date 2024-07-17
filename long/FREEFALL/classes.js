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
  
  isIn (rect) {
    const corner = 5
    if (this.x + this.width >= rect.x && rect.x + rect.width >= this.x) {
      if (this.y + this.height >= rect.y && rect.y + rect.height >= this.y) {
        const dx = (rect.x + rect.width / 2 - this.x - this.width / 2)
        const dy = (rect.y + rect.height / 2 - this.y - this.height / 2) * rect.width / rect.height
        if (Math.abs(Math.abs(dx) - Math.abs(dy)) < corner) {
          const dx1 = dx > 0
          const dy1 = dy > 0
          const dx2 = this.Vx > 0
          const dy2 = this.Vy > 0
          if (dx1 == dx2 && dy1 == dy2) return 5
        }
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) return 2
          return 4;
        }
        if (dy < 0) return 3
        return 1;
        //   1
        // 4   2
        //   3
      }
    }
    return 0;
  }
}

class Bullet extends Rectangle {
  x = 240
  y = 440
  width =  20
  height = 20
  color = "green"
  Vx = 0.25 * ((Math.random() > 0.5) * 2 - 1)
  Vy = -0.25
  constructor (x, y, Vx, Vy, size, color) {
    super(x, y, size, size, color)

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

class Palette extends Rectangle {
  x = 200
  y = 460
  width = 100
  height = 20
  color = "black"
  Vx = 0
  constructor (x, y, width, height, color) {
    super(x, y, width, height, color)

    this.Vx = 0
    this.V = 0.5
  }

  updateIt (dt) {
    this.x += this.Vx * dt
    this.x = Math.min(Math.max(this.x, 0), 400)
  }
}