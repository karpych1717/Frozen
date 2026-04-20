class Eye {
  constructor (x, y, R, r) {
    this.X = x
    this.Y = y
    this.x = x
    this.y = y
    this.R = R
    this.r = r
    
    this.dR = R - r * 0.75 // cosmetic coefficient
    this.dR2 = this.dR**2
  }

  drawIt (context) {
    context.beginPath()
    context.arc(this.X, this.Y, this.R, 0, 2 * Math.PI)
    context.fillStyle = "White";
    context.fill()
    context.stroke()
    context.beginPath()
    context.arc(2*this.X - this.x, 2*this.Y - this.y, this.r, 0, 2 * Math.PI)
    context.fillStyle = "Black";
    context.fill()
    context.stroke()
  }

  updateIt (x, y) {
    this.X = x
    this.Y = y
    let dx = this.x - this.X
    let dy = this.y - this.Y
    let l2 = dx**2 + dy**2
    if (l2 > this.dR2) {
      this.x = x + dx / l2 * this.dR2
      this.y = y + dy / l2 * this.dR2
    }
  }
}

export default Eye