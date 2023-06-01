import { registrationReducer } from './registration'
import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_ERROR,
  GET_REGISTRATION_SUCCESS,
} from '../constants'

describe('Registration Reducer', () => {
  it('Should return the Initial State', () => {
    expect(registrationReducer(undefined, {})).toEqual({
      registrationRequest: false,
      registrationFailed: false,
      user: undefined,
    })
  })

  it('Should handle GET_REGISTRATION_REQUEST', () => {
    const initialState = {
      registrationRequest: false,
      registrationFailed: false,
      user: undefined,
    }
    const action = {
      type: GET_REGISTRATION_REQUEST,
    }
    expect(registrationReducer(initialState, action)).toEqual({
      ...initialState,
      registrationRequest: true,
      registrationFailed: false,
    })
  })

  it('Should handle GET_REGISTRATION_SUCCESS', () => {
    const initialState = {
      registrationRequest: true,
      registrationFailed: false,
      user: undefined,
    }
    const action = {
      type: GET_REGISTRATION_SUCCESS,
      user: { email: 'test@mail.com', name: 'TestUser2' },
    }
    expect(registrationReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.user,
      registrationRequest: false,
    })
  })

  it('Should handle GET_REGISTRATION_ERROR', () => {
    const initialState = {
      registrationRequest: true,
      registrationFailed: false,
      user: undefined,
    }
    const action = {
      type: GET_REGISTRATION_ERROR,
    }
    expect(registrationReducer(initialState, action)).toEqual({
      ...initialState,
      registrationFailed: true,
      registrationRequest: false,
      user: undefined,
    })
  })
})
