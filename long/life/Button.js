import Rectangle from './Rectangle.js'

class Button extends Rectangle {
  constructor (x, y, w, h, callback) {
    super(x, y, w, h)

    this.onclick = callback
  }

  drawIt (context) {

  }
}

export default Button
