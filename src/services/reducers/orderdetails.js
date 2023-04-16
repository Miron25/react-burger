import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
} from './../actions/orderdetails'

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
}

export const orderDetailsReducer = (state = initialState, action) => {
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
        order: null,
        name: null,
      }
    }
    default: {
      return state
    }
  }
}
