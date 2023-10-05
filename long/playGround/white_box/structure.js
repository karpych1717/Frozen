/* global log */

const base = [
  { vertice: 0, edges: [1, 2, 5] },
  { vertice: 1, edges: [0, 3] },
  { vertice: 2, edges: [0, 4, 6] },
  { vertice: 3, edges: [1] },
  { vertice: 4, edges: [2] },
  { vertice: 5, edges: [0, 6] },
  { vertice: 6, edges: [2, 5, 7] },
  { vertice: 7, edges: [6, 8, 9] },
  { vertice: 8, edges: [7, 9] },
  { vertice: 9, edges: [7, 10] },
  { vertice: 10, edges: [9, 11] },
  { vertice: 11, edges: [10] }
]

const graph = makeGraph(base)
const ways = findWays(graph, 0, 11)
const table = makeTable(graph)

ways.forEach(way => log(way))
table.forEach(row => log(row))

function makeGraph (base) {
  const nodes = base.map(element => {
    return { name: element.vertice, connections: [] }
  })

  // ????

  return nodes
}

function findWays (graph, start, finish) {
  const ways = []

  // ????

  return ways
}

function makeTable (graph) {
  const table = []

  // ????

  return table
}
