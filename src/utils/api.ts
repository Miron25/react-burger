export const NORMA_API = 'https://norma.nomoreparties.space/api'

export interface IOptions {
  method: 'POST' | 'GET' | 'PATCH'
  headers: {
    'Content-Type': string
    Authorization?: string
  }
  Body:
    | {
        token?: string
        ingredients?: ReadonlyArray<string>
        name?: string
        email?: string
        password?: string
      }
    | null
    | undefined
}

export const checkResponse = (res: any) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err))
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

export const fetchWithRefresh = async (url: string, options: IOptions) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      console.log('JWT expired!!!')
      const refreshData = await refreshToken() //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData)
      }
      localStorage.setItem('r_token', String(refreshData.refreshToken))
      localStorage.setItem('a_token', String(refreshData.accessToken))
      options.headers.Authorization = refreshData.accessToken
      const res = await fetch(url, options) //повторяем запрос
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
