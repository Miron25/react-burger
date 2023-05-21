import { Input, TInput, TIconProps } from '../input'
import { FC, useState } from 'react'
import eyeOff from '../../images/eye-off.svg'
import eye from '../../images/eye.svg'
import styles from '../input/input.module.css'

const EyeOff: TIconProps = ({ onClick }) => (
  <input
    type="image"
    src={eyeOff}
    alt="eye-off"
    onClick={onClick}
    className={styles.icon_pad}
  />
)
const Eye: TIconProps = ({ onClick }) => (
  <input
    type="image"
    src={eye}
    alt="eye-off"
    onClick={onClick}
    className={styles.icon_pad}
  />
)

export const PasswordInput: FC<TInput> = ({ ...props }) => {
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
