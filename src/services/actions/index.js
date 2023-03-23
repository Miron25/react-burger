import { NORMA_API } from '../../utils/burger-api'

export const GET_FEED_REQUEST = 'GET_FEED_REQUEST'
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS'
export const GET_FEED_FAILED = 'GET_FEED_FAILED'

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getFeed() {
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
    // ввод на время выполнения запроса
    dispatch({
      type: GET_FEED_REQUEST,
    })
    // Запрашиваем данные у сервера
    fetch(`${NORMA_API}/ingredients`)
      //.then((res) => res.json())
      .then(checkReponse)
      .then((result) => {
        if (result && result.success) {
          // В случае успешного получения данных вызываем экшен
          // для записи полученных данных в хранилище
          dispatch({
            type: GET_FEED_SUCCESS,
            feed: result.data,
          })
        } else {
          // Если произошла ошибка, отправляем соотвтествующий экшен
          dispatch({
            type: GET_FEED_FAILED,
          })
        }
      })
      .catch((exception) => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        console.log(exception)
        dispatch({
          type: GET_FEED_FAILED,
        })
      })
  }
}
