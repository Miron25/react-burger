import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import ModalStyles from './modal.module.css'
//import ModalOverlay from '../modaloverlay/modaloverlay'
import PropTypes from 'prop-types'

const Modal = ({ children, show, onClose, modalStyle }) => {
  const modalRef = useRef(null)
  const modalRoot = document.getElementById('react-modals')

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mouseup', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mouseup', checkIfClickedOutside)
    }
  }, [])

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return ReactDOM.createPortal(
    <>
      <div className={show ? ModalStyles.modal__wrap : ModalStyles.hide}>
        <div
          ref={modalRef}
          style={modalStyle}
          className={show ? ModalStyles.modal : ModalStyles.hide}
        >
          {children}
        </div>
      </div>
    </>,
    modalRoot
  )
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func,
}

export default Modal
