'use strict'

import SquarePhysics from "./classes/SquarePhysics.js"
import Wanderer from "./classes/Wanderer.js"
import Map from "./classes/Map.js"
import Goal from "./classes/Goal.js"
import Square from "./classes/Square.js"
import Vector from "./classes/Vector.js"
import TreeNode from "./classes/TreeNode.js"
import Point from "./classes/Point.js"

const increaseButton = document.getElementById("increase");
increaseButton.style.width = "30px"
increaseButton.style.height = "30px"
increaseButton.style.marginTop = "510px"
increaseButton.style.marginLeft = "-480px"

const decreaseButton = document.getElementById("decrease");
decreaseButton.style.width = "30px"
decreaseButton.style.height = "30px"
decreaseButton.style.marginTop = "510px"
decreaseButton.style.marginLeft = "-450px"

const numberDisplay = document.getElementById("number");
numberDisplay.style.display = "inline-block"
numberDisplay.style.marginTop = "515px"
numberDisplay.style.marginLeft = "-495px"

const resetButton = document.getElementById("reset");
resetButton.style.width = "50px"
resetButton.style.height = "30px"
resetButton.style.marginTop = "560px"
resetButton.style.marginLeft = "-480px"

let numberOfBest = 1
numberDisplay.textContent = numberOfBest

_canvas.width = 500
_canvas.height = 700
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const map = new Map(100, 100, 5)
map.eraseArc(25, 25, -Math.PI / 2, -Math.PI, 20, 5)
map.eraseArc(30, 25, -Math.PI / 2, -Math.PI, 20, 5)
map.eraseRect(25, 5, 75, 20)
map.eraseArc(75, 25, -Math.PI, -Math.PI * 2, 20, 5)
map.eraseRect(60, 30, 75, 45)
map.eraseArc(60, 50, 0, -Math.PI, 20, 5)
map.eraseRect(60, 55, 75, 70)
map.eraseArc(75, 75, -Math.PI, -Math.PI * 2, 20, 5)
map.eraseRect(25, 80, 75, 95)
map.eraseArc(25, 75, 0, -Math.PI / 2, 20, 5)
map.eraseArc(30, 75, 0, -Math.PI / 2, 20, 5)
map.eraseRect(5, 25, 25, 75)



const TREE_DEPTH = 2
const treeArrayLength = (Math.pow(4, TREE_DEPTH+1)-1) / 3 + 1;
const tree = new Array(treeArrayLength)
function buildTree(v, d, x, y, l, sqX, sqY, sqL) {
    tree[v] = new TreeNode(v, d, x, y, l, sqX, sqY, sqL)
    if (d == 0) return
    let m = l / 2, sqM = sqL / 2, sqQ = sqL / 4
    buildTree(v*4-2, d-1, x  , y  , m, sqX-sqQ, sqY-sqQ, sqM)
    buildTree(v*4-1, d-1, x+m, y  , m, sqX+sqQ, sqY-sqQ, sqM)
    buildTree(v*4  , d-1, x  , y+m, m, sqX-sqQ, sqY+sqQ, sqM)
    buildTree(v*4+1, d-1, x+m, y+m, m, sqX+sqQ, sqY+sqQ, sqM)
}
buildTree(1, TREE_DEPTH, 0, 0, 100, 250, 250, 500)

let showId = 0

const wandererCount = 10
const wanderer = new Array(wandererCount)
for (let i = 0; i < wandererCount; i++) {
    wanderer[i] = new Wanderer(75, 300, -Math.PI/2)
}



const waypointCount = 9
const waypoint = new Array(waypointCount)
waypoint[0] = new Goal(95, 85, Math.PI*3/4)
waypoint[1] = new Goal(415, 80, Math.PI*5/4)
waypoint[2] = new Goal(405, 170, Math.PI*7/4)
waypoint[3] = new Goal(350, 180, Math.PI*8/4)
waypoint[4] = new Goal(250, 250, Math.PI*6/4)
waypoint[5] = new Goal(265, 300, Math.PI*5/4)
waypoint[6] = new Goal(415, 320, Math.PI*5/4)
waypoint[7] = new Goal(415, 420, Math.PI*7/4)
waypoint[8] = new Goal(95, 415, Math.PI*1/4)
const wandererProgress = new Array(wandererCount)
for (let i = 0; i < wandererCount; i++) wandererProgress[i] = 0



const points = new Array(1)
points[0] = new Square(0, 0, 0, 5, "red")

const pointId = new Array(wandererCount)
for (let i = 0; i < wandererCount; i++) {
    pointId[i] = 0
}


function score(dt) {
    for (let idx = 0; idx < wandererCount; idx++) {
        const next = wanderer[idx].square.copy()
        next.updateIt(dt)
        if (map.checkSquare(next, tree, 1)) {
            wanderer[idx].score -= 1
        }

        let newId = Math.max(0, pointId[idx])
        for (let i = pointId[idx]; i < Math.min(points.length, pointId[idx] + 50); i++) {
            if (wanderer[idx].square.squareIntersecting(points[i])) {
                newId = i+1
                newId %= points.length
            }
        }
        if (newId > points.length - 10) {
            wanderer[idx].score += 1000
            newId = 0
        } else {
            if (newId >= pointId[idx]) {
                wanderer[idx].score += (newId - pointId[idx]) * 20
            } else {
                wanderer[idx].score += (newId - pointId[idx]) * 10
            }
        }
        wanderer[idx].score += newId *0.01
        pointId[idx] = newId
    }
}


