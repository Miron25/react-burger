import {
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  DELETE_BUN,
  CLEAR_ARRAY,
  SAVE_STATE,
} from './../actions/burgerconst'

const initialState = {
  bun: null,
  ingredients: [],
  ing_ids: [],
}

export const selectedIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          Object.assign({}, action.obj, { UUID: action.unique_id }),
        ],
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
        ingredients: [...state.ingredients].filter(
          (item) => item.UUID !== action.UUID
        ),
        ing_ids: [...state.ing_ids].filter((item) => item._id !== action._id),
      }
    }
    case DELETE_BUN: {
      return {
        ...state,
        bun: null,
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
        ingredients: [...state.ingredients],
        ing_ids: [...state.ing_ids],
      }
    }
    default: {
      return state
    }
  }
}
