function onSucces(data) {
  return data.list
}

function onError() {
  throw new Error("Couldn't fetch data")
}

export async function fetchBrawlers() {
  try {
    const response = await fetch('https://api.brawlify.com/v1/brawlers', {mode: 'cors'});
    const data = await response.json()
    return onSucces(data)
  } catch (error) {
    return onError()
  }
}

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