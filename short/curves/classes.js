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
            this.arr[i] = new Vector(w / (n - 1) * i, 0)
        }
    }

    drawIt(context) {
        context.beginPath()
        context.moveTo(this.arr[0].x, this.arr[0].y)
        
        for (let i = 1; i < this.n; i++) {
            context.lineTo(this.arr[i].x, this.arr[i].y)
        }
        context.stroke()
    }
}

export { Curve }