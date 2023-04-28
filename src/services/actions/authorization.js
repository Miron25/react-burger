import { NORMA_API, checkResponse } from '../../utils/api'

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_ERROR = 'GET_AUTH_ERROR'
export const GET_AUTH_OUT = 'GET_AUTH_OUT'

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
          dispatch({
            type: GET_AUTH_SUCCESS,
            user: result.user,
            logged_in_user: localStorage.setItem(
              'user',
              JSON.stringify(result.user)
            ),
            access_token: localStorage.setItem('a_token', result.accessToken),
            refresh_token: localStorage.setItem('r_token', result.refreshToken),
            isLoggedIn: true,
          })
        } else {
          dispatch({
            type: GET_AUTH_ERROR,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_AUTH_ERROR,
        })
      })
  }
}
