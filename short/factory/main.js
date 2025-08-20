/* global _canvas */
'use strict'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'


function factory() {
    let x = 0
    function count() {
        console.log(x)
        x += 1
    }
    return count
}

let a = factory()
let b = factory()

_Button1.onclick = () => {
    a()
}

_Button2.onclick = () => {
    b()
}