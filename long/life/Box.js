import Rectangle from './Rectangle.js'

class Box extends Rectangle {
  constructor (x, y, w, h, state) {
    super(x, y, w, h)
    this.state = state
  }

  toggle () {
    this.state = !this.state
  }

  turnOn () {
    this.state = true
  }

  turnOff () {
    this.state = false
  }

  isAlive() {
    return this.state
  }

  drawIt (context) {
    if (this.state) context.fillStyle = "white"
    else context.fillStyle = "black"

    context.fillRect(this.x, this.y, this.w, this.h)
  }
}

export default Box
