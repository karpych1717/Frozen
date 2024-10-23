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

const WING_ANGLE = 0 * Math.PI / 180
const TAIL_ANGLE = 0

const WING_DISTANCE = Math.abs(WING_SHIFT)
const TAIL_DISTANCE = Math.sqrt(TAIL_SHIFT ** 2 + TAIL_RISE ** 2)

const WING_DIFF_ANGLE = Math.tanh(0 / WING_SHIFT) - Math.PI / 2
const TAIL_DIFF_ANGLE = Math.tanh(TAIL_RISE / TAIL_SHIFT) - Math.PI / 2

const ROTATION_SPEED = 0.01
const MOTOR_POWER = 100000

const keyboard = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
    KeyP: false,
    KeyL: false
}

_cvs.width = BOX_WIDTH
_cvs.height = BOX_HEIGHT
const ctx = _cvs.getContext('2d')

ctx.strokeStyle = 'white'
ctx.lineWidth = 1

body = new Brick (
    x = BOX_WIDTH / 2,
    y = BOX_HEIGHT / 2,
    z = BODY_HEIGHT,
    width = BODY_LENGTH,
    height = BODY_HEIGHT,
    angle = Math.PI / 2,
    color = 'white',
    mass = 1000
)

wing = new Brick (
    x = WING_DISTANCE * Math.sin(WING_DIFF_ANGLE - body.angle) + body.x,
    y = WING_DISTANCE * Math.cos(WING_DIFF_ANGLE - body.angle) + body.y,
    z = BOX_WIDTH / 2,
    width = WING_LENGTH,
    height = WING_HEIGHT,
    angle = body.angle + WING_ANGLE,
    color = 'white',
    mass = 1000
)

tail = new Brick (
    x = TAIL_DISTANCE * Math.sin(TAIL_DIFF_ANGLE - body.angle) + body.x,
    y = TAIL_DISTANCE * Math.cos(TAIL_DIFF_ANGLE - body.angle) + body.y,
    z = BODY_HEIGHT / 4,
    width = TAIL_LENGTH,
    height = TAIL_HEIGHT,
    angle = body.angle + TAIL_ANGLE,
    color = 'white',
    mass = 1000
)

const G = 9.8
const M = body.mass + wing.mass + tail.mass
const K_dt = 250
const Kf = 0.1
const Kl = 0.1

let F = new Vector(0, 0, 'Cartesian')
let A = new Vector(0, 0, 'Cartesian')
let V = new Vector(0, 3, 'Cartesian')

const Fg = new Vector(0, M * G, 'Cartesian')
let Ff = new Vector(0, 0, 'Cartesian')
let Fm = new Vector(0, 0, 'Cartesian')
let Fl = new Vector(0, 0, 'Cartesian')