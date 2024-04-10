class Stack {
  constructor () {
    this.arr = new Array(1)
    this.position  = 0
    this.len = 1
  }
  unshift (num) {
    if (this.position === this.len) {
      this.len += this.len
      let arr2 = new Array(this.len)
      for (let i=0; i<this.position; i++) {
        arr2[i] = this.arr[i]
      }
      this.arr = arr2
    }
    this.arr[this.position] = num
    this.position++
    log(this.arr)
  }
  pop () {
    this.position--
    const ans = this.arr[this.position]
    log(this.arr)
    return ans
  }
}

let test = new Stack

test.unshift(1)
test.unshift(2)
log("got :", test.pop())
test.unshift(3)
test.unshift(4)
log("got :", test.pop())