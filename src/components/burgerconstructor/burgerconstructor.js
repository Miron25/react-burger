import React, { useState, useMemo, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BurgerConsStyles from './burgercons.module.css'
import PropTypes from 'prop-types'
import Modal from './../modal/modal'
import { arrayType } from '../../types/index'
import graphics from '../../images/graphics.png'
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import {
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  DELETE_BUN,
  CLEAR_ARRAY,
  SAVE_STATE,
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

  const moveIngr = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = ingredients[dragIndex]
      const hoverItem = ingredients[hoverIndex]
      const updatedList = [...ingredients]
      updatedList[dragIndex] = hoverItem
      updatedList[hoverIndex] = dragItem
      //const ing2 = [...ingredients].splice(hoverIndex, 0, [...ingredients].splice(dragIndex, 1)[0])
      dispatch({
        type: SAVE_STATE,
        updatedList,
      })
      console.log(ingredients)
    },
    [ingredients, dispatch]
  )

  const renderList = useCallback(
    (droppedIngr, index) => {
      return (
        <IngrList
          key={droppedIngr.UUID}
          droppedIngr={droppedIngr}
          UUID={droppedIngr.UUID}
          index={index}
          moveIngr={moveIngr}
        />
      )
    },
    [moveIngr]
  )

  const IngrList = ({ droppedIngr, UUID, index, moveIngr }) => {
    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
      accept: ['main_sauce'],
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        //console.log(dragIndex)
        const hoverIndex = index
        //console.log(dragIndex, hoverIndex)
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        //console.log(hoverBoundingRect)
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action
        moveIngr(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      },
    })

    const [{ isDragging }, drag] = useDrag({
      type: 'main_sauce',
      item: () => {
        return { UUID, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
    const opacity = isDragging ? 0.1 : 1
    drag(drop(ref))

    return (
      <React.Fragment key={droppedIngr.UUID}>
        <span
          className={BurgerConsStyles.elem}
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
        >
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
    )
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
              {ingredients.map((droppedIngr, index) =>
                renderList(droppedIngr, index)
              )}
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

BurgerConstructor.propTypes = {
  droppedIngr: arrayType,
  UUID: PropTypes.string,
  index: PropTypes.number,
  moveIngr: PropTypes.func,
  /*dropTarget: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),*/
}

export default BurgerConstructor
