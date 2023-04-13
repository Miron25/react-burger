import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
} from './../actions/token'

const initialState = {
  tokenRequest: false,
  tokenFailed: false,
  token: '',
}

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        tokenRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        tokenFailed: false,
      }
    }
    case GET_TOKEN_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        token: action.token,
        // Запрос закончил своё выполнение
        tokenRequest: false,
      }
    }
    case GET_TOKEN_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        tokenFailed: true,
        // Запрос закончил своё выполнение
        tokenRequest: false,
        token: '',
      }
    }
    default: {
      return state
    }
  }
}
