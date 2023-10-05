document.getElementById('form').addEventListener('submit', submitHandler)

class Leaf {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

function submitHandler (event) {
  event.preventDefault()

  const file = fileFromSubmit(event)
  const numbers = parseToArray(file)

  for (let i = 0; i < numbers.length; i++) {
    log(numbers[i])
  }

  const root = grow(numbers)

  console.log(root)
  log('sorted goes next:')
  sort(root)

  // for (let i = 0; i < toCheck.length; i++) {
  //   log(toCheck[i], check(toCheck[i], root))
  // }
}

function grow (numbers) {
  const root = new Leaf(numbers[0])

  for (let i = 1; i < numbers.length; i++) {
    // console.log('>>> adding', numbers[i])
    addTo(root, numbers[i])
  }

  return root
}

function addTo (leaf, value) {
  // console.log('current leaf', leaf.value, 'value', value)
  if (value > leaf.value) {
    if (leaf.right === null) {
      leaf.right = new Leaf(value)
      // console.log('add right', value)
    } else {
      // console.log('go right')
      addTo(leaf.right, value)
    }
  } else {
    if (leaf.left === null) {
      leaf.left = new Leaf(value)
      // console.log('add left', value)
    } else {
      // console.log('go left')
      addTo(leaf.left, value)
    }
  }
}

function sort (leaf) {
  if (leaf.left) sort(leaf.left)
  log(leaf.value)
  if (leaf.right) sort(leaf.right)
}

function check (number, root) {

  return // if numbers includes number
}
