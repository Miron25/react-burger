import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from '../constants'
import { IOrdersAll } from '../types/data'

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START
  readonly payload: string
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR
  readonly payload: Event
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: IOrdersAll
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction

export const wsInit = (url: string): IWSConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: url,
})

export const onOpen = (): IWSConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS,
})

export const onError = (message: Event): IWSConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload: message,
})

export const onClose = (): IWSConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED,
})

export const onMessage = (ordersAll: IOrdersAll): IWSGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload: ordersAll,
})
