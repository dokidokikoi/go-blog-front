
export const getItem = (key) => {
    const data = window.localStorage.getItem(key)
    if (!data) return null
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }
  
export const setItem = (key, value) => {
  if (typeof value === 'object') {
      value = JSON.stringify(value)
  }
  if (typeof value === 'undefined') return
  window.localStorage.setItem(key, value)
}
  
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}