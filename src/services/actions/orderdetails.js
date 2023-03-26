import { NORMA_API } from '../../utils/burger-api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR'

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function getFeed() {
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
    // ввод на время выполнения запроса
    dispatch({
      type: GET_ORDER_REQUEST,
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
            type: GET_ORDER_SUCCESS,
            feed: result.data,
          })
        } else {
          // Если произошла ошибка, отправляем соотвтествующий экшен
          dispatch({
            type: GET_ORDER_ERROR,
          })
        }
      })
      .catch((exception) => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        console.log(exception)
        dispatch({
          type: GET_ORDER_ERROR,
        })
      })
  }
}
