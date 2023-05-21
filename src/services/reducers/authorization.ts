import {
  GET_AUTH_REQUEST,
  GET_AUTH_ERROR,
  GET_AUTH_SUCCESS,
  GET_AUTH_OUT,
} from '../constants'
import { TUser } from '../types/data'
import { TGetAuthActions } from '../actions/authorization'

export type TAuthState = {
  loginRequest: boolean
  loginFailed: boolean
  isLoggedIn: boolean
  user?: TUser
}

const initialState: TAuthState = {
  loginRequest: false,
  loginFailed: false,
  isLoggedIn: false,
  user: undefined,
}

export const loginReducer = (
  state = initialState,
  action: TGetAuthActions
): TAuthState => {
  switch (action.type) {
    case GET_AUTH_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      }
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        loginRequest: false,
      }
    }
    case GET_AUTH_ERROR: {
      return {
        ...state,
        loginFailed: true,
        isLoggedIn: false,
        loginRequest: false,
        user: undefined,
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
