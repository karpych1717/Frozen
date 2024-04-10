/* global canvasSetUp, log, toDeg, toRad */

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
  }
  pop () {
    this.output++
    return this.arr[this.output-1]
  }
}

const { cvs, ctx } = canvasSetUp()

cvs.addEventListener('pointerdown', handleClick)

angles = new List()
const m = 10, g = 9.8, h = 500, w = 750, v = 270
let t = 500, length = 0, o = 0, x, target = w/2
draw(target, h, 25)

function handleClick (event) {
  length++
  angles.unshift(Math.atan((h - event.offsetY) / event.offsetX))
}
requestAnimationFrame(render)

function draw (x, y, r) {
  ctx.lineWidth = 1
  ctx.strokeStyle = 'white'
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.stroke()
}

function render () {
  if (h - v * Math.sin(o) * t + g * m * t * t / 2 < 490) {
    x = v * Math.cos(o) * t
    ctx.clearRect(0, 0, w, h);
    draw(x, h - v * Math.sin(o) * t + g * m * t * t / 2, 10)
    draw(target, h, 25)
  } else if (Math.abs(target - x) <= 40) {
    ctx.clearRect(0, 0, w, h);
    target = Math.floor(Math.random() * (w - 100) + 100)
    draw(target, h, 25)
  } else if (length > 0 && x != -1) {
    x = -1
    ctx.arc(100, h, 25, 0, 2*Math.PI)
    t = 0
    o = angles.pop()
    length--
  }
  t += 0.02
  requestAnimationFrame(render)
}