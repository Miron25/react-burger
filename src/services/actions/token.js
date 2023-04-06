import { NORMA_API } from '../../utils/burger-api'
import { setAToken, setRToken } from '../../utils/helperfunctions'

export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST'
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS'
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

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
          console.log('Result received!')
          dispatch({
            type: GET_TOKEN_SUCCESS,
            token: result.refreshToken,
            access_token: setAToken(JSON.stringify(result.accessToken)),
            refresh_token: setRToken(JSON.stringify(result.refreshToken)),
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
