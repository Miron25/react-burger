import { orderDetailsReducer } from './orderdetails'
import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
} from '../constants'

describe('Order Details Reducer', () => {
  it('Should return the Initial State', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual({
      orderRequest: false,
      orderFailed: false,
      orders: undefined,
    })
  })

  it('Should handle GET_ORDER_REQUEST', () => {
    const initialState = {
      orderRequest: false,
      orderFailed: false,
      orders: undefined,
    }
    const action = {
      type: GET_ORDER_REQUEST,
    }
    expect(orderDetailsReducer(initialState, action)).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    })
  })

  it('Should handle GET_ORDER_SUCCESS', () => {
    const initialState = {
      orderRequest: true,
      orderFailed: false,
      orders: undefined,
    }
    const action = {
      type: GET_ORDER_SUCCESS,
      orders: [
        {
          ingredients: ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b5'],
          _id: '60666c42cc7b410027a1a98v',
          name: 'Флюоресцентный бургер 2',
          status: 'done',
          number: 4635,
          createdAt: '',
          updatedAt: '',
        },
      ],
    }
    expect(orderDetailsReducer(initialState, action)).toEqual({
      ...initialState,
      orders: action.orders,
      orderRequest: false,
    })
  })

  it('Should handle GET_ORDER_ERROR', () => {
    const initialState = {
      orderRequest: true,
      orderFailed: false,
      orders: undefined,
    }
    const action = {
      type: GET_ORDER_ERROR,
    }
    expect(orderDetailsReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: true,
      orderRequest: false,
      orders: undefined,
    })
  })
})
