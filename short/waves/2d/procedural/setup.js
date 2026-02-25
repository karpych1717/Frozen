const DT = 33
const WIDTH = 500
const HEIGHT = 500

const K = 0.1

document.body.style.margin = 0
document.body.style.textAlign = 'center'

_canvas.width = WIDTH
_canvas.height = HEIGHT
_canvas.style.background = 'black'

const context = _canvas.getContext('2d')

class Dot {
  constructor (value = 0, speed = 0, acceleration = 0, mass = 1) {
    this.value = value
    this.speed = speed
    this.acceleration = acceleration
    this.mass = mass
  }
}
