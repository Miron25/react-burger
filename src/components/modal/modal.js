import { useEffect, useRef } from 'react'
//import ReactDOM from 'react-dom/client'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalStyles from './modal.module.css'
import PropTypes from 'prop-types'

const Modal = ({ children, show, onClose }) => {
  const modalRef = useRef(null)
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(ModalStyles.visible)
    } else {
      modalRef.current.classList.remove(ModalStyles.visible)
    }
  }, [show])
  //const modalRoot = document.getElementById('react-modals')

  const handleKeyDown = () => {
    // check keys if you want
    //if (e.keyCode == 13) {
    //  focus()
    // }
  }

  return (
    <>
      <div ref={modalRef} className={`${ModalStyles.modal__wrap}`}>
        <button
          onClick={onClose}
          onKeyDown={handleKeyDown}
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
        <div className={ModalStyles.modal}>{children}</div>
      </div>
    </>
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
