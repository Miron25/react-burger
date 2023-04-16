import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_ERROR,
  GET_REGISTRATION_SUCCESS,
} from './../actions/registration'

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  user: null,
}

export const registrationReducer = (state = initialState, action) => {
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
        user: null,
      }
    }
    default: {
      return state
    }
  }
}
