import React, { useState, useRef } from 'react'
import BurgerIngStyles from './burgering.module.css'
import PropTypes from 'prop-types'
import Modal from './../modal/modal'
import {
  Tab,
  CurrencyIcon,
  Counter,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('one')
  // const [count, setCount] = useState(0)
  const initial_array = props.mainArray
  const oneRef = useRef(null) //represents tab "one"
  const twoRef = useRef(null) //represents tab "two"
  const threeRef = useRef(null) //represents tab "three"
  const [ind, setInd] = useState(0)
  const [show1, setShow1] = useState(false)
  //const [bunArray, setBunArray] = useState([])

  /*const handleAddIngredient = useCallback(
    (obj) => () => {
      setCount(count + 1)
      return count
    },
    []
  )*/
  const handleClick = (value) => {
    setInd(value)
    return ind
  }

  const handleKeyDown = () => {}

  const handleTabClick = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const FilterItems = ({ type }) => {
    const filtered_array = initial_array
      .filter((ingr) => ingr.type === type)
      .map((filteredIngr, index) => (
        <React.Fragment key={filteredIngr._id}>
          <div
            className={BurgerIngStyles.column1}
            //onClick={handleAddIngredient(filteredIngr)}
            onClick={() => {
              setShow1(true)
              handleClick(index)
            }}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <Counter count={1} size="default" extraClass="m-1" />

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
      ))

    return filtered_array
  }

  return (
    <>
      <div className={BurgerIngStyles.mainbox}>
        <header
          className="text text_type_main-large"
          style={{ paddingTop: '40px', paddingBottom: '20px' }}
        >
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
          <p
            className="text text_type_main-medium"
            ref={oneRef}
            style={{ paddingTop: '40px', paddingBottom: '24px' }}
          >
            Булки
          </p>
          <div className={BurgerIngStyles.grid_block}>
            <FilterItems type="bun" />
          </div>
          <p
            className="text text_type_main-medium"
            ref={twoRef}
            style={{ paddingTop: '40px', paddingBottom: '24px' }}
          >
            Соусы
          </p>
          <div className={BurgerIngStyles.grid_block}>
            <FilterItems type="sauce" />
          </div>
          <p
            className="text text_type_main-medium"
            ref={threeRef}
            style={{ paddingTop: '40px', paddingBottom: '24px' }}
          >
            Начинки
          </p>
          <div className={BurgerIngStyles.grid_block}>
            <FilterItems type="main" />
          </div>
        </div>
      </div>
      <Modal show={show1} onClose={() => setShow1(false)}>
        <div className={BurgerIngStyles.popup_title}>
          <h1
            className={
              BurgerIngStyles.popup_header + 'text text_type_main-large'
            }
          >
            Детали игредиента
          </h1>
          <CloseIcon onClick={() => setShow1(false)} />
        </div>
        <img
          src={initial_array[ind].image}
          alt=""
          className={BurgerIngStyles.popup_img}
        ></img>
        <h2 className={BurgerIngStyles.popup_name}>
          {initial_array[ind].name}
        </h2>
        <ul className={BurgerIngStyles.popup_nutrition}>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </span>
            <span className="text text_type_digits-default">
              {initial_array[ind].calories}
            </span>
          </div>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Белки, г
            </span>
            <span className="text text_type_digits-default">
              {initial_array[ind].proteins}
            </span>
          </div>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Жиры, г
            </span>
            <span className="text text_type_digits-default">
              {initial_array[ind].fat}
            </span>
          </div>
          <div className={BurgerIngStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </span>
            <span className="text text_type_digits-default">
              {initial_array[ind].carbohydrates}
            </span>
          </div>
        </ul>
      </Modal>
    </>
  )
}

BurgerIngredients.propTypes = {
  mainArray: PropTypes.array,
  type: PropTypes.string,
}

export default BurgerIngredients
