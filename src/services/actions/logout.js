import { NORMA_API } from '../../utils/burger-api'

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST'
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS'
export const GET_LOGOUT_ERROR = 'GET_LOGOUT_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getLogout({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    })
    fetch(`${NORMA_API}/auth/logout`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch({
            type: GET_LOGOUT_SUCCESS,
            // order: result.order.number,
            // name: result.name,
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
