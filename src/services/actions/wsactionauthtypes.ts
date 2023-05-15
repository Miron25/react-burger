import {
  WS_CONNECTION_AUTH_SUCCESS,
  WS_CONNECTION_AUTH_ERROR,
  WS_CONNECTION_AUTH_CLOSED,
  WS_GET_AUTH_MESSAGE,
  WS_CONNECTION_AUTH_START,
} from '../constants'
import { IOrdersAll } from '../types/data'

export interface IWSConnectionAuthStart {
  readonly type: typeof WS_CONNECTION_AUTH_START
  readonly payload: string
}

export interface IWSConnectionSuccessAuthAction {
  readonly type: typeof WS_CONNECTION_AUTH_SUCCESS
}

export interface IWSConnectionErrorAuthAction {
  readonly type: typeof WS_CONNECTION_AUTH_ERROR
  readonly payload: Event
}

export interface IWSConnectionClosedAuthAction {
  readonly type: typeof WS_CONNECTION_AUTH_CLOSED
}

export interface IWSGetMessageAuthAction {
  readonly type: typeof WS_GET_AUTH_MESSAGE
  readonly payload: IOrdersAll
}

export type TWSAuthActions =
  | IWSConnectionAuthStart
  | IWSConnectionSuccessAuthAction
  | IWSConnectionErrorAuthAction
  | IWSConnectionClosedAuthAction
  | IWSGetMessageAuthAction

export const wsInitAuth = (url: string): IWSConnectionAuthStart => ({
  type: WS_CONNECTION_AUTH_START,
  payload: url,
})

export const onOpenAuth = (): IWSConnectionSuccessAuthAction => ({
  type: WS_CONNECTION_AUTH_SUCCESS,
})

export const onErrorAuth = (message: Event): IWSConnectionErrorAuthAction => ({
  type: WS_CONNECTION_AUTH_ERROR,
  payload: message,
})

export const onCloseAuth = (): IWSConnectionClosedAuthAction => ({
  type: WS_CONNECTION_AUTH_CLOSED,
})

export const onMessageAuth = (
  ordersAll: IOrdersAll
): IWSGetMessageAuthAction => ({
  type: WS_GET_AUTH_MESSAGE,
  payload: ordersAll,
})
