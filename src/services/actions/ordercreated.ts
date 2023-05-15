import { checkResponse } from '../../utils/api'
import {
  GET_ORDER_CREATED_REQUEST,
  GET_ORDER_CREATED_SUCCESS,
  GET_ORDER_CREATED_ERROR,
} from '../constants'
import { AppDispatch, AppThunkAction } from '../types'
import { IOptArg5 } from '../types/data'

export interface IGetOrderCreatedAction {
  readonly type: typeof GET_ORDER_CREATED_REQUEST
}

export interface IGetOrderCreatedSuccessAction {
  readonly type: typeof GET_ORDER_CREATED_SUCCESS
  readonly order: number
  readonly name: string
}

export interface IGetOrderCreatedErrorAction {
  readonly type: typeof GET_ORDER_CREATED_ERROR
}

export type TGetOrderCreatedActions =
  | IGetOrderCreatedAction
  | IGetOrderCreatedSuccessAction
  | IGetOrderCreatedErrorAction

export const getOrderCreatedAction = (): IGetOrderCreatedAction => ({
  type: GET_ORDER_CREATED_REQUEST,
})

export const getOrderCreatedSuccessAction = (
  order: number,
  name: string
): IGetOrderCreatedSuccessAction => ({
  type: GET_ORDER_CREATED_SUCCESS,
  order,
  name,
})

export const getOrderCreatedErrorAction = (): IGetOrderCreatedErrorAction => ({
  type: GET_ORDER_CREATED_ERROR,
})

export function getOrderCreated({ url, options }: IOptArg5): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderCreatedAction())
    fetch(url, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch(
            getOrderCreatedSuccessAction(result.order.number, result.name)
          )
        } else {
          dispatch(getOrderCreatedErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getOrderCreatedErrorAction())
      })
  }
}
