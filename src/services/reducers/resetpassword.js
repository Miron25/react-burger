import {
  GET_RESETPASS_REQUEST,
  GET_RESETPASS_ERROR,
  GET_RESETPASS_SUCCESS,
} from './../actions/resetpassword'

const initialState = {
  resetRequest: false,
  resetFailed: false,
  message: '',
  isCodeCorrect: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESETPASS_REQUEST: {
      return {
        ...state,
        resetRequest: true,
        resetFailed: false,
      }
    }
    case GET_RESETPASS_SUCCESS: {
      return {
        ...state,
        message: action.message,
        isCodeCorrect: true,
        resetRequest: false,
      }
    }
    case GET_RESETPASS_ERROR: {
      return {
        ...state,
        resetFailed: true,
        resetRequest: false,
        message: action.message,
        isCodeCorrect: false,
      }
    }
    default: {
      return state
    }
  }
}
