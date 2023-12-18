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


const magazine = new List()
const MASS = 10, G = 9.8, HEIGHT = 500, WIDTH = 750, VELOSITY = 270
let target = WIDTH/2
let angle = new Array(100)
let timer = new Array(100)
let length = 0
let waiting = 0
let flying = 0
let lasttime = -1
let reloadtime = 300

const { cvs, ctx } = canvasSetUp()
cvs.addEventListener('pointerdown', handleClick)

function handleClick (event) {
  waiting++
  magazine.unshift(Math.atan((HEIGHT - event.offsetY) / event.offsetX))
}
requestAnimationFrame(render)

function draw (x, y, r) {
  ctx.lineWidth = 1
  ctx.strokeStyle = 'white'
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.stroke()
}

function render (time) {
  if (flying !== 0) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
  }
  draw(target, HEIGHT, 25)
  
  if (Math.floor(time/reloadtime) !== lasttime && waiting !== 0) {
    angle[length] = magazine.pop()
    timer[length] = time
    length++
    flying++
    waiting--
    lasttime = Math.floor(time/reloadtime)
  }

  if (length > 30) {
    angle2 = new Array(100)
    timer2 = new Array(100)
    let length2 = 0
    for (let i=0; i<length; i++) {
      if (timer[i] !== -1) {
        angle2[length2] = angle[i]
        timer2[length2] = timer[i]
        length2++
      }
    }
    angle = angle2
    timer = timer2
    length = length2
  }

  for (let i=0; i<length; i++) {
    if (timer[i] !== -1) {
      let xpos = VELOSITY * Math.cos(angle[i]) * (time - timer[i]) / 1000
      let ypos = -10 + HEIGHT - VELOSITY * Math.sin(angle[i]) * (time - timer[i]) / 1000 + G * MASS * (time - timer[i]) ** 2 / 2000000
      draw(xpos, ypos, 10)

      if (HEIGHT - ypos <= 35 && Math.abs(target - xpos) <= 35) {
        console.log("reposition proposal")
        if (1225 <= (HEIGHT - ypos) ** 2 + (target - xpos) ** 2) {
          console.log("reposition")
          target = Math.floor(Math.random() * (WIDTH - 100) + 100)
        }
      }

      if (ypos > 490) {timer[i] = -1; flying--;}
    }
  }
  requestAnimationFrame(render)
}

function solve() {
  for (let i=0; i<Math.PI; i+=0.0001) {
    let t = target/VELOSITY/Math.cos(i)
    if (Math.abs(VELOSITY*Math.sin(i)*t - G * MASS * (t ** 2) / 2) < 1) {
      for (let j=0; j<20; j+=0.01) {
        let xpos = VELOSITY * Math.cos(i) * j
        let ypos = -10 + HEIGHT - VELOSITY * Math.sin(i) * j + G * MASS * j ** 2 / 2
        draw(xpos, ypos, 1)
      }
      draw(target / 4, HEIGHT - Math.tan(i) * target / 4, 5)
    }
  }
}