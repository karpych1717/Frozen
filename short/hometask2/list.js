class List {
  constructor () {
    this.arr = new Array(1)
    this.input  = 0
    this.output = 0
    this.len = 1
  }
  unshift (num) {
    if (this.input === this.len) {
      if (this.output !== 0) {
        for (let i=this.output; i<this.input; i++) {
          this.arr[i - this.output] = this.arr[i]
        }
        this.input -= this.output
        this.output = 0
      } else {
        this.len += this.len
        let arr2 = new Array(this.len)
        for (let i=0; i<this.input; i++) {
          arr2[i] = this.arr[i]
        }
        this.arr = arr2
      }
    }
    this.arr[this.input] = num
    this.input++
    log(this.arr)
  }
  pop () {
    const ans = this.arr[this.output]
    this.output++
    log(this.arr)
    return ans
  }
}

test = new List()

test.unshift(1)
test.unshift(2)
log("got :", test.pop())
test.unshift(3)
test.unshift(4)
log("got :", test.pop())