class Vector {
  x
  y

  constructor (a, b, mode = 'Cartesian') {
    if (mode === 'Cartesian') {
      this.x = a
      this.y = b

      return
    }

    if (mode === 'Polar') {
      this.x = a * Math.cos(b)
      this.y = a * Math.sin(b)

      this.x = Math.round(this.x * 100) / 100
      this.y = Math.round(this.y * 100) / 100

      return
    }
    
    throw new Error('unknown coordinate system')
  }

  get abs () {
    return Math.sqrt(this.x**2 + this.y**2)
  }

  get angle () {
    const angle = Math.atan(this.y / this.x);
    
    if (this.x >= 0 && this.y >= 0) return angle
    if (this.x >= 0 && this.y < 0) return angle
    if (this.x < 0 && this.y >= 0) return angle + Math.PI
    if (this.x < 0 && this.y < 0) return angle - Math.PI
  }

  add (...terms) {
    for (const term of terms) {
      if (term instanceof Vector) {
        this.x += term.x
        this.y += term.y
        continue
      }
      
      throw new Error('term is not a Vector')
    }

    return this
  }

  multyplyNumber (multiplyer) {
    if (typeof multiplyer === 'number') {
      return new Vector(multiplyer * this.x, multiplyer * this.y)
    }
    
    throw new Error('multiplyer is not a number')
  }

  multyplyScalar (multiplyer) {
    if (multiplyer instanceof Vector) {
      return this.x * multiplyer.x + this.y * multiplyer.y
    }
    
    throw new Error('multiplyer is not a Vector')
  }

  multyplyVector (multiplyer) {
    if (multiplyer instanceof Vector) {
      return this.abs * multiplyer.abs * Math.sin(this.angle - multiplyer.angle)
    }
    
    throw new Error('multiplyer is not a Vector')
  }

  get string () {
    return `(${this.x}, ${this.y})`
  }
}
