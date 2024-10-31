'use strict'

class Point {
  x
  y
  constructor (x, y) {
    if (x === undefined && y === undefined) {
      this.x = 1 + Math.round(498 * Math.random())
      this.y = 1 + Math.round(498 * Math.random())
    } else {
      this.x = x
      this.y = y
    }
  }

  mutate () {
    if (Math.random() < 0.5) {
      this.x += Math.round(mutation_rate * Math.random())
    } else {
      this.x -= Math.round(mutation_rate * Math.random())
    }

    if (Math.random() < 0.5) {
      this.y += Math.round(mutation_rate * Math.random())
    } else {
      this.y -= Math.round(mutation_rate * Math.random())
    }
  }
}

class Path {
  color
  points
  first
  last

  constructor (x1, y1, x2, y2, color = 'white', amount = 100) {
    if (amount < 3) throw new Error('O_o')

    this.color = color

    this.first = new Point(x1, y1)
    this.last = new Point(x2, y2)

    this.points = new Array(amount)
    this.points[0] = this.first
    this.points[this.amount - 1] = this.last
  }

  fillRandom () {
    for (let i = 1; i < this.amount - 1; i++) {
      this.points[i] = new Point()
    }
  }

  get amount () {
    return this.points.length
  }

  clone () {
    let clone = new Path(this.first.x, this.first.y, this.last.x, this.last.y, this.color, this.amount)

    for (let i = 1; i < this.amount - 1; i++) {
      clone.points[i] = new Point(this.points[i].x, this.points[i].y)
    }

    return clone
  }

  mutate () {
    for (let i = 1; i < this.amount - 1; i++) {
      this.points[i].mutate()
    }
  }

  drawIt () {
    ctx.save()

    ctx.strokeStyle = this.color
    ctx.fillStyle = this.color

    ctx.beginPath()
    ctx.moveTo(this.first.x, this.first.y)

    for (let i = 1; i < this.amount; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.first.x, this.first.y, 10, 0, 2 * Math.PI)
    ctx.fill()

    for (let i = 1; i < this.amount - 1; i++) {
      ctx.beginPath()
      ctx.arc(this.points[i].x, this.points[i].y, 3, 0, 2 * Math.PI)
      ctx.fill()
    }

    ctx.beginPath()
    ctx.arc(this.last.x, this.last.y, 10, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore()
  }

  length () {
    let answer = 0
    for (let i = 0; i < this.amount - 1; i++) {
      answer += Math.sqrt((this.points[i].x - this.points[i + 1].x) ** 2 + (this.points[i].y - this.points[i + 1].y) ** 2)
    }
    return answer
  }
}