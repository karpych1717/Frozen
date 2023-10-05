/* global fileFromSubmit parseToArray log */

document.getElementById('form').addEventListener('submit', submitHandler)

const toCheck = [
  'Vance Harrison',
  'Bob Kepler',
  'Bryan Sharp',
  'Antonio Blum',
  'Lisa Schneider',
  'Uriah Chandler'
]

function submitHandler (event) {
  event.preventDefault()

  const file = fileFromSubmit(event)
  const names = parseToArray(file)

  names.forEach((currentName, currentIndex) => {
    log(`${currentIndex}. ${currentName}`)
  })

  const hashTable = makeHashTable(names)

  console.log(hashTable)

  toCheck.forEach(currentName => {
    log(isIncludes(currentName, hashTable), currentName)
  })
}

function hash (name) {
  const firstCharID = name.charAt(0).toLowerCase().charCodeAt() - 97
  const SecondCharID = name.charAt(1).toLowerCase().charCodeAt() - 97
  const hashValue = firstCharID * 10 + SecondCharID

  return hashValue
}

function makeHashTable (names) {
  const table = new Array(275)

  let index

  for (let i = 0; i < names.length; i++) {
    index = hash(names[i])
    while (table[index] != null) {
      index += 3
      index %= 151
    }
    console.log(index)
    table[index] = names[i]
  }
  return table
}

function isIncludes (name, hashTable) {
  let index = hash(name)

  while (hashTable[index] != null) {
    if (isEqual(hashTable[index], name)) return true
    index += 3
    index %= 151
  }

  return false // if hashTable includes name, true or false
}

function isEqual (word1, word2) {
  if (word1.length !== word2.length) return false

  for (let i = 0; i < word1.length; i++) {
    if (word1.toLowerCase().charCodeAt() !== word2.toLowerCase().charCodeAt()) {
      return false
    }
  }
  return true // if word1 === word2, true or false
}
