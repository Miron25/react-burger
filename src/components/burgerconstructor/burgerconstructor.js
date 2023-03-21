import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import BurgerConsStyles from './burgercons.module.css'
import Modal from './../modal/modal'
//import PropTypes from 'prop-types'
//import { arrayType } from '../../types/index'
import graphics from '../../images/graphics.png'
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor() {
  const init_array = useSelector((state) => state.feed.feed)
  const [show, setShow] = useState(false)
  return (
    <div className={BurgerConsStyles.main}>
      <div className={BurgerConsStyles.constr_block}>
        {
          <React.Fragment>
            <span style={{ paddingLeft: '24px' }}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={init_array[0].name + ' (верх)'}
                price={init_array[0].price}
                thumbnail={init_array[0].image}
              />
            </span>
            <div className={BurgerConsStyles.scroll_block}>
              <span>
                <DragIcon />
                <ConstructorElement
                  text={init_array[5].name}
                  price={init_array[5].price}
                  thumbnail={init_array[5].image}
                />
              </span>
              <span>
                <DragIcon />
                <ConstructorElement
                  text={init_array[4].name}
                  price={init_array[4].price}
                  thumbnail={init_array[4].image}
                />
              </span>
              <span>
                <DragIcon />
                <ConstructorElement
                  text={init_array[8].name}
                  price={init_array[8].price}
                  thumbnail={init_array[8].image}
                />
              </span>
              <span>
                <DragIcon />
                <ConstructorElement
                  text={init_array[8].name}
                  price={init_array[8].price}
                  thumbnail={init_array[8].image}
                />
              </span>
              <span>
                <DragIcon />
                <ConstructorElement
                  text={init_array[10].name}
                  price={init_array[10].price}
                  thumbnail={init_array[10].image}
                />
              </span>
              <span>
                <DragIcon />
                <ConstructorElement
                  text={init_array[11].name}
                  price={init_array[11].price}
                  thumbnail={init_array[11].image}
                />
              </span>
            </div>
            <span style={{ paddingLeft: '24px' }}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={init_array[0].name + ' (низ)'}
                price={init_array[0].price}
                thumbnail={init_array[0].image}
              />
            </span>
          </React.Fragment>
        }
      </div>
      <div className={BurgerConsStyles.info_block}>
        {
          <>
            <span
              className={
                BurgerConsStyles.total_price + 'text text_type_digits-medium'
              }
            >
              9624
              <CurrencyIcon />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => setShow(true)}
            >
              Оформить заказ
            </Button>
          </>
        }
        <Modal
          show={show}
          onClose={() => setShow(false)}
          modalStyle={{ height: '718px' }}
        >
          <div className={BurgerConsStyles.popup_title}>
            <CloseIcon onClick={() => setShow(false)} />
          </div>
          <div className={BurgerConsStyles.popup_order}>
            <p className="text text_type_digits-large">034536</p>
          </div>
          <div className={BurgerConsStyles.popup_text1}>
            <p className="text text_type_main-medium">идентификатор заказа</p>
          </div>
          <img
            src={graphics}
            alt="graphics"
            className={BurgerConsStyles.popup_img}
          />
          <div className={BurgerConsStyles.popup_text2}>
            <p className="text text_type_main-small">
              Ваш заказ начали готовить
            </p>
          </div>
          <div className={BurgerConsStyles.popup_text3}>
            <p className="text text_type_main-default text_color_inactive pb-30">
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </Modal>
      </div>
    </div>
  )
}

//BurgerConstructor.propTypes = {
//  mainArray: arrayType.isRequired,
//}

export default BurgerConstructor
