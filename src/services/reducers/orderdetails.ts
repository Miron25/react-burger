import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
} from '../constants'
import { TGetOrderActions } from '../actions/orderdetails'

export type TOrderState = {
  orderRequest: boolean
  orderFailed: boolean
  order?: number
  name?: string
}
const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  order: undefined,
  name: undefined,
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
        order: action.order,
        name: action.name,
        orderRequest: false,
      }
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        order: undefined,
        name: undefined,
      }
    }
    default: {
      return state
    }
  }
}
