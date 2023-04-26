//import { arrayOf, shape, number, string } from 'prop-types'

import { ReactElement } from 'react'

export interface IIngredient {
  _id: string
  name: string
  type: string
  proteins?: number
  fat?: number
  carbohydrates?: number
  calories?: number
  price: number
  image: string
  image_mobile?: string
  image_large?: string
  __v?: number
  UUID?: string
}

export interface IFilteredIngr {
  filteredIngr: IIngredient
}

export interface IDroppedIngr {
  droppedIngr: IIngredient
  index: number
  moveIngr: (dragIndex: number, hoverIndex: number) => void
}

export interface IPrRootProps {
  onlyUnAuth: boolean
  element: ReactElement
}
