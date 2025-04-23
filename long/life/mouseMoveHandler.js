import Button from "./Button.js"
import { mouse } from "./main.js"
import { sliderMouse } from "./main.js"
import { slider } from "./main.js"

function mouseMoveHandler(event) {
  const x = event.offsetX
  const y = event.offsetY
  
  if (sliderMouse.isDown()) {
    slider.update(x, y)
  }

}

export default mouseMoveHandler
