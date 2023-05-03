import OrderDetailsStyles from './orderdetails.module.css'
import { useSelector } from '../../services/types/hooks'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import graphics from '../../images/graphics.png'

type TOrderDet = {
  show?: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const OrderDetailsContent: FC<TOrderDet> = ({ setShow }) => {
  const order = useSelector((state) => state.orderDetails.order)
  const name = useSelector((state) => state.orderDetails.name)

  return (
    <>
      <div className={OrderDetailsStyles.popup_title}>
        <CloseIcon type="primary" onClick={() => setShow(false)} />
      </div>
      <div className={OrderDetailsStyles.popup_order}>
        <p className="text text_type_digits-large">{order}</p>
      </div>
      <div className={OrderDetailsStyles.popup_text1}>
        <p className="text text_type_main-medium">{name}</p>
      </div>
      <img
        src={graphics}
        alt="graphics"
        className={OrderDetailsStyles.popup_img}
      />
      <div className={OrderDetailsStyles.popup_text2}>
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      </div>
      <div className={OrderDetailsStyles.popup_text3}>
        <p className="text text_type_main-default text_color_inactive pb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  )
}
