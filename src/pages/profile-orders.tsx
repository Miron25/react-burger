import styles from './profile.module.css'
import { useDispatch } from '../services/types/hooks'
import { NavLink } from 'react-router-dom'
import { getLogout } from '../services/actions/logout'

export function ProfileOrdersPage() {
  const dispatch = useDispatch()
  const setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'text text_type_main-medium'
      : 'text text_type_main-medium text_color_inactive'

  const options2: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('r_token'),
    }),
  }

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
                dispatch(getLogout({ options2 }))
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
