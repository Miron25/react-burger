import { NORMA_API, checkResponse } from '../../utils/api'

export const GET_FEED_REQUEST = 'GET_FEED_REQUEST'
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS'
export const GET_FEED_FAILED = 'GET_FEED_FAILED'

export function getFeed() {
  return function (dispatch) {
    dispatch({
      type: GET_FEED_REQUEST,
    })
    fetch(`${NORMA_API}/ingredients`)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch({
            type: GET_FEED_SUCCESS,
            feed: result.data,
          })
        } else {
          dispatch({
            type: GET_FEED_FAILED,
          })
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch({
          type: GET_FEED_FAILED,
        })
      })
  }
}
