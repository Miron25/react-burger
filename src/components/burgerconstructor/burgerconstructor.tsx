import React, { useState, useMemo, useRef, useCallback, FC } from 'react'
import { useSelector, useDispatch } from '../../services/types/hooks'
import BurgerConsStyles from './burgercons.module.css'
import Modal from '../modal/modal'
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import {
  clearArrayAction,
  addItemAction,
  addBunAction,
  deleteItemAction,
  deleteBunAction,
  saveStateAction,
} from '../../services/actions/burgerconst'
import { v4 as uuidv4 } from 'uuid'
import { getOrder } from '../../services/actions/orderdetails'
import { useNavigate } from 'react-router-dom'
import { IIngredient, IDroppedIngr, IIngUUID } from '../../services/types/data'
import { OrderDetailsContent } from '../orderdetails/orderdetails'

type TDragItem = {
  index: number
}

type TDragProps = {
  isDragging: boolean
}

function BurgerConstructor() {
  const ingredients = useSelector((state) => state.selectedIng.ingredients)
  const bun = useSelector((state) => state.selectedIng.bun)
  const ing_ids = useSelector((state) => state.selectedIng.ing_ids)
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

  const [, dropTarget] = useDrop<IIngUUID | undefined>({
    accept: ['main_sauce', 'bun'],
    drop(item) {
      addingItem_Bun(item)
    },
  })

  // To handle onClick event and add an item to constructor
  const addingItem_Bun = (item: IIngUUID | undefined): void => {
    const itemDropped = item
    if (itemDropped?.type === 'bun') {
      //const bunobj = Object.assign({}, itemDropped, {UUID: uuidv4(), UUID2: uuidv4(),})
      const bunobj = { ...itemDropped, UUID: uuidv4(), UUID2: uuidv4() }
      dispatch(deleteBunAction()), dispatch(addBunAction(bunobj, bunobj._id))
    } else if (itemDropped?.type === 'main' || itemDropped?.type === 'sauce') {
      //const ingobj = Object.assign({}, itemDropped, { UUID: uuidv4() })
      const ingobj = { ...itemDropped, UUID: uuidv4() }
      dispatch(addItemAction(ingobj, ingobj._id))
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
      dispatch(saveStateAction(updatedList, []))
    },
    [dispatch, ingredients]
  )

  const renderList = useCallback(
    (droppedIngr: IIngUUID, index: number) => {
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
              {ingredients.map((droppedIngr: IIngUUID, index: number) =>
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
                      dispatch(clearArrayAction()),
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
          <OrderDetailsContent setShow={setShow} />
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
            dispatch(
              deleteItemAction(droppedIngr, droppedIngr._id, droppedIngr.UUID)
            )
          }}
        />
      </span>
    </React.Fragment>
  )
}

export default BurgerConstructor
