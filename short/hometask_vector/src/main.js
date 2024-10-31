'use strict'

function log (something) {
  _textarea.value += something
  _textarea.value += '\n'
}

function vecLog (vector) {
  if (vector instanceof Vector) {
    log(vector.string)
    log(vector.abs)
    log(Math.round(vector.angle / Math.PI * 180))

    return
  }

  throw new Error ('vector is not a Vector')
}

const vector1 = new Vector(1, 0, 'Cartesian')
const vector2 = new Vector(1, Math.PI, 'Polar')

const vector3 = vector1.multyplyNumber(7)
const vector4 = vector2.add(new Vector(-12, 0, 'Cartesian'))

const MScalar = vector1.multyplyScalar(vector2)
const MVector = vector1.multyplyVector(new Vector(0, 1, 'Cartesian'))

;[vector1, vector2, vector3, vector4]
  .forEach(vector => {
    vecLog(vector)
    log('\n')
  })

log(MScalar)
log(MVector)
