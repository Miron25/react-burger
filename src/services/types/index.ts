import type { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { store } from '../store'
import { TGetAuthActions } from '../actions/authorization'
import { TConstructorActions } from '../actions/burgerconst'
import { TGetEmailActions } from '../actions/forgotpassword'
import { TGetFeedActions } from '../actions'
import { TGetLogoutActions } from '../actions/logout'
import { TGetOrderActions } from '../actions/orderdetails'
import { TGetRegistrationActions } from '../actions/registration'
import { TGetResetPasswordActions } from '../actions/resetpassword'
import { TGetTokenActions } from '../actions/token'
import { TGetUserActions } from '../actions/userinfo'

type TApplicationActions =
  | TGetAuthActions
  | TConstructorActions
  | TGetEmailActions
  | TGetFeedActions
  | TGetLogoutActions
  | TGetOrderActions
  | TGetRegistrationActions
  | TGetResetPasswordActions
  | TGetTokenActions
  | TGetTokenActions
  | TGetUserActions

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>
