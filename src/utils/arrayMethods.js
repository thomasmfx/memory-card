export function pickRandom(data, quantity) {
  let randomized = []

  for (let i = 0; i < quantity; i++) {
    const index = Math.floor(Math.random() * data.length)
    randomized.push(
      data[index]
    )

    data.splice(index, 1)
  }

  return randomized
}

export function shuffleArray(array) {
  let shuffledArray = [];
  const initialLength = array.length

  for (let i = 0; i < initialLength; i++) {
    const index = Math.floor(Math.random() * array.length)
    shuffledArray.push(
      array[index]
    )

    array.splice(index, 1)
  }

  return shuffledArray
}