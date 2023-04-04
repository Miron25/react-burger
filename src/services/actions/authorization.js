import { NORMA_API } from '../../utils/burger-api'
import { getToken } from './../actions/token'

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_ERROR = 'GET_AUTH_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getAuth({ options }) {
  const token =
    'e8a1cb88700e62e297c26652cbed2c321b9f222b3684a0a38ea754044c55160111d5842fc87ac483'
  const options2 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', authorization: token },
  }
  console.log(options)

  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    })
    fetch(`${NORMA_API}/auth/login`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch({
            type: GET_AUTH_SUCCESS,
            user_email: result.user.email,
            user_name: result.user.name,
          })
        } else {
          dispatch({
            type: GET_AUTH_ERROR,
          })
          dispatch(getToken({ options2 }))
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_AUTH_ERROR,
        })
        dispatch(getToken({ options2 }))
      })
  }
}
