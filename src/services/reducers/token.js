import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
} from './../actions/token'

const initialState = {
  tokenRequest: false,
  tokenFailed: false,
  token: '',
}

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
        tokenFailed: false,
      }
    }
    case GET_TOKEN_SUCCESS: {
      return {
        ...state,
        token: action.token,
        tokenRequest: false,
      }
    }
    case GET_TOKEN_ERROR: {
      return {
        ...state,
        tokenFailed: true,
        tokenRequest: false,
        token: '',
      }
    }
    default: {
      return state
    }
  }
}
