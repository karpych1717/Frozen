setInterval(loop, DT)
document.onpointerdown = handleClick

function loop() {
  draw()
  update()
}

function draw() {
  context.clearRect(0, 0, WIDTH, HEIGHT)

  storage.drawIt(context)
}


function update() {
  storage.updateAccelerations()
  storage.updateSpeeds()
  storage.updateValues()
  storage.updateImageData()
}

function handleClick(event) {
  const x = Math.round(event.offsetX)
  const y = Math.round(event.offsetY)

  storage.pushSquare(x, y, 20)
}
