import {
  GET_RESETPASS_REQUEST,
  GET_RESETPASS_ERROR,
  GET_RESETPASS_SUCCESS,
} from './../actions/resetpassword'

const initialState = {
  resetRequest: false,
  resetFailed: false,
  message: '',
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESETPASS_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        resetRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        resetFailed: false,
      }
    }
    case GET_RESETPASS_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        message: action.message,
        // Запрос закончил своё выполнение
        resetRequest: false,
      }
    }
    case GET_RESETPASS_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        resetFailed: true,
        // Запрос закончил своё выполнение
        resetRequest: false,
        message: '',
      }
    }
    default: {
      return state
    }
  }
}
