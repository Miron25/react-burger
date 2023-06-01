import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_ERROR,
  GET_LOGOUT_SUCCESS,
} from '../constants'
import { TGetLogoutActions } from '../actions/logout'

export type TLogoutState = {
  logoutRequest: boolean
  logoutFailed: boolean
}

const initialState: TLogoutState = {
  logoutRequest: false,
  logoutFailed: false,
}

export const logoutReducer = (
  state = initialState,
  action: TGetLogoutActions
): TLogoutState => {
  switch (action.type) {
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      }
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
      }
    }
    case GET_LOGOUT_ERROR: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      }
    }
    default: {
      return state
    }
  }
}
