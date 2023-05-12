import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../types'
import type { IOrdersAll, TWSStoreActions } from '../types/data'
import type { TWSActions } from '../actions/wsactiontypes'

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return (next) => (action: TWSActions) => {
      const { dispatch } = store
      const { type } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions
      if (type === wsInit) {
        socket = new WebSocket(action.payload) //`${wsUrl}?token=${user.token}`
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen })
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData: IOrdersAll = JSON.parse(data)
          dispatch({ type: onMessage, payload: parsedData })
        }

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event })
        }

        socket.onclose = () => {
          dispatch({ type: onClose })
        }
      }

      next(action)
    }
  }) as Middleware
}
