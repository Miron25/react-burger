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

// Создадим редьюсер для WebSocket
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
    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_AUTH_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      }

    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      }

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_AUTH_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        ordersAll: undefined,
        url: '',
      }

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_AUTH_MESSAGE:
      return {
        ...state,
        error: undefined,
        ordersAll: action.payload, //messages: [...state.messages, action.payload],
      }

    default:
      return state
  }
}
