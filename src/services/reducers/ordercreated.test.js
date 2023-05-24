import { orderCreatedReducer } from './ordercreated'
import {
  GET_ORDER_CREATED_REQUEST,
  GET_ORDER_CREATED_ERROR,
  GET_ORDER_CREATED_SUCCESS,
} from '../constants'

describe('Created Order Reducer', () => {
  it('Should return the Initial State', () => {
    expect(orderCreatedReducer(undefined, {})).toEqual({
      orderRequest: false,
      orderFailed: false,
      order: undefined,
      name: undefined,
    })
  })

  it('Should handle GET_ORDER_CREATED_REQUEST', () => {
    const initialState = {
      orderRequest: false,
      orderFailed: false,
      order: undefined,
      name: undefined,
    }
    const action = {
      type: GET_ORDER_CREATED_REQUEST,
    }
    expect(orderCreatedReducer(initialState, action)).toEqual({
      ...initialState,
      order: undefined,
      name: undefined,
      orderRequest: true,
      orderFailed: false,
    })
  })

  it('Should handle GET_ORDER_CREATED_SUCCESS', () => {
    const initialState = {
      orderRequest: true,
      orderFailed: false,
      order: undefined,
      name: undefined,
    }
    const action = {
      type: GET_ORDER_CREATED_SUCCESS,
      order: { number: '4509' },
      name: 'Флюоресцентный бургер',
    }
    expect(orderCreatedReducer(initialState, action)).toEqual({
      ...initialState,
      order: action.order,
      name: action.name,
      orderRequest: false,
    })
  })

  it('Should handle GET_ORDER_CREATED_ERROR', () => {
    const initialState = {
      orderRequest: true,
      orderFailed: false,
      order: undefined,
      name: undefined,
    }
    const action = {
      type: GET_ORDER_CREATED_ERROR,
    }
    expect(orderCreatedReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: true,
      orderRequest: false,
      order: undefined,
      name: undefined,
    })
  })
})
