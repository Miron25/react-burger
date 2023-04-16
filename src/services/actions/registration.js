import { NORMA_API, checkResponse } from '../../utils/api'
import { optionsType } from '../../utils/types'

export const GET_REGISTRATION_REQUEST = 'GET_REGISTRATION_REQUEST'
export const GET_REGISTRATION_SUCCESS = 'GET_REGISTRATION_SUCCESS'
export const GET_REGISTRATION_ERROR = 'GET_REGISTRATION_ERROR'

export function getRegistration({ options_1 }) {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTRATION_REQUEST,
    })
    fetch(`${NORMA_API}/auth/register`, options_1)
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

getRegistration.propTypes = {
  options: optionsType,
}
