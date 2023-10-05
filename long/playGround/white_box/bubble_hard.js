/* global fileFromSubmit parseToArray log */

document.getElementById('form').addEventListener('submit', submitHandler)

const toCheck = [
  'Vance Harrison',
  'Bob Kepler',
  'Bryan Sharp',
  'Antonio Blum',
  'Lisa Schneider'
]

class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

function submitHandler (event) {
  event.preventDefault()

  const file = fileFromSubmit(event)
  const names = parseToArray(file)

  names.forEach((currentName, currentIndex) => {
    log(`${currentIndex}. ${currentName}`)
  })

  const list = {
    start: makeLinkedList(names),
    length: names.length
  }

  log('log unsorted:')
  logList(list)

  bubbleSort(list)

  log('log sorted:')
  logList(list)
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

// code above can`t be changed

function makeLinkedList (names) {
  const start = new Node(names[0])

  for (let i = 1; i < names.length; i++) {

  }

  return start
}

function logList (list) {
  log(list) // ????
}

function bubbleSort (list) {

}
