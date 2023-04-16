import { NORMA_API, checkResponse } from '../../utils/api'
import { GET_AUTH_OUT } from '../actions/authorization'
import { GET_USER_OUT } from '../actions/userinfo'
import { optionsType } from '../../utils/types'

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST'
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS'
export const GET_LOGOUT_ERROR = 'GET_LOGOUT_ERROR'

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

getLogout.propTypes = {
  options2: optionsType,
}
