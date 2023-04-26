import { NORMA_API, checkResponse } from '../../utils/api'

export const GET_RESETPASS_REQUEST = 'GET_RESETPASS_REQUEST'
export const GET_RESETPASS_SUCCESS = 'GET_RESETPASS_SUCCESS'
export const GET_RESETPASS_ERROR = 'GET_RESETPASS_ERROR'

export function getPasswordResetConfirmed({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_RESETPASS_REQUEST,
    })
    fetch(`${NORMA_API}/password-reset/reset`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          console.log(result)
          dispatch({
            type: GET_RESETPASS_SUCCESS,
            message: result.message,
            isCodeCorrect: true,
          })
        } else {
          dispatch({
            type: GET_RESETPASS_ERROR,
            message: result.message,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_RESETPASS_ERROR,
          message: exception.message,
        })
      })
  }
}
