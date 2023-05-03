import {
  CLEAR_ARRAY,
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  DELETE_BUN,
  SAVE_STATE,
} from '../constants'
import { IIngUUID } from '../types/data'

export interface IClearArrayAction {
  readonly type: typeof CLEAR_ARRAY
}

export interface IAddItemAction {
  readonly type: typeof ADD_ITEM
  readonly ingobj: IIngUUID
  readonly _id: string
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN
  readonly bunobj: IIngUUID
  readonly _id: string
}

export interface IDeleteBunAction {
  readonly type: typeof DELETE_BUN
}

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM
  readonly droppedIngr: IIngUUID
  readonly _id: string
  readonly UUID: string
}

export interface ISaveStateAction {
  readonly type: typeof SAVE_STATE
  readonly updatedList: ReadonlyArray<IIngUUID>
  readonly ing_ids: ReadonlyArray<string>
}

export type TConstructorActions =
  | IClearArrayAction
  | IAddItemAction
  | IAddBunAction
  | IDeleteItemAction
  | IDeleteBunAction
  | ISaveStateAction

export const clearArrayAction = (): IClearArrayAction => ({
  type: CLEAR_ARRAY,
})

export const addItemAction = (
  ingobj: IIngUUID,
  _id: string
): IAddItemAction => ({
  type: ADD_ITEM,
  ingobj,
  _id,
})

export const addBunAction = (bunobj: IIngUUID, _id: string): IAddBunAction => ({
  type: ADD_BUN,
  bunobj,
  _id,
})

export const deleteItemAction = (
  droppedIngr: IIngUUID,
  _id: string,
  UUID: string
): IDeleteItemAction => ({
  type: DELETE_ITEM,
  droppedIngr,
  _id,
  UUID,
})

export const deleteBunAction = (): IDeleteBunAction => ({
  type: DELETE_BUN,
})

export const saveStateAction = (
  updatedList: ReadonlyArray<IIngUUID>,
  ing_ids: ReadonlyArray<string>
): ISaveStateAction => ({
  type: SAVE_STATE,
  updatedList,
  ing_ids,
})
