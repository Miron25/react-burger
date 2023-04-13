import { NORMA_API } from '../../utils/burger-api'

export const GET_EMAIL_REQUEST = 'GET_EMAIL_REQUEST'
export const GET_EMAIL_SUCCESS = 'GET_EMAIL_SUCCESS'
export const GET_EMAIL_ERROR = 'GET_EMAIL_ERROR'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getPasswordReset({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_EMAIL_REQUEST,
    })
    fetch(`${NORMA_API}/password-reset`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch({
            type: GET_EMAIL_SUCCESS,
            message: result.message,
            reset_key: localStorage.setItem('reset_key', true),
          })
        } else {
          dispatch({
            type: GET_EMAIL_ERROR,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_EMAIL_ERROR,
        })
      })
  }
}
