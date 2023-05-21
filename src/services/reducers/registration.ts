import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_ERROR,
  GET_REGISTRATION_SUCCESS,
} from '../constants'
import { TUser } from '../types/data'
import { TGetRegistrationActions } from '../actions/registration'

export type TRegistrationState = {
  registrationRequest: boolean
  registrationFailed: boolean
  user?: TUser
}
const initialState: TRegistrationState = {
  registrationRequest: false,
  registrationFailed: false,
  user: undefined,
}

export const registrationReducer = (
  state = initialState,
  action: TGetRegistrationActions
): TRegistrationState => {
  switch (action.type) {
    case GET_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      }
    }
    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        user: action.user,
        registrationRequest: false,
      }
    }
    case GET_REGISTRATION_ERROR: {
      return {
        ...state,
        registrationFailed: true,
        registrationRequest: false,
        user: undefined,
      }
    }
    default: {
      return state
    }
  }
}
