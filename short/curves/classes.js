import { cypher } from './functions.js'
import { decypher } from './functions.js'

class Vector {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
}

class Mouse {
    constructor (w, h, up = true, x, y) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.up = up
    }

    update(x, y) {
        this.x = cypher(x, this.w)
        this.y = cypher(this.h - y, this.h)
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

    update(x, y) {
        this.arr[Math.floor(decypher(x, this.n))].y = y
    }
}

export { Mouse }
export { Curve }