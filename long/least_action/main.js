'use strict'

let path = new Path(0, 0, 500, 500)
path.fillRandom()
path.drawIt()

const candidates = new Array (population_size)

_resetButton.onclick = () => {
    ctx.clearRect(0, 0, 500, 500)
    path.fillRandom()
    path.drawIt()
}

_iterateButton.onclick = () => {
  optimiseStep()

  path.color = 'white'
  path.drawIt()
}

function optimiseStep () {
  for (let i = 0; i < population_size; i++) {
    candidates[i] = path.clone()
    candidates[i].mutate()
  }

  for (let i = 0; i < population_size; i++) {
    if (path.length > candidates[i].length) {
      path = candidates[i]
    }
  }

  ctx.clearRect(0, 0, 500, 500)

  for (let i = 0; i < population_size; i++) {
    if (candidates[i] === path) continue

    candidates[i].color = almostRandomColor(50, 150)
    candidates[i].drawIt()
  }
}
