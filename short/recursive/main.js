/* global _canvas */
'use strict'

_canvas.width = 500
_canvas.height = 300
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const length = 10
const arr = new Array(length)
function inputArray(x, len) {
    if (x >= len) return
    arr[x] = +prompt()
    inputArray(x + 1, len)
}

function outputArray(x, len) {
    if (x >= len) return
    console.log(arr[x])
    outputArray(x + 1, len)
}

function countAverageArray (x, len) {
    if (x >= len) return 0
    if (x == 0) {
        return ((arr[0] + countAverageArray(x + 1, len)) / len)
    } else {
        return (arr[x] + countAverageArray(x + 1, len))
    }
}

function getRandom(amount) {
    return Math.floor(Math.random() * amount);
}

function uniqueRandomFillArray (x, len, used) {
    if (x >= len) return 0
    if (x == 0) {
        const used0 = new Array(len).fill(false)
        arr[0] = getRandom(len)
        used0[arr[0]] = true
        uniqueRandomFillArray(x + 1, len, used0)
    } else {
        arr[x] = getRandom(len)
        while (used[arr[x]]) {
            arr[x] = getRandom(len)
        }
        used[arr[x]] = true
        uniqueRandomFillArray(x + 1, len, used)
    }
}

//inputArray(0, 10)

//outputArray(0, 10)

uniqueRandomFillArray(0, 10)
outputArray(0, 10)

console.log(countAverageArray(0, 10))