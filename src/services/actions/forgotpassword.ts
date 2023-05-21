import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_EMAIL_REQUEST,
  GET_EMAIL_SUCCESS,
  GET_EMAIL_ERROR,
  CLEAR_MESSAGE,
} from '../constants'
import { AppDispatch, AppThunkAction } from '../types'
import { IOptArg } from '../types/data'

export interface IGetEmailAction {
  readonly type: typeof GET_EMAIL_REQUEST
}

export interface IGetEmailSuccessAction {
  readonly type: typeof GET_EMAIL_SUCCESS
  readonly message: string
}

export interface IGetEmailErrorAction {
  readonly type: typeof GET_EMAIL_ERROR
}

export interface IGetClearMessageAction {
  readonly type: typeof CLEAR_MESSAGE
}

export type TGetEmailActions =
  | IGetEmailAction
  | IGetEmailSuccessAction
  | IGetEmailErrorAction
  | IGetClearMessageAction

export const getEmailAction = (): IGetEmailAction => ({
  type: GET_EMAIL_REQUEST,
})

export const getEmailSuccessAction = (
  message: string
): IGetEmailSuccessAction => ({
  type: GET_EMAIL_SUCCESS,
  message,
})

export const getEmailErrorAction = (): IGetEmailErrorAction => ({
  type: GET_EMAIL_ERROR,
})

export const getClearMessageAction = (): IGetClearMessageAction => ({
  type: CLEAR_MESSAGE,
})

export function getPasswordReset({ options }: IOptArg): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getEmailAction())
    fetch(`${NORMA_API}/password-reset`, options)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch(getEmailSuccessAction(result.message))
        } else {
          dispatch(getEmailErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getEmailErrorAction())
      })
  }
}
