'use strict'

function log (something) {
  _textarea.value += something
  _textarea.value += '\n'
}

const vector1 = new Vector(1, 0, 'Cartesian')
const vector2 = new Vector(1, Math.PI, 'Polar')

const vector3 = vector1.multyplyNumber(7)
const vector4 = vector2.add(new Vector(-12, 0, 'Cartesian'))

const MScalar = vector1.multyplyScalar(vector2)
const MVector = vector1.multyplyVector(new Vector(0, 1, 'Cartesian'))

log(vector1.string)
log(vector2.string)
log(vector3.string)
log(vector4.string)

log(MScalar)
log(MVector)
