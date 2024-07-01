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


_cvs.width = BOX_WIDTH
_cvs.height = BOX_HEIGHT
const ctx = _cvs.getContext('2d')

ctx.strokeStyle = 'white'
ctx.lineWidth = 1
