import { FC, ReactNode } from 'react'
import ModalOverlayStyles from './modaloverlay.module.css'

type TShow = {
  show: boolean
  children: ReactNode
}

const ModalOverlay: FC<TShow> = ({ show, children }) => {
  console.log(show)
  return (
    <div
      className={
        show ? ModalOverlayStyles.modal__wrap : ModalOverlayStyles.hide
      }
    >
      {children}
    </div>
  )
}

export default ModalOverlay
