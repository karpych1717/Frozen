function maker (name) {
  let i = 0

  return function () {
    console.log(name, i)
    i++
  }
}

const f = maker('f')
const g = maker('g')

setInterval(f, 1000)
setInterval(g, 500)
