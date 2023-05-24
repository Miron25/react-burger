import { wsAuthReducer } from './wsauthreducer'
import {
  WS_CONNECTION_AUTH_START,
  WS_CONNECTION_AUTH_SUCCESS,
  WS_CONNECTION_AUTH_ERROR,
  WS_CONNECTION_AUTH_CLOSED,
  WS_GET_AUTH_MESSAGE,
} from '../constants'

describe('WebSocket with Authentication Reducer', () => {
  it('Should return the Initial State', () => {
    expect(wsAuthReducer(undefined, {})).toEqual({
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    })
  })

  it('Should handle WS_CONNECTION_AUTH_START', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_AUTH_START,
      payload: 'wss://',
    }
    expect(wsAuthReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: undefined,
      url: action.payload,
    })
  })

  it('Should handle WS_CONNECTION_AUTH_SUCCESS', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_AUTH_SUCCESS,
    }
    expect(wsAuthReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true,
    })
  })

  it('Should handle WS_CONNECTION_AUTH_ERROR', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_AUTH_ERROR,
      payload: { message: 'Invalid or missing token' },
    }
    expect(wsAuthReducer(initialState, action)).toEqual({
      ...initialState,
      error: action.payload,
      wsConnected: false,
    })
  })

  it('Should handle WS_CONNECTION_AUTH_CLOSED', () => {
    const initialState = {
      wsConnected: true,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_AUTH_CLOSED,
    }
    expect(wsAuthReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    })
  })

  it('Should handle WS_GET_AUTH_MESSAGE', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_GET_AUTH_MESSAGE,
      payload: {
        success: true,
        orders: [
          {
            ingredients: [
              '60666c42cc7b410027a1a9b1',
              '60666c42cc7b410027a1a9b5',
            ],
            _id: '60666c42cc7b410027a1ap3v',
            name: 'Флюоресцентный бургер 3',
            status: 'done',
            number: 4728,
            createdAt: '',
            updatedAt: '',
          },
        ],
        total: 100,
        totalToday: 10,
      },
    }
    expect(wsAuthReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      ordersAll: action.payload,
    })
  })
})
