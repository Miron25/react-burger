import { Link } from 'react-router-dom'
import styles from './orders-feed.module.css'
import { useSelector, useDispatch } from '../services/types/hooks'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient, ISingleOrder } from '../services/types/data'
import { useMemo, useEffect } from 'react'
import { wsInit } from '../services/actions/wsactiontypes'

export function OrdersFeedPage() {
  const wsData = useSelector((state) => state.wsReducer)
  const orders = wsData.ordersAll?.orders
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
          <div className={styles.card_order}>
            <OrdersFeedComponent />
          </div>
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

export const OrdersFeedComponent = () => {
  const orders = useSelector((state) => state.wsReducer.ordersAll?.orders)
  const initial_array = useSelector((state) => state.feed.feed)

  const ordersWithBuns = useMemo(() => {
    return orders?.filter((orderitem: ISingleOrder) =>
      initial_array
        .filter((item: IIngredient) =>
          orderitem.ingredients.some((id) => id === item._id)
        )
        .some((item2) => item2.type === 'bun')
    )
  }, [orders, initial_array])

  return (
    <>
      {ordersWithBuns &&
        ordersWithBuns.map((order_item) => (
          <div key={order_item._id} className={styles.card_order}>
            <Link
              to={`/feed/${order_item.number}`}
              state={{ background: location }}
            >
              <div className={`${styles.order_id_block} ${'mt-6 mb-3'}`}>
                <p
                  className={`${
                    styles.order_id
                  } ${'text text_type_digits-default'}`}
                >
                  {`#${order_item.number}`}
                </p>
                <p
                  className={`${
                    styles.order_timestamp
                  } ${'text text_type_main-default text_color_inactive'}`}
                >
                  {new Date(order_item.createdAt).toLocaleString('ru-Ru')}
                </p>
              </div>
              <div
                className={`${
                  styles.order_name_block
                } ${'text text_type_main-medium'}`}
              >
                {order_item.name}
              </div>
              <div
                className={`${
                  styles.components_price
                } ${'mt-3 mb-3 ml-6 mr-6'}`}
              >
                <div className={styles.ingredients}>
                  {initial_array
                    .filter((item: IIngredient) =>
                      order_item.ingredients.some((id) => id === item._id)
                    )
                    .map((filteredIngr, index) => (
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
                              index === 5
                                ? { opacity: '0.6' }
                                : { opacity: '1' }
                            }
                          ></img>
                          {index === 5 && (
                            <figcaption
                              className={'text text_type_main-default'}
                            >
                              {`+${order_item.ingredients.length - 5}`}
                            </figcaption>
                          )}
                        </figure>
                      </div>
                    ))}
                </div>
                <div className={styles.price}>
                  <span className="text text_type_digits-default">
                    {initial_array
                      .filter((item: IIngredient) =>
                        order_item.ingredients.some((id) => id === item._id)
                      )
                      .reduce(
                        (sum: number, item: IIngredient): number =>
                          sum + item.price,
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
