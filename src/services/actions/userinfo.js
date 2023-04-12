import { NORMA_API } from '../../utils/burger-api'
import { fetchWithRefresh } from '../../utils/api'
//import { getToken } from './token'
//import { getRToken } from '../../utils/helperfunctions' //setAToken, setRToken,
//import { useDispatch } from 'react-redux'
//import { useCallback } from 'react'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'
export const GET_USER_OUT = 'GET_USER_OUT'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getUserInfo({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })
    console.log(options)
    fetchWithRefresh(`${NORMA_API}/auth/user`, options)
      //.then(checkResponse)
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
  }
}

export function getUserUpdate({ patchOptions }) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })
    console.log(patchOptions)
    fetch(`${NORMA_API}/auth/user`, patchOptions)
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
  }
}