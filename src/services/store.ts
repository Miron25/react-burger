import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { socketMiddleware } from './middleware/socketmiddleware'
import { TWSStoreActions } from './types/data'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './constants'

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
)
