import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
} from './../actions/orderdetails'

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        orderRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        orderFailed: false,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        order: action.order,
        name: action.name,
        // Запрос закончил своё выполнение
        orderRequest: false,
      }
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        orderFailed: true,
        // Запрос закончил своё выполнение
        orderRequest: false,
      }
    }
    default: {
      return state
    }
  }
}