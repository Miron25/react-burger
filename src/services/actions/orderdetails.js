import { NORMA_API, checkResponse } from '../../utils/api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR'

export function getOrder({ options }) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    })
    fetch(`${NORMA_API}/orders`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: result.order.number,
            name: result.name,
          })
        } else {
          dispatch({
            type: GET_ORDER_ERROR,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_ORDER_ERROR,
        })
      })
  }
}
