import {
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  DELETE_BUN,
  CLEAR_ARRAY,
} from './../actions/burgerconst'

const initialState = {
  bun: null,
  ingredients: [],
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
      }
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bunobj,
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.UUID !== action.UUID
        ),
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
    default: {
      return state
    }
  }
}
