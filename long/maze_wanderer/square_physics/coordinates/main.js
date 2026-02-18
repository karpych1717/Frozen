const cursor = new Image()
cursor.src = 'cursor.png'

_canvas.width = 502
_canvas.height = 320
_canvas.style.backgroundColor = 'rgb(58, 157, 100)'

const context = _canvas.getContext('2d')

const draw_color = 'rgb(0, 70, 55)'
const draw_color_prime = 'rgb(143, 231, 0)'

const xShift = 40
const yShift = 40

let x = 200 * Math.random() + 10
let y = 200 * Math.random() + 10

let angle = Math.PI / 35

let x_prime = x * Math.cos(angle) + y * Math.sin(angle)
let y_prime = -x * Math.sin(angle) + y * Math.cos(angle)

_canvas.onpointerdown = clickHandler
document.onkeydown = keyHandler
draw()


function draw () {
  context.clearRect(0, 0, _canvas.width, _canvas.height)

  context.save()
  context.font = 'normal 12px monospace'
  context.strokeStyle = draw_color
  context.fillStyle = draw_color

  context.translate(xShift, yShift)
  drawAxis('x')
  
  context.rotate(Math.PI / 2)
  drawAxis('y')
  context.restore()

  context.save()
  context.font = 'normal 12px monospace'
  context.strokeStyle = draw_color_prime
  context.fillStyle = draw_color_prime
  
  context.translate(xShift, yShift)
  context.rotate(angle)
  drawAxis('x\'')
  context.rotate(Math.PI / 2)
  drawAxis('y\'')
  context.restore()

  context.save()
  context.font = 'normal 30px monospace'

  context.fillStyle = draw_color
  context.fillText('x = ' + x, 320, 80)
  context.fillText('y = ' + y, 320, 110)
  context.fillStyle = draw_color_prime
  context.fillText('x\'= ' + x_prime, 320, 150)
  context.fillText('y\'= ' + y_prime, 320, 180)

  context.font = 'normal 14px monospace'
  context.fillStyle = 'rgb(54, 0, 0)'
  context.strokeStyle = 'rgb(54, 0, 0)'
  context.strokeRect(315, 265, 182, 45)
  context.fillText('<click> to move object', 320, 280)
  context.fillText('<A> <D> to rotate axes', 320, 300)
  context.restore()

  context.drawImage(
    cursor,
    xShift + x - 15, yShift + y - 15,
    30, 30
  )

  requestAnimationFrame(draw)
}

function drawAxis (name) {
  context.beginPath()
  context.moveTo(0, 0)
  context.arc(0, 0, 3, 0, 2 * Math.PI)
  context.fill()

  context.beginPath()
  context.moveTo(0, 0)
  context.lineTo(240, 0)
  context.stroke()

  for (let x = 50; x < 240; x += 50) {
    context.fillRect(x - 1, -3, 2, 6)
    context.fillText(x, x + 3, -5)
  }

  context.beginPath()
  context.moveTo(240, 0)
  context.lineTo(235, -5)
  context.lineTo(235, 5)
  context.lineTo(240, 0)
  context.fill()

  context.fillText(name, 235, -10)
}

function clickHandler (event) {
  x = event.offsetX - xShift
  y = event.offsetY - yShift

  x_prime = x * Math.cos(angle) + y * Math.sin(angle)
  y_prime = -x * Math.sin(angle) + y * Math.cos(angle)
}

function keyHandler (event) {
  switch (event.code) {
    case 'KeyA':
      angle -= Math.PI / 35
      break
    case 'KeyD':
      angle += Math.PI / 35
      break
  }

  x_prime = x * Math.cos(angle) + y * Math.sin(angle)
  y_prime = -x * Math.sin(angle) + y * Math.cos(angle)
}