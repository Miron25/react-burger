import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_ERROR,
} from '../constants'
import { getAuthOutAction } from './authorization'
import { getUserOutAction } from './userinfo'
import { AppDispatch, AppThunkAction } from '../types'
import { IOptArg2 } from '../types/data'

export interface IGetLogoutAction {
  readonly type: typeof GET_LOGOUT_REQUEST
}

export interface IGetLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS
}

export interface IGetLogoutErrorAction {
  readonly type: typeof GET_LOGOUT_ERROR
}

export type TGetLogoutActions =
  | IGetLogoutAction
  | IGetLogoutSuccessAction
  | IGetLogoutErrorAction

export const getLogoutAction = (): IGetLogoutAction => ({
  type: GET_LOGOUT_REQUEST,
})

export const getLogoutSuccessAction = (): IGetLogoutSuccessAction => ({
  type: GET_LOGOUT_SUCCESS,
})

export const getLogoutErrorAction = (): IGetLogoutErrorAction => ({
  type: GET_LOGOUT_ERROR,
})

export function getLogout({ options2 }: IOptArg2): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getLogoutAction())
    fetch(`${NORMA_API}/auth/logout`, options2)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch(getLogoutSuccessAction())
          dispatch(getAuthOutAction())
          dispatch(getUserOutAction())
        } else {
          dispatch(getLogoutErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getLogoutErrorAction())
      })
  }
}
