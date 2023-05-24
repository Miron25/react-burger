import { resetPasswordReducer } from './resetpassword'
import {
  GET_RESETPASS_REQUEST,
  GET_RESETPASS_ERROR,
  GET_RESETPASS_SUCCESS,
} from '../constants'

describe('Reset Password Reducer', () => {
  it('Should return the Initial State', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual({
      resetRequest: false,
      resetFailed: false,
      message: '',
      isCodeCorrect: false,
    })
  })

  it('Should handle GET_RESETPASS_REQUEST', () => {
    const initialState = {
      resetRequest: false,
      resetFailed: false,
      message: '',
      isCodeCorrect: false,
    }
    const action = {
      type: GET_RESETPASS_REQUEST,
    }
    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      resetRequest: true,
      resetFailed: false,
    })
  })

  it('Should handle GET_RESETPASS_SUCCESS', () => {
    const initialState = {
      resetRequest: true,
      resetFailed: false,
      message: '',
      isCodeCorrect: false,
    }
    const action = {
      type: GET_RESETPASS_SUCCESS,
      message: 'Password was successfully reset.',
    }
    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      message: action.message,
      isCodeCorrect: true,
      resetRequest: false,
    })
  })

  it('Should handle GET_RESETPASS_ERROR', () => {
    const initialState = {
      resetRequest: true,
      resetFailed: false,
      message: '',
      isCodeCorrect: false,
    }
    const action = {
      type: GET_RESETPASS_ERROR,
      message: 'Code is incorrect.',
    }
    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      resetFailed: true,
      resetRequest: false,
      message: action.message,
      isCodeCorrect: false,
    })
  })
})
