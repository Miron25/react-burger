import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_RESETPASS_REQUEST,
  GET_RESETPASS_SUCCESS,
  GET_RESETPASS_ERROR,
} from '../constants'
import { AppDispatch, AppThunkAction } from '../types'
import { IOptArg } from '../types/data'

export interface IGetResetPasswordAction {
  readonly type: typeof GET_RESETPASS_REQUEST
}

export interface IGetResetPasswordSuccessAction {
  readonly type: typeof GET_RESETPASS_SUCCESS
  readonly isCodeCorrect: boolean
  readonly message: string
}

export interface IGetResetPasswordErrorAction {
  readonly type: typeof GET_RESETPASS_ERROR
  readonly message: string
}

export type TGetResetPasswordActions =
  | IGetResetPasswordAction
  | IGetResetPasswordSuccessAction
  | IGetResetPasswordErrorAction

export const getResetPasswordAction = (): IGetResetPasswordAction => ({
  type: GET_RESETPASS_REQUEST,
})

export const getResetPasswordSuccessAction = (
  isCodeCorrect: boolean,
  message: string
): IGetResetPasswordSuccessAction => ({
  type: GET_RESETPASS_SUCCESS,
  isCodeCorrect,
  message,
})

export const getResetPasswordErrorAction = (
  message: string
): IGetResetPasswordErrorAction => ({
  type: GET_RESETPASS_ERROR,
  message,
})

export function getPasswordResetConfirmed({
  options,
}: IOptArg): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getResetPasswordAction())
    fetch(`${NORMA_API}/password-reset/reset`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          console.log(result)
          dispatch(getResetPasswordSuccessAction(true, result.message))
        } else {
          dispatch(getResetPasswordErrorAction(result.message))
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getResetPasswordErrorAction(exception.message))
      })
  }
}
