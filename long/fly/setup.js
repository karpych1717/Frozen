const BOX_WIDTH = 750
const BOX_HEIGHT = 500

const BODY_LENGTH = 100
const BODY_HEIGHT = 25
const WING_LENGTH = 30
const WING_HEIGHT = 5
const TAIL_LENGTH = 15
const TAIL_HEIGHT = 5

const WING_SHIFT = -10
const TAIL_SHIFT = -50
const TAIL_RISE = 5

const WING_ANGLE = 0
const TAIL_ANGLE = 0

const WING_DISTANCE = Math.abs(WING_SHIFT)
const TAIL_DISTANCE = Math.sqrt(TAIL_SHIFT ** 2 + TAIL_RISE ** 2)

const WING_DIFF_ANGLE = Math.tanh(0 / WING_SHIFT) - Math.PI / 2
const TAIL_DIFF_ANGLE = Math.tanh(TAIL_RISE / TAIL_SHIFT) - Math.PI / 2

const ROTATION_SPEED = 0.05
let rotation = 0
let last_press = ""

_cvs.width = BOX_WIDTH
_cvs.height = BOX_HEIGHT
const ctx = _cvs.getContext('2d')

ctx.strokeStyle = 'white'
ctx.lineWidth = 1

body = new Rectangle
body.x = BOX_WIDTH / 2
body.y = BOX_HEIGHT / 2
body.width = BODY_LENGTH
body.height = BODY_HEIGHT
body.angle = 0
body.color = 'white'

wing = new Rectangle
wing.x = WING_DISTANCE * Math.sin(WING_DIFF_ANGLE - body.angle) + body.x
wing.y = WING_DISTANCE * Math.cos(WING_DIFF_ANGLE - body.angle) + body.y
wing.width = WING_LENGTH
wing.height = WING_HEIGHT
wing.angle = body.angle + WING_ANGLE
wing.color = 'white'

tail = new Rectangle
tail.x = TAIL_DISTANCE * Math.sin(TAIL_DIFF_ANGLE - body.angle) + body.x
tail.y = TAIL_DISTANCE * Math.cos(TAIL_DIFF_ANGLE - body.angle) + body.y
tail.width = TAIL_LENGTH
tail.height = TAIL_HEIGHT
tail.angle = body.angle + TAIL_ANGLE
tail.color = 'white'