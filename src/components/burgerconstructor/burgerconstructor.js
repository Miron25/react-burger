import React, { useState } from 'react'
import BurgerConsStyles from './burgercons.module.css'
//import BurgerIngredients from './../burgeringredients/burgeringredients'
import Modal from './../modal/modal'
import InitialData from '../../utils/data'
import PropTypes from 'prop-types'
import graphics from '../../images/graphics.png'
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor() {
  const init_array = InitialData()
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [index, setIndex] = useState(0)

  const handleKeyDown = () => {}
  const handleClick = (value) => {
    setIndex(value)
    return index
  }

  return (
    <div className={BurgerConsStyles.main}>
      <div className={BurgerConsStyles.constr_block}>
        {
          <React.Fragment>
            <span
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                setShow1(true)
                handleClick('0')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={init_array[0].name + ' (верх)'}
                price={init_array[0].price}
                thumbnail={init_array[0].image}
              />
            </span>
            <span
              onClick={() => {
                setShow1(true)
                handleClick('5')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <DragIcon />
              <ConstructorElement
                text={init_array[5].name}
                price={init_array[5].price}
                thumbnail={init_array[5].image}
              />
            </span>
            <span
              onClick={() => {
                setShow1(true)
                handleClick('4')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <DragIcon />
              <ConstructorElement
                text={init_array[4].name}
                price={init_array[4].price}
                thumbnail={init_array[4].image}
              />
            </span>
            <span
              onClick={() => {
                setShow1(true)
                handleClick('8')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <DragIcon />
              <ConstructorElement
                text={init_array[8].name}
                price={init_array[8].price}
                thumbnail={init_array[8].image}
              />
            </span>
            <span
              onClick={() => {
                setShow1(true)
                handleClick('8')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <DragIcon />
              <ConstructorElement
                text={init_array[8].name}
                price={init_array[8].price}
                thumbnail={init_array[8].image}
              />
            </span>
            <span
              onClick={() => {
                setShow1(true)
                handleClick('10')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <DragIcon />
              <ConstructorElement
                text={init_array[10].name}
                price={init_array[10].price}
                thumbnail={init_array[10].image}
              />
            </span>
            <span
              onClick={() => {
                setShow1(true)
                handleClick('11')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <DragIcon />
              <ConstructorElement
                text={init_array[11].name}
                price={init_array[11].price}
                thumbnail={init_array[11].image}
              />
            </span>
            <span
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                setShow1(true)
                handleClick('0')
              }}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={init_array[0].name + ' (низ)'}
                price={init_array[0].price}
                thumbnail={init_array[0].image}
              />
            </span>
            <Modal show={show1} onClose={() => setShow1(false)}>
              <div className={BurgerConsStyles.popup_title}>
                <h1
                  className={
                    BurgerConsStyles.popup_header + 'text text_type_main-large'
                  }
                >
                  Детали игредиента
                </h1>
                <CloseIcon onClick={() => setShow1(false)} />
              </div>
              <img
                src={init_array[index].image}
                alt=""
                className={BurgerConsStyles.popup_img}
              ></img>
              <h2 className={BurgerConsStyles.popup_name}>
                {init_array[index].name}
              </h2>
              <ul className={BurgerConsStyles.popup_nutrition}>
                <div className={BurgerConsStyles.popup_nutrition_value}>
                  <span className="text text_type_main-default text_color_inactive">
                    Калории,ккал
                  </span>
                  <span className="text text_type_digits-default">
                    {init_array[index].calories}
                  </span>
                </div>
                <div className={BurgerConsStyles.popup_nutrition_value}>
                  <span className="text text_type_main-default text_color_inactive">
                    Белки, г
                  </span>
                  <span className="text text_type_digits-default">
                    {init_array[index].proteins}
                  </span>
                </div>
                <div className={BurgerConsStyles.popup_nutrition_value}>
                  <span className="text text_type_main-default text_color_inactive">
                    Жиры, г
                  </span>
                  <span className="text text_type_digits-default">
                    {init_array[index].fat}
                  </span>
                </div>
                <div className={BurgerConsStyles.popup_nutrition_value}>
                  <span className="text text_type_main-default text_color_inactive">
                    Углеводы, г
                  </span>
                  <span className="text text_type_digits-default">
                    {init_array[index].carbohydrates}
                  </span>
                </div>
              </ul>
            </Modal>
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
              onClick={() => setShow2(true)}
            >
              Оформить заказ
            </Button>
          </>
        }
        <Modal show={show2} onClose={() => setShow2(false)}>
          <div
            className={BurgerConsStyles.popup_title}
            style={{ justifyContent: 'flex-end' }}
          >
            <CloseIcon onClick={() => setShow2(false)} />
          </div>
          <p
            className="text text_type_digits-large"
            style={{
              position: 'absolute',
              width: '520px',
              height: '120px',
              left: '100px',
              top: '120px',
              textAlign: 'center',
            }}
          >
            034536
          </p>
          <p
            className="text text_type_main-medium"
            style={{
              position: 'absolute',
              width: '520px',
              height: '30px',
              left: '100px',
              top: '272px',
              textAlign: 'center',
            }}
          >
            идентификатор заказа
          </p>
          <img
            src={graphics}
            alt="graphics"
            className={BurgerConsStyles.popup2_graphics}
          />
          <p
            className="text text_type_main-small"
            style={{
              position: 'absolute',
              width: '520px',
              height: '24px',
              left: '100px',
              top: '542px',
              textAlign: 'center',
            }}
          >
            Ваш заказ начали готовить
          </p>
          <p
            className="text text_type_main-default text_color_inactive"
            style={{
              position: 'absolute',
              width: '520px',
              height: '24px',
              left: '100px',
              top: '574px',
              textAlign: 'center',
            }}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </Modal>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  mainArray: PropTypes.array,
}

export default BurgerConstructor
