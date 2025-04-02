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
}

export default Mouse
