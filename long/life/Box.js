import Rectangle from './Rectangle.js'

class Box extends Rectangle {
  constructor (x, y, w, h, state) {
    super(x, y, w, h)
    this.state = state
  }

  toggle () {
    if (this.state == "on") this.state = "off"
    else this.state = "on"
  }

  turnOn () {
    this.state = "on"
  }

  turnOff () {
    this.state = "off"
  }

  isAlive() {
    if (this.state == "on") return true
    return false
  }

  drawIt (context) {
    if (this.state == "on") context.fillStyle = "white"
    else context.fillStyle = "black"

    context.fillRect(this.x, this.y, this.w, this.h)
  }
}

export default Box
