import {
  GET_USER_REQUEST,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_OUT,
} from './../actions/userinfo'

const initialState = {
  userInfoRequest: false,
  userInfoFailed: false,
  user: null,
}

export const userInfoReducer = (state = initialState, action) => {
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
        user: null,
        message: action.message,
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
