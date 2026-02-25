class Mouse {
  constructor (state = "up") {
    this.state = state
  }

  setUp () {
    this.state = "up"
  }

  setDown () {
    this.state = "down"
  }

  isDown () {
    if (this.state == "down") return true
    return false
  }
}

export default Mouse
