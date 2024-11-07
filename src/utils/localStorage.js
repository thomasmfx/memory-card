export function saveToLocalStorage(keyName, key) {
  localStorage.setItem(keyName, key)
}

export function retrieveFromLocalStorage(key, defaultValue) {
  const value = localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : defaultValue;
}
