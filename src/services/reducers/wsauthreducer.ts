import {
  WS_CONNECTION_AUTH_START,
  WS_CONNECTION_AUTH_SUCCESS,
  WS_CONNECTION_AUTH_ERROR,
  WS_CONNECTION_AUTH_CLOSED,
  WS_GET_AUTH_MESSAGE,
} from '../constants'
import type { TWSAuthActions } from '../actions/wsactionauthtypes'
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

export const wsAuthReducer = (
  state = initialState,
  action: TWSAuthActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_AUTH_START:
      return {
        ...state,
        error: undefined,
        wsConnected: undefined,
        url: action.payload,
      }

    case WS_CONNECTION_AUTH_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      }

    case WS_CONNECTION_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      }

    case WS_CONNECTION_AUTH_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        ordersAll: undefined,
        url: '',
      }

    case WS_GET_AUTH_MESSAGE:
      return {
        ...state,
        error: undefined,
        ordersAll: action.payload,
      }

    default:
      return state
  }
}
