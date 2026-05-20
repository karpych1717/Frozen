import Square from "./Square.js"

class TreeNode {
  constructor (v, d, x, y, l, sqX, sqY, sqL) {
    this.v = v
    this.d = d
    this.x = x
    this.y = y
    this.l = l
    this.sqX = sqX
    this.sqY = sqY
    this.sqL = sqL

    this.sq = new Square(sqX, sqY, 0, sqL, "Red")
  }
}

export default TreeNode