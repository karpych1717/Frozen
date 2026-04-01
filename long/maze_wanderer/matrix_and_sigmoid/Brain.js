import Matrix from './Matrix.js'
import Vector from './Vector.js'

class Brain {
  constructor (inner, output) {
    this.inner = inner
    this.output = output
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  sigmoidVector(v) {
    return new Vector(
      Brain.sigmoid(v.x),
      Brain.sigmoid(v.y)
    )
  }

  calculate(input) {
    return input.multiply(this.inner).multiply(this.output)
  }
}

export { Matrix }