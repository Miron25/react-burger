import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
} from '../constants'
import { TGetOrderActions } from '../actions/orderdetails'
import { ISingleOrder } from '../types/data'

export type TOrderState = {
  orderRequest: boolean
  orderFailed: boolean
  orders?: ReadonlyArray<ISingleOrder>
}
const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orders: undefined,
}

export const orderDetailsReducer = (
  state = initialState,
  action: TGetOrderActions
): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orders: action.orders,
        orderRequest: false,
      }
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        orders: undefined,
      }
    }
    default: {
      return state
    }
  }
}
