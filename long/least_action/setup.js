/* global canvasSetUp, log, toDeg, toRad */
'use strict'

const { cvs, ctx } = canvasSetUp()

const mutation_rate = 5
const mutation_chance = 0.4

const population_size = 10

let point_count = 0
let point_count_old = 0

let length_old = 0