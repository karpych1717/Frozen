/* global canvasSetUp, log, toDeg, toRad */

const WIDTH = 750
const HEIGHT = 500
const GAPWIDTH = WIDTH * 4 / 5
const GAPHEIGHT = HEIGHT * 4 / 5
const SPEED = 0.3

let dots = Array(10).fill().map(() => Array(10).fill(0))
let mode = 0

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

function field() {
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'lime'
  ctx.rect(WIDTH / 10, HEIGHT / 10, GAPWIDTH, GAPHEIGHT)
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

let xcord = 2
let ycord = 2
let a
let b
let c
let d
let e
let x1
let y1
let x2
let y2
let xmouse = 0
let ymouse = 0
let told
let k
function handleMove (event) {
  xmouse = event.offsetX
  ymouse = event.offsetY
  if (mode < 2) {
    xcord = 2
    ycord = 2
    while (xcord < 10 && WIDTH / 10 + GAPWIDTH * xcord / 11 < xmouse) xcord++
    while (ycord < 10 && HEIGHT / 10 + GAPHEIGHT * ycord / 11 < ymouse) ycord++
    d = (xmouse - WIDTH / 10 - GAPWIDTH * xcord / 11) ** 2 + (ymouse - HEIGHT / 10 - GAPHEIGHT * ycord / 11) ** 2
    xcord--
    c = (xmouse - WIDTH / 10 - GAPWIDTH * xcord / 11) ** 2 + (ymouse - HEIGHT / 10 - GAPHEIGHT * ycord / 11) ** 2
    xcord++
    ycord--
    b = (xmouse - WIDTH / 10 - GAPWIDTH * xcord / 11) ** 2 + (ymouse - HEIGHT / 10 - GAPHEIGHT * ycord / 11) ** 2
    xcord--
    a = (xmouse - WIDTH / 10 - GAPWIDTH * xcord / 11) ** 2 + (ymouse - HEIGHT / 10 - GAPHEIGHT * ycord / 11) ** 2
    
    m = Math.min(Math.min(Math.min(a, b), c), d)
    if (b === m) xcord++
    else if (c === m) ycord++
    else if (d === m) {xcord++; ycord++;}
  }
}

function handleClick (event) {
  if (event.offsetX >= 10 && event.offsetY >= 10 && event.offsetX <= 30 && event.offsetY <= 30 && mode !== 2) {
    if (mode === 0) mode = 1
    else mode = 0
    x1 = -100
    y1 = -100
    x2 = -100
    y2 = -100
  } else if (mode === 0 && xcord !== -100) {
    if (dots[xcord - 1][ycord - 1] === 0) dots[xcord - 1][ycord - 1] = 1
    else dots[xcord - 1][ycord - 1] = 0
  } else if (mode === 1) {
    if (xmouse >= WIDTH / 10 && ymouse >= HEIGHT / 10 && xmouse <= WIDTH / 10 + GAPWIDTH && ymouse <= HEIGHT / 10 + GAPHEIGHT) {
      a = WIDTH / 10 + GAPWIDTH * xcord / 11
      b = HEIGHT / 10 + GAPHEIGHT * ycord / 11
    } else {
      a = event.offsetX
      b = event.offsetY
    }
    if (x1 === -100) {x1 = a; y1 = b;}
    else if (!(a === x1 && b === y1)) {x2 = a; y2 = b;}
  } else if (mode === 3) {mode = 1; x1 = -100; y1 = -100; x2 = -100; y2 = -100;}
}

function drawdots () {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      if (dots[i - 1][j - 1] === 1) circle(WIDTH / 10 + GAPWIDTH * i / 11, HEIGHT / 10 + GAPHEIGHT * j / 11, 7, 2, "red")
    }
  }
}

requestAnimationFrame(render)

