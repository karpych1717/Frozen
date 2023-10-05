function y (x) {
  return x ** 2 - 9
}

let left = 0
let right = 100
log('left:', left, 'right:', right)

let exit = 0
let count = 0
const reason = [
  'N/A',
  'Differense of a step is less than 0.001',
  'Threshould is less than 0.001',
  'There were more than 100 cycles'
]
let reason_idx = 0

while (exit === 0) {
  ;[left, right, exit, reason_idx] = step(left, right, y)
  log('left:', left, 'right:', right)
  log('count', count, 'exit', exit, 'word')
  if (count > 100) { exit = 1; reason_idx = 3 }
  count++
}

log('final answer:', (left + right) / 2)
log('Exit reason :', reason[reason_idx])

document.getElementById('button').addEventListener('click', step)

function step (left, right, y) {
  const middle = (left + right) / 2
  let exit = 0
  let reason_idx

  if (y(middle) * y(right) > 0) {
    if (Math.abs(right - middle) <= 0.001) { exit = 1; reason_idx = 1 }
    right = middle
  } else {
    if (Math.abs(left - middle) <= 0.001) { exit = 1; reason_idx = 1 }
    left = middle
  }

  if (Math.abs(right - left) <= 0.001) { exit = 1; reason_idx = 2 }

  return [left, right, exit, reason_idx]
}
