import {
  GET_EMAIL_REQUEST,
  GET_EMAIL_ERROR,
  GET_EMAIL_SUCCESS,
  CLEAR_MESSAGE,
} from './../actions/forgotpassword'

const initialState = {
  emailRequest: false,
  emailFailed: false,
  message: '',
}

export const checkEmailReducer = (state = initialState, action) => {
  //const navigate = useNavigate()
  switch (action.type) {
    case GET_EMAIL_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        emailRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        emailFailed: false,
      }
    }
    case GET_EMAIL_SUCCESS: {
      console.log(action.message)
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        message: action.message,
        // Запрос закончил своё выполнение
        //emailRequest: false,
      }
    }
    case GET_EMAIL_ERROR: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        emailFailed: true,
        // Запрос закончил своё выполнение
        emailRequest: false,
        message: '',
      }
    }
    case CLEAR_MESSAGE: {
      return {
        ...initialState,
      }
    }
    default: {
      return state
    }
  }
}
