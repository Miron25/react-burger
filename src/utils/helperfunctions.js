export const getAToken = () => {
  return localStorage.getItem('a_token')
}
export const removeAToken = () => {
  localStorage.removeItem('a_token')
}
export const setAToken = (val) => {
  localStorage.setItem('a_token', val)
}

export const getRToken = () => {
  return localStorage.getItem('r_token')
}
export const removeRToken = () => {
  localStorage.removeItem('r_token')
}
export const setRToken = (val) => {
  localStorage.setItem('r_token', val)
}
