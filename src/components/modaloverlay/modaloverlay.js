import { forwardRef } from 'react'
import ModalOverlayStyles from './modaloverlay.module.css'
import PropTypes from 'prop-types'

const ModalOverlay = forwardRef(({ show }, ref) => {
  return (
    <div
      ref={ref}
      className={
        show ? ModalOverlayStyles.modal__wrap : ModalOverlayStyles.hide
      }
    ></div>
  )
})

ModalOverlay.propTypes = {
  show: PropTypes.bool,
}

ModalOverlay.displayName = 'ModalOverlay'

export default ModalOverlay
