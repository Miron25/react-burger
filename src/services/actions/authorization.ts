import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  GET_AUTH_OUT,
} from '../constants'
import { TUser, IOptArg } from '../types/data'
import { AppDispatch, AppThunkAction } from '../types'

export interface IGetAuthAction {
  readonly type: typeof GET_AUTH_REQUEST
}

export interface IGetAuthSuccessAction {
  readonly type: typeof GET_AUTH_SUCCESS
  readonly user: TUser
  readonly isLoggedIn: boolean
}

export interface IGetAuthErrorAction {
  readonly type: typeof GET_AUTH_ERROR
}

export interface IGetAuthOutAction {
  readonly type: typeof GET_AUTH_OUT
}

export type TGetAuthActions =
  | IGetAuthAction
  | IGetAuthSuccessAction
  | IGetAuthErrorAction
  | IGetAuthOutAction

export const getAuthAction = (): IGetAuthAction => ({
  type: GET_AUTH_REQUEST,
})

export const getAuthSuccessAction = (
  user: TUser,
  isLoggedIn: boolean
): IGetAuthSuccessAction => ({
  type: GET_AUTH_SUCCESS,
  user,
  isLoggedIn,
})

export const getAuthErrorAction = (): IGetAuthErrorAction => ({
  type: GET_AUTH_ERROR,
})

export const getAuthOutAction = (): IGetAuthOutAction => ({
  type: GET_AUTH_OUT,
})

export function getAuth({ options }: IOptArg): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getAuthAction())
    fetch(`${NORMA_API}/auth/login`, options)
      .then(checkResponse)
      .then((result) => {
        console.log(result)
        if (result && result.success) {
          dispatch(getAuthSuccessAction(result.user, true)),
            localStorage.setItem('user', JSON.stringify(result.user)),
            localStorage.setItem('a_token', result.accessToken),
            localStorage.setItem('r_token', result.refreshToken)
        } else {
          dispatch(getAuthErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getAuthErrorAction())
      })
  }
}
