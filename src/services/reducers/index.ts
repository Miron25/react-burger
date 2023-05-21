import { combineReducers } from 'redux'
import {
  GET_FEED_REQUEST,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from '../constants'
import { selectedIngredientsReducer } from './burgerconst'
import { orderDetailsReducer } from './orderdetails'
import { orderCreatedReducer } from './ordercreated'
import { checkEmailReducer } from './forgotpassword'
import { loginReducer } from './authorization'
import { registrationReducer } from './registration'
import { logoutReducer } from './logout'
import { tokenReducer } from './token'
import { userInfoReducer } from './userinfo'
import { resetPasswordReducer } from './resetpassword'
import { wsReducer } from './wsreducer'
import { wsAuthReducer } from './wsauthreducer'
import { IIngredient } from '../types/data'
import { TGetFeedActions } from '../actions'

export type TFeedState = {
  feedRequest: boolean
  feedFailed: boolean
  feed: ReadonlyArray<IIngredient>
}
const initialState: TFeedState = {
  feedRequest: false,
  feedFailed: false,
  feed: [],
}

export const feedReducer = (
  state = initialState,
  action: TGetFeedActions
): TFeedState => {
  switch (action.type) {
    case GET_FEED_REQUEST: {
      return {
        ...state,
        feedRequest: true,
        feedFailed: false,
      }
    }
    case GET_FEED_SUCCESS: {
      return {
        ...state,
        feed: action.feed,
        feedRequest: false,
      }
    }
    case GET_FEED_FAILED: {
      return {
        ...state,
        feedFailed: true,
        feedRequest: false,
        feed: [],
      }
    }
    default: {
      return state
    }
  }
}

export const rootReducer = combineReducers({
  feed: feedReducer,
  selectedIng: selectedIngredientsReducer,
  orderDetails: orderDetailsReducer,
  orderCreatedReducer: orderCreatedReducer,
  checkEmail: checkEmailReducer,
  loginReducer: loginReducer,
  registrationReducer: registrationReducer,
  logoutReducer: logoutReducer,
  tokenReducer: tokenReducer,
  userInfoReducer: userInfoReducer,
  resetPasswordReducer: resetPasswordReducer,
  wsReducer: wsReducer,
  wsAuthReducer: wsAuthReducer,
})
