/* global fileFromSubmit parseToArray log */
'use strict'

document.getElementById('form').addEventListener('submit', submitHandler)

function submitHandler (event) {
  event.preventDefault()
}

function compare (word1, word2) {
  const normalised1 = word1.toLowerCase()
  const normalised2 = word2.toLowerCase()

  for (let i = 0; i < word1.length; i++) {
    if (normalised1.charCodeAt(i) === normalised2.charCodeAt(i)) return false
  }

  return true
}
function search (arr, n) {
  let x = 0
  while (true) {
    if (arr[x] === n) return x
    x += 1
  }
}
const word = 'slovo'
let sorted = ''
let current = ''
let answer = ''
const l = new Array(26).fill(null).map(() => [0, []])
const pos = []

for (let i = 0; i < word.length; i++) {
  l[word.charCodeAt(i) - 97][0] += 1
  l[word.charCodeAt(i) - 97][1].push(i)
}

for (let i = 0; i < 26; i++) {
  for (let j = 0; j < l[i][0]; j++) {
    sorted = sorted.concat(String.fromCharCode(i + 97))
    pos.push(l[i][1][j])
  }
}

for (let i = word.length - 1; i > 0; i--) {
  current = sorted.substring(i, word.length).concat(sorted.substring(0, i))
  if (compare(sorted, current)) {
    for (let j = 0; j < word.length; j++) answer = answer.concat(current.charAt(search(pos, j)))
    break
  }
}
log(answer)
