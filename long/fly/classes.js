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

class Brick extends Rectangle {
  constructor (x, y, z, width, height, angle, color, mass) {
    super(x, y, width, height, angle, color)
    this.z = z
    this.mass = mass
  }

}

class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  get angle () {
    return getAngle(this.x, this.y)
  }

  get module () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  clear () {
    this.x = 0
    this.y = 0
  }

  static add (vect1, vect2) {
    const vect3 = new Vector (vect1.x + vect2.x, vect1.y + vect2.y)
    return vect3
  }
  
  static angle (vect1, vect2) {
    return Math.abs(vect1.angle - vect2.angle)
  }

  static scalar (vect1, vect2) {
    return vect1.module * vect2.module * Math.cos(Vector.angle(vect1, vect2))
  }
  
  convert () {
    const angle = getAngle(this.x, this.y)
    const module = Math.sqrt(this.x ** 2 + this.y ** 2)
    return [angle, module]
  }
}