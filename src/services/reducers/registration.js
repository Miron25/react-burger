import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_ERROR,
  GET_REGISTRATION_SUCCESS,
} from './../actions/registration'

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  user: null,
}

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTRATION_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        registrationRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        registrationFailed: false,
      }
    }
    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        user: action.user,
        // Запрос закончил своё выполнение
        registrationRequest: false,
      }
    }
    case GET_REGISTRATION_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        registrationFailed: true,
        // Запрос закончил своё выполнение
        registrationRequest: false,
        user: null,
      }
    }
    default: {
      return state
    }
  }
}
