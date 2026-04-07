import SquarePhysics from './SquarePhysics.js'
import Matrix from './Matrix.js'
import Brain from './Brain.js'

class Wanderer {
  constructor (square) {
    this.square = square
    this.brain = new Brain(new Matrix(3, 4), new Matrix(4, 3))
    this.brain.inner.random()
    this.brain.output.random()

    this.decisionThreshould = 0.25
  }

  updateIt(dt) {
    const input = new Array(4)
    for (let i = 0; i < 4; i++) input[i] = new Array(1)
    for (let i = 0; i < 3; i++) input[0][i] = this.square.rays[i].length()
    input[0][3] = this.square.speed()

    const decision = this.brain.calculate(new Matrix(4, 1, input))
    const forward = decision.arr[0][0] > this.decisionThreshould
    const backward = decision.arr[0][1] > this.decisionThreshould
    const left = decision.arr[0][2] > this.decisionThreshould
    const right = decision.arr[0][3] > this.decisionThreshould

    if (forward ^ backward) {
        this.square.fxR = 0
    } else if (forward) {
        this.square.fxR = 0.001
    } else if (backward){
        this.square.fxR = -0.001
    }
    if (right ^ screenLeft) {
        this.square.va = 0
    } else if (right) {
        this.square.va = 0.005
    } else if (left) {
        this.square.va = -0.005
    }

    //this.square.va = (decision.arr[0][2] - decision.arr[0][3]) * 0.005
  }

  drawIt(context) {
    this.square.drawIt(context)
  }
}
export default Wanderer