import { Input } from '../input'
import eyeOff from '../../images/eye-off.svg'
import eye from '../../images/eye.svg'
import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../input/input.module.css'

const EyeOff = ({ onClick }) => (
  <input
    type="image"
    src={eyeOff}
    alt="eye-off"
    onClick={onClick}
    className={styles.icon_pad}
  />
)
const Eye = ({ onClick }) => (
  <input
    type="image"
    src={eye}
    alt="eye-off"
    onClick={onClick}
    className={styles.icon_pad}
  />
)

export const PasswordInput = ({ ...props }) => {
  const [isVisible, setVisible] = useState(false)
  return (
    <Input
      {...props}
      type={isVisible ? 'text' : 'password'}
      icon={isVisible ? EyeOff : Eye}
      onIconClick={() => setVisible(!isVisible)}
    />
  )
}

EyeOff.propTypes = {
  onClick: PropTypes.func,
}

Eye.propTypes = {
  onClick: PropTypes.func,
}
