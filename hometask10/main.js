/* global canvasSetUp, getPicture, toDeg, toRad */
const { cvs, ctx } = canvasSetUp()
const shipSprite = getPicture('black_box/ship.png')

class Long {
  constructor (number) {
    this.arr = new Array(2).fill(0)
    this.arr[0] = 0
    this.len = 1
    if (number[0] < 0) {
      this.arr[0] = 1
      number[0] *= -1
    }
    if (number[0] > 9) {
      while (number[0] > 0) {
        this.arr[this.len] = number[0] - Math.floor(number[0] / 10) * 10
        number[0] = Math.floor(number[0] / 10)
        this.len++
        if (this.len + 1 > this.arr.length && number[0] > 0) this.uppend()
      }
    } else {
      for (let i = 0; i < number.length; i++) {
        this.arr[this.len] = number[i]
        this.len++
        if (this.len + 1 > this.arr.length && i < number.length - 1) this.uppend()
      }
    }
  }



  add (num) {
    if (this.arr[0] === num.arr[0]) {
      if (num.len > this.len) {
        const num2 = num.arr
        num.arr = this.arr
        this.arr = num2

        this.len += num.len
        num.len = this.len - num.len
        this.len = this.len - num.len
      }
      if (this.len + 1 >= this.arr.length) this.uppend()
      for (let i = 1; i < this.len; i++) {
        if (num.len > i) this.arr[i] += num.arr[i]
        if (this.arr[i] > 9) {
          this.arr[i] -= 10
          this.arr[i + 1]++
          if (i + 1 == this.len) this.len++
        }
      }
      if (this.arr[this.len - 1] > 9) {
        this.arr[this.len - 1] -= 10
        this.arr[this.len]++
        this.len++
        if (this.len + 1 > this.arr.length && number[0] > 0) this.uppend()
      }
    } else {
      num.arr[0] = this.arr[0]
      this.subtract(num)
    }
  }

  subtract (num) {
    if (this.arr[0] === num.arr[0]) {
      if (this.compare(num) === 0) {
        const num2 = num.arr
        num.arr = this.arr
        this.arr = num2

        this.len += num.len
        num.len = this.len - num.len
        this.len = this.len - num.len

        this.arr[0] = 1 - this.arr[0]
      }
      for (let i = 1; i < Math.min(this.len, num.len); i++) {
        this.arr[i] -= num.arr[i]
        if (this.arr[i] < 0) {
          this.arr[i] += 10
          this.arr[i + 1]--
        }
      }
    } else {
      num.arr[0] = this.arr[0]
      this.add(num)
    }
  }

  multiply (num) {
    let answer = new Long([0])
    for (let i = this.len - 1; i > 0 ; i--) {
      for (let j = num.len - 1; j > 0 ; j--) {
        let iteration = new Array(i + j).fill(0)
        if (this.arr[i] * num.arr[j] < 10) {
          iteration[i + j - 2] = this.arr[i] * num.arr[j]
        } else {
          iteration[i + j - 1] = Math.floor((this.arr[i] * num.arr[j]) / 10)
          iteration[i + j - 2] = (this.arr[i] * num.arr[j]) % 10
        }
        let num2 = new Long(iteration)
        answer.add(num2)
      }
    }
    let n = (this.arr[0] + num.arr[0]) % 2
    this.arr = answer.arr
    this.len = answer.len
    this.arr[0] = n
  }
  
  divide (number) {
    let multiplier = 0
    let div = new Long([0])
    while (this.compare(div) === 1) {div.add(number); multiplier++;}
    if (this.compare(div) === 0) {div.subtract(number); multiplier--;}
    let answer = new Long([multiplier])
    this.arr = answer.arr
    this.len = answer.len
  }

  print () {
    console.log(this.arr)
  }

  compare (num) {
    if (num.len < this.len) return 1
    if (num.len > this.len) return 0
    for (let i = this.len - 1; i > 0; i--) {
      if (num.arr[i] < this.arr[i]) return 1
      if (num.arr[i] > this.arr[i]) return 0
    }
    return 2
  }

  uppend () {
    const arr2 = new Array(this.arr.length * 2).fill(0)
    for (let i = 0; i < this.len; i++) {
      arr2[i] = this.arr[i]
    }
    this.arr = arr2
  }
}

test = new Long([31])
test2 = new Long([5])

test.print()
test2.print()

test.divide(test2)
test.print()