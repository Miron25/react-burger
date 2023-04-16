import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_ERROR,
  GET_LOGOUT_SUCCESS,
} from './../actions/logout'

const initialState = {
  logoutRequest: false,
  logoutFailed: false,
  logout: null,
}

export const logoutReducer = (state = initialState, action) => {
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
        logout: null,
      }
    }
    default: {
      return state
    }
  }
}
