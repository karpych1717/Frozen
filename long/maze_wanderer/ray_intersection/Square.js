
import Vector from './Vector.js'
import Line from './Line.js'

class Square {
  constructor (x, y, l, c) {
    this.x = x
    this.y = y
    this.l = l
    this.c = c
  }

  drawIt (context) {
    context.beginPath()
    context.rect(this.x, this.y, this.l, this.l)
    context.fillStyle = this.c;
    //context.fill()
    context.stroke()
  }

  pointInArray(array, point) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].x == point.x && array[i].y == point.y) {
        return true
      }
    }
    return false
  }

  getIntersectByLine(line) {
    let intersects = new Array()
    let point = line.intersectX(this.x)
    if (this.y <= point.y && point.y <= this.y + this.l) {
      if (!this.pointInArray(intersects, point)) {
        intersects.push(point)
      }
    }
    point = line.intersectX(this.x + this.l)
    if (this.y <= point.y && point.y <= this.y + this.l) {
      if (!this.pointInArray(intersects, point)) {
        intersects.push(point)
      }
    }
    point = line.intersectY(this.y)
    if (this.x <= point.x && point.x <= this.x + this.l) {
      if (!this.pointInArray(intersects, point)) {
        intersects.push(point)
      }
    }
    point = line.intersectY(this.y + this.l)
    if (this.x <= point.x && point.x <= this.x + this.l) {
      if (!this.pointInArray(intersects, point)) {
        intersects.push(point)
      }
    }
    return intersects
  }
}

export default Square