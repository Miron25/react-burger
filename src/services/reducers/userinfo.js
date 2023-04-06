import {
  GET_USER_REQUEST,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
} from './../actions/userinfo'

const initialState = {
  userInfoRequest: false,
  userInfoFailed: false,
  user: null,
  message: '',
}

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        userInfoRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        userInfoFailed: false,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        user: action.user,
        // Запрос закончил своё выполнение
        userInfoRequest: false,
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        userInfoFailed: true,
        // Запрос закончил своё выполнение
        userInfoRequest: false,
        user: null,
        message: action.message,
      }
    }
    default: {
      return state
    }
  }
}
