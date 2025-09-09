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
        this.n = n // transform array length
        this.N = 2 * this.n + 1 // data length
        // data[0] = a_0, data[1, n] = A, data[n+1, 2*n] = B
        this.data = new Array(this.N).fill(0)
        this.h = 0.1   // parameter shift
        this.lr = 0.03 // learning rate
    }

    make_transform(x) {
        let ans = this.data[0]
        for (let i = 0; i < this.n; i += 1) {
            ans += this.data[i+1] * Math.cos(Math.PI * i * x) + this.data[i + this.n + 1] * Math.sin(Math.PI * i * x)
        }
        return ans
    }

    evaluate_fitness(curve) {
        let ans = 0;
        let vi
        for (let i = 0; i < curve.n; i += 1) {
            vi = (this.make_transform(curve.arr[i].x) + curve.arr[i].y)
            ans += vi * vi
        }
        ans /= this.n
        return ans
    }

    iterate(curve) {
        let gradient = new Array(this.N).fill(0)

        let original_value, decreaced_result, increased_result
        for (let i = 0; i < this.N; i += 1) {
            original_value = this.data[i]

            this.data[i] = original_value - this.h
            decreaced_result = this.evaluate_fitness(curve)

            this.data[i] = original_value + this.h
            increased_result = this.evaluate_fitness(curve)

            gradient[i] = (increased_result - decreaced_result) / (2 * this.h)
            
            this.data[i] = original_value
        }

        for (let i = 0; i < this.N; i += 1) {
            this.data[i] -= this.lr * gradient[i]
        }
    }

    drawIt(curve, context) {
        context.strokeStyle = "blue"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(
            decypher(curve.arr[0].x, curve.w),
            decypher(this.make_transform(curve.arr[0].x, this.data), curve.h)
        )
        
        for (let i = 1; i < curve.n; i++) {
            context.lineTo(
                decypher(curve.arr[i].x, curve.w),
                decypher(this.make_transform(curve.arr[i].x, this.data), curve.h)
            )
        }
        context.stroke()
    }

}
export { Mouse }
export { Curve }
export { Transform }