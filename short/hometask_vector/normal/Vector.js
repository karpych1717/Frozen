class Vector {
    constructor(x, y, system = 'Cartesian') {
        if (system === 'Cartesian') {
            this.x = x
            this.y = y
        } else {
            this.x = x * Math.cos(y)
            this.y = x * Math.sin(y)
            this.x = Math.round(this.x * 100) / 100
            this.y = Math.round(this.y * 100) / 100
        }
    }

    get abs() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    get angle() {
        const angle = Math.atan(this.y / this.x)
        if (this.x >= 0 && this.y >= 0) return angle
        if (this.x >= 0 && this.y < 0) return angle
        if (this.x < 0 && this.y >= 0) return angle + Math.PI
        if (this.x < 0 && this.y < 0) return angle - Math.PI
    }

    add(...vectors) {
        let vect = new Vector(this.x, this.y)
        for (const vector of vectors) {
            if (vector instanceof Vector) {
                vect.x += vector.x
                vect.y += vector.y
            }
        }
        return vect
    }

    multyplyScalar(vector) {
        return this.x * vector.x + this.y * vector.y
    }

    multyplyNumber(num) {
        let vect = new Vector(this.x, this.y)
        vect.x = this.x * num
        vect.y = this.y * num
        return vect
    }

    multyplyVector(vector) {
        return this.abs * vector.abs * Math.sin(this.angle - vector.angle) // should be cos?
    }

    get string() {
        return `(${this.x}, ${this.y})`
    }
}