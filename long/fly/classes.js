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
    this.Vx = 0
    this.Vy = 3
  }
}

class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  static getAngle (x, y) {
    const angle = Math.atan(y / x)
    if (x >= 0 && y >= 0) return angle
    if (x >= 0 && y < 0) return angle
    if (x < 0 && y >= 0) return angle + Math.PI
    if (x < 0 && y < 0) return angle - Math.PI
  }

  get angle () {
    return Vector.getAngle(this.x, this.y)
  }

  get module () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  clear () {
    this.x = 0
    this.y = 0
  }

  static multiply (n, vect) {
    vect.x *= n
    vect.y *= n
    return vect
  }

  static add (...vect) {
    const vect3 = new Vector (0, 0)
    for (const vector of vect) {
      vect3.x += vector.x
      vect3.y += vector.y
    }
    return vect3
  }
  
  static angle (vect1, vect2) {
    return Math.abs(vect1.angle - vect2.angle)
  }

  static scalar_multiplication (vect1, vect2) {
    return vect1.module * vect2.module * Math.cos(Vector.angle(vect1, vect2))
  }
  
  static vector_multiplication (vect1, vect2) {
    return vect1.module * vect2.module * Math.sin(Vector.angle(vect1, vect2))
  }
  
  convert () {
    const angle = Vector.getAngle(this.x, this.y)
    const module = Math.sqrt(this.x ** 2 + this.y ** 2)
    return [angle, module]
  }

  setup_converted (angle, module) {
    this.x = module * Math.cos(angle)
    this.y = module * Math.sin(angle)
  }
}