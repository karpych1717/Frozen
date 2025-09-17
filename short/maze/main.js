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

field.field[0][12].val = 0
field.field[1][12].val = 0

function dfs(x, y) {
    if (used[x][y] == 1) return
    used[x][y] = 1
    field.field[x][y].val = 0
    if (x == 1 || y == 1 || x == 23 || y == 23) return

    let permutation = new Array(0, 1, 2, 3)
    for (let i = 4; i > 1; i--) {
        let rand = Math.floor(Math.random() * i)
        permutation.sort()
        //if (x == 1 && y == 12) console.log(rand, permutation[rand])
        if (permutation[rand] == 0) {
            if (used[x-2][y] + used[x-2][y-1] + used[x-2][y+1] + used[x-1][y-1] + used[x-1][y+1] == 0) dfs(x-1, y)
        } else if (permutation[rand] == 1) {
            if (used[x+2][y] + used[x+2][y-1] + used[x+2][y+1] + used[x+1][y-1] + used[x+1][y+1] == 0) dfs(x+1, y)
        } else if (permutation[rand] == 2) {
            if (used[x][y-2] + used[x-1][y-2] + used[x+1][y-2] + used[x-1][y-1] + used[x+1][y-1] == 0) dfs(x, y-1)
        } else {
            if (used[x][y+2] + used[x-1][y+2] + used[x+1][y+2] + used[x-1][y+1] + used[x+1][y+1] == 0) dfs(x, y+1)
        }
        permutation[rand] = 1000
    }
}

dfs(2, 12)

field.drawIt(context)