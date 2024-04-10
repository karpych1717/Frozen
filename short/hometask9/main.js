/* global log */
'use strict'

const d = 'hebisaddpvjsowenovpoajfaonvsm'
const a = 'add'

let i = 0
let j = 0

let result
var current = compare // rename and replace
let isDoing = true

while (isDoing) {
  current()
}

log(result || 'not found')

function compare () {
  if (a[j] === d[i + j]) current = addj
  else current = addi
}

function addi () {
  i++
  current = overi
}

function addj () {
  j++
  current = overj
}

function overi () {
  if (i >= d.length - a.length + 1) current = end
  else current = compare
}

function overj () {
  if (j >= a.length) {
    result = i
    current = end
  } else current = compare
}

function end () {
  isDoing = false
}
