_cvs.width = 500
_cvs.height = 500
_cvs.style.border = 'red solid 1px'
const ctx = _cvs.getContext('2d')

const targets = new Array()

const WIDTH = 500
const HEIGHT = 500
const G = 0.00025
const A = 0.000005

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

let told = 0

let last_press
let steering = 0

let colision

const FREEFALL = {
    update (dt) {
        if (steering > 0) palette.Vx = palette.V
        if (steering < 0) palette.Vx = -palette.V
        if (steering === 0) palette.Vx = 0
        //console.log(steering)
        // спочатку апдейт всіх сутностей
        // потім перевірка на всі collisions і що воно сі трапляє
        palette.updateIt(dt)
        bullet.updateIt(dt)
        
        if (bullet.x <= 0) {
            bullet.Vx = Math.abs(bullet.Vx)
        }
        if (bullet.x >= WIDTH - bullet.width) {
            bullet.Vx = Math.abs(bullet.Vx) * -1
        }
        if (bullet.y <= 0) {
            bullet.Vy = Math.abs(bullet.Vy)
        }
        if (bullet.y > HEIGHT - bullet.height) {
            //bullet.Vy = Math.abs(bullet.Vy) * -1
            bullet.Vx = 0
            bullet.Vy = 0
        }
        
        colision = bullet.isIn(palette)
        if (colision == 1 || colision == 5) {
            bullet.Vy = Math.abs(bullet.Vy) * -1
            if (palette.Vx > 0) bullet.Vx = Math.abs(bullet.Vx)
            if (palette.Vx < 0) bullet.Vx = Math.abs(bullet.Vx) * -1
        }
        if (colision == 2) bullet.Vx = Math.abs(bullet.Vx)
        if (colision == 4) bullet.Vx = Math.abs(bullet.Vx) * -1
  
        for (let i = 0; i < targets.length; i++) {
            colision = bullet.isIn(targets[i])
            if (colision != 0) {
                if (colision == 2 || colision == 4) bullet.Vx *= -1
                if (colision == 1 || colision == 3) bullet.Vy *= -1
                if (colision == 5) {
                    bullet.Vx *= -1
                    bullet.Vy *= -1
                }
                targets.splice(i, 1);
            }
        }
    },
  
    display () {
      // намалювати всі сутності
      palette.drawIt(ctx)
      bullet.drawIt(ctx)
      for (let i = 0; i < targets.length; i++) {
        targets[i].drawIt(ctx)
      }
    }
  }