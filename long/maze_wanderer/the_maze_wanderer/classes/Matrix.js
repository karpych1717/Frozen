class Matrix {
  constructor(w, h, array) {
    this.w = w
    this.h = h

    this.arr = new Array(h)
    for (let i = 0; i < h; i++) {
      this.arr[i] = new Array(w)
      for (let j = 0; j < w; j++) {
        this.arr[i][j] = array ? array[i][j] : 0
      }
    }
  }

  fill(x) {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        this.arr[i][j] = x
      }
    }
  }

  random() {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        this.arr[i][j] = Math.random() * 2 - 1
      }
    }
  }

  mutate(k, th) {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        if (Math.random() >= th) {
          this.arr[i][j] += (Math.random() * 2 - 1) * k
        }
      }
    }
  }

  multiply(m2) {
    if (this.w !== m2.h) {
      console.error("matrix multiplication dimensions error!")
      return new Matrix(1, 1, [[null]])
    }
    let m3Array = new Array(this.h)
    for (let i = 0; i < this.h; i++) {
      m3Array[i] = new Array(m2.w)
      for (let j = 0; j < m2.w; j++) {
        m3Array[i][j] = 0
        for (let k = 0; k < this.w; k++) {
          m3Array[i][j] += this.arr[i][k] * m2.arr[k][j]
        }
      }
    }
    return new Matrix(m2.w, this.h, m3Array)
  }

  addMatrix(m2) {
    if (this.w !== m2.w || this.h !== m2.h) {
      console.error("matrix addition dimensions error!")
      return new Matrix(1, 1, [[null]])
    }
    let m3Array = new Array(this.h)
    for (let i = 0; i < this.h; i++) {
      m3Array[i] = new Array(this.w)
      for (let j = 0; j < this.w; j++)
        m3Array[i][j] = this.arr[i][j] + m2.arr[i][j]
    }
    return new Matrix(this.w, this.h, m3Array)
  }

  addNumber(n) {
    let m3Array = new Array(this.h)
    for (let i = 0; i < this.h; i++) {
      m3Array[i] = new Array(this.w)
      for (let j = 0; j < this.w; j++)
        m3Array[i][j] = this.arr[i][j] + n
    }
    return new Matrix(this.w, this.h, m3Array)
  }

  multiplyNumber(n) {
    let m3Array = new Array(this.h)
    for (let i = 0; i < this.h; i++) {
      m3Array[i] = new Array(this.w)
      for (let j = 0; j < this.w; j++)
        m3Array[i][j] = this.arr[i][j] * n
    }
    return new Matrix(this.w, this.h, m3Array)
  }

  clone() {
    return new Matrix(this.w, this.h, this.arr)
  }
}

export default Matrix