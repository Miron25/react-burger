import { logoutReducer } from './logout'
import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_ERROR,
  GET_LOGOUT_SUCCESS,
} from '../constants'

describe('Logout Reducer', () => {
  it('Should return the Initial State', () => {
    expect(logoutReducer(undefined, {})).toEqual({
      logoutRequest: false,
      logoutFailed: false,
    })
  })

  it('Should handle GET_LOGOUT_REQUEST', () => {
    const initialState = {
      logoutRequest: false,
      logoutFailed: false,
    }
    const action = {
      type: GET_LOGOUT_REQUEST,
    }
    expect(logoutReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutFailed: false,
    })
  })

  it('Should handle GET_LOGOUT_SUCCESS', () => {
    const initialState = {
      logoutRequest: true,
      logoutFailed: false,
    }
    const action = {
      type: GET_LOGOUT_SUCCESS,
    }
    expect(logoutReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: false,
    })
  })

  it('Should handle GET_LOGOUT_ERROR', () => {
    const initialState = {
      logoutRequest: true,
      logoutFailed: false,
    }
    const action = {
      type: GET_LOGOUT_ERROR,
    }
    expect(logoutReducer(initialState, action)).toEqual({
      ...initialState,
      logoutFailed: true,
      logoutRequest: false,
    })
  })
})
