import { NORMA_API } from './burger-api'

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
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('JWT expired!!!')
      const refreshData = await refreshToken() //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData)
      }
      localStorage.setItem('r_token', refreshData.refreshToken)
      localStorage.setItem('a_token', refreshData.accessToken)
      options.headers.Authorization = refreshData.accessToken
      const res = await fetch(url, options) //повторяем запрос
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
