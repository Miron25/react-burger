import { ReactElement, ReactNode, CSSProperties } from 'react'

export type TUser = {
  readonly name: string
  readonly email: string
  readonly password?: string
}

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
}

export interface IIngUUID extends IIngredient {
  UUID: string
  UUID2?: string
}

export interface IFilteredIngr {
  filteredIngr: IIngredient
}

export interface IDroppedIngr {
  droppedIngr: IIngUUID
  index: number
  moveIngr: (dragIndex: number, hoverIndex: number) => void
}

export interface IPrRootProps {
  onlyUnAuth: boolean
  element: ReactElement
}

export interface IOptArg {
  options: RequestInit
}

export interface IOptArg2 {
  options2: RequestInit
}

export interface IOptArg3 {
  options_1: RequestInit
}

export interface IOptArg4 {
  patchOptions: RequestInit
}

export interface IModal {
  show: boolean
  onClose: () => void
  modalStyle?: CSSProperties
  children: ReactNode
}

export interface IForm {
  email?: string
  name?: string
  password?: string
  code?: string
}
