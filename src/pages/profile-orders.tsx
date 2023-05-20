import { useEffect, useMemo } from 'react'
import styles from './profile.module.css'
import { useDispatch, useSelector } from '../services/types/hooks'
import { NavLink } from 'react-router-dom'
import { getLogout } from '../services/actions/logout'
import { OrdersFeedComponent } from './orders-feed'
import { wsInitAuth } from '../services/actions/wsactionauthtypes'
import { IIngredient, ISingleOrderFull } from '../services/types/data'
import { getUserInfo } from '../services/actions/userinfo'

export function ProfileOrdersPage() {
  const wsAuthData = useSelector((state) => state.wsAuthReducer)
  const orders = wsAuthData.ordersAll?.orders
  const initial_array = useSelector((state) => state.feed.feed)
  const dispatch = useDispatch()
  const setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'text text_type_main-medium'
      : 'text text_type_main-medium text_color_inactive'

  const count: Array<object> | undefined = orders?.map((item) =>
    item.ingredients.reduce((accumulator, value) => {
      return { ...accumulator, [value]: Number(accumulator[value] || 0) + 1 }
    }, {})
  )

  const ingredientsFull = orders?.map((orderitem, index) => {
    return {
      ...orderitem,
      ingredients: initial_array.filter(
        (item: IIngredient) =>
          count && Object.keys(count[index]).some((id) => id === item._id)
      ),
    }
  })

  const countArray = ingredientsFull?.map((item, index) => {
    return {
      ...item,
      ingredients: item.ingredients.map((item2) => {
        return {
          ...item2,
          count: Number(
            count &&
              Object.values(count[index])[
                count &&
                  Object.keys(count[index]).findIndex((element) => {
                    return element === item2._id
                  })
              ]
          ),
        }
      }),
    }
  })

  const ordersAuthWithBuns = useMemo(() => {
    return countArray
      ?.filter((orderitem: ISingleOrderFull) =>
        orderitem.ingredients.some((item) => item.type === 'bun')
      )
      .sort((a, b) => b.number - a.number)
  }, [countArray])

  const options2: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('r_token'),
    }),
  }

  useEffect(() => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('a_token') || '',
      },
    }

    if (wsAuthData.ordersAll?.message === 'Invalid or missing token') {
      dispatch(getUserInfo({ options }))
    }
  }, [dispatch, wsAuthData.ordersAll?.message])

  useEffect(() => {
    if (!wsAuthData.wsConnected) {
      const accessToken = localStorage.getItem('a_token')?.slice(7)
      dispatch(
        wsInitAuth(
          `${'wss://norma.nomoreparties.space/orders'}?token=${accessToken}`
        )
      )
    }
  }, [dispatch, wsAuthData.wsConnected])

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
          <OrdersFeedComponent
            profileFlag={true}
            ordersArray={ordersAuthWithBuns}
          />
        </div>
      </div>
    </>
  )
}
