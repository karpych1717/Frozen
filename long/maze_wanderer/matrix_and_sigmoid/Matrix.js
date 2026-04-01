class Matrix {
  constructor (h, w, array) {
    this.h = h
    this.w = w
    this.arr = array
  }

  multiply (m2) {
    if (this.w != m2.h) {
      console.error("matrix multiplication dimensions error!")
      return new Matrix (1, 1, [[null]])
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
  
  addMatrix (m2) {
    if (this.w != m2.w || this.h != m2.h) {
      console.error("matrix addition dimensions error!")
      return new Matrix (1, 1, [[null]])
    }
    let m3Array = new Array(this.h)
    for (let i = 0; i < this.h; i++) {
      m3Array[i] = new Array(this.w)
      for (let j = 0; j < this.w; j++) {
        m3Array[i][j] = this.arr[i][j] + m2.arr[i][j]
      }
    }
    return new Matrix(this.h, this.w, m3Array)
  }

  addNumber (n) {
    let m3Array = new Array(this.h)
    for (let i = 0; i < this.h; i++) {
      m3Array[i] = new Array(this.w)
      for (let j = 0; j < this.w; j++) {
        m3Array[i][j] = this.arr[i][j] + n
      }
    }
    return new Matrix(this.h, this.w, m3Array)
  }
}

export default Matrix