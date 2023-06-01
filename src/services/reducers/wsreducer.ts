import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../constants'
import type { TWSActions } from '../actions/wsactiontypes'
import { IOrdersAll } from '../types/data'

type TWSState = {
  wsConnected?: boolean
  ordersAll?: IOrdersAll
  url: string
  error?: Event
}

const initialState: TWSState = {
  wsConnected: false,
  ordersAll: undefined,
  url: '',
}

export const wsReducer = (
  state = initialState,
  action: TWSActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnected: undefined,
        url: action.payload,
      }

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      }

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      }

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        ordersAll: undefined,
        url: '',
      }

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        ordersAll: action.payload,
      }

    default:
      return state
  }
}
