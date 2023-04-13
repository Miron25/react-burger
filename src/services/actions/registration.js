import { NORMA_API } from '../../utils/burger-api'

export const GET_REGISTRATION_REQUEST = 'GET_REGISTRATION_REQUEST'
export const GET_REGISTRATION_SUCCESS = 'GET_REGISTRATION_SUCCESS'
export const GET_REGISTRATION_ERROR = 'GET_REGISTRATION_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getRegistration({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTRATION_REQUEST,
    })
    fetch(`${NORMA_API}/auth/register`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          console.log(result)
          dispatch({
            type: GET_REGISTRATION_SUCCESS,
            user: result.user,
            access_token: localStorage.setItem('a_token', result.accessToken),
            refresh_token: localStorage.setItem('r_token', result.refreshToken),
          })
        } else {
          dispatch({
            type: GET_REGISTRATION_ERROR,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_REGISTRATION_ERROR,
        })
      })
  }
}
