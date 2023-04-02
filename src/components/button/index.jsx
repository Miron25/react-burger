import styles from './button.module.css'
import PropTypes from 'prop-types'

export const Button = ({ primary, secondary, ...props }) => {
  // Hide console.log
  return (
    <button {...props} className={primary ? styles.primary : styles.secondary}>
      {props.children}
      {console.log(secondary)}
    </button>
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
}
