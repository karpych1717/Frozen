import Button from "./Button.js"
import { mouse } from "./main.js"
import { slider } from "./main.js"

function mouseMoveHandler(event) {
  const x = event.offsetX
  const y = event.offsetY
  
  if (mouse.isDown()) {
    if (slider.isOverBox(x, y)) {
      slider.update(x, y)
    }
  }

}

export default mouseMoveHandler
