export function saveToLocalStorage(dataName, data) {
  localStorage.setItem(dataName, data)
}

export function retrieveFromLocalStorage(dataName) {
  return JSON.parse(localStorage.getItem(dataName))
}