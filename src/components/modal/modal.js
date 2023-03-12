import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalStyles from './modal.module.css'
//import useOnClickOutside from '../../useOnClickOutside'
//import ModalOverlay from '../modaloverlay/modaloverlay'
import PropTypes from 'prop-types'

const Modal = ({ children, show, onClose }) => {
  const modalRef = useRef(null)
  const modalRef2 = useRef(null)
  const modalRoot = document.getElementById('react-modals')
  //useOnClickOutside(modalRef2, onClose())

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the modal is open and the clicked target is not within the modal,
      // then close the modal
      if (!modalRef2.current && modalRef2.current.contains(e.target)) {
        console.log('Clicked')
        onClose()
      }
    }
    document.addEventListener('click', checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', checkIfClickedOutside)
    }
  }, [modalRef2])

  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(ModalStyles.visible)
    } else {
      modalRef.current.classList.remove(ModalStyles.visible)
    }
  }, [show])

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return ReactDOM.createPortal(
    <>
      <div ref={modalRef} className={`${ModalStyles.modal__wrap}`}>
        <button
          onClick={onClose}
          style={{
            width: 60,
            height: 40,
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '1rem',
            background: '#1f2029',
            opacity: 0.7,
            border: 'none',
          }}
        >
          <CloseIcon type="secondary" onClick={onClose} />
        </button>
        <div ref={modalRef2} className={ModalStyles.modal}>
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
