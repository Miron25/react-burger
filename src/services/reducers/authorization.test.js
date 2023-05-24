import { loginReducer } from './authorization'
import {
  GET_AUTH_REQUEST,
  GET_AUTH_ERROR,
  GET_AUTH_SUCCESS,
  GET_AUTH_OUT,
} from '../constants'

describe('Login Reducer', () => {
  it('Should return the Initial State', () => {
    expect(loginReducer(undefined, {})).toEqual({
      loginRequest: false,
      loginFailed: false,
      isLoggedIn: false,
      user: undefined,
    })
  })

  it('Should handle GET_AUTH_REQUEST', () => {
    const initialState = {
      loginRequest: false,
      loginFailed: false,
      isLoggedIn: false,
      user: undefined,
    }
    const action = {
      type: GET_AUTH_REQUEST,
    }
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    })
  })

  it('Should handle GET_AUTH_SUCCESS', () => {
    const initialState = {
      loginRequest: true,
      loginFailed: false,
      isLoggedIn: false,
      user: undefined,
    }
    const action = {
      type: GET_AUTH_SUCCESS,
      user: { email: 'test@mail.com', name: 'TestUser' },
    }
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      isLoggedIn: true,
      user: action.user,
      loginRequest: false,
    })
  })

  it('Should handle GET_AUTH_ERROR', () => {
    const initialState = {
      loginRequest: true,
      loginFailed: false,
      isLoggedIn: false,
      user: undefined,
    }
    const action = {
      type: GET_AUTH_ERROR,
    }
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      loginFailed: true,
      isLoggedIn: false,
      loginRequest: false,
      user: undefined,
    })
  })

  it('Should handle GET_AUTH_OUT', () => {
    const initialState = {
      loginRequest: false,
      loginFailed: false,
      isLoggedIn: false,
      user: undefined,
    }
    const action = {
      type: GET_AUTH_OUT,
    }
    expect(loginReducer(initialState, action)).toEqual({ ...initialState })
  })
})
