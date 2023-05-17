import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './orders-feed.module.css'
import { useSelector, useDispatch } from '../services/types/hooks'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient, ISingleOrderFull } from '../services/types/data'
import { useMemo, useEffect } from 'react'
import { wsInit } from '../services/actions/wsactiontypes'

export function OrdersFeedPage() {
  const wsData = useSelector((state) => state.wsReducer)
  const orders = wsData.ordersAll?.orders
  const initial_array = useSelector((state) => state.feed.feed)

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

  const ordersWithBuns = useMemo(() => {
    return countArray?.filter((orderitem: ISingleOrderFull) =>
      orderitem.ingredients.some((item) => item.type === 'bun')
    )
  }, [countArray])

  const dispatch = useDispatch()

  useEffect(() => {
    if (!wsData.wsConnected) {
      dispatch(wsInit('wss://norma.nomoreparties.space/orders/all'))
    }
  }, [dispatch, wsData.wsConnected])

  return (
    <>
      <div className={styles.title}>
        <header className="text text_type_main-large">Лента заказов</header>
      </div>
      <div className={styles.left_sidebar}>
        <div className={styles.list}>
          <OrdersFeedComponent
            profileFlag={false}
            ordersArray={ordersWithBuns}
          />
        </div>
      </div>

      <div className={styles.right_sidebar}>
        <div className={styles.orders_board}>
          <div className={styles.orders_block}>
            <p className="text text_type_main-medium">Готовы:</p>
            <section className={styles.orders_list_left}>
              <div
                className="text text_type_digits-default"
                style={{ color: '#00CCCC' }}
              >
                {orders
                  ?.filter((item, index) => item.status === 'done' && index < 6)
                  .map((item2) => (
                    <span key={item2._id} className={styles.order_number}>
                      {item2.number}
                    </span>
                  ))}
              </div>
              <div
                className="text text_type_digits-default"
                style={{ color: '#00CCCC' }}
              >
                {orders
                  ?.filter(
                    (item, index) =>
                      item.status === 'done' && index >= 6 && index < 12
                  )
                  .map((item2) => (
                    <span key={item2._id} className={styles.order_number}>
                      {item2.number}
                    </span>
                  ))}
              </div>
            </section>
          </div>
          <div className={styles.orders_block}>
            <p className="text text_type_main-medium">В работе:</p>
            <section className={styles.orders_list_left}>
              <div className="text text_type_digits-default">
                {orders
                  ?.filter((item, index) => item.status !== 'done' && index < 6)
                  .map((item2) => (
                    <span key={item2._id} className={styles.order_number}>
                      {item2.number}
                    </span>
                  ))}
              </div>
              <div className="text text_type_digits-default">
                {orders
                  ?.filter(
                    (item, index) =>
                      item.status !== 'done' && index >= 6 && index < 12
                  )
                  .map((item2) => (
                    <span key={item2._id} className={styles.order_number}>
                      {item2.number}
                    </span>
                  ))}
              </div>
            </section>
          </div>
        </div>
        <div className={styles.orders_all}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <div className={styles.orders_all_number}>
            <p className="text text_type_digits-large">
              {wsData.ordersAll?.total}
            </p>
          </div>
        </div>
        <div className={styles.orders_all}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <div className={styles.orders_all_number}>
            <p className="text text_type_digits-large">
              {wsData.ordersAll?.totalToday}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

type TFlag = {
  profileFlag: boolean
  ordersArray?: ReadonlyArray<ISingleOrderFull>
}

export const OrdersFeedComponent: FC<TFlag> = ({
  profileFlag,
  ordersArray,
}) => {
  const initial_array = useSelector((state) => state.feed.feed)

  return (
    <>
      {ordersArray &&
        ordersArray.map((order_item) => (
          <div
            key={order_item._id}
            className={profileFlag ? styles.card_order_pr : styles.card_order}
          >
            <Link
              to={
                profileFlag
                  ? `/profile/orders/${order_item.number}`
                  : `/feed/${order_item.number}`
              }
              state={{ background: location }}
            >
              <div
                className={`${
                  profileFlag ? styles.order_id_block_pr : styles.order_id_block
                } ${'mt-6 mb-3'}`}
              >
                <p
                  className={`${
                    styles.order_id
                  } ${'text text_type_digits-default'}`}
                >
                  {`#${order_item.number}`}
                </p>
                <p
                  className={`${
                    profileFlag
                      ? styles.order_timestamp_pr
                      : styles.order_timestamp
                  } ${'text text_type_main-default text_color_inactive'}`}
                >
                  {<FormattedDate date={new Date(order_item.createdAt)} />}
                </p>
              </div>
              <div
                className={`${
                  profileFlag
                    ? styles.order_name_block_pr
                    : styles.order_name_block
                } ${'text text_type_main-medium'}`}
              >
                {order_item.name}
              </div>
              <div
                className={`${
                  profileFlag ? styles.status_pr : styles.status
                } ${'text text_type_main-default pl-6 pr-6 pb-3 pt-2'}`}
                style={
                  order_item.status === 'done'
                    ? { color: '#00CCCC' }
                    : { color: '#F2F2F3' }
                }
              >
                {order_item.status === 'done'
                  ? 'Выполнен'
                  : order_item.status === 'created'
                  ? 'Создан'
                  : order_item.status === 'pending'
                  ? 'Готовится'
                  : 'Отменен'}
              </div>
              <div
                className={`${
                  profileFlag
                    ? styles.components_price_pr
                    : styles.components_price
                } ${'mt-3 mb-3 ml-6 mr-6'}`}
              >
                <div
                  className={
                    profileFlag ? styles.ingredients_pr : styles.ingredients
                  }
                >
                  {order_item.ingredients.map((filteredIngr, index) => (
                    <div
                      key={filteredIngr._id}
                      className={styles.ing_preview}
                      style={
                        index === 0
                          ? { left: '0px', zIndex: `${index + 5}` }
                          : index < 5
                          ? {
                              left: `${index * 48}px`,
                              zIndex: `${5 - index}`,
                            }
                          : index === 5
                          ? { left: `${index * 48}px`, zIndex: '0' }
                          : {}
                      }
                    >
                      <figure>
                        <img
                          src={filteredIngr.image_mobile}
                          alt=""
                          style={
                            index === 5 ? { opacity: '0.6' } : { opacity: '1' }
                          }
                        ></img>
                        {index === 5 && (
                          <figcaption className={'text text_type_main-default'}>
                            {`+${order_item.ingredients.length - 5}`}
                          </figcaption>
                        )}
                      </figure>
                    </div>
                  ))}
                </div>
                <div className={styles.price}>
                  <span className="text text_type_digits-default">
                    {order_item.ingredients.reduce(
                      (sum, item) => sum + (item.count || 0) * item.price,
                      0
                    )}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  )
}
