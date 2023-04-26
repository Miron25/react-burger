import { CSSProperties, FC, useEffect, useRef, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import ModalStyles from './modal.module.css'
import ModalOverlay from '../modaloverlay/modaloverlay'

interface IModal {
  show: boolean
  onClose: () => void
  modalStyle?: CSSProperties
  children: ReactNode
}

const Modal: FC<IModal> = ({ children, show, onClose, modalStyle }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const modalRoot = document.getElementById('react-modals')

  useEffect(() => {
    function checkIfClickedOutside(this: Document, event: MouseEvent): void {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mouseup', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mouseup', checkIfClickedOutside)
    }
  }, [onClose])

  useEffect(() => {
    function close(this: Window, event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return modalRoot
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay show={show}>
            <div
              ref={modalRef}
              style={modalStyle}
              className={show ? ModalStyles.modal : ModalStyles.hide}
            >
              {children}
            </div>
          </ModalOverlay>
        </>,
        modalRoot
      )
    : null
}

export default Modal
