import { ReactElement, ReactNode, CSSProperties } from 'react'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_AUTH_START,
  WS_CONNECTION_AUTH_SUCCESS,
  WS_CONNECTION_AUTH_ERROR,
  WS_CONNECTION_AUTH_CLOSED,
  WS_GET_AUTH_MESSAGE,
} from '../constants'

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START
  onOpen: typeof WS_CONNECTION_SUCCESS
  onClose: typeof WS_CONNECTION_CLOSED
  onError: typeof WS_CONNECTION_ERROR
  onMessage: typeof WS_GET_MESSAGE
}

export type TWSStoreAuthActions = {
  wsInitAuth: typeof WS_CONNECTION_AUTH_START
  onOpenAuth: typeof WS_CONNECTION_AUTH_SUCCESS
  onCloseAuth: typeof WS_CONNECTION_AUTH_CLOSED
  onErrorAuth: typeof WS_CONNECTION_AUTH_ERROR
  onMessageAuth: typeof WS_GET_AUTH_MESSAGE
}

export type TUser = {
  readonly name: string
  readonly email: string
  readonly password?: string
}

export interface IIngredient {
  _id: string
  name: string
  type: string
  proteins?: number
  fat?: number
  carbohydrates?: number
  calories?: number
  price: number
  image: string
  image_mobile?: string
  image_large?: string
  __v?: number
  count?: number
}

export interface ISingleOrder {
  readonly ingredients: ReadonlyArray<string>
  readonly _id: string
  readonly name: string
  readonly status: string
  readonly number: number
  readonly createdAt: string
  readonly updatedAt: string
  readonly owner?: string
}

export interface ISingleOrderFull {
  readonly ingredients: ReadonlyArray<IIngredient>
  readonly _id: string
  readonly name: string
  readonly status: string
  readonly number: number
  readonly createdAt: string
  readonly updatedAt: string
  readonly owner?: string
}

export interface IOrdersAll {
  readonly success: boolean
  readonly orders: ReadonlyArray<ISingleOrder>
  readonly total: number
  readonly totalToday: number
  readonly message?: string
}

export interface IIngUUID extends IIngredient {
  UUID: string
  UUID2?: string
}

export interface IFilteredIngr {
  filteredIngr: IIngredient
}

export interface IDroppedIngr {
  droppedIngr: IIngUUID
  index: number
  moveIngr: (dragIndex: number, hoverIndex: number) => void
}

export interface IPrRootProps {
  onlyUnAuth: boolean
  element: ReactElement
}

export interface IOptArg {
  options: RequestInit
}

export interface IOptArg2 {
  options2: RequestInit
}

export interface IOptArg3 {
  options_1: RequestInit
}

export interface IOptArg4 {
  patchOptions: RequestInit
}

export interface IOptArg5 {
  url: string
  options: RequestInit
}

export interface IModal {
  show: boolean
  onClose: () => void
  modalStyle?: CSSProperties
  children: ReactNode
}

export interface IForm {
  email?: string
  name?: string
  password?: string
  code?: string
}
