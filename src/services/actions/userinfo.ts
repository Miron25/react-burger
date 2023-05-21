import { NORMA_API, fetchWithRefresh } from '../../utils/api'
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_OUT,
} from '../constants'
import { IOptArg, IOptArg4, TUser } from '../types/data'
import { AppDispatch, AppThunkAction } from '../types'

export interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS
  readonly user: TUser
}

export interface IGetUserErrorAction {
  readonly type: typeof GET_USER_ERROR
}

export interface IGetUserOutAction {
  readonly type: typeof GET_USER_OUT
}

export type TGetUserActions =
  | IGetUserAction
  | IGetUserSuccessAction
  | IGetUserErrorAction
  | IGetUserOutAction

export const getUserAction = (): IGetUserAction => ({
  type: GET_USER_REQUEST,
})

export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user,
})

export const getUserErrorAction = (): IGetUserErrorAction => ({
  type: GET_USER_ERROR,
})

export const getUserOutAction = (): IGetUserOutAction => ({
  type: GET_USER_OUT,
})

export function getUserInfo({ options }: IOptArg): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getUserAction())
    fetchWithRefresh(`${NORMA_API}/auth/user`, options)
      .then((result) => {
        console.log(result)
        if (result && result.success) {
          dispatch(getUserSuccessAction(result.user))
        } else {
          dispatch(getUserErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getUserErrorAction())
      })
  }
}

export function getUserUpdate({ patchOptions }: IOptArg4): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getUserAction())
    fetchWithRefresh(`${NORMA_API}/auth/user`, patchOptions)
      .then((result) => {
        console.log(result)
        if (result && result.success) {
          dispatch(getUserSuccessAction(result.user))
          localStorage.setItem('user', JSON.stringify(result.user))
        } else {
          dispatch(getUserErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getUserErrorAction())
      })
  }
}
