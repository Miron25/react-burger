import React, { useState, useRef } from 'react'
import BurgerIngStyles from './burgering.module.css'
import PropTypes from 'prop-types'
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('one')
  // const [count, setCount] = useState(0)
  const initial_array = props.mainArray
  const oneRef = useRef(null) //represents tab "one"
  const twoRef = useRef(null) //represents tab "two"
  const threeRef = useRef(null) //represents tab "three"

  /*const handleAddIngredient = useCallback(
    (obj) => () => {
      setCount(count + 1)
      return count
    },
    []
  )*/

  const handleTabClick = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const FilterItems = ({ type }) => {
    const filtered_array = initial_array
      .filter((ingr) => ingr.type === type)
      .map((filteredIngr) => (
        <React.Fragment key={filteredIngr._id}>
          <div
            className={BurgerIngStyles.column1}
            //onClick={handleAddIngredient(filteredIngr)}
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
    </>
  )
}

BurgerIngredients.propTypes = {
  mainArray: PropTypes.array,
}

export default BurgerIngredients
