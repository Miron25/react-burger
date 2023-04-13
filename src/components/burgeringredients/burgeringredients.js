import React, { useState, useRef, useMemo, useEffect } from 'react'
import BurgerIngStyles from './burgering.module.css'
import { useInView } from 'react-intersection-observer'
import PropTypes from 'prop-types'
import { arrayType } from '../../types/index'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'

function BurgerIngredients() {
  const initial_array = useSelector((state) => state.feed.feed)
  const ingredients = useSelector((state) => state.selectedIng.ingredients)
  const bun = useSelector((state) => state.selectedIng.bun)
  const [current, setCurrent] = useState('bun')
  const oneRef = useRef(null) //represents tab "one"
  const twoRef = useRef(null) //represents tab "two"
  const threeRef = useRef(null) //represents tab "three"
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const location = useLocation()

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

  const [bunRef, InViewBun] = useInView({ threshold: 0 })
  const [sauceRef, InViewSauce] = useInView({ threshold: 0 })
  const [mainRef, InViewMain] = useInView({ threshold: 0 })

  useEffect(() => {
    if (InViewBun) {
      setCurrent('bun')
    } else if (InViewSauce) {
      setCurrent('sauce')
    } else if (InViewMain) {
      setCurrent('main')
    }
  }, [InViewBun, InViewSauce, InViewMain])

  useEffect(() => {}, [show])

  const handleKeyDown = () => {}

  const handleTabClick = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function ConditionalLink({ children, condition, ...props }) {
    return condition ? <Link {...props}>{children}</Link> : <>{children}</>
  }

  const GridElement = ({ filteredIngr, setShow }) => {
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
        <ConditionalLink
          to={`/ingredients/${id}`}
          condition={show}
          state={{ background: location }}
        >
          <div
            className={BurgerIngStyles.column1}
            ref={dragRef}
            onClick={() => {
              setShow(true), setId(filteredIngr._id)
            }}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{ isDragging }}
          >
            {bun && bun._id === filteredIngr._id && (
              <Counter count={2} size="default" extraClass="m-1" />
            )}
            {ingredients &&
              ingredients.filter((elem) => elem._id === filteredIngr._id)
                .length > 0 && (
                <Counter
                  count={<CountItems />}
                  size="default"
                  extraClass="m-1"
                />
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
        </ConditionalLink>
      </React.Fragment>
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
            value="bun"
            active={current === 'bun'}
            onClick={() => {
              setCurrent('bun')
              handleTabClick(oneRef)
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={current === 'sauce'}
            onClick={() => {
              setCurrent('sauce')
              handleTabClick(twoRef)
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={current === 'main'}
            onClick={() => {
              setCurrent('main')
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
          <div className={BurgerIngStyles.grid_block} ref={bunRef}>
            {bunArray.map((filteredIngr) => (
              <GridElement
                key={filteredIngr._id}
                filteredIngr={filteredIngr}
                show={show}
                setShow={setShow}
              />
            ))}
          </div>

          <p className="text text_type_main-medium pt-10 pb-6" ref={twoRef}>
            Соусы
          </p>
          <div className={BurgerIngStyles.grid_block} ref={sauceRef}>
            {sauceArray.map((filteredIngr) => (
              <GridElement
                key={filteredIngr._id}
                filteredIngr={filteredIngr}
                show={show}
                setShow={setShow}
              />
            ))}
          </div>
          <p className="text text_type_main-medium pt-10 pb-6" ref={threeRef}>
            Начинки
          </p>
          <div className={BurgerIngStyles.grid_block} ref={mainRef}>
            {mainArray.map((filteredIngr) => (
              <GridElement
                key={filteredIngr._id}
                filteredIngr={filteredIngr}
                show={show}
                setShow={setShow}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  filteredIngr: PropTypes.array,
  filtered_array: arrayType,
  show: PropTypes.bool,
  setShow: PropTypes.bool,
  setInd: PropTypes.number,
  onClose: PropTypes.func,
  index: PropTypes.number,
  key: PropTypes.string,
  children: PropTypes.node,
  condition: PropTypes.bool,
  to: PropTypes.string,
}

export default BurgerIngredients
