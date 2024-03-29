import {
  GET_EMAIL_REQUEST,
  GET_EMAIL_ERROR,
  GET_EMAIL_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants'
import { TGetEmailActions } from '../actions/forgotpassword'

export type TEmailState = {
  emailRequest: boolean
  emailFailed: boolean
  message: string
}

const initialState: TEmailState = {
  emailRequest: false,
  emailFailed: false,
  message: '',
}

export const checkEmailReducer = (
  state = initialState,
  action: TGetEmailActions
): TEmailState => {
  switch (action.type) {
    case GET_EMAIL_REQUEST: {
      return {
        ...state,
        emailRequest: true,
        emailFailed: false,
      }
    }
    case GET_EMAIL_SUCCESS: {
      return {
        ...state,
        message: action.message,
        emailRequest: false,
      }
    }
    case GET_EMAIL_ERROR: {
      return {
        ...state,
        emailFailed: true,
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
