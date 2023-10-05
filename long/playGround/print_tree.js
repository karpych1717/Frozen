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

  console.log(namesTrie)
  printTrie(namesTrie)
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
  for (let i = 0; i < name.length; i++) {
    if (root.next[hash(name.charAt(i))] == null) root.next[hash(name.charAt(i))] = new Node(false)
    root = root.next[hash(name.charAt(i))]
  }
  root.value = true
}

function isIncludes (name, root) {
  for (let i = 0; i < name.length; i++) {
    if (root.next[hash(name.charAt(i))] == null) return false
    root = root.next[hash(name.charAt(i))]
  }
  return root.value // if namesTrie includes name, true or false
}

function hash (letter) {
  const idx = letter.charCodeAt()

  if (letter === ' ') return 0
  else if (idx > 96) return idx - 96
  else return idx - 38
}

function hashnt (letter) {
  if (letter === 0) return ' '
  else if (letter < 27) return String.fromCharCode(letter + 96)
  else return String.fromCharCode(letter + 38)
}

function printTrie (root) {
  dfs(root,"")
}

function dfs (root, str) {
  if (root.value === true) log(str)
  for (let i=0; i<52; i++) {
    if (root.next[i] !== undefined) {
      dfs(root.next[i], str + hashnt(i))
    }
  }
}