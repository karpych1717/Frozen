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
  for (let i = 0; i < 10; i++) {
    let candidate = path.clone()
    candidate.mutate()
    if (path.length() > candidate.length()) {
        path = candidate.clone()
    }
  }

  ctx.clearRect(0, 0, 500, 500)
  path.drawIt()
}