function render (time) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  field()
  rect(10, 10, 20, 20, 1, "white")
  drawdots()
  if (mode === 0) {
    circle(WIDTH / 10 + GAPWIDTH * xcord / 11, HEIGHT / 10 + GAPHEIGHT * ycord / 11, 10, 2, "red")
  } else if (mode === 1) {
    circle(20, 20, 10, 2, "red")
    circle(x1, y1, 5, 2, "blue")
    circle(x2, y2, 5, 2, "blue")
    if (xmouse >= WIDTH / 10 && ymouse >= HEIGHT / 10 && xmouse <= WIDTH / 10 + GAPWIDTH && ymouse <= HEIGHT / 10 + GAPHEIGHT) {
      circle(WIDTH / 10 + GAPWIDTH * xcord / 11, HEIGHT / 10 + GAPHEIGHT * ycord / 11, 10, 2, "blue")
    } else if (!(xmouse >= 10 && ymouse >= 10 && xmouse <= 30 && ymouse <= 30)) {
      circle(xmouse, ymouse, 10, 2, "blue")
      circle(xmouse, ymouse, 3, 2, "blue")
    }
    if (x2 !== -100) mode = 2
  } else if (mode === 2) {
    a = Math.atan((y2 - y1) / (x2 - x1)) * -1
    k = (y2 - y1) / (x2 - x1)
    b = y1 - k * x1
    if (x1 > x2) {
      a += Math.PI
      c = WIDTH
      d = k * c + b
      while (d < 0 || d > HEIGHT) {c--; d = k * c + b;}
    } else if (x1 < x2) {
      c = 0
      d = k * c + b
      while (d < 0 || d > HEIGHT) {c++; d = k * c + b;}
    } else {
      c = x1
      d = HEIGHT + 50
      if (y1 < y2) d = -50
    }
    told = time
    e = 0
    f = 0
    if (x1 !== x2) {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          if (dots[i - 1][j - 1] === 1) {
            if ((WIDTH / 10 + GAPWIDTH * i / 11) * k + b - 10 > HEIGHT / 10 + GAPHEIGHT * j / 11) e++
            if ((WIDTH / 10 + GAPWIDTH * i / 11) * k + b + 10 < HEIGHT / 10 + GAPHEIGHT * j / 11) f++
          }
        }
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          if (dots[i - 1][j - 1] === 1) {
            if (WIDTH / 10 + GAPWIDTH * i / 11 < x1 - 10) e++
            if (WIDTH / 10 + GAPWIDTH * i / 11 > x1 + 10) f++
          }
        }
      }
    }
    if (x1 > x2 || (x1 === x2 && y1 < y2)) {e += f; f = e - f; e = e - f;}
    log(e, f)
    mode = 3
  }
  if (mode === 3) {
    circle(20, 20, 10, 2, "red")
    circle(x1, y1, 5, 2, "blue")
    circle(x2, y2, 5, 2, "blue")
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'white'
    if (x1 !== x2) {
      e = 0
      f = 0
      if (x1 > x2) e = 10
      if (y1 < y2) f = 10
      ctx.moveTo(f - 5, b + e - 5)
      ctx.lineTo(WIDTH + f - 5, k * WIDTH + b + e - 5)
      ctx.moveTo(5 - f, b + 5 - e)
      ctx.lineTo(WIDTH - f + 5, k * WIDTH + b - e + 5)
    } else {
      ctx.moveTo(x1 - 7, -50)
      ctx.lineTo(x1 - 7, HEIGHT + 50)
      ctx.moveTo(x1 + 7, -50)
      ctx.lineTo(x1 + 7, HEIGHT + 50)
    }
    ctx.stroke()
    e = c + Math.cos(a) * (time - told) * SPEED
    f = d - Math.sin(a) * (time - told) * SPEED
    if (x1 === y1) f = (time - told) * SPEED * (Math.abs(y2 - y1 + 1) - Math.abs(y2 - y1))
    drone(e, f, a)
    if (e < -50 || e > WIDTH + 50 || f < -50 || f > HEIGHT + 50) {
      mode = 1
      x1 = -100
      y1 = -100
      x2 = -100
      y2 = -100
    }
  }
  requestAnimationFrame(render)
}