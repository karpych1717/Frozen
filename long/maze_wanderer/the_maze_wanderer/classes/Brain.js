import Matrix from './Matrix.js'
import Vector from './Vector.js'

class Brain {
  constructor (inner, output, innerChance, outputChance) {
    this.inner = inner
    this.output = output
    this.innerChance = innerChance
    this.outputChance = outputChance
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
    this.innerChance.mutate(k)
    this.inner.mutate2(k, this.innerChance)
    this.outputChance.mutate(k)
    this.output.mutate2(k, this.outputChance)
  }

  clone() {
    return new Brain(this.inner.clone(), this.output.clone(), this.innerChance.clone(), this.outputChance.clone())
  }
}

export default Brain