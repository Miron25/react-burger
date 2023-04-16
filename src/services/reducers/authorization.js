import {
  GET_AUTH_REQUEST,
  GET_AUTH_ERROR,
  GET_AUTH_SUCCESS,
  GET_AUTH_OUT,
} from './../actions/authorization'

const initialState = {
  loginRequest: false,
  loginFailed: false,
  isLoggedIn: false,
  user: null,
}

export const loginReducer = (state = initialState, action) => {
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
        user: null,
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
