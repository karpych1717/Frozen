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

const field = new Field(16, 0, 0, 500, 500)

let used = new Array(field.n)
for (let i = 0; i < field.n; i++) used[i] = new Array(field.m)

let maze = generator(0, 0)
field.drawIt(context)
    
_iterateButton.onclick = () => {
    if (maze.next().done) console.log("done")
    field.drawIt(context)
}

function isDiggable(x, y) {
    let neighbours = field.getNeighbours(x, y)
    let count = 0
    for (let i = 0; i < neighbours.length; i++) {
        if (used[neighbours[i].x][neighbours[i].y] == 1) {
            count++
        }
    }
    if (count > 1) return false
    return true
}

function* generator(x, y) {
    used[x][y] = true
    field.setColorByVal(x, y, 0)
    yield
    
    let neighbours = field.getNeighbours(x, y)

    let option = new Array()
    for (let i = 0; i < neighbours.length; i++) option.push(i)
    
    for (let i = neighbours.length; i > 0; i--) {
        let rand = Math.floor(Math.random() * i)
        if (isDiggable(
            neighbours[option[rand]].x,
            neighbours[option[rand]].y
        )) {
            let maze = generator(
                neighbours[option[rand]].x,
                neighbours[option[rand]].y
            )
            while (!maze.next().done) yield
        }
        option.splice(rand, 1)
    }
}