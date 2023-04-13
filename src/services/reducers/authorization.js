import {
  GET_AUTH_REQUEST,
  GET_AUTH_ERROR,
  GET_AUTH_SUCCESS,
  GET_AUTH_OUT,
} from './../actions/authorization'

const initialState = {
  loginRequest: false,
  loginFailed: false,
  isLoggedIn: false,
  user: null,
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        loginRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        loginFailed: false,
      }
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        isLoggedIn: true,
        user: action.user,
        // Запрос закончил своё выполнение
        loginRequest: false,
      }
    }
    case GET_AUTH_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        loginFailed: true,
        isLoggedIn: false,
        // Запрос закончил своё выполнение
        loginRequest: false,
        user: null,
      }
    }
    case GET_AUTH_OUT: {
      return {
        ...initialState,
      }
    }
    default: {
      return state
    }
  }
}
