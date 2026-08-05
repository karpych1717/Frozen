import Matrix from './Matrix.js'
import Vector from './Vector.js'
import Circle from './Circle.js'

class Brain {
  constructor (inner1, inner2, output, th) {
    this.inner1 = inner1
    this.inner2 = inner2
    this.output = output
    this.th = th

    this.lastInput = null
    this.lastA1 = null
    this.lastA2 = null
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
    const a1 = this.sigmoidMatrix(input.multiply(this.inner1))
    this.lastA1 = a1
    const a2 = this.sigmoidMatrix(a1.multiply(this.inner2))
    this.lastA2 = a2
    const b = this.sigmoidMatrix(a2.multiply(this.output))
    this.lastB = b
    return b
  }

  mutate(k) {
    if (Math.random() >= this.th) {
      this.th += (Math.random() * 2 - 1) * k
    }
    this.th = Math.min(Math.max(this.th, 0), 1)
    this.inner1.mutate(k, this.th)
    this.inner2.mutate(k, this.th)
    this.output.mutate(k, this.th)
  }

  clone() {
    return new Brain(this.inner1.clone(), this.inner2.clone(), this.output.clone(), this.th)
  }

  drawIt(context, x, y, s) {
    if (this.lastInput == null) return

    context.lineWidth = 3
    for (let i = 0; i < this.lastInput.w; i++) {
      for (let j = 0; j < this.lastA1.w; j++) {
        let val = this.inner1.arr[i][j]
        context.beginPath()
        context.moveTo(x, y + 30*i)
        context.lineTo(x + 60, y + 30*j - 15)
        if (val >= 0) context.strokeStyle = `rgb(${0}, ${0}, ${val*255})`
        else context.strokeStyle = `rgb(${-val*255}, ${0}, ${0})`
        context.stroke()
      }
    }
    for (let i = 0; i < this.lastA1.w; i++) {
      for (let j = 0; j < this.lastA2.w; j++) {
        let val = this.output.arr[i][j]
        context.beginPath()
        context.moveTo(x + 60, y + 30*i - 15)
        context.lineTo(x + 120, y + 30*j - 15)
        if (val >= 0) context.strokeStyle = `rgb(${0}, ${0}, ${val*255})`
        else context.strokeStyle = `rgb(${-val*255}, ${0}, ${0})`
        context.stroke()
      }
    }
    for (let i = 0; i < this.lastA2.w; i++) {
      for (let j = 0; j < this.lastB.w; j++) {
        let val = this.output.arr[i][j]
        context.beginPath()
        context.moveTo(x + 120, y + 30*i - 15)
        context.lineTo(x + 180, y + 30*j)
        if (val >= 0) context.strokeStyle = `rgb(${0}, ${0}, ${val*255})`
        else context.strokeStyle = `rgb(${-val*255}, ${0}, ${0})`
        context.stroke()
      }
    }
    context.lineWidth = 0.25

    for (let i = 0; i < this.lastInput.w; i++) {
      let val = this.lastInput.arr[0][i]
      let c = new Circle(x, y + 30 * i, 7, `rgb(${0}, ${0}, ${0})`)
      if (val >= 0) c.c = `rgb(${0}, ${0}, ${val*255})`
      else c.c = `rgb(${-val*255}, ${0}, ${0})`
      c.drawIt(context)
    }

    for (let i = 0; i < this.lastA1.w; i++) {
      let val = this.lastA1.arr[0][i] * 255
      let c = new Circle(x + 60, y + 30 * i - 15, 7, `rgb(${0}, ${0}, ${0})`)
      if (val >= 0) c.c = `rgb(${0}, ${0}, ${val*255})`
      else c.c = `rgb(${-val*255}, ${0}, ${0})`
      c.drawIt(context)
    }

    for (let i = 0; i < this.lastA2.w; i++) {
      let val = this.lastA2.arr[0][i] * 255
      let c = new Circle(x + 120, y + 30 * i - 15, 7, `rgb(${0}, ${0}, ${0})`)
      if (val >= 0) c.c = `rgb(${0}, ${0}, ${val*255})`
      else c.c = `rgb(${-val*255}, ${0}, ${0})`
      c.drawIt(context)
    }

    for (let i = 0; i < this.lastB.w; i++) {
      let val = this.lastB.arr[0][i] * 255
      let c = new Circle(x + 180, y + 30 * i, 7, `rgb(${0}, ${0}, ${0})`)
      if (val >= 0) c.c = `rgb(${0}, ${0}, ${val*255})`
      else c.c = `rgb(${-val*255}, ${0}, ${0})`
      c.drawIt(context)
    }
  }
}

export default Brain