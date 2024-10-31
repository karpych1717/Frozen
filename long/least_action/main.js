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
  const candidates = new Array (population_size)

  for (let i = 0; i < population_size; i++) {
    candidates[i] = path.clone()
    candidates[i].mutate()
  }

  for (let i = 0; i < population_size; i++) {
    if (path.length() > candidates[i].length()) {
      path = candidates[i]
    }
  }

  ctx.clearRect(0, 0, 500, 500)
  path.drawIt()
}
