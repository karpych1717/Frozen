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

function dfs(x, y) {
    if (used[x][y] == 1) return
    used[x][y] = 1
    field.field[x][y].val = 0

    if (x != 1 && used[x-2][y] + used[x-1][y-1] + used[x-1][y+1]== 0) dfs(x-1, y)
    if (x != 24 && used[x+2][y] + used[x+1][y-1] + used[x+1][y+1] == 0) dfs(x+1, y)
    if (y != 1 && used[x][y-2] + used[x-1][y-1] + used[x+1][y-1] == 0) dfs(x, y-1)
    if (y != 24 && used[x][y+2] + used[x-1][y+1] + used[x+1][y+1] == 0) dfs(x, y+1)
}

dfs(1, 12)

field.drawIt(context)