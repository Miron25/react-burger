import { selectedIngredientsReducer } from './burgerconst'
import {
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  DELETE_BUN,
  CLEAR_ARRAY,
  SAVE_STATE,
} from '../constants'

describe('Burger Constructor Reducer', () => {
  it('Should return the Initial State', () => {
    expect(selectedIngredientsReducer(undefined, {})).toEqual({
      bun: undefined,
      ingredients: [],
      ing_ids: [],
    })
  })

  it('Should handle ADD_ITEM', () => {
    const initialState = {
      bun: undefined,
      ingredients: [],
      ing_ids: [],
    }
    const action = {
      type: ADD_ITEM,
      ingobj: {
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
        UUID: '9d52129e-e875-4759-92b8-02cceb588b76',
      },
      _id: '60666c42cc7b410027a1a9b5',
    }
    expect(selectedIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, action.ingobj],
      ing_ids: [...initialState.ing_ids, action._id],
    })
  })

  it('Should handle ADD_BUN', () => {
    const initialState = {
      bun: undefined,
      ingredients: [],
      ing_ids: [],
    }
    const action = {
      type: ADD_BUN,
      bunobj: {
        _id: '60666c42cc7b410027a1a9b1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
        UUID: '75ce284d-97d2-42d0-83a1-5cd7dc7e9fe9',
        UUID2: 'e97350c4-25b6-4c1d-b984-3d79628cd19c',
      },
      _id: '60666c42cc7b410027a1a9b1',
    }
    expect(selectedIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      bun: action.bunobj,
      ing_ids: [...initialState.ing_ids, action._id, action._id],
    })
  })

  it('Should handle DELETE_ITEM', () => {
    const initialState = {
      bun: undefined,
      ingredients: [],
      ing_ids: [],
    }
    const action = {
      type: DELETE_ITEM,
      droppedIngr: {
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
        UUID: '9d52129e-e875-4759-92b8-02cceb588b76',
      },
      _id: '60666c42cc7b410027a1a9b5',
      UUID: '9d52129e-e875-4759-92b8-02cceb588b76',
    }
    expect(selectedIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: initialState.ingredients.filter(
        (item) => item.UUID !== action.UUID
      ),
      ing_ids: initialState.ing_ids.filter((item) => item !== action._id),
    })
  })

  it('Should handle DELETE_BUN', () => {
    const initialState = {
      bun: undefined,
      ingredients: [],
      ing_ids: [],
    }
    const action = {
      type: DELETE_BUN,
    }
    expect(selectedIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      bun: undefined,
    })
  })

  it('Should handle CLEAR_ARRAY', () => {
    const initialState = {
      bun: undefined,
      ingredients: [],
      ing_ids: [],
    }
    const action = {
      type: CLEAR_ARRAY,
    }
    expect(selectedIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
    })
  })

  it('Should handle SAVE_STATE', () => {
    const initialState = {
      bun: undefined,
      ingredients: [],
      ing_ids: [],
    }
    const action = {
      type: SAVE_STATE,
      updatedList: [],
      ing_ids: [],
    }
    expect(selectedIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: [...action.updatedList],
      ing_ids: [...initialState.ing_ids],
    })
  })
})
