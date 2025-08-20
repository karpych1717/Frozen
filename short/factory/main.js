/* global _canvas */
'use strict'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'


function factory() {
    let x = 0
    function count1() {
        console.log(x)
        x += 1
    }
    function count2() {
        console.log(x)
        x += 1
    }
    return [count1, count2]
}

let [a, b] = factory()

_Button1.onclick = () => {
    a()
}

_Button2.onclick = () => {
    b()
}