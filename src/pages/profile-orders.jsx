//import { useEffect } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import styles from './profile.module.css'
//import { getLogout } from '../services/actions/logout'
import { NavLink } from 'react-router-dom'

export function ProfileOrdersPage() {
  const setActive = ({ isActive }) =>
    isActive
      ? 'text text_type_main-medium'
      : 'text text_type_main-medium text_color_inactive'
  console.log('In Orders!')
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.frame}>
            <NavLink to="/profile" end className={setActive}>
              Профиль
            </NavLink>
          </div>
          <div className={styles.frame}>
            <NavLink to="/profile/orders" className={setActive}>
              История заказов
            </NavLink>
          </div>
          <div className={styles.frame}>
            <NavLink
              to="/login"
              className={setActive}
              onClick={() => {
                //dispatch(getLogout({ options2 }))
              }}
            >
              Выход
            </NavLink>
          </div>
        </div>
        <div className={styles.caption}>
          <span className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
      </div>
    </>
  )
}
