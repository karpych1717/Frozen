import Matrix from './Matrix.js'
import Vector from './Vector.js'

class Brain {
  constructor (inner, output) {
    this.inner = inner
    this.output = output
  }

  sigmoid(x) {
    return 2 / (1 + Math.exp(-x))-1;
  }

  sigmoidMatrix(m) {
    for (let i = 0; i < m.h; i++) {
      for (let j = 0; j < m.w; j++) {
        m[i][j] = this.sigmoid(m[i][j])
      }
    }
    return m
  }

  calculate(input) {
    return this.sigmoidMatrix(this.sigmoidMatrix(this.sigmoidMatrix(
      input)
      .multiply(this.inner))
      .multiply(this.output)
    )
  }
}

export default Brain