function onSucces(data) {
  data.list.map((brawler) => brawler.isHit = false)
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