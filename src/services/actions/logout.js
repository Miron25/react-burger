import { NORMA_API } from '../../utils/burger-api'
import { GET_AUTH_OUT } from '../actions/authorization'
import { GET_USER_OUT } from '../actions/userinfo'

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST'
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS'
export const GET_LOGOUT_ERROR = 'GET_LOGOUT_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getLogout({ options2 }) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    })
    fetch(`${NORMA_API}/auth/logout`, options2)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch({
            type: GET_LOGOUT_SUCCESS,
          })
          dispatch({
            type: GET_AUTH_OUT,
          })
          dispatch({
            type: GET_USER_OUT,
          })
        } else {
          dispatch({
            type: GET_LOGOUT_ERROR,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_LOGOUT_ERROR,
        })
      })
  }
}
