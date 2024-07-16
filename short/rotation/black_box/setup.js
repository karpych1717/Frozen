function canvasSetUp (id = 'canvas', context = '2d', width = 750, height = 500) {
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
