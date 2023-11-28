class Stack {
  var = new Array(1)
  pos = 0
  len = 1
  push (num) {
    if (this.pos === this.len) {
      this.len += this.len
      let var2 = new Array(this.len)
      for (let i=0; i<this.pos; i++) {
        var2[i] = this.var[i]
      }
      this.var = var2
    }
    this.var[this.pos] = num
    this.pos++
    log(this.var)
  }
  pop () {
    this.pos--
    const ans = this.var[this.pos]
    this.var[this.pos] = undefined
    log(this.var)
    return ans
  }
}

let test = new Stack

test.push(1)
test.push(2)
d = test.pop()
log("got :", d)
test.push(3)
test.push(4)
d = test.pop()
log("got :", d)