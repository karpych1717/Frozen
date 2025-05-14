function loop() {
  draw()
  update()
}

function handleClick(event) {
  const x = Math.round(event.offsetX)
  const y = Math.round(event.offsetY)

  pushSquare(x, y, 20)
}

function draw() {
  context.clearRect(0, 0, WIDTH, HEIGHT)

  drawThePicture(context)
}


function update() {
  updateAccelerations()
  updateSpeeds()
  updateValues()
  updateThePicture()
}
