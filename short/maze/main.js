/* global _canvas */
'use strict'
import Field from './Classes.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const field = new Field(-1, -1, _canvas.width, _canvas.height, 25, 25)

let used = new Array(25)
for (let i = 0; i < 25; i += 1) {
    used[i] = new Array(25).fill(0)
}

for (let i = 0; i < 25; i += 1) {
    used[0][i] = 1
    used[i][0] = 1
    used[24][i] = 1
    used[i][24] = 1

    field.field[0][i].val = 100
    field.field[i][0].val = 100
    field.field[24][i].val = 100
    field.field[i][24].val = 100
}

let last = new Array(25)
for (let i = 0; i < 25; i += 1) {
    last[i] = new Array(25).fill(0)
}

field.field[0][12].val = 0
field.field[1][12].val = 0

function isDiggable(x, y) {
    if (x == 1 || y == 1 || x == 23 || y == 23) return false
    if (used[x][y]) return false
    if (used[x-1][y] + used[x+1][y] + used[x][y+1] + used[x][y-1] > 1) {
        return false
    }
    if (used[x-1][y]) if (used[x+1][y+1] || used[x+1][y-1]) return false
    if (used[x][y-1]) if (used[x+1][y+1] || used[x-1][y+1]) return false
    if (used[x+1][y]) if (used[x-1][y+1] || used[x-1][y-1]) return false
    if (used[x][y+1]) if (used[x+1][y-1] || used[x-1][y-1]) return false

    return true
}

function dfs(x, y) {
    if (used[x][y] == 1 || !isDiggable(x, y)) return 
    used[x][y] = 1
    field.field[x][y].val = 0

    let permutation = new Array(0, 1, 2, 3)
    for (let i = 4; i > 0; i--) {
        let rand = Math.floor(Math.random() * i)
        //if (x == 1 && y == 12) console.log(rand, permutation[rand])
        if (permutation[rand] == 0 && isDiggable(x-1, y)) dfs(x-1, y)
        if (permutation[rand] == 1 && isDiggable(x+1, y)) dfs(x+1, y)
        if (permutation[rand] == 2 && isDiggable(x, y-1)) dfs(x, y-1)
        if (permutation[rand] == 3 && isDiggable(x, y+1)) dfs(x, y+1)
        permutation.splice(rand, 1)
    }
}

dfs(2, 12)

field.drawIt(context)