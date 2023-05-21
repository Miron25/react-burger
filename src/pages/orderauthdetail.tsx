import styles from './orderdetail.module.css'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from '../services/types/hooks'
import { NORMA_API } from '../utils/api'
import { getOrder } from '../services/actions/orderdetails'
import { IIngredient } from '../services/types/data'
import React, { ReactNode, ReactElement, FC, useEffect, useMemo } from 'react'
import {
  CloseIcon,
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'

type TModal = { directLink: boolean }

type TCIng = TModal & { children: ReactNode }

function CenterOrder({ children, directLink }: TCIng): ReactElement {
  return directLink ? (
    <div className={styles.detail_box}>{children}</div>
  ) : (
    <div className={styles.detail_box_modal}>{children}</div>
  )
}

export const OrderAuthDetails: FC<TModal> = ({ directLink }) => {
  const orderDetails = useSelector((state) => state.orderDetails.orders)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { orderId } = useParams<{ orderId: string }>()
  const url = `${NORMA_API}/orders/${orderId}`
  const initial_array = useSelector((state) => state.feed.feed)

  const count =
    orderDetails &&
    orderDetails[0].ingredients.reduce((accumulator, value) => {
      return { ...accumulator, [value]: Number(accumulator[value] || 0) + 1 }
    }, {})

  useEffect(() => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('a_token') || '',
      },
    }
    dispatch(getOrder({ url, options }))
  }, [dispatch, url])

  const ingredientsFull = useMemo(() => {
    return initial_array.filter(
      (item: IIngredient) =>
        count && Object.keys(count).some((id) => id === item._id)
    )
  }, [count, initial_array])

  const countArray = ingredientsFull.map((item) => {
    const ind = Object.keys(count || 0).findIndex((element) => {
      return element === item._id
    })
    return { ...item, count: Object.values<number>(count || 0)[ind] }
  })

  const totalPrice = useMemo(() => {
    return countArray.reduce((sum, item) => sum + item.count * item.price, 0)
  }, [countArray])

  return (
    <>
      <CenterOrder directLink={directLink}>
        <div
          className={`${
            directLink ? styles.order_number : styles.order_number_modal
          } ${'text text_type_digits-default'}`}
        >
          {orderDetails && `#${orderDetails[0].number}`}
          {!directLink && (
            <CloseIcon
              type="primary"
              onClick={() => {
                location.state.background && navigate(-1)
              }}
            />
          )}
        </div>
        <div
          className={styles.order_name_status}
          style={directLink ? { top: '36px' } : { top: '64px' }}
        >
          <div
            className={`${
              orderDetails && orderDetails[0].name.length < 80
                ? styles.order_name
                : styles.order_name_ext
            } ${'text text_type_main-medium'}`}
            style={directLink ? {} : { height: '70px' }}
          >
            {orderDetails && orderDetails[0].name}
          </div>
          <div
            className={`${styles.status} ${'text text_type_main-default'}`}
            style={
              orderDetails && orderDetails[0].status === 'done'
                ? { color: '#00CCCC' }
                : { color: '#F2F2F3' }
            }
          >
            {orderDetails && orderDetails[0].status === 'done'
              ? 'Выполнен'
              : orderDetails && orderDetails[0].status === 'created'
              ? 'Создан'
              : orderDetails && orderDetails[0].status === 'pending'
              ? 'Готовится'
              : ''}
          </div>
        </div>

        <div className={styles.ingredients_block}>
          <div
            className={`${styles.order_name2} ${'text text_type_main-medium'}`}
          >
            Состав:
          </div>
          <div className={styles.scroll_area}>
            {countArray.map((filteredIngr) => (
              <React.Fragment key={filteredIngr._id}>
                <div className={styles.ingredient_item}>
                  <div className={styles.ing_preview}>
                    <img src={filteredIngr.image_mobile} alt=""></img>
                  </div>
                  <div
                    className={`${
                      styles.ing_name
                    } ${'text text_type_main-default'}`}
                  >
                    {filteredIngr.name}
                  </div>
                  <div
                    className={`${
                      styles.price
                    } ${'text text_type_digits-default'}`}
                  >
                    {`${filteredIngr.count} X ${filteredIngr.price}`}
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.time_block}>
          <div
            className={`${
              styles.time
            } ${'text text_type_main-default text_color_inactive'}`}
          >
            {orderDetails && (
              <FormattedDate date={new Date(orderDetails[0].createdAt)} />
            )}
          </div>
          <div
            className={`${
              styles.total_price
            } ${'text text_type_digits-default'}`}
          >
            {totalPrice}
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </CenterOrder>
    </>
  )
}
