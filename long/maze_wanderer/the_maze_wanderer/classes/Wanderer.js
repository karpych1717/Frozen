import SquarePhysics from './SquarePhysics.js'
import Matrix from './Matrix.js'
import Brain from './Brain.js'

class Wanderer {
  constructor (x, y, a) {
    this.square = new SquarePhysics(x, y, a, 12, "blue", 9.8, 0.001, 2, 1.25)
    this.brain = new Brain(new Matrix(3, 4), new Matrix(4, 3), 0.5)
    this.brain.inner.random()
    this.brain.output.random()

    this.score = 0
  }

  updateDecicion() {
    const input = [[
        this.square.rays[0].length() / 100,
        this.square.rays[1].length() / 100,
        this.square.rays[2].length() / 100,
        this.square.speed() * 50
    ]]
    
    const decision = this.brain.calculate(new Matrix(4, 1, input))

    this.square.fxR = (decision.arr[0][0] - decision.arr[0][1]) * 0.001
    this.square.va = (decision.arr[0][2] - decision.arr[0][3]) * 0.005
  }

  updateIt(dt, map, tree) {
    this.square.updateLine(tree, map.map)

    this.updateDecicion()

    const nextAx = this.square.copy()
    nextAx.updateItX(dt)
    const nextAy = this.square.copy()
    nextAy.updateItY(dt)

    const AxCollision = map.checkSquare(nextAx, tree, 1)
    const AyCollision = map.checkSquare(nextAy, tree, 1)

    if (AxCollision) {
      this.square.vx = -0.1 * this.square.vx
    }
    if (AyCollision) {
      this.square.vy = -0.1 * this.square.vy
    }
    if (AxCollision || AyCollision) {
      this.square.fxR = -0.1 * this.square.fxR
    }

    const nextA = this.square.copy()
    nextA.updateIt(dt)
    if (map.checkSquare(nextA, tree, 1)) {
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