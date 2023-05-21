import { checkResponse } from '../../utils/api'
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from '../constants'
import { AppDispatch, AppThunkAction } from '../types'
import { IOptArg5, ISingleOrder } from '../types/data'

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS
  readonly orders: ReadonlyArray<ISingleOrder>
}

export interface IGetOrderErrorAction {
  readonly type: typeof GET_ORDER_ERROR
}

export type TGetOrderActions =
  | IGetOrderAction
  | IGetOrderSuccessAction
  | IGetOrderErrorAction

export const getOrderAction = (): IGetOrderAction => ({
  type: GET_ORDER_REQUEST,
})

export const getOrderSuccessAction = (
  orders: ReadonlyArray<ISingleOrder>
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  orders,
})

export const getOrderErrorAction = (): IGetOrderErrorAction => ({
  type: GET_ORDER_ERROR,
})

export function getOrder({ url, options }: IOptArg5): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderAction())
    fetch(url, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch(getOrderSuccessAction(result.orders))
        } else {
          dispatch(getOrderErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getOrderErrorAction())
      })
  }
}
