import { NORMA_API } from './burger-api'
//import { getToken } from './token'
//import { getRToken } from '../../utils/helperfunctions'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const refreshToken = () => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('r_token'),
    }),
  }).then(checkResponse)
}

export const fetchWithRefresh = async (url, options) => {
  console.log(options)
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('JWT expired!!!')
      const refreshData = await refreshToken() //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData), console.log('rejected')
      }
      localStorage.setItem('r_token', refreshData.refreshToken)
      localStorage.setItem('a_token', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      console.log(options)
      const res = await fetch(url, options) //повторяем запрос
      return await checkResponse(res)
    } else {
      console.log('Last reject!')
      return Promise.reject(err)
    }
  }
}
