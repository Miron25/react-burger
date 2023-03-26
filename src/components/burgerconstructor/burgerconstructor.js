import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BurgerConsStyles from './burgercons.module.css'
import Modal from './../modal/modal'
import graphics from '../../images/graphics.png'
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import {
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  DELETE_BUN,
  CLEAR_ARRAY,
} from '../../services/actions/burgerconst'
import { v4 as uuidv4 } from 'uuid'
import { getOrder } from '../../services/actions/orderdetails'

function BurgerConstructor() {
  const ingredients = useSelector((state) => state.selectedIng.ingredients)
  const bun = useSelector((state) => state.selectedIng.bun)
  const ing_ids = useSelector((state) => state.selectedIng.ing_ids)
  const order = useSelector((state) => state.orderDetails.order)
  const name = useSelector((state) => state.orderDetails.name)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const totalPrice = useMemo(() => {
    if (bun)
      return (
        ingredients.reduce((sum, item) => sum + item.price, 0) + bun.price * 2
      )
    else return 0
  }, [ingredients, bun])

  const [, dropTarget] = useDrop({
    accept: ['main_sauce', 'bun'],
    drop(itemId) {
      if (itemId.type === 'bun') {
        addingBun(itemId)
      } else if ((itemId.type === 'sauce' || itemId.type === 'main') && bun) {
        addingItem(itemId)
      }
    },
  })

  // To handle onClick event and add an item to constructor
  const addingItem = (obj) => {
    const unique_id = uuidv4()
    dispatch({
      type: ADD_ITEM,
      obj,
      unique_id,
      _id: obj._id,
    })
  }

  const addingBun = (bunobj) => {
    bunobj = Object.assign({}, bunobj, { UUID: uuidv4(), UUID2: uuidv4() })
    dispatch({
      type: DELETE_BUN,
    })
    dispatch({
      type: ADD_BUN,
      bunobj,
      _id: bunobj._id,
    })
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: ing_ids,
    }),
  }

  return (
    <div className={BurgerConsStyles.main}>
      <div className={BurgerConsStyles.constr_block} ref={dropTarget}>
        {
          <React.Fragment>
            {bun && (
              <span
                key={bun.UUID}
                className={BurgerConsStyles.elem}
                style={{ paddingLeft: '24px' }}
              >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={bun.name + ' (верх)'}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </span>
            )}
            <div className={BurgerConsStyles.scroll_block}>
              {ingredients.map((droppedIngr) => (
                <React.Fragment key={droppedIngr.UUID}>
                  <span className={BurgerConsStyles.elem}>
                    <DragIcon />
                    <ConstructorElement
                      text={droppedIngr.name}
                      price={droppedIngr.price}
                      thumbnail={droppedIngr.image}
                      handleClose={() =>
                        dispatch({
                          type: DELETE_ITEM,
                          UUID: droppedIngr.UUID,
                          _id: droppedIngr._id,
                        })
                      }
                    />
                  </span>
                </React.Fragment>
              ))}
            </div>
            {bun && (
              <span
                key={bun.UUID2}
                className={BurgerConsStyles.elem}
                style={{ paddingLeft: '24px' }}
              >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={bun.name + ' (низ)'}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </span>
            )}
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
              {totalPrice}
              <CurrencyIcon />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                setShow(true)
                dispatch({ type: CLEAR_ARRAY })
                dispatch(getOrder({ options }))
              }}
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
            <p className="text text_type_digits-large">{order}</p>
          </div>
          <div className={BurgerConsStyles.popup_text1}>
            <p className="text text_type_main-medium">{name}</p>
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

export default BurgerConstructor
