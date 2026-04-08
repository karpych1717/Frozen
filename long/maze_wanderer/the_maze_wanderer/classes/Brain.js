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
        m.arr[i][j] = this.sigmoid(m.arr[i][j])
      }
    }
    return m
  }

  calculate(input) {
    input = this.sigmoidMatrix(input)
    const a = this.sigmoidMatrix(input.multiply(this.inner))
    const b = this.sigmoidMatrix(a.multiply(this.output))
    return b
  }

  mutate(k) {
    this.inner.mutate(k)
    this.output.mutate(k)
  }
}

export default Brain