import SquarePhysics from './SquarePhysics.js'
import Matrix from './Matrix.js'
import Brain from './Brain.js'

class Wanderer {
  constructor (x, y, a) {
    this.square = new SquarePhysics(x, y, a, 25, "blue", 9.8, 0.001, 5, 3)
    this.brain = new Brain(new Matrix(3, 4), new Matrix(4, 3), 0.5)
    this.brain.inner.random()
    this.brain.output.random()

    this.score = 0
  }

  updateDecicion() {
    const input = [[
        this.square.rays[0].length(),
        this.square.rays[1].length(),
        this.square.rays[2].length(),
        this.square.speed()
    ]]

    const decision = this.brain.calculate(new Matrix(4, 1, input))

    this.square.fxR = (decision.arr[0][0] - decision.arr[0][1]) * 0.001
    this.square.va = (decision.arr[0][2] - decision.arr[0][3]) * 0.005
  }

  updateIt(dt, map) {
    this.updateDecicion()

    const nextAx = this.square.copy()
    nextAx.updateItX(dt)
    const nextAy = this.square.copy()
    nextAy.updateItY(dt)

    if (map.checkSquare(nextAx)) {
      this.square.vx = -0.1 * this.square.vx
    }
    if (map.checkSquare(nextAy)) {
      this.square.vy = -0.1 * this.square.vy
    }
    if (map.checkSquare(nextAx) || map.checkSquare(nextAy)) {
      this.square.fxR = -0.1 * this.square.fxR
    }

    const nextA = this.square.copy()
    nextA.updateIt(dt)
    if (map.checkSquare(nextA)) {
      this.square.va = 0
    }

    this.square.updateIt(dt)
    this.square.resetLine()

    this.square.boundToBox(0, 0, 500, 500)
  }

  drawIt(context, drawLines = false) {
    this.square.drawIt(context, drawLines)
  }

  mutate(k) {
    this.brain.mutate(k)
  }
}
export default Wanderer