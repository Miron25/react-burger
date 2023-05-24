import { checkEmailReducer } from './forgotpassword'
import {
  GET_EMAIL_REQUEST,
  GET_EMAIL_ERROR,
  GET_EMAIL_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants'

describe('Forgot Password Reducer', () => {
  it('Should return the Initial State', () => {
    expect(checkEmailReducer(undefined, {})).toEqual({
      emailRequest: false,
      emailFailed: false,
      message: '',
    })
  })

  it('Should handle GET_EMAIL_REQUEST', () => {
    const initialState = {
      emailRequest: false,
      emailFailed: false,
      message: '',
    }
    const action = {
      type: GET_EMAIL_REQUEST,
    }
    expect(checkEmailReducer(initialState, action)).toEqual({
      ...initialState,
      emailRequest: true,
      emailFailed: false,
    })
  })

  it('Should handle GET_EMAIL_SUCCESS', () => {
    const initialState = {
      emailRequest: true,
      emailFailed: false,
      message: '',
    }
    const action = {
      type: GET_EMAIL_SUCCESS,
      message: 'Email was sent.',
    }
    expect(checkEmailReducer(initialState, action)).toEqual({
      ...initialState,
      message: action.message,
      emailRequest: false,
    })
  })

  it('Should handle GET_EMAIL_ERROR', () => {
    const initialState = {
      emailRequest: true,
      emailFailed: false,
      message: '',
    }
    const action = {
      type: GET_EMAIL_ERROR,
    }
    expect(checkEmailReducer(initialState, action)).toEqual({
      ...initialState,
      emailFailed: true,
      emailRequest: false,
      message: '',
    })
  })

  it('Should handle CLEAR_MESSAGE', () => {
    const initialState = {
      emailRequest: false,
      emailFailed: false,
      message: '',
    }
    const action = {
      type: CLEAR_MESSAGE,
    }
    expect(checkEmailReducer(initialState, action)).toEqual({ ...initialState })
  })
})
