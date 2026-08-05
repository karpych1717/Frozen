class Plotter {
  constructor (_canvas) {
    this._canvas = _canvas
    this.context = _canvas.getContext('2d')

    this.x = _canvas.width
    this.y = _canvas.height
  }

  plot (x, y) {
    let len = x.length
    let minX = 1e9, maxX = -1e9
    let minY = 1e9, maxY = -1e9

    for (let i = 0; i < len; i++) {
      minX = Math.min(minX, x[i])
      maxX = Math.max(maxX, x[i])
      minY = Math.min(minY, y[i])
      maxY = Math.max(maxY, y[i])
    }

    const kx = this.x / (maxX - minX)
    const ky = this.y / (maxY - minY)

    this.context.beginPath()

    const x0 = (x[0] - minX) * kx
    const y0 = (y[0] - minY) * ky
    this.context.moveTo(x0, y0)
    for (let i = 1; i < len; i++) {
      let xi = (x[i] - minX) * kx
      let yi = (y[i] - minY) * ky
      this.context.lineTo(xi, yi)
      console.log(xi, yi)
    }

    this.context.strokeStyle = "black"
    this.context.stroke()
  }
}

export default Plotter