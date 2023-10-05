/* global fileFromSubmit parseToArray log */

document.getElementById('form').addEventListener('submit', submitHandler)

const toCheck = [
  'Vance Harrison',
  'Bob Kepler',
  'Bryan Sharp',
  'Antonio Blum',
  'Lisa Schneider'
]

class Leaf {
  constructor (val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

function submitHandler (event) {
  event.preventDefault()

  const file = fileFromSubmit(event)
  const names = parseToArray(file)

  names.forEach((currentName, currentIndex) => {
    log(`${currentIndex}. ${currentName}`)
  })

  const namesTree = makeTree(names)

  toCheck.forEach(currentName => {
    log(isIncludes(currentName, namesTree), currentName)
  })
}

// code above can`t be changed

function grew (str, branch) {
  if (compare(branch.val, str)) {
    if (branch.left === null) {
      branch.left = new Leaf(str)
    } else {
      grew(str, branch.left)
    }
  } else {
    if (branch.right === null) {
      branch.right = new Leaf(str)
    } else {
      grew(str, branch.right)
    }
  }
}

function makeTree (names) {
  const root = new Leaf(names[0])
  for (let x = 1; x < names.length; x++) grew(names[x], root)
  return root
}

function isIncludes (name, namesTree) {
  if (isEqual(namesTree.val, name)) return true

  if (compare(namesTree.val, name)) {
    if (namesTree.left === null) return false
    else return isIncludes(name, namesTree.left)
  } else {
    if (namesTree.right === null) return false
    else return isIncludes(name, namesTree.right)
  }
  // if namesTree includes name, true or false
}

function compare (word1, word2) {
  const length =
    word1.length < word2.length
      ? word1.length
      : word2.length

  const normalised1 = word1.toLowerCase()
  const normalised2 = word2.toLowerCase()

  for (let i = 0; i < length; i++) {
    if (normalised1.charCodeAt(i) > normalised2.charCodeAt(i)) {
      return true
    }
  }

  return false // if word1 > word2, true or false
}

function isEqual (word1, word2) {
  if (word1.length !== word2.length) return false

  const normalised1 = word1.toLowerCase()
  const normalised2 = word2.toLowerCase()

  for (let i = 0; i < word1.length; i++) {
    if (normalised1.charCodeAt() !== normalised2.charCodeAt()) {
      return false
    }
  }

  return true // if word1 === word2, true or false
}
