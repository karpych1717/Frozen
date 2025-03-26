import Button from "./Button.js"
import { pause } from "./main.js"

function clickHandler(event) {
  const x = event.offsetX
  const y = event.offsetY

  alert(x + " " + y)
  if (pause.isOverIt(x, y)) pause.onclick()
}

export default clickHandler
