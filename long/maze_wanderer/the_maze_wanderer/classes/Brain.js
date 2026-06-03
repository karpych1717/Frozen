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

    context.lineWidth = 3
    for (let i = 0; i < this.lastInput.w; i++) {
      for (let j = 0; j < this.lastA.w; j++) {
        let val = this.inner.arr[i][j]
        context.beginPath()
        context.moveTo(x, y + 30*i)
        context.lineTo(x + 60, y + 30*j + 15)
        if (val >= 0) context.strokeStyle = `rgb(${0}, ${0}, ${val*255})`
        else context.strokeStyle = `rgb(${val*255}, ${0}, ${0})`
        context.stroke()
      }
    }
    for (let i = 0; i < this.lastA.w; i++) {
      for (let j = 0; j < this.lastB.w; j++) {
        let val = this.output.arr[i][j]
        context.beginPath()
        context.moveTo(x + 60, y + 30*i + 15)
        context.lineTo(x + 120, y + 30*j)
        if (val >= 0) context.strokeStyle = `rgb(${0}, ${0}, ${val*255})`
        else context.strokeStyle = `rgb(${val*255}, ${0}, ${0})`
        context.stroke()
      }
    }
    context.lineWidth = 0.25

    for (let i = 0; i < this.lastInput.w; i++) {
      let val = this.lastInput.arr[0][i]
      let c = new Circle(x, y + 30 * i, 7, `rgb(${0}, ${0}, ${0})`)
      if (val >= 0) c.c = `rgb(${0}, ${0}, ${val*255})`
      else c.c = `rgb(${val*255}, ${0}, ${0})`
      c.drawIt(context)
    }

    for (let i = 0; i < this.lastA.w; i++) {
      let val = this.lastA.arr[0][i] * 255
      let c = new Circle(x + 60, y + 30 * i + 15, 7, `rgb(${0}, ${0}, ${0})`)
      if (val >= 0) c.c = `rgb(${0}, ${0}, ${val*255})`
      else c.c = `rgb(${val*255}, ${0}, ${0})`
      c.drawIt(context)
    }
    for (let i = 0; i < this.lastB.w; i++) {
      let val = this.lastB.arr[0][i] * 255
      let c = new Circle(x + 120, y + 30 * i, 7, `rgb(${0}, ${0}, ${0})`)
      if (val >= 0) c.c = `rgb(${0}, ${0}, ${val*255})`
      else c.c = `rgb(${val*255}, ${0}, ${0})`
      c.drawIt(context)
    }
  }
}

export default Brain