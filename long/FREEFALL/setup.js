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
        rect = new Target()

        rect.x = col * (boxWidth + boxGap) + boxGap + boxWidth / 2
        rect.y = row * (boxHeight + boxGap) + boxGap + boxHeight / 2
        rect.width = boxWidth
        rect.height = boxHeight
        rect.last_collision = 'none'

        randomNumber = Math.floor(Math.random() * 511);
        r = Math.max(0, 255 - randomNumber)
        g = Math.max(0, randomNumber - 255)

        rect.color = 'rgb(' + r + ', ' + g + ', 255)'

        targets.push(rect)
    }
}

let told = 0

const FREEFALL = {
    colision: 'none',
    left_button: false,
    right_button: false,

    bullet: new Bullet(240, 440, 0.25, -0.25, 20, 20, "green"),
    palette: new Palette(200, 470, 100, 20, "black"),

    update (dt) {
        this.palette.Vx = 0
        if (this.right_button && !this.left_button) this.palette.Vx = this.palette.V
        if (!this.right_button && this.left_button) this.palette.Vx = -this.palette.V
        //console.log(steering)
        // спочатку апдейт всіх сутностей
        // потім перевірка на всі collisions і що воно сі трапляє
        this.palette.updateIt(dt)
        this.bullet.updateIt(dt)
        
        if (this.bullet.x <= this.bullet.width / 2) {
            this.bullet.Vx = Math.abs(this.bullet.Vx)
        }
        if (this.bullet.x >= WIDTH - this.bullet.width / 2) {
            this.bullet.Vx = Math.abs(this.bullet.Vx) * -1
        }
        if (this.bullet.y <= this.bullet.height / 2) {
            this.bullet.Vy = Math.abs(this.bullet.Vy)
        }
        if (this.bullet.y > HEIGHT - this.bullet.height / 2) {
            //bullet.Vy = Math.abs(bullet.Vy) * -1
            this.bullet.Vx = 0
            this.bullet.Vy = 0
        }

        for (let i = 0; i < targets.length; i++) {
            this.colision = getCollisionType(targets[i], FREEFALL.bullet)
            if (this.colision == 'full') {
                if (targets[i].last_collision == 'horisontal') this.bullet.Vx *= -1
                if (targets[i].last_collision == 'vertical') this.bullet.Vy *= -1
                if (targets[i].last_collision == 'none') {
                    this.bullet.Vx *= -1
                    this.bullet.Vy *= -1
                }

                targets.splice(i, 1);
            } else {
                targets[i].last_collision = this.colision
            }

        }

        this.colision = getCollisionType(FREEFALL.palette, FREEFALL.bullet)
        if (this.colision == 'full') {
            if (FREEFALL.palette.last_collision == 'horisontal') {
                if (FREEFALL.bullet.x < FREEFALL.palette.x) this.bullet.Vx = -Math.abs(this.bullet.Vx)
                if (FREEFALL.bullet.x >= FREEFALL.palette.x) this.bullet.Vx = Math.abs(this.bullet.Vx)
            }
            if (FREEFALL.palette.last_collision == 'vertical') this.bullet.Vy *= -1
            if (FREEFALL.palette.last_collision == 'none') {
                this.bullet.Vx *= -1
                this.bullet.Vy *= -1
            }
        }
        FREEFALL.palette.last_collision = this.colision
    },
  
    display () {
      // намалювати всі сутності
      this.palette.drawIt(ctx)
      this.bullet.drawIt(ctx)
      for (let i = 0; i < targets.length; i++) {
        targets[i].drawIt(ctx)
      }
    }
  }