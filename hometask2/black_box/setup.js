const _terminal = document.getElementById('textarea')

function log (...input) {
  const output = input.map(element => normaliseSingleInput(element)).join(' ')

  _terminal.value += `${output}\n`
  _terminal.scrollTop = _terminal.scrollHeight
}

function normaliseSingleInput (input) {
  if (typeof input === 'string') return `'${input}'`
  if (typeof input === 'number') return String(input)

  if (Array.isArray(input)) {
    return `[${input.map(element => normaliseSingleInput(element)).join(', ')}]`
  }

  return input
}

function fileFromSubmit (event) {
  const _input = event.target.input

  if (_input.type !== 'file') {
    console.error('input is not a file')
    return
  }

  return _input.files[0]
}

function readSyncBinaryString (file) {
  // Create Object URL
  const url = URL.createObjectURL(file)

  // Synchronous XMLHttpRequest on Object URL
  const xhr = new window.XMLHttpRequest()
  xhr.open('GET', url, false)

  // Override MIME Type to prevent UTF-8 related errors
  xhr.overrideMimeType('text/plain; charset=x-user-defined')
  xhr.send()

  window.URL.revokeObjectURL(url)

  // remove higher byte
  let returnText = ''
  for (let i = 0; i < xhr.responseText.length; i++) {
    returnText += String.fromCharCode(xhr.responseText.charCodeAt(i) & 0xff)
  }

  return returnText
}

function parseToArray (file) {
  if (file === undefined) return []

  const array = readSyncBinaryString(file)
    .replaceAll('\r', '\n')
    .replaceAll('\n\n', '\n')
    .split('\n')
    .map(element => element.trim())
    .filter(element => element !== '')
    .map(element => isNaN(element) ? element : Number(element))
  return array
}

function toDeg (angleInRad) {
  return angleInRad / Math.PI * 180
}

function toRad (angleInDeg) {
  return angleInDeg / 180 * Math.PI
}
