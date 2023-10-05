document.getElementById('form').addEventListener('submit', submitHandler)

const toCheck = [11, 84, 8, 13, 65, 490, 491, 4552, 9355]

function submitHandler (event) {
  event.preventDefault()

  const file = fileFromSubmit(event)
  const numbers = parseToArray(file)

  for (let i = 0; i < numbers.length; i++) {
    log(numbers[i])
  }

  for (let i = 0; i < toCheck.length; i++) {
    log(toCheck[i], check(toCheck[i], numbers))
  }
}

function check (number, numbers) {
  return // if numbers includes number
}
