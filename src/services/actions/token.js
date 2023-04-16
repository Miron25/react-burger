import { NORMA_API, checkResponse } from '../../utils/api'
import { optionsType } from '../../utils/types'

export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST'
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS'
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR'

export function getToken({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_TOKEN_REQUEST,
    })
    console.log(options)
    fetch(`${NORMA_API}/auth/token`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          console.log(result)
          dispatch({
            type: GET_TOKEN_SUCCESS,
            token: result.refreshToken,
            access_token: localStorage.setItem('a_token', result.accessToken),
            refresh_token: localStorage.setItem('r_token', result.refreshToken),
          })
        } else {
          dispatch({
            type: GET_TOKEN_ERROR,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_TOKEN_ERROR,
        })
      })
  }
}

getToken.propTypes = {
  options: optionsType,
}
