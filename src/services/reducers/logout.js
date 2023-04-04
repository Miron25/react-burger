import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_ERROR,
  GET_LOGOUT_SUCCESS,
} from './../actions/logout'

const initialState = {
  logoutRequest: false,
  logoutFailed: false,
  logout: null,
}

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        logoutRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        logoutFailed: false,
      }
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        order: action.order,
        name: action.name,
        // Запрос закончил своё выполнение
        logoutRequest: false,
      }
    }
    case GET_LOGOUT_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        logoutFailed: true,
        // Запрос закончил своё выполнение
        logoutRequest: false,
        order: null,
        name: null,
      }
    }
    default: {
      return state
    }
  }
}
