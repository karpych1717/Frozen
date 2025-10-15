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
    prompt(arr[x])
    inputArray(x + 1, len)
}

inputArray(0, 10)
