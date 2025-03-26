import Button from "./Button"

function clickHandler(event) {
  const x = event.offsetX
  const y = event.offsetY

  alert(x + " " + y)
}

export default clickHandler
