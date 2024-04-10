let array = new Array(1)
let vars = [0, 1]

function get (ar, vars) {
    const ans = ar[vars[0]-1]
    ar[vars[0]-1] = undefined
    vars[0] = Math.max(vars[0] - 1, 0)
    return [ar, vars, ans]
}

function add (ar, vars, value) {
    if (vars[0] === vars[1]) { // expanding the array
        vars[1] = vars[1] * 2
        ar2 = new Array(vars[1])
        for (let x = 0; x < vars[0]; x++) {
            ar2[x] = ar[x]
        }
        ar = ar2
    }
    ar[vars[0]] = value
    vars[0]++
    return [ar, vars]
}

log("array at the start              :", array)

d = add(array, vars, 1)
array = d[0]
vars = d[1]
log("array after adding 1            :", array)

d = add(array, vars, 2)
array = d[0]
vars = d[1]
log("array after adding 2            :", array)

d = get(array, vars)
array = d[0]
vars = d[1]
log("array after removing an element :", array)
log("                            got :", d[2])

d = add(array, vars, 3)
array = d[0]
vars = d[1]
log("array after adding 3            :", array)

d = add(array, vars, 4)
array = d[0]
vars = d[1]
log("array after adding 4            :", array)
