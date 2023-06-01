import { userInfoReducer } from './userinfo'
import {
  GET_USER_REQUEST,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_OUT,
} from '../constants'

describe('User Info Reducer', () => {
  it('Should return the Initial State', () => {
    expect(userInfoReducer(undefined, {})).toEqual({
      userInfoRequest: false,
      userInfoFailed: false,
      user: undefined,
    })
  })

  it('Should handle GET_USER_REQUEST', () => {
    const initialState = {
      userInfoRequest: false,
      userInfoFailed: false,
      user: undefined,
    }
    const action = {
      type: GET_USER_REQUEST,
    }
    expect(userInfoReducer(initialState, action)).toEqual({
      ...initialState,
      userInfoRequest: true,
      userInfoFailed: false,
    })
  })

  it('Should handle GET_USER_SUCCESS', () => {
    const initialState = {
      userInfoRequest: true,
      userInfoFailed: false,
      user: undefined,
    }
    const action = {
      type: GET_USER_SUCCESS,
      user: { email: 'test@mail.com', name: 'TestUser3' },
    }
    expect(userInfoReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.user,
      userInfoRequest: false,
    })
  })

  it('Should handle GET_USER_ERROR', () => {
    const initialState = {
      userInfoRequest: true,
      userInfoFailed: false,
      user: undefined,
    }
    const action = {
      type: GET_USER_ERROR,
    }
    expect(userInfoReducer(initialState, action)).toEqual({
      ...initialState,
      userInfoFailed: true,
      userInfoRequest: false,
      user: undefined,
    })
  })

  it('Should handle GET_USER_OUT', () => {
    const initialState = {
      userInfoRequest: false,
      userInfoFailed: false,
      user: undefined,
    }
    const action = {
      type: GET_USER_OUT,
    }
    expect(userInfoReducer(initialState, action)).toEqual({ ...initialState })
  })
})
