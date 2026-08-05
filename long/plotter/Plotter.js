class Plotter {
  constructor (_canvas) {
    this._canvas = _canvas
    this.context = _canvas.getContext('2d')

    this.w = _canvas.width
    this.h = _canvas.height
    
    this.minX = 1e9
    this.maxX = -1e9
    this.minY = 1e9
    this.maxY = -1e9

    this.plots = new Array()
  }

  drawIt() {
    const kx = this.w / (this.maxX - this.minX)
    const ky = this.h / (this.maxY - this.minY)

    for (let j = 0; j < this.plots.length; j++) {
      this.context.beginPath()

      const x0 = (this.plots[j][0][0] - this.minX) * kx
      const y0 = (this.plots[j][1][0] - this.minY) * ky
      this.context.moveTo(x0, y0)
      for (let i = 1; i < this.plots[j][0].length; i++) {
        let xi = (this.plots[j][0][i] - this.minX) * kx
        let yi = (this.plots[j][1][i] - this.minY) * ky
        this.context.lineTo(xi, yi)
      }

      this.context.strokeStyle = this.plots[j][2]
      this.context.stroke()
    }
  }

  plot (x, y, color = "Black") {
    for (let i = 0; i < x.length; i++) {
      this.minX = Math.min(this.minX, x[i])
      this.maxX = Math.max(this.maxX, x[i])
      this.minY = Math.min(this.minY, y[i])
      this.maxY = Math.max(this.maxY, y[i])
    }

    this.plots.push([x, y, color])
    this.context.clearRect(0, 0, this.w, this.h)
    this.drawIt()
  }
}

export default Plotter