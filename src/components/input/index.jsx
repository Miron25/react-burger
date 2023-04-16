import styles from './input.module.css'
import PropTypes from 'prop-types'

export const Input = ({
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

Input.propTypes = {
  icon: PropTypes.any,
  onIconClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
}
