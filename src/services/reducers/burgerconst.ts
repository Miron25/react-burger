import {
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  DELETE_BUN,
  CLEAR_ARRAY,
  SAVE_STATE,
} from '../constants'
import { IIngUUID } from '../types/data'
import { TConstructorActions } from '../actions/burgerconst'

export type TSelectedIngrState = {
  bun?: IIngUUID
  ingredients: ReadonlyArray<IIngUUID>
  ing_ids: ReadonlyArray<string>
}

const initialState: TSelectedIngrState = {
  bun: undefined,
  ingredients: [],
  ing_ids: [],
}

export const selectedIngredientsReducer = (
  state = initialState,
  action: TConstructorActions
): TSelectedIngrState => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingobj],
        ing_ids: [...state.ing_ids, action._id],
      }
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bunobj,
        ing_ids: [...state.ing_ids, action._id],
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item) => item.UUID !== action.UUID
        ),
        ing_ids: state.ing_ids.filter((item) => item !== action._id),
      }
    }
    case DELETE_BUN: {
      return {
        ...state,
        bun: undefined,
      }
    }
    case CLEAR_ARRAY: {
      return {
        ...initialState,
      }
    }
    case SAVE_STATE: {
      return {
        ...state,
        ingredients: [...action.updatedList],
        ing_ids: [...state.ing_ids],
      }
    }
    default: {
      return state
    }
  }
}
