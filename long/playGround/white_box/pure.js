function y (x) {
  return x * 9 - 9
}

let left = -100
let right = 100
log('left:', left, 'right:', right)

let exit = 0
let middle
let count = 0
const reasons = [
  'N/A',
  'Differense of a step is less than 0.001',
  'Threshould is less than 0.001',
  'There were more than 100 cycles'
]
let reasonID = 0

while (exit === 0) {
  if (count > 100) {
    exit = 1
    reasonID = 3
  }

  step()
  count++
}

log('final answer:', middle)
log('Exit reason :', reasons[reasonID])

function step () {
  middle = (left + right) / 2

  if (y(middle) * y(right) > 0) {
    if (Math.abs(right - middle) <= 0.001) {
      exit = 1
      reasonID = 1
    }
    right = middle
  } else {
    if (Math.abs(left - middle) <= 0.001) {
      exit = 1
      reasonID = 1
    }
    left = middle
  }

  if (Math.abs(right - left) <= 0.001) {
    exit = 1
    reasonID = 2
  }

  log('left:', left, 'right:', right)
}
