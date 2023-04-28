import React, { useState, useMemo, useRef, useCallback, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BurgerConsStyles from './burgercons.module.css'
import Modal from '../modal/modal'
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
import { useNavigate } from 'react-router-dom'
import { IIngredient, IDroppedIngr } from '../../utils/types'

type TDragItem = {
  index: number
}

type TDragProps = {
  isDragging: boolean
}

function BurgerConstructor() {
  //@ts-ignore: Will be typed in the next sprint
  const ingredients = useSelector((state) => state.selectedIng.ingredients)
  //@ts-ignore: Will be typed in the next sprint
  const bun = useSelector((state) => state.selectedIng.bun)
  //@ts-ignore: Will be typed in the next sprint
  const ing_ids = useSelector((state) => state.selectedIng.ing_ids)
  //@ts-ignore: Will be typed in the next sprint
  const order = useSelector((state) => state.orderDetails.order)
  //@ts-ignore: Will be typed in the next sprint
  const name = useSelector((state) => state.orderDetails.name)
  //@ts-ignore: Will be typed in the next sprint
  const userLoggedIn = useSelector((state) => state.loginReducer.user)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalPrice = useMemo<number>(() => {
    if (bun)
      return Number(
        ingredients.reduce(
          (sum: number, item: IIngredient): number => sum + Number(item.price),
          0
        ) + Number(bun.price * 2)
      )
    else return 0
  }, [ingredients, bun])

  const [, dropTarget] = useDrop<IIngredient>({
    accept: ['main_sauce', 'bun'],
    drop(item) {
      addingItem_Bun(item)
    },
  })

  // To handle onClick event and add an item to constructor
  const addingItem_Bun = (item: IIngredient): void => {
    const itemDropped = item
    if (itemDropped?.type === 'bun') {
      const bunobj = Object.assign({}, itemDropped, {
        UUID: uuidv4(),
        UUID2: uuidv4(),
      })
      dispatch({
        type: DELETE_BUN,
      }),
        dispatch({
          type: ADD_BUN,
          bunobj,
          _id: bunobj._id,
        })
    } else {
      const ingobj = Object.assign({}, itemDropped, { UUID: uuidv4() })
      dispatch({
        type: ADD_ITEM,
        ingobj,
        _id: ingobj._id,
      })
    }
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: ing_ids,
    }),
  }

  const moveIngr = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      const dragItem = ingredients[dragIndex]
      const hoverItem = ingredients[hoverIndex]
      const updatedList = [...ingredients]
      updatedList[dragIndex] = hoverItem
      updatedList[hoverIndex] = dragItem
      dispatch({
        type: SAVE_STATE,
        updatedList,
      })
    },
    [dispatch, ingredients]
  )

  const renderList = useCallback(
    (droppedIngr: IIngredient, index: number) => {
      return (
        <IngrList
          key={droppedIngr.UUID}
          droppedIngr={droppedIngr}
          index={index}
          moveIngr={moveIngr}
        />
      )
    },
    [moveIngr]
  )

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
                  text={`${String(bun.name)} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </span>
            )}
            <div className={BurgerConsStyles.scroll_block}>
              {ingredients.map((droppedIngr: IIngredient, index: number) =>
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
                  text={`${String(bun.name)}  (низ)`}
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
              <CurrencyIcon type="primary" />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                {
                  userLoggedIn
                    ? (setShow(true),
                      dispatch({ type: CLEAR_ARRAY }),
                      //@ts-ignore: Will be typed in the next sprint
                      dispatch(getOrder({ options })))
                    : navigate('/login')
                }
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
            <CloseIcon type="primary" onClick={() => setShow(false)} />
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

const IngrList: FC<IDroppedIngr> = ({ droppedIngr, index, moveIngr }) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement | null>(null)

  const [{ handlerId }, drop] = useDrop<TDragItem, unknown, { handlerId: any }>(
    {
      accept: ['sorting'],
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
        const hoverIndex = index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset) {
          return
        }
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
    }
  )

  const [{ isDragging }, drag] = useDrag<TDragItem, unknown, TDragProps>({
    type: 'sorting',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.2 : 1
  drag(drop(ref))

  return (
    <React.Fragment key={droppedIngr.UUID}>
      <span
        className={BurgerConsStyles.elem}
        ref={ref}
        style={{ opacity: opacity }}
        data-handler-id={handlerId}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={droppedIngr.name}
          price={droppedIngr.price}
          thumbnail={droppedIngr.image}
          handleClose={() => {
            dispatch({
              type: DELETE_ITEM,
              UUID: droppedIngr.UUID,
              _id: droppedIngr._id,
            })
          }}
        />
      </span>
    </React.Fragment>
  )
}

export default BurgerConstructor