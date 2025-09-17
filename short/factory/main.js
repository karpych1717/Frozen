/* global _canvas */
'use strict'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'


function factory() {
    let last = Date.now()
    function count() {
        console.log((Date.now() - last) / 1000)
        last = Date.now()
    }
    return count
}

class B {
    constructor() {
        this.lastClick = Date.now()
    }

    handleClick() {
        console.log((Date.now() - this.lastClick) / 1000)
        this.lastClick = Date.now()
    }
}

class C {
    constructor(id) {
        this.button = document.getElementById(id)
        this.button.onclick = () => this.handleClick()
        this.lastClick = Date.now()
    }

    handleClick() {
        console.log((Date.now() - this.lastClick) / 1000)
        this.lastClick = Date.now()
    }
}

let a = factory()
let b = new B()
let c = new C('_Button3')

_Button1.onclick = () => {
    a()
}

_Button2.onclick = () => {
    b.handleClick()
}