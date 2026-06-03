import Matrix from './Matrix.js'
import Vector from './Vector.js'
import Circle from './Circle.js'

class Brain {
  constructor (inner, output, th) {
    this.inner = inner
    this.output = output
    this.th = th

    this.lastInput = null
    this.lastA = null
    this.lastB = null
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
    this.lastInput = input
    const a = this.sigmoidMatrix(input.multiply(this.inner))
    this.lastA = a
    const b = this.sigmoidMatrix(a.multiply(this.output))
    this.lastB = b
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

  drawIt(context, x, y, s) {
    if (this.lastInput == null) return
    for (let i = 0; i < this.lastInput.w; i++) {
      let val = this.lastInput.arr[0][i] * 255
      let c = new Circle(x, y + 20 * i, 7, `rgb(${val}, ${val}, ${val})`)
      c.drawIt(context)
    }
    for (let i = 0; i < this.lastA.w; i++) {
      let val = this.lastA.arr[0][i] * 255
      let c = new Circle(x + 25, y + 20 * i + 10, 7, `rgb(${val}, ${val}, ${val})`)
      c.drawIt(context)
    }
    for (let i = 0; i < this.lastB.w; i++) {
      let val = this.lastB.arr[0][i] * 255
      let c = new Circle(x + 50, y + 20 * i, 7, `rgb(${val}, ${val}, ${val})`)
      c.drawIt(context)
    }
  }
}

export default Brain