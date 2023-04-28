import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  HTMLAttributes,
} from 'react'
import styles from './input.module.css'

export interface TIconProps extends FC<HTMLAttributes<HTMLInputElement>> {
  onClick?: MouseEventHandler<HTMLInputElement>
}

export type TInput = {
  placeholder: string
  value?: string
  type?: string
  name: string
  icon?: TIconProps
  onChange: ChangeEventHandler<HTMLInputElement>
  onIconClick?: MouseEventHandler<HTMLInputElement>
}

export const Input: FC<TInput> = ({
  icon: Icon,
  onIconClick,
  value,
  placeholder,
  onChange,
  type,
  ...props
}) => {
  const icon = Icon ? (
    <Icon onClick={onIconClick} className={styles.inputContainer} />
  ) : null
  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.input} ${'text text_type_main-default'}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {icon}
    </div>
  )
}
