/* global canvasSetUp, log, toDeg, toRad */

const WIDTH = 750
const HEIGHT = 500
const GAPWIDTH = WIDTH * 4 / 5
const GAPHEIGHT = HEIGHT * 4 / 5
const SPEED = 0.3

let dots = Array(10).fill().map(() => Array(10).fill(false))
let mode = false
let xcord = 1
let ycord = 1
let angle
let x = 0
let told = 0
let x1 = -100
let y1 = -100
let x2 = -100
let y2 = -100

const { cvs, ctx } = canvasSetUp()
cvs.addEventListener('pointerdown', handleClick)
cvs.addEventListener('pointermove', handleMove)

function circle (x, y, r, l, color) {
  ctx.lineWidth = l
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.stroke()
}

function rect (x, y, w, h, l, color) {
  ctx.lineWidth = l
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.rect(x, y, h, w)
  ctx.stroke()
}

function drone (x, y, o) {
  ctx.lineWidth = 1
  ctx.strokeStyle = 'white'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + Math.cos(1.25 + Math.PI/2 - o) * 40, y + Math.sin(1.25 + Math.PI/2 - o) * 40)
  ctx.lineTo(x + Math.cos(1.89 + Math.PI/2 - o) * 40, y + Math.sin(1.89 + Math.PI/2 - o) * 40)
  ctx.lineTo(x, y)
  ctx.fill()
  ctx.stroke()
}

function drawdots () {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      if (dots[i - 1][j - 1]) circle(WIDTH / 10 + GAPWIDTH * i / 11, HEIGHT / 10 + GAPHEIGHT * j / 11, 7, 2, "red")
    }
  }
}

function field() {
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'lime'
  ctx.rect(WIDTH / 10, HEIGHT / 10, GAPWIDTH, GAPHEIGHT)
  ctx.rect(10, 10, 20, 20)
  ctx.stroke()
  ctx.lineWidth = 1
  ctx.strokeStyle = 'green'
  ctx.beginPath()
  for (let i = 1; i <= 10; i++) {
    ctx.moveTo(WIDTH / 10 + GAPWIDTH * i / 11, HEIGHT / 10)
    ctx.lineTo(WIDTH / 10 + GAPWIDTH * i / 11, HEIGHT / 10 + GAPHEIGHT)
  }
  for (let i = 1; i <= 10; i++) {
    ctx.moveTo(WIDTH / 10, HEIGHT / 10 + GAPHEIGHT * i / 11)
    ctx.lineTo(WIDTH / 10 + GAPWIDTH, HEIGHT / 10 + GAPHEIGHT * i / 11)
  }
  ctx.stroke()
}

function handleMove (event) {
  if (mode) {
    xcord = event.offsetX
    ycord = event.offsetY
  } else {
    xcord = Math.min(Math.max((event.offsetX - (WIDTH - GAPWIDTH) / 2 + GAPWIDTH / 22), GAPWIDTH / 11), GAPWIDTH * 21 / 22) // 2*(x+1) -> 22
    xcord = Math.floor(xcord / GAPWIDTH * 11)
    ycord = Math.min(Math.max((event.offsetY - (HEIGHT - GAPHEIGHT) / 2 + GAPHEIGHT / 22), GAPHEIGHT / 11), GAPHEIGHT * 21 / 22)
    ycord = Math.floor(ycord / GAPHEIGHT * 11)
  }
}

function handleClick (event) {
  if (event.offsetX >= 10 && event.offsetY >= 10 && event.offsetX <= 30 && event.offsetY <= 30) {
    mode = !mode
    x1 = -100
    y1 = -100
    xcord = 20
    ycord = 20
  } else if (!mode) dots[xcord - 1][ycord - 1] = !dots[xcord - 1][ycord - 1]
  else {
    x2 = event.offsetX
    y2 = event.offsetY
    if (x1 === -100) {x1 = x2; y1 = y2;}
    if (!(x1 === x2 && y1 === y2)) {
      calculatedots()
      x = 0
      k = (y2 - y1) / (x2 - x1)
      b = y1 - k * x1
      if (x * k + b > HEIGHT) x = (HEIGHT - b) / k
      else if (x * k + b < 0) x = -b / k
    }
  }
}

