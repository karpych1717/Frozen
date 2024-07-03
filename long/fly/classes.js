class Rectangle {
  constructor (x, y, width, height, angle, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.angle = angle
    this.color = color
  }

  drawIt (ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "black";
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke();
    ctx.restore()
  }
}