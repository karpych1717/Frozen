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

  const hashTable = makeHashTable(names)

  toCheck.forEach(currentName => {
    log(isIncludes(currentName, hashTable), currentName)
  })
}

function hash (name) {
  const firstCharID = name.charAt(0).toLowerCase().charCodeAt()
  const hashValue = firstCharID - 97

  return hashValue
}

// code above can`t be changed

function makeHashTable (names) {
  const table = new Array(26)

  for (let i = 0; i < names.length; i++) {
    if (!table[hash(names[i])]) {
      table[hash(names[i])] = names[i]
    } else {
      table[hash(names[i]) + 1] = names[i]
    }
  }
  return table
}

function isIncludes (name, hashTable) {
  if (!hashTable[hash(name)]) return false

  if (isEqual(hashTable[hash(name)], name)) return true
  return false // if namesTree includes name, true or false
}

function isEqual (word1, word2) {
  if (word1.length !== word2.length) return false

  const normalised1 = word1.toLowerCase()
  const normalised2 = word2.toLowerCase()

  for (let i = 0; i < word1.length; i++) {
    if (normalised1.charCodeAt(i) !== normalised2.charCodeAt(i)) {
      return false
    }
  }
  return true // if word1 === word2, true or false
}
