import { NORMA_API } from '../../utils/burger-api'
//import { setAToken, setRToken } from '../../utils/helperfunctions'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getUserInfo({ options }) {
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
            //access_token: setAToken(JSON.stringify(result.accessToken)),
            // refresh_token: setRToken(JSON.stringify(result.refreshToken)),
          })
        } else {
          dispatch({
            type: GET_USER_ERROR,
            message: result.message,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_USER_ERROR,
        })
      })
  }
}
