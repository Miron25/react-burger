import { NORMA_API, checkResponse } from '../../utils/api'
import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILED,
} from '../constants'
import { IIngredient } from '../types/data'
import { AppDispatch, AppThunkAction } from '../types'

export interface IGetFeedAction {
  readonly type: typeof GET_FEED_REQUEST
}

export interface IGetFeedSuccessAction {
  readonly type: typeof GET_FEED_SUCCESS
  readonly feed: ReadonlyArray<IIngredient>
}

export interface IGetFeedErrorAction {
  readonly type: typeof GET_FEED_FAILED
}

export type TGetFeedActions =
  | IGetFeedAction
  | IGetFeedSuccessAction
  | IGetFeedErrorAction

export const getFeedAction = (): IGetFeedAction => ({
  type: GET_FEED_REQUEST,
})

export const getFeedSuccessAction = (
  feed: ReadonlyArray<IIngredient>
): IGetFeedSuccessAction => ({
  type: GET_FEED_SUCCESS,
  feed,
})

export const getFeedErrorAction = (): IGetFeedErrorAction => ({
  type: GET_FEED_FAILED,
})

export function getFeed(): AppThunkAction {
  return function (dispatch: AppDispatch) {
    dispatch(getFeedAction())
    fetch(`${NORMA_API}/ingredients`)
      .then(checkResponse)
      .then((result) => {
        if (result && result.success) {
          dispatch(getFeedSuccessAction(result.data))
        } else {
          dispatch(getFeedErrorAction())
        }
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(getFeedErrorAction())
      })
  }
}
