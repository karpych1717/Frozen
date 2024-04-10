/* global canvasSetUp, log, toDeg, toRad */

const { cvs, ctx } = canvasSetUp()

cvs.addEventListener('pointerdown', handleClick)
cvs.addEventListener('pointermove', handleClick)

let x = new Array(10000)
let y = new Array(10000)
let s = new Array(10000)
let len = 1

function handleClick (event) {
  x[len] = event.offsetX
  y[len] = event.offsetY
  s[len] = 1
  len++
  if (len >= 10000) {len = 1; ctx.clearRect(0, 0, 750, 500);}
}

function draw (n) {
  ctx.beginPath()
  ctx.arc(x[n], y[n], 10, 0, 2 * Math.PI)
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white'
  ctx.stroke()
}

setInterval(render, 30)

function render () {
  ctx.clearRect(0, 0, 750, 500);
  i = 0
  while (i < len) {
    if (s[i] > 0) {
      y[i] += 0.5 * Math.abs(Math.sqrt(s[i]))
      s[i] += 1
      if (y[i] >= 487) s[i] = 0
      ctx.moveTo(x[i] + 10, y[i])
      draw(i)
    } else if (s[i] !== -10) {
      s[i]--
      draw(i)
    }
    i++
  }
}