let told = 0, timer = 0, runs = 1

function update(dt) {
    timer += dt
	if (timer < Math.sqrt(runs) * 10000) {
		score(dt)
        for (let idx = 0; idx < wandererCount; idx++) {
            wanderer[idx].updateIt(dt, map, tree)
        }
	} else {
		runs += 1
		evaluate()
		timer = 0
	}
}

function draw() {
    context.clearRect(0, 0, 500, 500)
    context.fillStyle = "white"
    context.fillRect(0, 500, 500, 700)
    for (let i = 0; i < points.length; i++) {
        points[i].drawIt(context)
    }

    
    map.drawIt(context)
    
    let rating = new Array(wandererCount)
    for (let i = 0; i < wandererCount; i++) rating[i] = [wanderer[i].score, i]
    rating.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < wandererCount; i++) {
        wanderer[rating[i][1]].square.col = `rgb(${0}, ${0}, ${50 + 155 / wandererCount * i})`
    }

    for (let i = 0; i < wandererCount; i++) {
        wanderer[i].drawIt(context)
    }

    wanderer[showId].brain.drawIt(context, 300, 550)
}

function evaluate() {
    let rating = new Array(wandererCount)
    for (let i = 0; i < wandererCount; i++) rating[i] = [wanderer[i].score, i]
    rating.sort((a, b) => b[0] - a[0])

    const brain = wanderer[rating[0][1]].brain.clone()
    for (let i = 1; i < numberOfBest; i++) {
        brain.inner1.addMatrix(wanderer[rating[i][1]].brain.inner1)
        brain.inner2.addMatrix(wanderer[rating[i][1]].brain.inner2)
        brain.output.addMatrix(wanderer[rating[i][1]].brain.output)
    }
    brain.inner1.multiplyNumber(1.0/numberOfBest)
    brain.inner2.multiplyNumber(1.0/numberOfBest)
    brain.output.multiplyNumber(1.0/numberOfBest)

    console.log(wanderer[rating[0][1]].score)
    if (runs % 10 == 0) {
        console.log(wanderer[rating[0][1]])
    }

    for (let i = 0; i < wandererCount; i++) {
        const angle = 0
        wanderer[i] = new Wanderer(75, 300, -Math.PI/2)
        wanderer[i].brain = brain.clone();
        if (i == 0) {
            continue
        } else if (i <= wandererCount * 5 / 10) {
            wanderer[i].mutate(0.2);
        } else if (i <= wandererCount * 8 / 10) {
            wanderer[i].mutate(0.5);
        } else {
            wanderer[i].mutate(2);
        }
    }

    for (let i = 0; i < wandererCount; i++) pointId[i] = 0
    
    for (let i = 0; i < wandererCount; i++) wandererProgress[i] = 0
}

const maxDt = 50
function render (time) {
  let dt = Math.floor(time - told)
  if (dt > maxDt) dt = maxDt

    for (let i = 0; i < 9; i++) update(dt)
    update(dt)
	draw()

  window.requestAnimationFrame(render)
  told = time
}
window.requestAnimationFrame(render)

let mouseDown = false

function mouseUpHandler(event) {
    let p = new Vector(event.offsetX, event.offsetY)
    mouseDown = false
}

function pointerDownHandler(event) {
    let p = new Point(event.offsetX, event.offsetY)
    mouseDown = true

    for (let i = 0; i < wandererCount; i++) {
        if (wanderer[i].square.isPointIn(p)) {
            showId = i
        }
    }
}

const targetSize = 50
function mouseMoveHandler(event) {
    let p = new Vector(event.offsetX, event.offsetY)
    if (mouseDown) {
        let p2 = new Vector(0, 0)
        p2.x = Math.min(Math.max(p.x, targetSize/2), 500-targetSize/2)
        p2.y = Math.min(Math.max(p.y, targetSize/2), 500-targetSize/2)
        const dist2 =
        (points[points.length-1].x - p2.x) ** 2 +
        (points[points.length-1].y - p2.y) ** 2
        if (dist2 >= targetSize/2) {
            points.push(new Square(
                p2.x,
                p2.y,
                0, targetSize, "gray"
            ))
        }
    }
}

function keyUpHandler(event) {
}

function keyDownHandler(event) {
}

increaseButton.addEventListener('click', () => {
  numberOfBest++
  if (numberOfBest > wandererCount) numberOfBest = wandererCount
  numberDisplay.textContent = numberOfBest
})

decreaseButton.addEventListener('click', () => {
  numberOfBest--
  if (numberOfBest < 1) numberOfBest = 1
  numberDisplay.textContent = numberOfBest
})

resetButton.addEventListener('click', () => {
  for (let i = 0; i < wandererCount; i++) {
    wanderer[i].brain.inner1.random()
    wanderer[i].brain.inner2.random()
    wanderer[i].brain.output.random()
  }
})

document.onmouseup = mouseUpHandler
document.onpointerdown = pointerDownHandler
document.onmousemove = mouseMoveHandler
document.onkeydown = keyDownHandler
document.onkeyup = keyUpHandler