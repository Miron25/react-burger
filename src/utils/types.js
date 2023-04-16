import { arrayOf, shape, number, string } from 'prop-types'

export const arrayType = arrayOf(
  shape({
    _id: string.isRequired,
    name: string.isRequired,
    type: string.isRequired,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number.isRequired,
    image: string.isRequired,
    image_mobile: string,
    image_large: string,
    __v: number,
  })
)

export const singleIngrType = shape({
  _id: string.isRequired,
  UUID: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number.isRequired,
  image: string.isRequired,
  image_mobile: string,
  image_large: string,
  __v: number,
})

export const filteredIngrType = shape({
  _id: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number.isRequired,
  image: string.isRequired,
  image_mobile: string,
  image_large: string,
  __v: number,
})

export const optionsType = shape({
  method: string.isRequired,
  headers: shape({
    'Content-Type': string.isRequired,
    Authorization: string,
  }),
  body: shape({
    email: string,
    password: string,
    token: string,
  }),
})
