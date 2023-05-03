import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from '../constants'
import { AppDispatch, AppThunkAction } from '../types'
import { IOptArg } from '../types/data'

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS
  readonly order: number
  readonly name: string
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
  order: number,
  name: string
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  order,
  name,
})

export const getOrderErrorAction = (): IGetOrderErrorAction => ({
  type: GET_ORDER_ERROR,
})

export function getOrder({ options }: IOptArg): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderAction())
    fetch(`${NORMA_API}/orders`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch(getOrderSuccessAction(result.order.number, result.name))
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
