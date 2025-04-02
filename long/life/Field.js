import Box from './box.js' // doesn't accept Box

class field {
  constructor (rows, cols, x, y, w, h, pause = false) {
    this.rows = rows
    this.cols = cols

    this.pause = pause

    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.boxWidth = this.w / this.cols
    this.boxHeight = this.h / this.rows

    this.field = new Array(this.rows)
    for (let i = 0; i < this.rows; i++) {
      this.field[i] = new Array(this.cols)

      for (let j = 0; j < this.cols; j++) {
        this.field[i][j] = new Box(
          this.x + i * this.boxWidth,
          this.y + j * this.boxHeight,
          this.boxWidth,
          this.boxHeight,
          "off"
        )
      }
    }

    this.toggleQueue = new Array(this.rows)
    for (let i = 0; i < this.rows; i++) {
      this.toggleQueue[i] = new Array(this.cols).fill(false)
    }
  }

  drawIt (context) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.field[i][j].drawIt(context)
      }
    }
  }

  processClick(x, y) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.field[i][j].isOverIt(x, y)) {
          this.field[i][j].toggle()
        }
      }
    }
  }

  countNeighbours (x, y) {
    let amount = 0

    if (x > 0) {
      if (this.field[x-1][y].isAlive()) amount += 1
      if (y > 0) if (this.field[x-1][y-1].isAlive()) amount += 1
      if (y < this.rows - 1) if (this.field[x-1][y+1].isAlive()) amount += 1
    }

    if (x < this.cols - 1) {
      if (this.field[x+1][y].isAlive()) amount += 1
      if (y > 0) if (this.field[x+1][y-1].isAlive()) amount += 1
      if (y < this.rows - 1) if (this.field[x+1][y+1].isAlive()) amount += 1
    }

    if (y > 0) if (this.field[x][y-1].isAlive()) amount += 1
    if (y < this.rows - 1) if (this.field[x][y+1].isAlive()) amount += 1

    return amount
  }

  update () {
    let neighbours
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.toggleQueue[i][j] = false
        neighbours = this.countNeighbours(i, j)

        if (this.field[i][j].isAlive()) {
          if (neighbours < 2 || neighbours > 3) {
            this.toggleQueue[i][j] = true
          }
        } else {
          if (neighbours == 3) {
            this.toggleQueue[i][j] = true
          }
        }
      }
    }
    
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.toggleQueue[i][j]) {
          this.field[i][j].toggle()
        }
      }
    }
  }

  fillRandom () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.toggleQueue[i][j] = false
        
        if (Math.random() < 0.5) {
          this.field[i][j].turnOff()
        } else {
          this.field[i][j].turnOn()
        }
      }
    }
  }

  clear () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.toggleQueue[i][j] = false
        this.field[i][j].turnOff()
      }
    }
  }

  togglePause () {
    this.pause = !this.pause
  }

  cycle (context) {
    this.drawIt(context)
    if (!this.pause) this.update()
  }
}

export default field
