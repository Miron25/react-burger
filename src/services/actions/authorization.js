import { NORMA_API } from '../../utils/burger-api'
//import { getToken } from './../actions/token'
import { setAToken, setRToken } from '../../utils/helperfunctions'

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_ERROR = 'GET_AUTH_ERROR'
export const GET_AUTH_OUT = 'GET_AUTH_OUT'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getAuth({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    })
    fetch(`${NORMA_API}/auth/login`, options)
      .then(checkResponse)
      .then((result) => {
        console.log(result)
        if (result && result.success) {
          console.log('here!')
          dispatch({
            type: GET_AUTH_SUCCESS,
            user: result.user,
            access_token: setAToken(result.accessToken),
            refresh_token: setRToken(result.refreshToken),
            isLoggedIn: true,
          })
        } else {
          console.log('In error')
          dispatch({
            type: GET_AUTH_ERROR,
          })
          //dispatch(getToken({ options2 }))
        }
      })
      .catch((exception) => {
        console.log('In catch!')
        console.log(exception)
        dispatch({
          type: GET_AUTH_ERROR,
        })
        // dispatch(getToken({ options2 }))
      })
  }
}
