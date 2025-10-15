/* global _canvas */
'use strict'
import { Field, Agent } from './Classes.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const field = new Field(-1, -1, _canvas.width, _canvas.height, 25, 25)

let used = new Array(25)
for (let i = 0; i < 25; i += 1) used[i] = new Array(25).fill(0)

setUpArrays()
let maze = generator(2, 12)
field.drawIt(context)

let agent = new Agent(10, 100, 0, 2, 10)
agent.drawIt(context)

_iterateButton.onclick = () => {
    if (maze.next().done) console.log("done")
    field.drawIt(context)
}

function setUpArrays() {
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
}

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

function* generator(x, y) {
    used[x][y] = true
    field.field[x][y].val = 0
    yield
    
    let permutation = new Array(0, 1, 2, 3)
    for (let i = 4; i > 0; i--) {
        let rand = Math.floor(Math.random() * i)
        if (permutation[rand] == 0 && isDiggable(x-1, y)) {
            let maze = generator(x-1, y)
            while (!maze.next().done) yield
        }
        if (permutation[rand] == 1 && isDiggable(x+1, y)) {
            let maze = generator(x+1, y)
            while (!maze.next().done) yield
        }
        if (permutation[rand] == 2 && isDiggable(x, y-1)) {
            let maze = generator(x, y-1)
            while (!maze.next().done) yield
        }
        if (permutation[rand] == 3 && isDiggable(x, y+1)) {
            let maze = generator(x, y+1)
            while (!maze.next().done) yield
        }
        permutation.splice(rand, 1)
    }
}