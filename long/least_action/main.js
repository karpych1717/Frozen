'use strict'

let path = new Path(0, 0, 500, 500)
path.fillRandom()
path.drawIt()

_resetButton.onclick = () => {
    ctx.clearRect(0, 0, 500, 500)
    path.fillRandom()
    path.drawIt()
}

_iterateButton.onclick = () => {
  
}
