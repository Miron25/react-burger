import { tokenReducer } from './token'
import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
} from '../constants'

describe('Token Reducer', () => {
  it('Should return the Initial State', () => {
    expect(tokenReducer(undefined, {})).toEqual({
      tokenRequest: false,
      tokenFailed: false,
      token: '',
    })
  })

  it('Should handle GET_TOKEN_REQUEST', () => {
    const initialState = {
      tokenRequest: false,
      tokenFailed: false,
      token: '',
    }
    const action = {
      type: GET_TOKEN_REQUEST,
    }
    expect(tokenReducer(initialState, action)).toEqual({
      ...initialState,
      tokenRequest: true,
      tokenFailed: false,
    })
  })

  it('Should handle GET_TOKEN_SUCCESS', () => {
    const initialState = {
      tokenRequest: true,
      tokenFailed: false,
      token: '',
    }
    const action = {
      type: GET_TOKEN_SUCCESS,
      token:
        '1f5463adaee3eb751822f6cdeab70f08f3130d28f9bd519b27e1097ca5b97afe2b3a4deadb5622c9',
    }
    expect(tokenReducer(initialState, action)).toEqual({
      ...initialState,
      token: action.token,
      tokenRequest: false,
    })
  })

  it('Should handle GET_TOKEN_ERROR', () => {
    const initialState = {
      tokenRequest: true,
      tokenFailed: false,
      token: '',
    }
    const action = {
      type: GET_TOKEN_ERROR,
    }
    expect(tokenReducer(initialState, action)).toEqual({
      ...initialState,
      tokenFailed: true,
      tokenRequest: false,
      token: '',
    })
  })
})
