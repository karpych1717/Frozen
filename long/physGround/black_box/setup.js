const _terminal = document.getElementById('textarea')

function log (...input) {
  const output = input.map(element => normaliseSingleInput(element)).join(' ')

  _terminal.value += `${output}\n`
  _terminal.scrollTop = _terminal.scrollHeight
}

function toDeg (angleInRad) {
  return angleInRad / Math.PI * 180
}

function toRad (angleInDeg) {
  return angleInDeg / 180 * Math.PI
}
