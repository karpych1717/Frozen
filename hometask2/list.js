class List {
  var = new Array(1)
  pos = 0
  out = 0
  len = 1
  push (num) {
    if (this.pos === this.len) {
      if (this.out !== 0) {
        for (let i=this.out; i<this.pos; i++) {
          this.var[i - this.out] = this.var[i]
          this.var[i] = 0
        }
        this.pos -= this.out
        this.out = 0
      } else {
        this.len += this.len
        let var2 = new Array(this.len)
        for (let i=0; i<this.pos; i++) {
          var2[i] = this.var[i]
        }
        this.var = var2
      }
    }
    this.var[this.pos] = num
    this.pos++
    log(this.var)
  }
  pop () {
    const ans = this.var[this.out]
    this.var[this.out] = undefined
    this.out++
    log(this.var)
    return ans
  }
}

test = new List()

test.push(1)
test.push(2)
log("got :", test.pop())
test.push(3)
test.push(4)
log("got :", test.pop())