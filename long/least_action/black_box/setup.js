function canvasSetUp (id = 'canvas', context = '2d', width = 500, height = 500) {
  const cvs = document.getElementById(id)
  const ctx = cvs.getContext(context)
  cvs.width = width
  cvs.height = height

  return { cvs, ctx }
}

function log (...input) {
  console.log('------ start log: ------')
  console.log(...input)
  console.log('------- end log. -------')
}

function toDeg (angleInRad) {
  return angleInRad / Math.PI * 180
}

function toRad (angleInDeg) {
  return angleInDeg / 180 * Math.PI
}

function almostRandomColor () {
  const r = 150 + Math.round(105 * Math.random())
  const g = 150 + Math.round(105 * Math.random())
  const b = 150 + Math.round(105 * Math.random())

  return `rgb{${r}, ${g}, ${b}}`
}
