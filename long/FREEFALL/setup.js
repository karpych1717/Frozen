_cvs.width = 500
_cvs.height = 500
_cvs.style.border = 'red solid 1px'
const ctx = _cvs.getContext('2d')

const targets = new Array()

const WIDTH = 500
const HEIGHT = 500

const boxWidth = 20
const boxHeight = 20
const boxGap = 20

let r = 0
let g = 0
let randomNumber

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 12; col++) {
        rect = new Rectangle()

        rect.x = col * (boxWidth + boxGap) + boxGap
        rect.y = row * (boxHeight + boxGap) + boxGap
        rect.width = boxWidth
        rect.height = boxHeight

        randomNumber = Math.floor(Math.random() * 511);
        r = Math.max(0, 255 - randomNumber)
        g = Math.max(0, randomNumber - 255)

        rect.color = 'rgb(' + r + ', ' + g + ', 255)'

        targets.push(rect)
    }
}

const bullet = new Bullet()
const palette = new Palette()

bullet.x = 240
bullet.y = 440
bullet.width =  20
bullet.height = 20
bullet.color = "green"
bullet.Vx = 0.25
bullet.Vy = -0.25

palette.x = 200
palette.y = 460
palette.width = 100
palette.height = 20
palette.color = "black"
palette.Vx = 0

let told = 0

let last_press
let steering = 0