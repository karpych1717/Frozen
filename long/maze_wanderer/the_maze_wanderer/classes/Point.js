class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }

    rotate(x, y, a) {
        let dx = this.x - x
        let dy = this.y - y
        return new Point(
            x + dx * Math.cos(a) + dy * Math.sin(a),
            y - dx * Math.sin(a) + dy * Math.cos(a)
        )
    }

    addPoint(p) {
        return new Point(this.x + p.x, this.y + p.y)
    }

    isInBox(x1, y1, x2, y2) {
        return x1 <= this.x && this.x <= x2 && y1 <= this.y && this.y <= y2
    }
}

export default Point