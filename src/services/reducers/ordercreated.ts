import {
  GET_ORDER_CREATED_REQUEST,
  GET_ORDER_CREATED_ERROR,
  GET_ORDER_CREATED_SUCCESS,
} from '../constants'
import { TGetOrderCreatedActions } from '../actions/ordercreated'

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

export const orderCreatedReducer = (
  state = initialState,
  action: TGetOrderCreatedActions
): TOrderState => {
  switch (action.type) {
    case GET_ORDER_CREATED_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case GET_ORDER_CREATED_SUCCESS: {
      return {
        ...state,
        order: action.order,
        name: action.name,
        orderRequest: false,
      }
    }
    case GET_ORDER_CREATED_ERROR: {
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
