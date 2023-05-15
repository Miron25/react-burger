import { useEffect, useMemo } from 'react'
import styles from './profile.module.css'
import { useDispatch, useSelector } from '../services/types/hooks'
import { NavLink } from 'react-router-dom'
import { getLogout } from '../services/actions/logout'
import { OrdersFeedComponent } from './orders-feed'
import { wsInitAuth } from '../services/actions/wsactionauthtypes'
import { IIngredient, ISingleOrder } from '../services/types/data'

export function ProfileOrdersPage() {
  const wsAuthData = useSelector((state) => state.wsAuthReducer)
  const orders = wsAuthData.ordersAll?.orders
  const initial_array = useSelector((state) => state.feed.feed)
  const dispatch = useDispatch()
  const setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'text text_type_main-medium'
      : 'text text_type_main-medium text_color_inactive'

  const ordersAuthWithBuns = useMemo(() => {
    return orders?.filter((orderitem: ISingleOrder) =>
      initial_array
        .filter((item: IIngredient) =>
          orderitem.ingredients.some((id) => id === item._id)
        )
        .some((item2) => item2.type === 'bun')
    )
  }, [orders, initial_array])

  const options2: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('r_token'),
    }),
  }

  /*dispatch(
    wsInitAuth(
      `${'wss://norma.nomoreparties.space/orders'}?token=${accessToken}`
    )
  )*/
  useEffect(() => {
    if (!wsAuthData.wsConnected) {
      const accessToken = localStorage.getItem('a_token')?.slice(7)
      dispatch(
        wsInitAuth(
          `${'wss://norma.nomoreparties.space/orders'}?token=${accessToken}`
        )
      )
    }
  }, [])

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

        <div className={styles.orders_feed}>
          <OrdersFeedComponent profileFlag={true} ordersArray={orders} />
        </div>
      </div>
    </>
  )
}
