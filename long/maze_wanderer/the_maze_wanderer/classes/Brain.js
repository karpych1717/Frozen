import Matrix from './Matrix.js'
import Vector from './Vector.js'

class Brain {
  constructor (inner, output, th) {
    this.inner = inner
    this.output = output
    this.th = th
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
    if (Math.random() >= this.th) {
      this.th += (Math.random() * 2 - 1) * k
    }
    this.th = Math.min(Math.max(this.th, 0), 1)
    this.inner.mutate(k, this.th)
    this.output.mutate(k, this.th)
  }

  clone() {
    return new Brain(this.inner.clone(), this.output.clone(), this.th)
  }
}

export default Brain