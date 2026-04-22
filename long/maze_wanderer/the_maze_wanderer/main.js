'use strict'

import SquarePhysics from "./classes/SquarePhysics.js"
import Wanderer from "./classes/Wanderer.js"
import Map from "./classes/Map.js"
import Goal from "./classes/Goal.js"
import Square from "./classes/Square.js"

_canvas.width = 500
_canvas.height = 500
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


const wandererCount = 10
const wanderer = new Array(wandererCount)
for (let i = 0; i < wandererCount; i++) {
    wanderer[i] = new Wanderer(75, 300, -Math.PI/2)
}

const points = new Array(1)
points[0] = new Square(0, 0, 0, 5, "red")

function putPointsV(x, y, n, y2) {
    for (let i = 0; i < n; i++) {
        points.push(new Square(x, y + (y2 - y) * i / n, 0, 5, "red"))
    }
}
function putPointsH(x, y, n, x2) {
    for (let i = 0; i < n; i++) {
        points.push(new Square(x + (x2 - x) * i / n, y, 0, 5, "red"))
    }
}


putPointsV(70, 300, 20, 75)
putPointsV(75, 300, 20, 75)
putPointsV(80, 300, 20, 75)

putPointsH(75, 70, 30, 400)
putPointsH(75, 75, 30, 400)
putPointsH(75, 80, 30, 400)

const pointId = new Array(wandererCount)
for (let i = 0; i < wandererCount; i++) {
    pointId[i] = 0
}

function score(dt) {
    for (let idx = 0; idx < wandererCount; idx++) {
        const next = wanderer[idx].square.copy()
        next.updateIt(dt)
        if (map.checkSquare(next)) {
            wanderer[idx].score -= 1
        }

        let newId = pointId[idx]
        for (let i = pointId[idx]; i < points.length; i++) {
            if (wanderer[idx].square.squareIntersecting(points[i])) {
                newId = i+1
                wanderer[idx].score += 5
            }
        }
    }
}

let told = 0, timer = 0, runs = 1

function update(dt) {
    timer += dt
	if (timer < Math.sqrt(runs) * 3000) {
		context.clearRect(0, 0, 500, 500)
			
		score(dt)
    for (let idx = 0; idx < wandererCount; idx++) {
      wanderer[idx].updateIt(dt, map)
    }
	} else {
		runs += 1
		evaluate()
		timer = 0
	}
}

function draw() {
    map.drawIt(context)
    for (let i = 0; i < wandererCount; i++) {
        wanderer[i].drawIt(context)
    }
    for (let i = 0; i < points.length; i++) {
        points[i].drawIt(context)
    }
}

function evaluate() {
    let bestIdx = 0;
    for (let i = 1; i < wandererCount; i++) {
        if (wanderer[bestIdx].score < wanderer[i].score) {
            bestIdx = i;
        }
    }

    console.log(wanderer[bestIdx].score)
    if (runs % 10 == 0) {
        console.log(wanderer[bestIdx])
    }
    const bestBrain = wanderer[bestIdx].brain.clone();

    for (let i = 0; i < wandererCount; i++) {
        const angle = 0
        wanderer[i] = new Wanderer(75, 300, -Math.PI/2)
        wanderer[i].brain = bestBrain.clone();
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
}

const maxDt = 50
function render (time) {
  let dt = Math.floor(time - told)
  if (dt > maxDt) dt = maxDt

    if (runs % 10 != 0) for (let i = 0; i < 9; i++) update(dt)
    update(dt)
	draw()

  window.requestAnimationFrame(render)
  told = time
}
window.requestAnimationFrame(render)