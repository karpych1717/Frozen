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

    reset() {
        for (let i = 0; i < this.n; i++) {
            this.arr[i].y = 0
        }
    }
}

class Transform {
    constructor (n) {
        this.n = n
        this.N = 2 * this.n + 1
        this.arr = new Array(this.N).fill(0)
        this.h = 0.1
        this.lr = 0.03
    }

    f(x, array) {
        let ans = array[0]
        for (let i = 0; i < this.n; i += 1) {
            ans += array[i+1] * Math.cos(Math.PI * i * x) + array[i + this.n + 1] * Math.sin(Math.PI * i * x)
        }
        return ans
    }

    evaluate(curve, array) {
        let ans = 0;
        let vi
        for (let i = 0; i < curve.n; i += 1) {
            vi = (this.f(curve.arr[i].x, array) + curve.arr[i].y)
            ans += vi * vi
        }
        ans /= this.n
        return ans
    }

    iterate(curve) {
        let g = new Array(this.N).fill(0)
        let plus = new Array(this.N).fill(0)
        let minus = new Array(this.N).fill(0)
        for (let i = 0; i < this.N; i += 1) {
            plus[i] = this.arr[i]
            minus[i] = this.arr[i]
        }

        for (let i = 0; i < this.N; i += 1) {
            plus[i] = this.arr[i] + this.h
            minus[i] = this.arr[i] - this.h
            g[i] = (this.evaluate(curve, plus) - this.evaluate(curve, minus)) / (2 * this.h)
            plus[i] = this.arr[i]
            minus[i] = this.arr[i]
        }

        for (let i = 0; i < this.N; i += 1) {
            this.arr[i] -= this.lr * g[i]
        }
    }

    drawIt(curve, context) {
        context.strokeStyle = "blue"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(
            decypher(curve.arr[0].x, curve.w),
            decypher(this.f(curve.arr[0].x, this.arr), curve.h)
        )
        
        for (let i = 1; i < curve.n; i++) {
            context.lineTo(
                decypher(curve.arr[i].x, curve.w),
                decypher(this.f(curve.arr[i].x, this.arr), curve.h)
            )
        }
        context.stroke()
    }

}
export { Mouse }
export { Curve }
export { Transform }