function calculatedots() {
  leftdots = 0
  rightdots = 0
  if (x1 === x2) {
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        if (dots[i - 1][j - 1]) {
          if (WIDTH / 10 + GAPWIDTH * i / 11 < x1 - 10) leftdots++
          if (WIDTH / 10 + GAPWIDTH * i / 11 > x1 + 10) rightdots++
        }
      }
    }
  } else {
    k = (y2 - y1) / (x2 - x1)
    b = y1 - k * x1
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        if (dots[i - 1][j - 1]) {
          if (Math.abs((WIDTH / 10 + GAPWIDTH * i / 11) * k + b - HEIGHT / 10 - GAPHEIGHT * j / 11) > 20) {
            if ((WIDTH / 10 + GAPWIDTH * i / 11) * k + b > HEIGHT / 10 + GAPHEIGHT * j / 11) leftdots++
            if ((WIDTH / 10 + GAPWIDTH * i / 11) * k + b < HEIGHT / 10 + GAPHEIGHT * j / 11) rightdots++
          }
        }
      }
    }
    
    //if (x1 > x2 || (x1 === x2 && y1 < y2)) {leftdots += rightdots; rightdots = leftdots - rightdots; leftdots -= rightdots;}
  }
  log(leftdots, rightdots)
}

requestAnimationFrame(render)

function render (time) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  field()
  drawdots()
  if (!(x1 === x2 && y1 === y2)) {
    angle = Math.atan((y2 - y1) / (x2 - x1)) * -1
    ctx.lineWidth = 2
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    if (x1 !== x2) {
      k = (y2 - y1) / (x2 - x1)
      b = y1 - k * x1
      drone(x + Math.cos(angle) * (time - told) * SPEED, (x + Math.cos(angle) * (time - told) * SPEED) * k + b, angle)
      ctx.moveTo(-50 + Math.cos(angle + Math.PI * 0.5) * -10, -50 * k + b + Math.sin(angle + Math.PI * 0.5) * 10)
      ctx.lineTo(WIDTH + 50 + Math.cos(angle + Math.PI * 0.5) * -10, (WIDTH + 50) * k + b + Math.sin(angle + Math.PI * 0.5) * 10)
      ctx.moveTo(-50 + Math.cos(angle + Math.PI * 1.5) * -10, -50 * k + b + Math.sin(angle + Math.PI * 1.5) * 10)
      ctx.lineTo(WIDTH + 50 + Math.cos(angle + Math.PI * 1.5) * -10, (WIDTH + 50) * k + b + Math.sin(angle + Math.PI * 1.5) * 10)
    } else {
      ctx.moveTo(x1 - 10, HEIGHT)
      ctx.lineTo(x1 - 10, 0)
      ctx.moveTo(x1 + 10, HEIGHT)
      ctx.lineTo(x1 + 10, 0)
    }
    ctx.stroke()
    if (x + Math.cos(angle) * (time - told) * SPEED < 0 || x + Math.cos(angle) * (time - told) * SPEED > WIDTH) {x1 = -100; y1 = -100; x2 = -100; y2 = -100;}
    if ((x + Math.cos(angle) * (time - told) * SPEED) * k + b < 0 || (x + Math.cos(angle) * (time - told) * SPEED) * k + b > HEIGHT) {x1 = -100; y1 = -100; x2 = -100; y2 = -100;}
  } else {
    told = time
    if (!mode) {
      circle(WIDTH / 10 + GAPWIDTH * xcord / 11, HEIGHT / 10 + GAPHEIGHT * ycord / 11, 10, 2, "red")
      circle(WIDTH / 10 + GAPWIDTH * xcord / 11, HEIGHT / 10 + GAPHEIGHT * ycord / 11, 3, 2, "red")
    } else {
      circle(20, 20, 10, 2, "red")
      circle(x1, y1, 5, 2, "blue")
      circle(x2, y2, 5, 2, "blue")
      circle(xcord, ycord, 10, 2, "blue")
      circle(xcord, ycord, 3, 2, "blue")
    }
  }
  requestAnimationFrame(render)
}