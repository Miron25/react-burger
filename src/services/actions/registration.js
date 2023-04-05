import { NORMA_API } from '../../utils/burger-api'
import { setAToken, setRToken } from '../../utils/helperfunctions'

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
        console.log(result)
        if (result && result.success) {
          dispatch({
            type: GET_REGISTRATION_SUCCESS,
            user_email: result.user.email,
            user_name: result.user.name,
            access_token: setAToken(JSON.stringify(result.accessToken)),
            refresh_token: setRToken(JSON.stringify(result.refreshToken)),
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
