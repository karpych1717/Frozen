/* global fileFromSubmit parseToArray log */

document.getElementById('form').addEventListener('submit', submitHandler)

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

  const bubbled = bubbleSort(list)
  const inserted = insertionSort(list)
  const selected = selectionSort(list)

  log('log bubbled:')
  logList(bubbled)

  log('log inserted:')
  logList(inserted)

  log('log selected:')
  logList(selected)
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
    } else if (normalised1.charCodeAt(i) < normalised2.charCodeAt(i)) { // Тут була помилка яка призводила завжди видавати true
      return false
    }
  }

  return false // if word1 > word2, true or false
}

function makeLinkedList (names) {
  const start = new Node(names[0])
  let node = start
  for (let i = 0; i < names.length; i++) {
    node.next = new Node(names[i])
    node = node.next
  }
  return start
}

function logList (list) { // log(list) дасть [Object, Object], треба виводити кожне ім'я індивідуально
  let node = list.start.next
  const answer = [list.length]
  for (let i = 0; i < list.length; i++) {
    answer[i] = node.value
    log(node.value)
    node = node.next
  }

  log('=========\n')
  // log(answer)
}

function bubbleSort (list) {
  for (let j = 0; j < list.length - 2; j++) {
    let zero = list.start
    for (let i = 0; i < list.length - j - 1; i++) {
      if (compare(zero.next.value, zero.next.next.value)) {
        const delta = zero.next
        const delta2 = zero.next.next
        delta.next = delta2.next
        delta2.next = delta
        zero.next = delta2
      }
      zero = zero.next
    }
  }
}

function insertionSort (list) {

}

function selectionSort (list) {

}
