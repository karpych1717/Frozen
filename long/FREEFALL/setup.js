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

let told = 0

let last_press
let steering = 0

let colision

const FREEFALL = {
    bullet: new Bullet(240, 440, 0.25, -0.25, 20, 20, "green"),
    palette: new Palette(200, 460, 100, 20, "black"),

    update (dt) {
        if (steering > 0) this.palette.Vx = this.palette.V
        if (steering < 0) this.palette.Vx = -this.palette.V
        if (steering === 0) this.palette.Vx = 0
        //console.log(steering)
        // спочатку апдейт всіх сутностей
        // потім перевірка на всі collisions і що воно сі трапляє
        this.palette.updateIt(dt)
        this.bullet.updateIt(dt)
        
        if (this.bullet.x <= 0) {
            this.bullet.Vx = Math.abs(this.bullet.Vx)
        }
        if (this.bullet.x >= WIDTH - this.bullet.width) {
            this.bullet.Vx = Math.abs(this.bullet.Vx) * -1
        }
        if (this.bullet.y <= 0) {
            this.bullet.Vy = Math.abs(this.bullet.Vy)
        }
        if (this.bullet.y > HEIGHT - this.bullet.height) {
            //bullet.Vy = Math.abs(bullet.Vy) * -1
            this.bullet.Vx = 0
            this.bullet.Vy = 0
        }
        
        colision = this.bullet.isIn(this.palette)
        if (colision == 1 || colision == 5) {
            this.bullet.Vy = Math.abs(this.bullet.Vy) * -1
            if (this.palette.Vx > 0) this.bullet.Vx = Math.abs(this.bullet.Vx)
            if (this.palette.Vx < 0) this.bullet.Vx = Math.abs(this.bullet.Vx) * -1
        }
        if (colision == 2) this.bullet.Vx = Math.abs(this.bullet.Vx)
        if (colision == 4) this.bullet.Vx = Math.abs(this.bullet.Vx) * -1
  
        for (let i = 0; i < targets.length; i++) {
            colision = this.bullet.isIn(targets[i])
            if (colision != 0) {
                if (colision == 2 || colision == 4) this.bullet.Vx *= -1
                if (colision == 1 || colision == 3) this.bullet.Vy *= -1
                if (colision == 5) {
                    this.bullet.Vx *= -1
                    this.bullet.Vy *= -1
                }
                targets.splice(i, 1);
            }
        }
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