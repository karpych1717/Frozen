'use strict'

import SquarePhysics from "./classes/SquarePhysics.js"
import Wanderer from "./classes/Wanderer.js"
import Map from "./classes/Map.js"

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

const context = _canvas.getContext('2d')

const map = new Map(50, 50, 10)

for (let r = 10; r <= 24; r++) {
    for (let angle = 0; angle < 360; angle += 0.5) {
        const x = Math.ceil(25 + r * Math.sin(angle))-1
        const y = Math.ceil(25 + r * Math.cos(angle))-1
        map.map[x][y] = null
    }
}

const wandererCount = 10
const wanderer = new Array(wandererCount)
for (let i = 0; i < wandererCount; i++) {
    wanderer[i] = new Wanderer(100, 100, 0)
}

const kAngle = 100
function score(dt) {
    for (let idx = 0; idx < wandererCount; idx++) {

        const next = wanderer[idx].square.copy()
        next.updateIt(dt)
        if (map.checkSquare(next)) {
            wanderer[idx].score -= 100
        }
        
        const lastAngle = Math.atan2(
            wanderer[idx].square.lastY-250,
            wanderer[idx].square.lastX-250
        )
        const newAngle = Math.atan2(
            wanderer[idx].square.y-250,
            wanderer[idx].square.x-250
        )

        if (newAngle < -3 && lastAngle > 3) {
            wanderer[idx].score += (newAngle - lastAngle + Math.PI * 2) * kAngle
        } else if (lastAngle < -3 && newAngle > 3) {
            wanderer[idx].score -= 10
        } else {
            wanderer[idx].score += (newAngle - lastAngle) * kAngle
        }
        
        wanderer[idx].score -= Math.abs(wanderer[idx].square.a - (newAngle + Math.PI / 2))
        wanderer[idx].score += wanderer[idx].square.speed()
    }
}

let told = 0, timer = 0, runs = 1

function update(dt) {
  timer += dt
	if (timer < Math.sqrt(Math.sqrt(runs)) * 1000) {
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
        const angle = 30/180*Math.PI*(Math.random()*2-1)
        wanderer[i] = new Wanderer(100, 100, angle);
        wanderer[i].brain = bestBrain.clone();
        if (i == 0) {
            continue
        } else if (i <= wandererCount * 5 / 10) {
            wanderer[i].mutate(1);
        } else if (i <= wandererCount * 8 / 10) {
            wanderer[i].mutate(0.5);
        } else {
            wanderer[i].mutate(1);
        }
    }
}

const maxDt = 50
function render (time) {
  let dt = Math.floor(time - told)
  if (dt > maxDt) dt = maxDt

	update(dt)
	draw()

  window.requestAnimationFrame(render)
  told = time
}
window.requestAnimationFrame(render)