/* global fileFromSubmit parseToArray log */

document.getElementById('form').addEventListener('submit', submitHandler)

const toCheck = [
  'Vance Harrison',
  'Bob Kepler',
  'Bryan Sharp',
  'Antonio Blum',
  'Lisa Schneider'
]

function submitHandler (event) {
  event.preventDefault()

  const file = fileFromSubmit(event)
  const names = parseToArray(file)

  names.forEach((currentName, currentIndex) => {
    log(`${currentIndex}. ${currentName}`)
  })

  const namesTrie = makeTrie(names)

  toCheck.forEach(currentName => {
    log(isIncludes(currentName, namesTrie), currentName)
  })
}

class Node {
  constructor (value) {
    this.value = value // true/false
    this.next = new Array(53)
  }
}

function makeTrie (names) {
  const root = new Node(false)

  for (let i = 0; i < names.length; i++) {
    grow(names[i], root)
  }

  return root
}

// code above can`t be changed

function grow (name, root) {

}

function isIncludes (name, root) {

  return // if namesTrie includes name, true or false
}

function hash(letter) {

  return // symbol index
}
