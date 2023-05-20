import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  RefObject,
  FC,
} from 'react'
import BurgerIngStyles from './burgering.module.css'
import { useInView } from 'react-intersection-observer'
import { useSelector } from '../../services/types/hooks'
import { useLocation } from 'react-router'
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'
import { IIngredient, IFilteredIngr } from '../../services/types/data'

function BurgerIngredients() {
  const initial_array = useSelector((state) => state.feed.feed)
  const [current, setCurrent] = useState('bun')
  const oneRef = useRef<HTMLDivElement>(null) //represents tab "one"
  const twoRef = useRef<HTMLDivElement>(null) //represents tab "two"
  const threeRef = useRef<HTMLDivElement>(null) //represents tab "three"

  //To filter initial data from API based on the type of the ingredients
  const bunArray = useMemo<ReadonlyArray<IIngredient>>(
    () => initial_array.filter((ingr: IIngredient) => ingr.type === 'bun'),
    [initial_array]
  )
  const sauceArray = useMemo<ReadonlyArray<IIngredient>>(
    () => initial_array.filter((ingr: IIngredient) => ingr.type === 'sauce'),
    [initial_array]
  )
  const mainArray = useMemo<ReadonlyArray<IIngredient>>(
    () => initial_array.filter((ingr: IIngredient) => ingr.type === 'main'),
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

  const handleTabClick = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
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
          <p
            className="text text_type_main-medium pt-10 pb-6"
            ref={oneRef as RefObject<HTMLParagraphElement>}
          >
            Булки
          </p>
          <div className={BurgerIngStyles.grid_block} ref={bunRef}>
            {bunArray.map((filteredIngr) => (
              <GridElement key={filteredIngr._id} filteredIngr={filteredIngr} />
            ))}
          </div>
          <p
            className="text text_type_main-medium pt-10 pb-6"
            ref={twoRef as RefObject<HTMLParagraphElement>}
          >
            Соусы
          </p>
          <div className={BurgerIngStyles.grid_block} ref={sauceRef}>
            {sauceArray.map((filteredIngr) => (
              <GridElement key={filteredIngr._id} filteredIngr={filteredIngr} />
            ))}
          </div>
          <p
            className="text text_type_main-medium pt-10 pb-6"
            ref={threeRef as RefObject<HTMLParagraphElement>}
          >
            Начинки
          </p>
          <div className={BurgerIngStyles.grid_block} ref={mainRef}>
            {mainArray.map((filteredIngr) => (
              <GridElement key={filteredIngr._id} filteredIngr={filteredIngr} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const GridElement: FC<IFilteredIngr> = ({ filteredIngr }) => {
  const ingredients = useSelector((state) => state.selectedIng.ingredients)
  const bun = useSelector((state) => state.selectedIng.bun)
  const location = useLocation()

  const [{ isDragging }, dragRef] = useDrag({
    type: filteredIngr.type === 'bun' ? 'bun' : 'main_sauce',
    item: filteredIngr,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.2 : 1

  function CountItems(): number {
    const count = ingredients.filter(
      (elem: IIngredient) => elem._id === filteredIngr._id
    ).length
    return count
  }

  return (
    <React.Fragment key={filteredIngr._id}>
      <Link
        to={`/ingredients/${filteredIngr._id}`}
        state={{ background: location }}
      >
        <div
          className={BurgerIngStyles.column1}
          ref={dragRef}
          style={{ opacity: opacity }}
        >
          {bun && bun._id === filteredIngr._id && (
            <Counter count={2} size="default" extraClass="m-1" />
          )}
          {ingredients &&
            ingredients.filter(
              (elem: IIngredient) => elem._id === filteredIngr._id
            ).length > 0 && (
              <Counter count={CountItems()} size="default" extraClass="m-1" />
            )}
          <img src={filteredIngr.image} alt=""></img>
          <div className={BurgerIngStyles.pricebox}>
            <span className="text text_type_digits-default">
              {filteredIngr.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <p
            className="text text_type_main-default"
            style={{ textAlign: 'center' }}
          >
            {filteredIngr.name}
          </p>
        </div>
      </Link>
    </React.Fragment>
  )
}

export default BurgerIngredients
