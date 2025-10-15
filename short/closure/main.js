/* global _canvas */
'use strict'
import { makeBall } from './functions.js'
import { render } from './functions.js'

_canvas.width = 500
_canvas.height = 500
_canvas.style.background = 'gray'
_canvas.style.border = '3px solid black'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'

export const context = _canvas.getContext('2d')

export const circles = new Array()

addEventListener("pointerdown", (event) => {
    circles.push(
        makeBall(250, 250)
    )
})

requestAnimationFrame(render)