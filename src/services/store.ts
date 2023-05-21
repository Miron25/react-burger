import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { socketMiddleware } from './middleware/socketmiddleware'
import { socketAuthMiddleware } from './middleware/socketauthmiddleware'
import { TWSStoreActions, TWSStoreAuthActions } from './types/data'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_AUTH_START,
  WS_CONNECTION_AUTH_SUCCESS,
  WS_CONNECTION_AUTH_ERROR,
  WS_CONNECTION_AUTH_CLOSED,
  WS_GET_AUTH_MESSAGE,
} from './constants'

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
}

const wsAuthActions: TWSStoreAuthActions = {
  wsInitAuth: WS_CONNECTION_AUTH_START,
  onOpenAuth: WS_CONNECTION_AUTH_SUCCESS,
  onCloseAuth: WS_CONNECTION_AUTH_CLOSED,
  onErrorAuth: WS_CONNECTION_AUTH_ERROR,
  onMessageAuth: WS_GET_AUTH_MESSAGE,
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(wsActions),
      socketAuthMiddleware(wsAuthActions)
    )
  )
)
