import {
  GET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from './../actions/ingredientdetails'

const initialState = {
  ingDetails: [],
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingDetails: action.ingr,
      }
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...initialState,
      }
    }
    default: {
      return state
    }
  }
}
