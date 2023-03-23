import { ADD_ITEM, DELETE_ITEM, CLEAR_ARRAY } from './../actions/burgerconst'

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
    case DELETE_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.id !== action.id
        ),
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
