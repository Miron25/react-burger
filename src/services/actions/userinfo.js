import { NORMA_API, fetchWithRefresh } from '../../utils/api'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'
export const GET_USER_OUT = 'GET_USER_OUT'

export function getUserInfo({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })
    fetchWithRefresh(`${NORMA_API}/auth/user`, options).then((result) => {
      console.log(result)
      if (result && result.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: result.user,
        })
      } else {
        dispatch({
          type: GET_USER_ERROR,
        })
      }
    })
  }
}

export function getUserUpdate({ patchOptions }) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })
    fetchWithRefresh(`${NORMA_API}/auth/user`, patchOptions).then((result) => {
      console.log(result)
      if (result && result.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: result.user,
        })
      } else {
        dispatch({
          type: GET_USER_ERROR,
        })
      }
    })
  }
}
