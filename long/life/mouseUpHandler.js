import Button from "./Button.js"
import { mouse } from "./main.js"
import { sliderMouse } from "./main.js"

function mouseUpHandler(event) {
  const x = event.offsetX
  const y = event.offsetY
  
  mouse.setUp()
  sliderMouse.setUp()
}

export default mouseUpHandler
