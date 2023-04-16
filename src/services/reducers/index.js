import { combineReducers } from 'redux'
import {
  GET_FEED_REQUEST,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from './../actions'
import { selectedIngredientsReducer } from './../reducers/burgerconst'
import { orderDetailsReducer } from './../reducers/orderdetails'
import { checkEmailReducer } from './forgotpassword'
import { loginReducer } from './authorization'
import { registrationReducer } from './registration'
import { logoutReducer } from './logout'
import { tokenReducer } from './token'
import { userInfoReducer } from './userinfo'
import { resetPasswordReducer } from './resetpassword'

const initialState = {
  feedRequest: false,
  feedFailed: false,
  feed: [],
}

export const feedReducer = (state = initialState, action) => {
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
  checkEmail: checkEmailReducer,
  loginReducer: loginReducer,
  registrationReducer: registrationReducer,
  logoutReducer: logoutReducer,
  tokenReducer: tokenReducer,
  userInfoReducer: userInfoReducer,
  resetPasswordReducer: resetPasswordReducer,
})
