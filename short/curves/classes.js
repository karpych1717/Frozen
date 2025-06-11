import { cypher } from './functions.js'
import { decypher } from './functions.js'

class Vector {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
}

class Curve {
    constructor (n, w, h) {
        this.n = n
        this.w = w
        this.h = h
        this.arr = new Array(n)
        for (let i = 0; i < n; i++) {
            this.arr[i] = new Vector(cypher(i, n), 0)
        }
    }

    drawIt(context) {
        context.strokeStyle = "purple"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(
            decypher(this.arr[0].x, this.w),
            decypher(-this.arr[0].y, this.h)
        )
        
        for (let i = 1; i < this.n; i++) {
            context.lineTo(
                decypher(this.arr[i].x, this.w),
                decypher(-this.arr[i].y, this.h)
            )
        }
        context.stroke()
    }
}

export { Curve }