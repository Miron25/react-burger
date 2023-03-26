import React, { useState, useRef, useMemo } from 'react'
import BurgerIngStyles from './burgering.module.css'
import PropTypes from 'prop-types'
import Modal from './../modal/modal'
import { arrayType } from '../../types/index'
import { useSelector } from 'react-redux'
import {
  Tab,
  CurrencyIcon,
  Counter,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'

function BurgerIngredients() {
  const initial_array = useSelector((state) => state.feed.feed)
  const [current, setCurrent] = useState('one')
  const oneRef = useRef(null) //represents tab "one"
  const twoRef = useRef(null) //represents tab "two"
  const threeRef = useRef(null) //represents tab "three"
  const [ind, setInd] = useState(0)
  const [ind2, setInd2] = useState(0)
  const [ind3, setInd3] = useState(0)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)

  //To filter initial data from API based on the type of the ingredients
  const bunArray = useMemo(
    () => initial_array.filter((ingr) => ingr.type === 'bun'),
    [initial_array]
  )
  const sauceArray = useMemo(
    () => initial_array.filter((ingr) => ingr.type === 'sauce'),
    [initial_array]
  )
  const mainArray = useMemo(
    () => initial_array.filter((ingr) => ingr.type === 'main'),
    [initial_array]
  )

  const handleKeyDown = () => {}

  const handleTabClick = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const GridElement = ({ filteredIngr, setShow, setInd, index }) => {
    const ingredients = useSelector((state) => state.selectedIng.ingredients)
    const bun = useSelector((state) => state.selectedIng.bun)

    const [{ isDragging }, dragRef] = useDrag({
      type: filteredIngr.type === 'bun' ? 'bun' : 'main_sauce',
      item: filteredIngr,
      collect: (monitor) => ({
        isDragging: monitor.isDragging() ? 0.5 : 1,
      }),
    })

    const CountItems = () => {
      const count = ingredients.filter(
        (elem) => elem._id === filteredIngr._id
      ).length
      return count
    }

    return (
      <React.Fragment key={filteredIngr._id}>
        <div
          className={BurgerIngStyles.column1}
          ref={dragRef}
          onClick={() => {
            setShow(true)
            setInd(index)
          }}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{ isDragging }}
        >
          {bun && bun._id === filteredIngr._id && (
            <Counter count={1} size="default" extraClass="m-1" />
          )}
          {ingredients &&
            ingredients.filter((elem) => elem._id === filteredIngr._id).length >
              0 && (
              <Counter count={<CountItems />} size="default" extraClass="m-1" />
            )}
          <img src={filteredIngr.image} alt=""></img>
          <div className={BurgerIngStyles.pricebox}>
            <span className="text text_type_digits-default">
              {filteredIngr.price}
            </span>
            <CurrencyIcon />
          </div>
          <p
            className="text text_type_main-default"
            style={{ textAlign: 'center' }}
          >
            {filteredIngr.name}
          </p>
        </div>
      </React.Fragment>
    )
  }

  // The content of the modal popup - selected ingredient details
  const ModalContent = ({ filtered_array, onClose, index }) => {
    return (
      <>
        <div className={BurgerIngStyles.popup_title}>
          <h1
            className={
              BurgerIngStyles.popup_header + 'text text_type_main-large'
            }
          >
            Детали игредиента
          </h1>
          <CloseIcon onClick={onClose} />
        </div>

        <img
          src={filtered_array[index].image}
          alt=""
          className={BurgerIngStyles.popup_img}
        ></img>
        <div className={BurgerIngStyles.popup_name}>
          <h2 className="text text_type_main-medium">
            {filtered_array[index].name}
          </h2>
        </div>
        <ul className={BurgerIngStyles.popup_nutrition}>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </span>
            <span className="text text_type_digits-default">
              {filtered_array[index].calories}
            </span>
          </div>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Белки, г
            </span>
            <span className="text text_type_digits-default">
              {filtered_array[index].proteins}
            </span>
          </div>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Жиры, г
            </span>
            <span className="text text_type_digits-default">
              {filtered_array[index].fat}
            </span>
          </div>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </span>
            <span className="text text_type_digits-default">
              {filtered_array[index].carbohydrates}
            </span>
          </div>
        </ul>
      </>
    )
  }

  return (
    <>
      <div className={BurgerIngStyles.mainbox}>
        <header className="text text_type_main-large pt-10 pb-5">
          Соберите бургер
        </header>
        <div className={BurgerIngStyles.tabs}>
          <Tab
            value="one"
            active={current === 'one'}
            onClick={() => {
              setCurrent('one')
              handleTabClick(oneRef)
            }}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={current === 'two'}
            onClick={() => {
              setCurrent('two')
              handleTabClick(twoRef)
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={current === 'three'}
            onClick={() => {
              setCurrent('three')
              handleTabClick(threeRef)
            }}
          >
            Начинки
          </Tab>
        </div>
        <div className={BurgerIngStyles.ing_block}>
          <p className="text text_type_main-medium pt-10 pb-6" ref={oneRef}>
            Булки
          </p>
          <div className={BurgerIngStyles.grid_block}>
            {bunArray.map((filteredIngr, index) => (
              <GridElement
                key={filteredIngr._id}
                filteredIngr={filteredIngr}
                setShow={setShow1}
                setInd={setInd}
                index={index}
              />
            ))}
          </div>
          <Modal show={show1} onClose={() => setShow1(false)}>
            <ModalContent
              filtered_array={bunArray}
              onClose={() => setShow1(false)}
              index={ind}
            />
          </Modal>
          <p className="text text_type_main-medium pt-10 pb-6" ref={twoRef}>
            Соусы
          </p>
          <div className={BurgerIngStyles.grid_block}>
            {sauceArray.map((filteredIngr, index) => (
              <GridElement
                key={filteredIngr._id}
                filteredIngr={filteredIngr}
                setShow={setShow2}
                setInd={setInd2}
                index={index}
              />
            ))}
            <Modal show={show2} onClose={() => setShow2(false)}>
              <ModalContent
                filtered_array={sauceArray}
                onClose={() => setShow2(false)}
                index={ind2}
              />
            </Modal>
          </div>
          <p className="text text_type_main-medium pt-10 pb-6" ref={threeRef}>
            Начинки
          </p>
          <div className={BurgerIngStyles.grid_block}>
            {mainArray.map((filteredIngr, index) => (
              <GridElement
                key={filteredIngr._id}
                filteredIngr={filteredIngr}
                setShow={setShow3}
                setInd={setInd3}
                index={index}
              />
            ))}
            <Modal show={show3} onClose={() => setShow3(false)}>
              <ModalContent
                filtered_array={mainArray}
                onClose={() => setShow3(false)}
                index={ind3}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  filteredIngr: arrayType,
  filtered_array: arrayType,
  setShow: PropTypes.bool,
  setInd: PropTypes.number,
  onClose: PropTypes.func,
  index: PropTypes.number,
  key: PropTypes.string,
}

export default BurgerIngredients
