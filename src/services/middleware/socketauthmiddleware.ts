import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../types'
import type { IOrdersAll, TWSStoreAuthActions } from '../types/data'
import type { TWSAuthActions } from '../actions/wsactionauthtypes'

export const socketAuthMiddleware = (
  wsAuthActions: TWSStoreAuthActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return (next) => (action: TWSAuthActions) => {
      const { dispatch } = store
      const { type } = action
      const {
        wsInitAuth,
        onOpenAuth,
        onCloseAuth,
        onErrorAuth,
        onMessageAuth,
      } = wsAuthActions
      if (type === wsInitAuth) {
        socket = new WebSocket(action.payload) //`${wsUrl}?token=${user.token}`
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpenAuth })
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData: IOrdersAll = JSON.parse(data)
          dispatch({ type: onMessageAuth, payload: parsedData })
        }

        socket.onerror = (event) => {
          dispatch({ type: onErrorAuth, payload: event })
        }

        socket.onclose = () => {
          dispatch({ type: onCloseAuth })
        }
      }

      next(action)
    }
  }) as Middleware
}
