function render () {
  update()

  ctx.clearRect(0, 0, 500, 500)
  display()
}

function update () {
  // спочатку апдейт всіх сутностей
  // потім перевірка на всі collisions і що воно сі трапляє
}

function display () {
  // намалювати всі сутності
}

function keydownHandler (event) {
  console.log(event.code) // використати це для визначення кнопки
}

function keyupHandler (event) {

}