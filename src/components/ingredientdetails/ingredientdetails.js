import IngDetailsStyles from './ingredientdetails.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { CLEAR_INGREDIENT_DETAILS } from '../../services/actions/ingredientdetails'
import PropTypes from 'prop-types'

export const ModalContent = ({ setShow }) => {
  const ingDetails = useSelector((state) => state.ingDetails.ingDetails)
  const dispatch = useDispatch()
  return (
    <>
      <div className={IngDetailsStyles.popup_title}>
        <h1
          className={
            IngDetailsStyles.popup_header + 'text text_type_main-large'
          }
        >
          Детали игредиента
        </h1>
        <CloseIcon
          onClick={() => {
            setShow(false)
            dispatch({
              type: CLEAR_INGREDIENT_DETAILS,
            })
          }}
        />
      </div>

      <img
        src={ingDetails.image}
        alt=""
        className={IngDetailsStyles.popup_img}
      ></img>
      <div className={IngDetailsStyles.popup_name}>
        <h2 className="text text_type_main-medium">{ingDetails.name}</h2>
      </div>
      <ul className={IngDetailsStyles.popup_nutrition}>
        <div className={IngDetailsStyles.popup_nutrition_value}>
          <span className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default">
            {ingDetails.calories}
          </span>
        </div>
        <div className={IngDetailsStyles.popup_nutrition_value}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default">
            {ingDetails.proteins}
          </span>
        </div>
        <div className={IngDetailsStyles.popup_nutrition_value}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default">
            {ingDetails.fat}
          </span>
        </div>
        <div className={IngDetailsStyles.popup_nutrition_value}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default">
            {ingDetails.carbohydrates}
          </span>
        </div>
      </ul>
    </>
  )
}

ModalContent.propTypes = {
  setShow: PropTypes.func,
}
