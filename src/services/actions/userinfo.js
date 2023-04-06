import { NORMA_API } from '../../utils/burger-api'
//import { getToken } from './token'
import { getRToken } from '../../utils/helperfunctions' //setAToken, setRToken,
//import { useDispatch } from 'react-redux'
//import { useCallback } from 'react'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

/*export const refreshToken = () => {
  const options2 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: JSON.parse(getRToken()), //localStorage.getItem('r_token')
    }),
  }
  //console.log(options2)
  return fetch(`${NORMA_API}/auth/token`, options2) //.then(checkResponse)
}*/

/*export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (exception) {
    if (exception.message === 'jwt expired') {
      const refreshData = await refreshToken() //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData)
      }
      setAToken(JSON.stringify(refreshData.accessToken)),
        setRToken(JSON.stringify(refreshData.refreshToken)),
        //localStorage.setItem("refreshToken", refreshData.refreshToken);
        //localStorage.setItem("accessToken", refreshData.accessToken);
        (options.headers.authorization = refreshData.accessToken)
      const res = await fetch(url, options) //повторяем запрос
      return await checkResponse(res)
    } else {
      return Promise.reject(exception)
    }
  }
}*/

export function getUserInfo({ options }) {
  console.log(getRToken())
  const options2 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: getRToken(),
    }),
  }
  console.log(options2)
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })
    fetch(`${NORMA_API}/auth/user`, options)
      .then(checkResponse)
      .then((result) => {
        console.log(result)
        if (result && result.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: result.user,
          })
        } else {
          dispatch({
            type: GET_USER_ERROR,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        /*if (exception.message === 'jwt expired') {
           
           const refreshData = getToken(options2) //refreshToken() обновляем токен
          if (!refreshData.success) {
            console.log(refreshData)
            return Promise.reject(refreshData)
          }
          setAToken(JSON.stringify(refreshData.accessToken)),
            setRToken(JSON.stringify(refreshData.refreshToken)),
            //localStorage.setItem("refreshToken", refreshData.refreshToken);
            //localStorage.setItem("accessToken", refreshData.accessToken);
            (options.headers.authorization = refreshData.accessToken)
          console.log(options)
          getUserInfo(options)
          //const res = await fetch(url, options); //повторяем запрос
          //return await checkResponse(res);
        } else {
          return Promise.reject(exception)
        }*/

        dispatch({
          type: GET_USER_ERROR,
          message: exception.message,
        })
      })
  }
}
