import Button from "./Button.js"
import { togglePauseButton } from "./main.js"
import { randomButton } from "./main.js"
import { clearButton } from "./main.js"
import { field } from "./main.js"
import { mouse } from "./main.js"
import { slider } from "./main.js"

function clickHandler(event) {
  const x = event.offsetX
  const y = event.offsetY
  
  //alert(x + " " + y)

  mouse.setDown()

  field.processClick(x, y)

  if (togglePauseButton.isOverIt(x, y)) togglePauseButton.onclick()
  if (randomButton.isOverIt(x, y)) randomButton.onclick()
  if (clearButton.isOverIt(x, y)) clearButton.onclick()

  slider.update(x - slider.w / 2, y - slider.h / 2)
}

export default clickHandler
