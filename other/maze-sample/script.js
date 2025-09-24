'use strict'

_canvas.width = 500
_canvas.height = 500
_canvas.style.backgroundColor = 'rgba(157, 191, 255, 1)'


const context = _canvas.getContext('2d')
context.fillStyle = 'rgba(73, 143, 132, 1)'
context.strokeStyle = 'rgba(73, 143, 132, 1)'


const size = 20
const field = new Array(size)
for (let i = 0; i < size; ++i) {
  field[i] = new Array(size)
  field[i].fill(true)
}

dig(1, 10)
field[0][10] = false

display()


function dig (column, row) {
  if (! isDiggable(column, row)) return

  field[column][row] = false

  const candidates = [
    {x: column - 1, y: row},
    {x: column + 1, y: row},
    {x: column, y: row - 1},
    {x: column, y: row + 1}
  ]

  for (let i = 4; i > 0; --i) {
    const rnd = Math.trunc(i * Math.random())
    dig(candidates[rnd].x, candidates[rnd].y)

    candidates.splice(rnd, 1)
  }
}

function isDiggable (column, row) {
  if (column === 0) return false
  if (row    === 0) return false
  if (column === size - 1) return false
  if (row    === size - 1) return false

  let neighbours = 0
  if (field[column-1][row]) neighbours++
  if (field[column+1][row]) neighbours++
  if (field[column][row-1]) neighbours++
  if (field[column][row+1]) neighbours++

  if (field[column-1][row-1]) neighbours++
  if (field[column+1][row-1]) neighbours++
  if (field[column-1][row+1]) neighbours++
  if (field[column+1][row+1]) neighbours++

  if (neighbours < 6) return false

  return field[column][row]
}


function display () {
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {

      if (field[i][j]) context.fillRect(20*i + 51, 20*j + 51, 18, 18)

    }
  }

  context.strokeRect(48, 48, 404, 404)
}
