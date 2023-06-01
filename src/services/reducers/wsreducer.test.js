import { wsReducer } from './wsreducer'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../constants'

describe('WebSocket Reducer', () => {
  it('Should return the Initial State', () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    })
  })

  it('Should handle WS_CONNECTION_START', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_START,
      payload: 'wss://',
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: undefined,
      url: action.payload,
    })
  })

  it('Should handle WS_CONNECTION_SUCCESS', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_SUCCESS,
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true,
    })
  })

  it('Should handle WS_CONNECTION_ERROR', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_ERROR,
      payload: { message: 'Invalid or missing token' },
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: action.payload,
      wsConnected: false,
    })
  })

  it('Should handle WS_CONNECTION_CLOSED', () => {
    const initialState = {
      wsConnected: true,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_CONNECTION_CLOSED,
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    })
  })

  it('Should handle WS_GET_MESSAGE', () => {
    const initialState = {
      wsConnected: false,
      ordersAll: undefined,
      url: '',
    }
    const action = {
      type: WS_GET_MESSAGE,
      payload: {
        success: true,
        orders: [
          {
            ingredients: [
              '60666c42cc7b410027a1a9b1',
              '60666c42cc7b410027a1a9b5',
            ],
            _id: '60666c42cc7b410027a1di4c',
            name: 'Флюоресцентный бургер 4',
            status: 'done',
            number: 4801,
            createdAt: '',
            updatedAt: '',
          },
        ],
        total: 1000,
        totalToday: 100,
      },
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      ordersAll: action.payload,
    })
  })
})
