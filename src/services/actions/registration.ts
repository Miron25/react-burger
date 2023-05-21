import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_ERROR,
} from '../constants'
import { IOptArg3, TUser } from '../types/data'
import { AppDispatch, AppThunkAction } from '../types'

export interface IGetRegistrationAction {
  readonly type: typeof GET_REGISTRATION_REQUEST
}

export interface IGetRegistrationSuccessAction {
  readonly type: typeof GET_REGISTRATION_SUCCESS
  readonly user: TUser
}

export interface IGetRegistrationErrorAction {
  readonly type: typeof GET_REGISTRATION_ERROR
}

export type TGetRegistrationActions =
  | IGetRegistrationAction
  | IGetRegistrationSuccessAction
  | IGetRegistrationErrorAction

export const getRegistrationAction = (): IGetRegistrationAction => ({
  type: GET_REGISTRATION_REQUEST,
})

export const getRegistrationSuccessAction = (
  user: TUser
): IGetRegistrationSuccessAction => ({
  type: GET_REGISTRATION_SUCCESS,
  user,
})

export const getRegistrationErrorAction = (): IGetRegistrationErrorAction => ({
  type: GET_REGISTRATION_ERROR,
})

export function getRegistration({ options_1 }: IOptArg3): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getRegistrationAction())
    fetch(`${NORMA_API}/auth/register`, options_1)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          console.log(result)
          dispatch(getRegistrationSuccessAction(result.user))
          localStorage.setItem('a_token', result.accessToken),
            localStorage.setItem('r_token', result.refreshToken)
        } else {
          dispatch(getRegistrationErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getRegistrationErrorAction())
      })
  }
}
