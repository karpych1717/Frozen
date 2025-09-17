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
        this.a0 = 0
        this.a = new Array(this.n).fill(0)
        this.b = new Array(this.n).fill(0)
        this.h = 0.1   // parameter shift
        this.lr = 0.03 // learning rate
    }

    make_transform(x) {
        let ans = this.a0
        for (let i = 0; i < this.n; i += 1) {
            ans += this.a[i] * Math.cos(Math.PI * i * x) + this.b[i] * Math.sin(Math.PI * i * x)
        }
        return ans
    }

    evaluate_fitness(curve) {
        let ans = 0;
        let vi
        for (let i = 0; i < curve.n; i += 1) {
            vi = (this.make_transform(curve.arr[i].x) - curve.arr[i].y)
            ans += vi * vi
        }
        ans /= this.n
        return ans
    }

    iterate(curve) {
        let gradient = new Array(1 + this.n * 2).fill(0)

        let original_value, result_decreaced, result_increased


        original_value = this.a0

        this.a0 = original_value - this.h
        result_decreaced = this.evaluate_fitness(curve)

        this.a0 = original_value + this.h
        result_increased = this.evaluate_fitness(curve)

        this.a0 = original_value

        gradient[0] = (result_increased - result_decreaced) / (2 * this.h)

        for (let i = 0; i < this.n; i += 1) {
            original_value = this.a[i]

            this.a[i] = original_value - this.h
            result_decreaced = this.evaluate_fitness(curve)

            this.a[i] = original_value + this.h
            result_increased = this.evaluate_fitness(curve)

            this.a[i] = original_value

            gradient[i + 1] = (result_increased - result_decreaced) / (2 * this.h)
        }
        
        for (let i = 0; i < this.n; i += 1) {
            original_value = this.b[i]

            this.b[i] = original_value - this.h
            result_decreaced = this.evaluate_fitness(curve)

            this.b[i] = original_value + this.h
            result_increased = this.evaluate_fitness(curve)

            this.b[i] = original_value
            
            gradient[i + this.n + 1] = (result_increased - result_decreaced) / (2 * this.h)
        }

        this.a0 -= this.lr * gradient[0]
        for (let i = 0; i < this.n; i += 1) {
            this.a[i] -= this.lr * gradient[i + 1]
        }
        for (let i = 0; i < this.n; i += 1) {
            this.b[i] -= this.lr * gradient[i + this.n + 1]
        }
    }

    drawIt(curve, context) {
        context.strokeStyle = "blue"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(
            decypher(curve.arr[0].x, curve.w),
            decypher(-this.make_transform(curve.arr[0].x), curve.h)
        )
        
        for (let i = 1; i < curve.n; i++) {
            context.lineTo(
                decypher(curve.arr[i].x, curve.w),
                decypher(-this.make_transform(curve.arr[i].x), curve.h)
            )
        }
        context.stroke()
    }

}
export { Mouse }
export { Curve }
export { Transform }