import { useEffect, useRef } from 'react'
//import ReactDOM from 'react-dom/client'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlayStyles from './modaloverlay.module.css'
import PropTypes from 'prop-types'

const ModalOverlay = ({ show, onClose }) => {
  const modalRef = useRef(null)
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(ModalOverlayStyles.visible)
    } else {
      modalRef.current.classList.remove(ModalOverlayStyles.visible)
    }
  }, [show])

  return (
    <>
      <div ref={modalRef} className={`${ModalOverlayStyles.modal__wrap}`}>
        <button
          onClick={onClose}
          style={{
            width: 60,
            height: 40,
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '1rem',
          }}
        >
          <CloseIcon />
        </button>
      </div>
    </>
  )
}

ModalOverlay.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

export default ModalOverlay
