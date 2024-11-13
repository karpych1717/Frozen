/* global canvasSetUp, log, toDeg, toRad */
'use strict'

const { cvs, ctx } = canvasSetUp('canvas', '2d', 500, 500)
const { cvs2, ctx2 } = canvasSetUp('canvas2', '2d', 500, 100)

const mutation_rate = 5
const mutation_chance = 0.4

const population_size = 10

let point_count = 0
let point_count_old = 0

let length_old = 0