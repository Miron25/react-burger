import {
  GET_USER_REQUEST,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_OUT,
} from '../constants'
import { TUser } from '../types/data'
import { TGetUserActions } from '../actions/userinfo'

export type TUserInfoState = {
  userInfoRequest: boolean
  userInfoFailed: boolean
  user?: TUser
}

const initialState: TUserInfoState = {
  userInfoRequest: false,
  userInfoFailed: false,
  user: undefined,
}

export const userInfoReducer = (
  state = initialState,
  action: TGetUserActions
): TUserInfoState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoFailed: false,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userInfoRequest: false,
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        user: undefined,
      }
    }
    case GET_USER_OUT: {
      return {
        ...initialState,
      }
    }
    default: {
      return state
    }
  }
}
