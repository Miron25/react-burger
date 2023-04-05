import { combineReducers } from 'redux'
import {
  GET_FEED_REQUEST,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from './../actions'
import { selectedIngredientsReducer } from './../reducers/burgerconst'
import { orderDetailsReducer } from './../reducers/orderdetails'
import { ingredientDetailsReducer } from './../reducers/ingredientdetails'
import { checkEmailReducer } from './forgotpassword'
import { loginReducer } from './authorization'
import { registrationReducer } from './registration'
import { logoutReducer } from './logout'
import { tokenReducer } from './token'
import { userInfoReducer } from './userinfo'

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
        // Запрос начал выполняться
        feedRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса на случай, если он был и завершился с ошибкой
        feedFailed: false,
      }
    }
    case GET_FEED_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        feed: action.feed,
        // Запрос закончил своё выполнение
        feedRequest: false,
      }
    }
    case GET_FEED_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, выставляем соответсвующие значения в хранилище
        feedFailed: true,
        // Запрос закончил своё выполнение
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
  ingDetails: ingredientDetailsReducer,
  checkEmail: checkEmailReducer,
  loginReducer: loginReducer,
  registrationReducer: registrationReducer,
  logoutReducer: logoutReducer,
  tokenReducer: tokenReducer,
  userInfoReducer: userInfoReducer,
})
