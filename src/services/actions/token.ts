import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
} from '../constants'
import { AppDispatch, AppThunkAction } from '../types'
import { IOptArg } from '../types/data'

export interface IGetTokenAction {
  readonly type: typeof GET_TOKEN_REQUEST
}

export interface IGetTokenSuccessAction {
  readonly type: typeof GET_TOKEN_SUCCESS
  readonly token: string
}

export interface IGetTokenErrorAction {
  readonly type: typeof GET_TOKEN_ERROR
}

export type TGetTokenActions =
  | IGetTokenAction
  | IGetTokenSuccessAction
  | IGetTokenErrorAction

export const getTokenAction = (): IGetTokenAction => ({
  type: GET_TOKEN_REQUEST,
})

export const getTokenSuccessAction = (
  token: string
): IGetTokenSuccessAction => ({
  type: GET_TOKEN_SUCCESS,
  token,
})

export const getTokenErrorAction = (): IGetTokenErrorAction => ({
  type: GET_TOKEN_ERROR,
})

export function getToken({ options }: IOptArg): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getTokenAction())
    console.log(options)
    fetch(`${NORMA_API}/auth/token`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          console.log(result)
          dispatch(getTokenSuccessAction(result.refreshToken))
          localStorage.setItem('a_token', result.accessToken),
            localStorage.setItem('r_token', result.refreshToken)
        } else {
          dispatch(getTokenErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getTokenErrorAction())
      })
  }
}
