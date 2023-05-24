import { feedReducer } from '.'
import {
  GET_FEED_REQUEST,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from '../constants'

describe('Feed Reducer', () => {
  it('Should return the Initial State', () => {
    expect(feedReducer(undefined, {})).toEqual({
      feedRequest: false,
      feedFailed: false,
      feed: [],
    })
  })

  it('Should handle GET_FEED_REQUEST', () => {
    const initialState = {
      feedRequest: false,
      feedFailed: false,
      feed: [],
    }
    const action = {
      type: GET_FEED_REQUEST,
    }
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      feedRequest: true,
      feedFailed: false,
    })
  })

  it('Should handle GET_FEED_SUCCESS', () => {
    const initialState = {
      feedRequest: true,
      feedFailed: false,
      feed: [],
    }
    const action = {
      type: GET_FEED_SUCCESS,
      feed: [
        {
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
        },
        {
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
        },
      ],
    }
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      feed: action.feed,
      feedRequest: false,
    })
  })

  it('Should handle GET_FEED_FAILED', () => {
    const initialState = {
      feedRequest: true,
      feedFailed: false,
      feed: [],
    }
    const action = {
      type: GET_FEED_FAILED,
    }
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      feedFailed: true,
      feedRequest: false,
      feed: [],
    })
  })
})
